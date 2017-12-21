const express = require('express');
const router = express.Router();
const multer = require('multer');
const result = require('../util/result');

let storage = multer.diskStorage({
    //设置上传后文件路径，uploads文件夹会自动创建。
    destination: function (req, file, cb) {
        cb(null, './uploads')
    },
    //给上传文件重命名，获取添加后缀名
    filename: function (req, file, cb) {
        let fileFormat = (file.originalname).split(".");
        let filename = file.fieldname + '-' + Date.now() + "." + fileFormat[fileFormat.length - 1]
        cb(null, filename);
    }
});
let upload = multer({
    storage: storage
});

router.get('/', (req, res) => {
    res.render('index');
});


//提交数据
//这个地方的upload.single('XXXX'),XXX是对应的前端input框，上传文件的name
router.post('/', upload.single('avatar'), (req, res) => {
    console.log(req.file);

    //如果文件上传成功，获取文件的名字存入数据库
    if (req.file) {
        let file=req.file;
        let fileFormat = (file.originalname).split(".");
        let filename = file.fieldname + '-' + Date.now() + "." + fileFormat[fileFormat.length - 1];
        console.log(filename);

        res.status(200).json(result(0,'上传文件成功'),{
            filename:filename
        })
    }
});

module.exports = router;