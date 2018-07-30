/**
 * 获取客户端IP
 * @param  {Object}   req  请求对象
 * @return {String}        结果IP
 */
function getIp(req) {
    const ipStr = req.headers['http_x_real_ip'] // 判断ng反向代理特殊头
        || req.headers['http_client_ip']
        || req.headers['http_x_forwarded_for']
        || req.headers['remote_addr']
        || req.headers['x-forwarded-for']
        || req.connection.remoteAddress // 判断 connection 的远程 IP
        || req.socket.remoteAddress // 判断后端的 socket 的 IP
        || req.connection.socket.remoteAddress
        || '';
    const ipArr = ipStr.match(/[\d.]{7,15}/);
    const ip = ipArr ? ipArr[0] : 'unknown';
    return ip;
}

exports.getIp = getIp;