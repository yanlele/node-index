const assert = require('assert');
describe('Array', function() {
    describe('#indexOf()', function() {
        before(function () {
            console.log('before')
        });

        beforeEach(function() {
            console.log('beforeEach')
        });

        it('should return -1 when the value is not present', function() {
            assert.equal(-1, [1, 2, 3].indexOf(4));
            console.log('it');
        });

        it('just is a console.log', function () {
            console.log('123');
        });

        afterEach(function () {
            console.log('afterEach')
        });

        after(function () {
            console.log('after')
        });
    })
});