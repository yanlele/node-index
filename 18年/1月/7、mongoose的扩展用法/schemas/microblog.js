/**
 * Created by Administrator on 2015/12/13.
 */
//微博内容：微博内容模式文件
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