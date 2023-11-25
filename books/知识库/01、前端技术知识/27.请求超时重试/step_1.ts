interface InitWithRetries extends RequestInit {
  fetchTimeout?: number | null;
  // retryDelays?: number[] | null;
}

const DEFAULT_TIMEOUT = 15000;

// 发起请求
const sendTimedRequest = (url: string, fetchConfig: InitWithRetries) => {
  // 获取请求参数
  const { fetchTimeout, ...init } = fetchConfig || {};

  // 获取超时时间
  const _fetchTimeout = fetchTimeout != null ? fetchTimeout : DEFAULT_TIMEOUT;

  // 开始时间
  let requestStartTime = 0;

  const request = fetch(url, init);

  return new Promise((resolve, reject) => {
    request.then(response => {
      if (response.status >= 200 && response.status < 300) {
        resolve(response);
      } else {
        const error: any = new Error(`response error.`);
        error.response = response;
        reject(error);
      }
    }).catch(error => {
      reject(error);
    });
  });
};
