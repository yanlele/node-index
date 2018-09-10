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
        })

        afterEach(function () {
            console.log('afterEach')
        });

        after(function () {
            console.log('after')
        });
    })
});