console.log('我需要开一个会议，希望邀请小伙伴儿来参加会议');
let arr = ['许海峰', '杜鹏', '郭涛'];
console.log('我打算邀请的小伙伴儿是： ' + arr);
console.log('我现在得知信息，许海峰不能参加这个会议了，我需要另外邀请一位小伙伴儿');
let removeName = '许海峰';
arr = arr.filter(function(item, index) {
    return item !== removeName
});
arr.push('王大叔');
console.log('这个时候我们的会有有如下参与者', arr);
console.log('这个时候我们希望扩大会议了');
arr.unshift('王大喵');
arr.splice(Math.floor(arr.length/2), 0, '胡大胖');
arr.push('敖厂长');
console.log('这个时候我们有如下的会议参与者了', arr);
console.log('----------------');
console.log('因为一些原因需要缩减邀请名单了, 是能有两位同学参加会议');
while (arr.length >2) {
    console.log('不能参加会议的有：', arr.pop())
}

arr.forEach((item,index)=>{
    console.log('能参加会议的有：', item)
});

console.log('会议结束了，这个时候要散场了');
arr = [];
console.log('看看名单上是否还有小伙伴儿，', arr);


// let arr = ['许海峰', '杜鹏', '郭涛'];
// let result = arr.find((item) => {
//     return item.length === 3
// });
// console.log(result);
