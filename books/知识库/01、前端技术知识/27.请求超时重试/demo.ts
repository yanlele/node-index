interface InitWithRetries extends RequestInit {
  fetchTimeout?: number | null;
  retryDelays?: number[] | null;
}

const DEFAULT_TIMEOUT = 1000 * 1.5;
const DEFAULT_RETRIES = [0, 0];

const fetchWithRetries = (url: string, initWithRetries?: InitWithRetries): Promise<any> => {
  // fetchTimeout 请求超时时间
  // 请求
  const { fetchTimeout, retryDelays, ...init } = initWithRetries || {};

  // 超时时间
  const _fetchTimeout = fetchTimeout != null ? fetchTimeout : DEFAULT_TIMEOUT;

  // 重复时间数组
  const _retryDelays = retryDelays != null ? retryDelays : DEFAULT_RETRIES;

  // 开始时间
  let requestStartTime = 0;

  // 重试请求索引
  let requestsAttempted = 0;

  return new Promise((resolve, reject) => {
    // 申明发送请求方法
    const sendTimedRequest = (): void => {
      // 自增索引与请求次数
      requestsAttempted++;

      // 发起请求时间
      requestStartTime = Date.now();

      // 是否需要处理后续请求
      let isRequestAlive = true;

      // 发起请求
      const request = fetch(url, init);

      // 请求超时情况
      const requestTimeout = setTimeout(() => {
        // 需要阻断正常的请求返回
        isRequestAlive = false;

        // 需要重新发起请求
        if (shouldRetry(requestsAttempted)) {
          console.warn("fetchWithRetries: HTTP timeout, retrying.");
          retryRequest();
        } else {
          reject(new Error(
            `fetchWithRetries(): Failed to get response from server, tried ${requestsAttempted} times.`,
          ));
        }
      }, _fetchTimeout);

      // 正常请求发起
      request.then(response => {
        // 正常请求返回的场景， 清空定时器
        clearTimeout(requestTimeout);

        // 如果进入了超时流程， 那么正常返回的逻辑， 就直接阻断
        if (isRequestAlive) {
          if (response.status >= 200 && response.status < 300) {
            resolve(response);
          } else if (shouldRetry(requestsAttempted)) {
            console.warn("fetchWithRetries: HTTP error, retrying.");
            retryRequest();
          } else {
            const error: any = new Error(`response error.`);
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
    };

    // 发起重复请求
    const retryRequest = (): void => {
      // 重复请求 delay 时间
      const retryDelay = _retryDelays[requestsAttempted - 1];

      // 重复请求开始时间
      const retryStartTime = requestStartTime + retryDelay;

      // 延迟时间
      const timeout = retryStartTime - Date.now() > 0 ? retryStartTime - Date.now() : 0;

      // 重复请求
      setTimeout(sendTimedRequest, timeout);
    };

    // 是否可以发起重复请求
    const shouldRetry = (attempt: number): boolean => attempt <= _retryDelays.length;

    sendTimedRequest();
  });
};

fetchWithRetries("http://127.0.0.1:3000/user/").then(res => {
  console.log("yanle - logger: res", res);
});
