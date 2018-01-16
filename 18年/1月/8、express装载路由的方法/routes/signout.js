const express=require('express');
const router=express.Router();

const checkLogin=require('../../middleWares/check').checkLogin;

/*登出功能*/
router.get('/',checkLogin,function(req,res,next){
    req.session.user=null;
    req.flash('success','登出成功');
    res.redirect('/posts')
});

module.exports=router;