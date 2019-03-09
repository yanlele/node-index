const rd = require('./index');
const path = require('path');

console.log(path.resolve(__dirname, '../../'));
const dirPath = path.resolve(__dirname, '../../');
// 异步遍历目录下的所有文件
rd.each(dirPath, function (f, s, next) {
    // 每找到一个文件都会调用一次此函数
    // 参数s是通过 fs.stat() 获取到的文件属性值
    console.log('file: %s', f);
    // 必须调用next()才能继续
    next();
}, function (err) {
    if (err) throw err;
    // 完成
});
