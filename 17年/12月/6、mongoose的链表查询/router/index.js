const express=require('express');
const router=express.Router();
const result=require('../util/uitl');

router.get('/',(req,res)=>{
    res.status(200).json(result(0,'返回成功',{
        page:'index'
    }))
});

module.exports=router;
