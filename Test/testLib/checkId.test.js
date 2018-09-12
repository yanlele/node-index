const expect = require('chai').expect;
const checkId = require('../../18年/4月/05、前端身份证信息验证正则表达式/index.js');

module.exports = function () {
    describe('通用js模块checkId', function () {
        it('getParam 18为身份证', function () {
            let code = '500228199201066556';
            expect(checkId(code)).include('通过')
        });
        it('15为身份证', function () {
            let code = '130503670401001';
            expect(checkId(code)).include('非法字符!')
        });
    })
};