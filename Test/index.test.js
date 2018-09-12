const expect = require('chai').expect;
let My = require('./sqrt');

describe('sqrt', function () {
    it('4的平方根等于2', function () {
        expect(My.sqrt(4)).to.equal(2)
    });
    it('参数为负值时应该报错', function () {
        expect(function() {
            My.sqrt(-1)
        }).to.throw('负值没有平方根')
    });
});