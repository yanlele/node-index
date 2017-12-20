const express = require('express');
const router = express.Router();
const result = require('../util/uitl');
const User = require('../models/user');

//信息过滤辅助函数
const _filter={
    password:0,
    _id:0,
    __v:0
};

router.get('/', (req, res) => {
    res.status(200).json(result(0, '成功', {
        name: 'yanle',
        age: 25
    }))
});

router.post('/save', (req, res) => {
    const {username, password, name, createDate, headPicture, random} = req.body;
    const user = new User({username, password, name, createDate, headPicture, random});
    user.save((err, doc) => {
       if(err){
           res.json(result(1,'用户名username重复'))
       }else{
           const {username,name,createDate}=doc;
           res.status(200).json(result(0,'返回成功',{
               username,name,createDate
           }))
       }
    })
});


router.get('/list',(req,res)=>{
    User.fetch((err,doc)=>{
        if(err){
            res.json(result(1,'系统错误'))
        }else{
            res.json(result(0,'返回成功',doc))
        }
    })
});

module.exports = router;