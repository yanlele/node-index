const fs=require('fs');
const path=require('path')
const request=require('request');

var movieDir = __dirname + '/movies',
    exts = ['.mkv', '.avi', '.mp4', '.rm', '.rmvb', '.wmv'];

//读取文件列表
var readFiles=function(){
    return new Promise((resolve,reject)=>{
        fs.readdir(movieDir,function(err,files){
            resolve(files.filter((v)=>{
                exts.includes(path.parse(v).ext);
            }))
        })
    })
};

//获取海报
var getPoster=function(movieName){
    let url = `https://api.douban.com/v2/movie/search?q=${encodeURI(movieName)}`;
    return new Promise((resolve,reject)=>{
        request({
            url:url,
            json:true
        },function(error,response,body){
            if(error){
                return reject(error)
            }
            resolve(body.subjects[0].images.large);
        })
    })
};

//保存海报
var savePoster=function(movieName,url){
    request.get(url).pipe(fs.createWriteStream(path.join(movieDir,movieName+'.jpg')))
};

(async ()=>{
    for(var file of files){
        let name=path.parse(file).name;
        console.log(`正在获取【${name}】的海报`);
        savePoster(name,await getPoster(name))
    }
})();