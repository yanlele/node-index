let arr = [1, 2, 5, 4, 6, 7, 11, 14, 16];

let target = 6;
let result = new Set();
let len = arr.length;
for (let i = 0; i < len - 1; i++) {
    for (let j = 0; j < len - 1 - i; j++) {
        if (arr[i] + arr[j] === 6) {
            result.add({
                i: arr[i],
                j: arr[j]
            })
        }
    }
}

for (value of result) {
    console.log(value);
}