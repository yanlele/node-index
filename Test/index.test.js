const siteTest = require('./testLib/checkId.test');
const fontTool = require('./testLib/fontTool.test');
const serviceTest = require('./service_test/index.service.test');

describe('测试主入口', function () {
    describe('单元测试和覆盖', function () {
        siteTest();
        fontTool();
    });

    describe('服务端测试', function() {
        serviceTest();
    })
});

