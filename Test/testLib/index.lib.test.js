const siteTest = require('./checkId.test');
const fontTool = require('./fontTool.test');
const diffTest = require('./diff.test');

module.exports = function () {
    describe('通用函数库测试', function () {
        // siteTest();
        // fontTool();
        diffTest();
    });
};