const sha1=require('sha1');
const express=require('express');
const router=express.Router();

const UserModel=require('../models/users');
const checkNotLogin=require('../../middleWares/check').checkNotLogin;

/*登录页*/
router.get('/',checkNotLogin,function(req,res,next){
   res.render('signin');
});

/*用户登录*/
router.post('/',checkNotLogin,function(req,res,next){
    const name=req.fields.name;
    const password=req.fields.password;

    //校验参数
    // 校验参数
    try {
        if (!name.length) {
            throw new Error('请填写用户名')
        }
        if (!password.length) {
            throw new Error('请填写密码')
        }
    } catch (e) {
        req.flash('error', e.message)
        return res.redirect('back')
    }

    //读取数据库
    UserModel.getUserByName(name).then((user)=>{
        if(!user){
            req.flash('error','用户不存在');
            return res.redirect('back')
        }

        //检测密码是否匹配
        if(sha1(password)!==user.password){
            req.flash('error','用户名或者密码错误');
            return res.redirect('back')
        }

        req.flash('success','登录成功')
        //写入session
        delete user.password;
        req.session.user=user;
        //跳转到主页
        res.redirect('/posts')
    }).catch(next)
});

module.exports=router;