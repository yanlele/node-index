const expect = require('chai').expect;
const {isObjEmpty,
    getSizeInfo,
    formatPrice,
    formatDate,
    splitPrice,
    recombinePrice,
    dateFormat
} = require('../../18年/6月/06、基础公用方法库/01、前端层面/index.js');
const {time} = require('../mockData/index.mock');

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

        describe('getSizeInfo：获取文件大小信息', function () {
            it('1024 * 10', function () {
                expect(getSizeInfo(1024 * 100)).is.equal('100KB')
            });
            it('0直接返回0KB', function () {
                expect(getSizeInfo(0)).is.equal('0KB')
            });
        });

        describe('格式化价格formatPrice', function () {
            it('100可以得到多少呢', function () {
                expect(formatPrice(100.2)).is.equal('100.20');
            });
            it('50可以得到多少', function () {
                expect(formatPrice(50)).is.equal('50.00')
            });
        });

        describe('测试时间函数formatDate', function () {
            it('随机给一个时间试试看看呢', function () {
                expect(formatDate(time, dateFormat)).to.a('string');
            });
            it('时间对象是一个string 或者 number', function () {
                expect(formatDate(time.getTime(), dateFormat)).is.a('string');
                expect(formatDate(time.getTime().toString(), dateFormat)).is.a('string');
            });
            it("如果传入的是一个'', 返回 - ", function () {
                expect(formatDate('', dateFormat)).is.equal('-');
                expect(formatDate('sdfh', dateFormat)).is.equal('Invalid date');
            });
        });

        describe('才分和重组价格问题', function () {
            it('拆分价格', function () {
                expect(splitPrice(12000)).is.eql([ 1, '万' ])
            });
            it('重组价格', function () {
                expect(recombinePrice(12, '万')).is.eql(120000)
            });
        })
    })
};