# Mongoose Populate 基本使用

### 基本语法
    语法：Query.populate(path, [select], [model], [match], [options])
    参数 Option：
    path
    类型：String或Object。
    String类型的时， 指定要填充的关联字段，要填充多个关联字段可以以空格分隔。
    Object类型的时，就是把 populate 的参数封装到一个对象里。当然也可以是个数组。下面的例子中将会实现。
    
    select
    类型：Object或String，可选，指定填充 document 中的哪些字段。
    Object类型的时，格式如: {name: 1, _id: 0}，为0表示不填充，为1时表示填充。
    String类型的时，格式如: “name -_id”，用空格分隔字段，在字段名前加上-表示不填充。详细语法介绍 query-select
    尝试中发现 select 默认会填充 _id。
    model
    类型：Model，可选，指定关联字段的 model，如果没有指定就会使用Schema的ref。
    
    match
    类型：Object，可选，指定附加的查询条件。
    options
    类型：Object，可选，指定附加的其他查询选项，如排序以及条数限制等等。


### 使用方法
-  建立数据模型:
```javascript
var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
mongoose.connect('mongodb://localhost/population');

var Schema = mongoose.Schema;
var userSchema = new Schema({
    name: String,
    age: Number,
    posts: [{type: Schema.Types.ObjectId, ref: 'post'}],
    comments: [{type: Schema.Types.ObjectId, ref: 'comment'}]
});
var User = mongoose.model('user', userSchema);

var postSchema = new Schema({
    title: String,
    content: String,
    author: {type: Schema.Types.ObjectId, ref: 'user'},
    comments: [{type: Schema.Types.ObjectId, ref: 'comment'}]
});
var Post = mongoose.model('post', postSchema);

var commentSchema = new Schema({
    content: String,
    author: {type: Schema.Types.ObjectId, ref: 'user'}
})
var Comment = mongoose.model('comment', commentSchema);

exports.User = User;
exports.Post = Post;
exports.Comment = Comment;

ref 对应的应该是在connection中注册过的model。
var User = mongoose.model('user', userSchema);
...
author: {type: Schema.Types.ObjectId, ref: 'user'}
// 这里的 ref: 'user' 是第一行的 mongoose.model('user', userSchema) 第一个参数。
```
- 插入数据：
```javascript
var User = require('./model').User;
var Post = require('./model').Post;
var Comment = require('./model').Comment;

var tom = new User({name: 'Tom', age: 19});
var test = new Post({title: 'test', content: 'wakaka'});
var walala = new Comment({content: 'walala'});

tom.save().then(function(user) {
    test.author = user;
    walala.author = user;
    return Promise.all([test.save(), walala.save(), user]);
}).spread(function(post, comment, user) {
    user.posts.push(post);
    user.comments.push(comment);
    post.comments.push(comment);
    return Promise.all([user.save(), post.save()]);
}).spread(function() {
    console.log('success');
}).catch(function(reason) {
    console.log(reason);
});
```

- 插入数据结果：
```
> db.users.find().pretty()
{
    "_id" : ObjectId("584a030733604a156a4f65ff"),
    "name" : "Tom",
    "age" : 19,
    "comments" : [
    ObjectId("584a030733604a156a4f6601")
],
    "posts" : [
    ObjectId("584a030733604a156a4f6600")
],
    "__v" : 1
}

> db.posts.find().pretty()
{
    "_id" : ObjectId("584a030733604a156a4f6600"),
    "author" : ObjectId("584a030733604a156a4f65ff"),
    "title" : "test",
    "content" : "wakaka",
    "comments" : [
    ObjectId("584a030733604a156a4f6601")
],
    "__v" : 1
}

> db.comments.find().pretty()
{
    "_id" : ObjectId("584a030733604a156a4f6601"),
    "author" : ObjectId("584a030733604a156a4f65ff"),
    "content" : "walala",
    "__v" : 0
}
}
```

- Populate 填充单个字段
```javascript
Comment.findOne({'content': 'walala'}).populate({path:'author', select: 'name'})
    .exec().then(function(user) {
    console.log(user);
}).catch(function(reason) {
    console.log(reason);
});

//结果：
{ 
    _id: '584a030733604a156a4f6601',
    author: { _id: '584a030733604a156a4f65ff', name: 'Tom' },
    content: 'walala',
    __v: '0' 
}
```

- populate  填充多个字段
```javascript
// 若是用字符串填写，select 同时作用于两个字段，即 author 和 comments 都会填充 name age content，若该字段没有这些数据，则不填充。
Post.findOne({'title': 'test'}).populate('author comments', 'name age content -_id').exec()
    .then(function (post) {
        console.log(post);
    }).catch(function (reason) {
    console.log(reason);
});

// 数组形式可以单独对某一字段用 select 选择要填充的数据。
Post.findOne({'title': 'test'}).populate([{path: 'author', select: 'name age -_id'}, {
    path: 'comments',
    select: 'content -_id'
}]).exec()
    .then(function (post) {
        console.log(post);
    }).catch(function (reason) {
    console.log(reason);
});

//结果如下：
{ 
    _id: '584a030733604a156a4f6600',
    author: { name: 'Tom', age: 19 },
    title: 'test',
        content: 'wakaka',
    __v: 1,
    comments: [ { content: 'walala' } ] 
}
```

- 第一个示例：
```javascript
var mongoose=require('mongoose');
var MicroblogSchema=new mongoose.Schema({
    connect:String,
    createDate:String,
    userid: {type: mongoose.Schema.Types.ObjectId, ref: 'Users'}
})
//保存方法：save
MicroblogSchema.pre('save',function(next){
    if(this.isNew){
       // console.log('11111');
    }
    next();
})

MicroblogSchema.statics={
    //链表查询
    fetch:function(cb){
        return this.find({}).populate('userid').sort({createDate:-1}).limit(100).exec(cb);

    },
    findById:function(id,cb){
        return this.findOne({id:id})
    }
}
module.exports=MicroblogSchema;
```
使用：
```javascript
var mongoose=require('mongoose');
var MicroblogSchema=require('../schemas/microblog');
var Microblog=mongoose.model('Microblog',MicroblogSchema);

module.exports=Microblog;
```

- 终极解决实例代码 : 请见本项目demo！
