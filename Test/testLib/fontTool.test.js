const expect = require('chai').expect;
const {isObjEmpty, getSizeInfo, formatPrice, formatDate, splitPrice, recombinePrice} = require('../../18年/6月/06、基础公用方法库/01、前端层面/index.js');

module.exports = function() {
    describe('前台程序用的方法库', function () {
        describe('isObjEmpty 方法的测试', function () {
            it('空对象的验证', function () {
                expect(isObjEmpty({})).is.true;
                expect(isObjEmpty(null)).is.true;
                expect(isObjEmpty([1])).is.false;
                expect(isObjEmpty([])).is.true;
                expect(isObjEmpty(1)).is.true;
                expect(isObjEmpty({
                    name: 'yanle'
                })).is.false;
            });
        });

        describe('获取文件大小信息', function () {
            it('1024 * 10', function () {

            });
        })
    })
};