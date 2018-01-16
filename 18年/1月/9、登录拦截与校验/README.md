# 登录拦截与校验

### 1、定义登录拦截的公用方法               
check.js
```javascript
    module.exports = {
        checkLogin: function checkLogin (req, res, next) {
            if (!req.session.user) {
                req.flash('error', '未登录')
                return res.redirect('/signin')
            }
            next()
        },
    
        checkNotLogin: function checkNotLogin (req, res, next) {
            if (req.session.user) {
                req.flash('error', '已登录')
                return res.redirect('back')// 返回之前的页面
            }
            next()
        }
    }
```

### 2、使用
```javascript
    const checkLogin = require('./check').checkLogin;
    
    /*创建一条留言*/
    router.post('/', checkLogin, function (req, res, next) {
        const author = req.session.user._id;
        const postId = req.fields.postId;
        const content = req.fields.content;
    
        // 校验参数
        try {
            if (!content.length) {
                throw new Error('请填写留言内容')
            }
        } catch (e) {
            req.flash('error', e.message)
            return res.redirect('back')
        }
    
        const comment = {
            author: author,
            postId: postId,
            content: content
        }
    
        //数据入库
        CommentModel.create(comment)
            .then(() => {
                req.flash('success', '留言成功');
                //留言成功调回上一页
                res.redirect('back')
            })
            .catch(next)
    });
    
    /*删除留言*/
    router.get('/:commentId/remove', checkLogin, function (req, res, next) {
        const commentId = req.params.commentId;
        const author = req.session.user._id;
    
        CommentModel.getCommentById(commentId)
            .then((comment) => {
                if (!comment) {
                    throw new Error('留言不存在')
                }
                if(comment.author.toString()!==author.toString()){
                    throw new Error('没有权限删除留言')
                }
    
                CommentModel.delCommentById(commentId).then(()=>{
                    req.flash('success','删除留言成功');
                    res.redirect('back')
                }).catch(next)
            })
    });
```