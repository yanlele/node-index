//初始化一个长度为10的buffer
console.log(Buffer.alloc(10));
console.log(Buffer.alloc(20));

//初始化一个长度为5的buffer，同时都填充为1
console.log(Buffer.alloc(5, 1));
console.log(Buffer.allocUnsafe(5,1));//这个是随机的，并没有达到初始化的目的，最好不要用

//通过bugger.from来创建buffuer
console.log(Buffer.from([1,2,3]));
console.log(Buffer.from('test'));
console.log(Buffer.from('test','base64'));



