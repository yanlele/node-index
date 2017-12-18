//关于上传文件的模块测试
const path=require('path');
const express=require('express');
const formidable=require('express-formidable');

var app = express();

//设置静态资源目录
app.use(express.static(path.join(__dirname,'public')));


app.use(formidable({
    uploadDir:path.join(__dirname,'public/img'),
    keepExtensions:true
}));

app.get('/',function(req,res,next){

    res.render('index.html')
});


app.post('/upload', (req, res) => {
    const files=  req.fields; // contains non-file fields
    console.log(files);
    res.json({
        message:'成功！'
    })
});

app.listen(8081,function(){
    console.log('服务已经启动')
});