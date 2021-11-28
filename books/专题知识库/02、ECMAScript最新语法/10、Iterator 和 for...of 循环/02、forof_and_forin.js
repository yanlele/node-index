/* 普通数组for of 迭代 */
console.log(`<${'='.repeat(50)} 普通数组for of 迭代 ${'='.repeat(50)}>`);
const iterable = ['mini', 'mani', 'mo'];

for (const value of iterable) {
    console.log(value);
}
console.log(`<${'='.repeat(50)} 普通数组for of 迭代 ${'='.repeat(50)}>`);


/* 普通对象只能用for in 迭代 */
console.log(`<${'='.repeat(50)}普通对象只能用for in 迭代${'='.repeat(50)}>`);
const obj = {
    name: 'yanle',
    age: 37
};

for (const item in obj) {
    console.log('item: ', item);
}
console.log(`<${'='.repeat(50)}普通对象只能用for in 迭代${'='.repeat(50)}>`);


/* 普通对象可以用 Generator 包装之后在迭代 */
console.log(`<${'='.repeat(50)} 普通对象可以用 Generator 包装之后在迭代 ${'='.repeat(50)}>`);
function* entries(obj) {
    for (let key of Object.keys(obj)) {
        yield [key, obj[key]];
    }
}
for (let [key, value] of entries(obj)) {
    console.log(key, "->", value);
}
console.log(`<${'='.repeat(50)} 普通对象可以用 Generator 包装之后在迭代 ${'='.repeat(50)}>`);
