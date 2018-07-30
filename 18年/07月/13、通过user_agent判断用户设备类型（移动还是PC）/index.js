const UAParser = require('ua-parser-js');
/**
 * 获取操作数据
 * @param  {Object} req 请求对象
 * @return {Object}     action对象
 */
function getActionData(req) {
    const uaInfo = new UAParser(req.header('User-Agent'));
    let phoneType = 3;
    switch(uaInfo.getOS().name) {
        case 'Android':
            phoneType = 1;
            break;
        case 'iOS':
            phoneType = 2;
            break;
    }
    return {
        phoneType: phoneType
    };
}