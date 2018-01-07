/*
 (function (x) {
 delete x;
 console.log(x);
 return x
 })(1)*/


/*var foo={
 bar:function(){
 return this.baz;
 },
 baz:1
 };

 console.log(foo.bar())*/

/*
 (function(){
 console.log(typeof arguments[0]());
 return typeof arguments[0]();
 })(foo.bar);*/

// console.log(2==[[[2]]])

/*
 var f = (function f() {
 console.log('1')
 return '1'
 }, function g() {
 console.log(2)
 return 2
 })();*/

var x = [typeof x, typeof y][1];
console.log(typeof typeof  x);
