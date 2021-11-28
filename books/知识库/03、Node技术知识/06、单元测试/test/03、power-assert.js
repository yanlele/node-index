const assert=require('power-assert');
const {add,mul}=require('../01、math');

describe('#test',function(){
    describe('add',()=>{
        it('should return 5 when 2+3', function (done) {
            done(assert(add(2,3))===5);
        });

        it('should return -1 when 2-3', function (done) {
            let a=2,b=-3;

            done(assert(add(a,b))===-1);
        });
    });

    describe('mul',()=>{
        it('should return 6 when 2*3', function () {
            assert.equal(mul(2,3), 6)
        });
    })
});