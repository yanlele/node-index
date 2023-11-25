interface InitWithRetries extends RequestInit {
  fetchTimeout?: number | null;
  retryDelays?: number[] | null;
}

const DEFAULT_TIMEOUT = 15000;
const DEFAULT_RETRIES = [1000, 3000];


const fetchWithRetries = (url: string, initWithRetries?: InitWithRetries): Promise<any> => {
  // fetchTimeout 请求超时时间
  // 请求
  const { fetchTimeout, retryDelays, ...init } = initWithRetries || {};

  // 超时时间
  const _fetchTimeout = fetchTimeout != null ? fetchTimeout : DEFAULT_TIMEOUT;

  const _retryDelays = retryDelays != null ? retryDelays : DEFAULT_RETRIES;

  // 请求次数
  let requestsAttempted = 0;
  // 开始时间
  let requestStartTime = 0;

  // 申明发送请求方法
  const sendTimedRequest = (): void => {
    // 每次请求的时候， 请求次数自增
    requestsAttempted++;

    // 发起请求时间
    requestStartTime = Date.now();

    // 是否需要处理后续请求
    let isRequestAlive = true;

    // 发起请求
    const request = fetch(url, init);

    // 请求超时情况
    const requestTimeout = setTimeout(() => {
      //
      isRequestAlive = false;

      // 需要重新发起请求
      if (shouldRetry(requestsAttempted)) {
        console.warn("fetchWithRetries: HTTP timeout, retrying.");
        retryRequest();
      }
    }, _fetchTimeout);
  };

  // 是否需要重试
  const shouldRetry = (attempt: number): boolean => {
    return attempt <= _retryDelays.length;
  };

  // 重新发起请求
  const retryRequest = (): void => {
    const retryDelay = _retryDelays[requestsAttempted - 1];
    const retryStartTime = requestStartTime + retryDelay;
    setTimeout(sendTimedRequest, retryStartTime - Date.now());
  };

  return new Promise((resolve, reject) => {

  });
};
