let number = 153;

let strNum = number.toString();
let result = false;
let resultNumber = 0;
for (let i = 0; i < strNum.length; i++) {
    resultNumber += Math.pow(Number(strNum[i]), 3)
}
if(resultNumber === number) {
    console.log('是水仙花数');
} else {
    console.log('不是水仙花数');
}
