const siteTest = require('./testLib/checkId.test');
const fontTool = require('./testLib/fontTool.test');

describe('测试主入口', function () {
    siteTest();
    fontTool();
});