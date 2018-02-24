const {should,expect,assert}=require('chai');
const {add,mul}=require('../01、math');

describe('#math',()=>{
    describe('add',()=>{
        it('should return 5 when 2+3', function () {
            expect(add(2,3),5)
        });

        it('should return -1 when 2-3', function () {
            expect(add(2,-3),-1)
        });

/*        it.only('should return -1 when 2-3', function () {
            expect(add(2,-3),-1)
        });*/

/*        it.skip('should return -1 when 2-3', function () {
            expect(add(2,-3),-1)
        });*/
    });

    describe('mul',()=>{
        it('should return 6 when 2*3', function () {
            expect(mul(2,3),6)
        });
    })
});

describe('#test',()=>{
    describe('add',()=>{
        it( 'should return 5 when 2+3', function () {
            expect(add(2,3),5);
        });
    });

    describe('mul',()=>{
        it('should return 6 when 2*3', function () {
            expect(mul(2,3),6);
        });
    });


});