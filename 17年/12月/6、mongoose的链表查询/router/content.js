const express = require('express');
const router = express.Router();
const result = require('../util/uitl');
const Content=require('../models/Content');

router.post('/save',(req,res)=>{
    const {content,createDate,userid} =req.body;
    const data=new Content({
        content,createDate,userid
    });

    data.save((err,doc)=>{
        if(err){
            res.json(result(1,'保存失败'))
        }else{
            res.json(result(0,'保存成功',doc))
        }
    })
});

router.get('/',(req,res)=>{
    res.json(result(0,'返回信息content'))
});

router.get('/list',(req,res)=>{
    Content.find({}).populate('userid').exec((err,data)=>{
        res.json(result(0,'返回成功',data))
    })
})

module.exports=router;

