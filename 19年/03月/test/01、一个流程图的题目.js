/**
 * create by yanle
 * create time 2019/3/2 2:03 PM
 */

let n = 10;
let i = 1, a = 1, b = 1, c = 2, s = 0;

while (i < 10) {
    s += a;
    a = b;
    b = c;
    c = a + b;
    i++;
}
console.log(s);