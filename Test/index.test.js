const libTest = require('./testLib/index.lib.test');
// const serviceTest = require('./service_test/index.service.test');

describe('测试主入口', function () {
    describe('单元测试和覆盖', function () {
        libTest();
    });

    // describe('服务端测试', function() {
    //     serviceTest();
    // })
});

