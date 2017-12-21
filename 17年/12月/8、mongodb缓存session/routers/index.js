const express=require('express');
const router=express.Router();

const User=require('../model/user');
const result=require('../util/result');


router.get('/',(req,res)=>{
    // const data={name,age}=req.query;
    const {name,age,address}=req.query;
    const data={name,age,address};

    const userMessage=new User({...data,content:'内容'});

    // console.log(req.session.user);
    // res.status(200).json(result(0,'返回成功',req.session.user));

    userMessage.save((err,doc)=>{
        if(err){
            res.status(200).json(result(1,'没有用户名信息',data))
        }else{
            req.session.user=userMessage;
            res.status(200).json(result(0,'返回成功',data))
        }
    });
});

module.exports=router;