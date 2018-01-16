# mongoose 的扩展用法

### 1、定义schemas
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
    
        }
       // console.log('11111');
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

### 2、装载到models

```javascript
    var mongoose=require('mongoose');
    var MicroblogSchema=require('../schemas/microblog');
    var Microblog=mongoose.model('Microblog',MicroblogSchema);
    
    module.exports=Microblog;
```

### 3、在service中使用
```javascript
    Microblog.fetch(function (err, microblogs) {
            if (err) {
                console.log(err)
                return;
            }
    
            Users.count(function (err, result) {
                if (err) {
                    console.log(err)
                    return;
                }
                req.num = result;
                req.microblogs = microblogs;
                res.render('index', req);
            });
        })
```

### 总结
通过schemas对象的pre()方法和statics对象可以对schemas进行扩展