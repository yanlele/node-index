function Parent(){
    this.name='abc';
    this.address={home:'home'}
}
function Child(){
    Parent.call(this);
    this.language='java'
}

let parent = new Parent();
let child = new Child();

console.log(parent);
console.log(child);

console.log('=======================');

child.name = '123';
console.log(parent);
console.log(child);