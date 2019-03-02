/**
 * create by yanle
 * create time 2019/3/2 3:06 PM
 */

let S = 0;
let mul = 1;
let n = 10;
for (let i = 1; i <= n; i++) {
    mul = mul + i;
    S = S + 1 / mul;
}

console.log(S);