function add(a,b){
    return a+b;
}
function sub(a,b){
    return a-b;
}
let a1 = add.apply(sub,[4,2]);　　//sub调用add的方法
let a2 = sub.apply(add,[4,2]);
console.log(a1);  //6
console.log(a2);  //2

/*call的用法*/
let a3 = add.call(sub,4,2);
console.log(a3)
