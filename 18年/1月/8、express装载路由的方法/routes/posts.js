const express=require('express');
const router=express.Router();

const checkLogin=require('../../middleWares/check').checkLogin;
const PostModel=require('../models/posts');
const CommentModel=require('../models/comments');

router.get('/',function(req,res,next){
   const author=req.query.author;
   PostModel.getPosts(author).then((posts)=>{
       res.render('posts',{
           posts:posts
       })
   }).catch(next)
});

/*发表一篇文章*/
router.post('/create',checkLogin,function(req,res,next){
    const author=req.session.user._id;
    const title=req.fields.title;
    const content=req.fields.content;

    //检验参数
    try {
        if (!title.length) {
            throw new Error('请填写标题')
        }
        if (!content.length) {
            throw new Error('请填写内容')
        }
    } catch (e) {
        req.flash('error', e.message)
        return res.redirect('back')
    }

    let post={
        author:author,
        title:title,
        content:content,
        pv:0
    }

    //存入数据库
    PostModel.create(post).then((result)=>{
        //此 post 是插入mongodb 后的值，包含了_id
        post=result.ops[0];
        req.flash('success','发送成功');
        res.redirect(`/posts/${post._id}`)
    }).catch(next)
});

/*发表文章页面*/
router.get('/create',checkLogin,function(req,res,next){
    res.render('create')
});

/*单独一篇文章页面
* /posts/:postId
* */
router.get('/:postId',function(req,res,next){
    const postId=req.params.postId;

    Promise.all([
        PostModel.getPostById(postId),//获取文章信息
        CommentModel.getComments(postId),
        PostModel.incPv(postId)       //pv+1
    ]).then((result)=>{
        const post=result[0];
        const comments=result[1];
        if(!post){
            throw new Error('该文章不存在')
        }

        res.render('post',{
            post:post,
            comments:comments
        })
    }).catch(next);
});

/*更新文章页面*/
router.get('/:postId/edit',checkLogin,function(req,res,next){
    const postId=req.params.postId;
    const author=req.session.user._id;

    PostModel.getRawPostById(postId).then((post)=>{
        if(!post){
            throw new Error('文章不存在')
        }
        if(author.toString()!==post.author._id.toString()){
            throw new Error('权限不足')
        }

        res.render('edit',{
            post:post
        })
    }).catch(next)
});

/*更新一篇文章功能*/
router.post('/:postId/edit',checkLogin,function(req,res,next){
    const postId=req.params.postId;
    const author=req.session.user._id;
    const title=req.fields.title;
    const content=req.fields.content;

    // 校验参数
    try {
        if (!title.length) {
            throw new Error('请填写标题')
        }
        if (!content.length) {
            throw new Error('请填写内容')
        }
    } catch (e) {
        req.flash('error', e.message)
        return res.redirect('back')
    }

    //获取文章
    PostModel.getRawPostById(postId).then((post)=>{
        if(!post){
            throw new Error('文章不存在')
        }
        if(author.toString()!==post.author._id.toString()){
            throw new Error('权限不足')
        }
        PostModel.updatePostById(postId,{title:title,content:content}).then(()=>{
            req.flash('success','编辑文章成功');
            res.redirect(`/posts/${postId}`)
        })
    }).catch(next)
});

/*删除一篇文章*/
router.get('/:postId/remove',checkLogin,function(req,res,next){
    const postId=req.params.postId;
    const author=req.session.user._id;

    PostModel.getRawPostById(postId).then((post)=>{
        if(!post){
            throw new Error('文章不存在')
        }
        if(post.author._id.toString()!==author.toString()){
            throw new Error('没有权限')
        }

        PostModel.delPostById(postId).then(()=>{
            req.flash('success','删除文章成功');
            res.redirect('/posts')
        })
    }).catch(next)
});

module.exports=router;

