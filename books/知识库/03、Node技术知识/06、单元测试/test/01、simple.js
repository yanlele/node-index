const {should,expect,assert}=require('chai');
const {add,mul}=require('../01、math');

/*
if(add(2,3)===5){
    console.log('add true')
}else{
    console.log('add false')
}*/

// assert.equal(add(2,3),5);

should();

add(2,3).should.equal(5);
// expect(add(2,3)).to.be(5);
assert.equal(add(2,3),5);