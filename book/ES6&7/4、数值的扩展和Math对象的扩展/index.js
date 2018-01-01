let obj = { foo: 123 };
let descriptor= Object.getOwnPropertyDescriptor(obj, 'foo');


console.log(descriptor);