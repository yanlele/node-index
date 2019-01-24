/**
 * create by yanle
 * create time 2019/1/23 4:48 PM
 */

const expect = require('chai').expect;
describe('异步 beforeEach 示例', function() {
    var foo = false;

    before(function(done) {
        setTimeout(function() {
            foo = true;
            done();
        }, 50);
    });

    it('全局变量异步修改应该成功', function() {
        expect(foo).to.be.equal(true);
    });
});