/**
 * create by yanle
 * create time 2019/1/23 2:17 PM
 */

const expect = require('chai').expect;

describe('#main', function () {
    it('must be array', function () {
        expect([1, 2, 3]).to.be.an.instanceof(Array);
    });
    it('should array length equal 3', function () {
        expect([1,2,3]).length.eq(4);
    })
});