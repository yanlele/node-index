var fs = require('fs');
var path = require('path');
var file1 = path.resolve('test2.txt');
//监视文件
//1.当第一次创建监视器的时候，如果文件不存在，监视器毁掉函数会触发一次
fs.watchFile(file1, {
    interval: 20
}, function (curr, prev) {
    if (Date.parse(prev.ctime) === 0) {
        console.log('文件被创建');
    } else if (Date.parse(curr.ctime) === 0) {
        console.log('文件被删除');
    } else if (Date.parse(curr.mtime) !== Date.parse(prev.mtime)) {
        console.log('文件有修改');
    }
});
var file2 = path.resolve('test3.txt');
fs.watchFile(file2, function (curr, prev) {
    console.log('这是第二个watch，监视文件有修改');
});