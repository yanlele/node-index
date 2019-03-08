var fs = require('fs');
var path = require('path');

/**
 * 将路径层次映射为对象结构
 *
 * @param dirName 当前路径名，若为根路径则输入‘’（空字符串）
 * @param dirPath 当前路径
 * @param obj 需要被映射的对象
 */
var dirParser = function(dirName,dirPath,obj,options){
    var _fullName =path.join(dirPath,dirName);
    var _isDir = fs.statSync(_fullName).isDirectory();

    //根目录命名为__rootPath
    if(dirName === ''){
        dirName = '__rootPath';
    }

    if(_isDir){
        //检查目录名是否在屏蔽名单上
        for(var k = 0 ; k < options.dirBlackList.length ; k++){
            if(dirName === options.dirBlackList[k]){
                return;
            }
        }
        //递归子目录
        var files = fs.readdirSync(_fullName);
        obj[dirName] = {};
        for (var i = 0 ; i < files.length ; i++){
            dirParser(files[i],_fullName,obj[dirName],options);
        }
    }else{
        //存储文件信息
        var _fileName;
        //检查文件后缀名
        for (var j = 0 ; j < options.ext.length ; j++){
            if(path.extname(dirName) === options.ext[j]){
                //检查文件名是否在屏蔽名单上
                for(var l = 0 ; l < options.fileBlackList.length ; l++){
                    if(dirName === options.fileBlackList[l]){
                        return;
                    }
                }
                //去处文件后缀名
                _fileName = path.basename(dirName,(options.ext[j]));

                var _fileNametag = _fileName + '__fileNameTag';
                obj[_fileNametag] = {
                    fileName : '',
                    filePath : ''
                };
                obj[_fileNametag].fileName = _fileName;
                obj[_fileNametag].filePath = _fullName;
            }
        }
    }
};

module.exports = dirParser;
