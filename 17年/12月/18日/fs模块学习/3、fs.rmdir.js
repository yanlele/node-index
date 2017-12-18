//删除目录
var fs = require('fs');
//注：当前删除目录操作，只能删除空目录
//如果目录总有文件，抛出异常 { [Error: ENOTEMPTY, rmdir 'f:\test1'] errno: -4051, code: 'ENOTEMPTY', path: 'f:\\test1' }
fs.rmdir('../mkdir', function(err) {
    if (err) {
        console.log('删除空目录失败，可能原因：1、目录不存在，2、目录不为空')
        return console.error(err);
    }
    console.log('删除目录成功');
});