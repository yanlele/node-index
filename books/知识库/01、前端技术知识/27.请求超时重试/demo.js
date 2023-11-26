var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var DEFAULT_TIMEOUT = 1000 * 1.5;
var DEFAULT_RETRIES = [0, 0];
var fetchWithRetries = function (url, initWithRetries) {
    // fetchTimeout 请求超时时间
    // 请求
    var _a = initWithRetries || {}, fetchTimeout = _a.fetchTimeout, retryDelays = _a.retryDelays, init = __rest(_a, ["fetchTimeout", "retryDelays"]);
    // 超时时间
    var _fetchTimeout = fetchTimeout != null ? fetchTimeout : DEFAULT_TIMEOUT;
    // 重复时间数组
    var _retryDelays = retryDelays != null ? retryDelays : DEFAULT_RETRIES;
    // 开始时间
    var requestStartTime = 0;
    // 重试请求索引
    var requestsAttempted = 0;
    return new Promise(function (resolve, reject) {
        // 申明发送请求方法
        var sendTimedRequest = function () {
            // 自增索引与请求次数
            requestsAttempted++;
            // 发起请求时间
            requestStartTime = Date.now();
            console.log("yanle - logger: requestStartTime", requestStartTime);
            // 是否需要处理后续请求
            var isRequestAlive = true;
            // 发起请求
            var request = fetch(url, init);
            // 请求超时情况
            var requestTimeout = setTimeout(function () {
                // 需要阻断正常的请求返回
                isRequestAlive = false;
                // 需要重新发起请求
                if (shouldRetry(requestsAttempted)) {
                    console.warn("fetchWithRetries: HTTP timeout, retrying.");
                    retryRequest();
                }
                else {
                    reject(new Error("fetchWithRetries(): Failed to get response from server, tried ".concat(requestsAttempted, " times.")));
                }
            }, _fetchTimeout);
            // 正常请求发起
            request.then(function (response) {
                // 正常请求返回的场景， 清空定时器
                clearTimeout(requestTimeout);
                // 如果进入了超时流程， 那么正常返回的逻辑， 就直接阻断
                if (isRequestAlive) {
                    if (response.status >= 200 && response.status < 300) {
                        resolve(response);
                    }
                    else if (shouldRetry(requestsAttempted)) {
                        console.warn("fetchWithRetries: HTTP error, retrying.");
                        retryRequest();
                    }
                    else {
                        var error = new Error("response error.");
                        error.response = response;
                        reject(error);
                    }
                }
            })["catch"](function (error) {
                clearTimeout(requestTimeout);
                if (shouldRetry(requestsAttempted)) {
                    retryRequest();
                }
                else {
                    reject(error);
                }
            });
        };
        // 发起重复请求
        var retryRequest = function () {
            // 重复请求 delay 时间
            var retryDelay = _retryDelays[requestsAttempted - 1];
            // 重复请求开始时间
            var retryStartTime = requestStartTime + retryDelay;
            // 延迟时间
            var timeout = retryStartTime - Date.now() > 0 ? retryStartTime - Date.now() : 0;
            // 重复请求
            setTimeout(sendTimedRequest, timeout);
        };
        // 是否可以发起重复请求
        var shouldRetry = function (attempt) { return attempt <= _retryDelays.length; };
        sendTimedRequest();
    });
};
fetchWithRetries("http://127.0.0.1:3000/user/").then(function (res) {
    console.log("yanle - logger: res", res);
});
