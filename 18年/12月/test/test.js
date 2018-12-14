let a = [
    {
        a: 1,
        b: 2
    }
];
let b = a.slice(0);
b[0].a = 2;


console.log(a[0].a);


console.log(a == b);

console.log('1' == 1);