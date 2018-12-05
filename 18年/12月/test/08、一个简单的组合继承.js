function Parent5() {
    this.name = 'parent5';
    this.play = [1, 2, 3];
}

function Child5() {
    Parent5.call(this);
    this.type = 'child5'
}

Child5.prototype = Object.create(Parent5.prototype);
//这个时候虽然隔离了，但是constructor还是只想的Parent5的，因为constructor会一直向上找
Child5.prototype.constructor=Child5;

var s7=new Child5();
console.log(s7 instanceof Child5,s7 instanceof Parent5);
console.log(s7.constructor);