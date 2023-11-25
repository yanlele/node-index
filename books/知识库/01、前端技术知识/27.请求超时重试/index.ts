// type InitWithRetries = {
//   body?: any,
//   cache?: string | null,
//   credentials?: string | null,
//   fetchTimeout?: number | null,
//   headers?: any,
//   method?: string | null,
//   mode?: string | null,
//   retryDelays?: number[] | null,
// };

interface InitWithRetries extends RequestInit {
  fetchTimeout?: number | null;
  retryDelays?: number[] | null;
}

const DEFAULT_TIMEOUT = 15000;
const DEFAULT_RETRIES = [1000, 3000];

function fetchWithRetries(
  uri: string,
  initWithRetries?: InitWithRetries,
): Promise<any> {
  const { fetchTimeout, retryDelays, ...init } = initWithRetries || {};
  const _fetchTimeout = fetchTimeout != null ? fetchTimeout : DEFAULT_TIMEOUT;
  const _retryDelays = retryDelays != null ? retryDelays : DEFAULT_RETRIES;

  let requestsAttempted = 0;
  let requestStartTime = 0;
  return new Promise((resolve, reject) => {
    function sendTimedRequest(): void {
      requestsAttempted++;
      requestStartTime = Date.now();
      let isRequestAlive = true;
      const request = fetch(uri, init);
      const requestTimeout = setTimeout(() => {
        isRequestAlive = false;
        if (shouldRetry(requestsAttempted)) {
          console.warn("fetchWithRetries: HTTP timeout, retrying.");
          retryRequest();
        } else {
          reject(new Error(
            `fetchWithRetries(): Failed to get response from server, tried ${requestsAttempted} times.`,
          ));
        }
      }, _fetchTimeout);

      request.then(response => {
        clearTimeout(requestTimeout);
        if (isRequestAlive) {
          if (response.status >= 200 && response.status < 300) {
            resolve(response);
          } else if (shouldRetry(requestsAttempted)) {
            console.warn("fetchWithRetries: HTTP error, retrying.");
            retryRequest();
          } else {
            const error: any = new Error(
              `fetchWithRetries(): Still no successful response after ${requestsAttempted} retries, giving up.`,
            );
            error.response = response;
            reject(error);
          }
        }
      }).catch(error => {
        clearTimeout(requestTimeout);
        if (shouldRetry(requestsAttempted)) {
          retryRequest();
        } else {
          reject(error);
        }
      });
    }

    function retryRequest(): void {
      const retryDelay = _retryDelays[requestsAttempted - 1];
      const retryStartTime = requestStartTime + retryDelay;
      setTimeout(sendTimedRequest, retryStartTime - Date.now());
    }

    function shouldRetry(attempt: number): boolean {
      return (
        typeof window !== "undefined" &&
        attempt <= _retryDelays.length
      );
    }

    sendTimedRequest();
  });
}

export default fetchWithRetries;
