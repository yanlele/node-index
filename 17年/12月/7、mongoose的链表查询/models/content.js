const mongoose =require('mongoose')
let contentSchema=new mongoose.Schema({
    content:String,
    createDate:String,
    userid: {type: mongoose.Schema.Types.ObjectId, ref: 'user'}
});

//保存方法：save
contentSchema.pre('save',function(next){
    console.log('content 保存成功');
    next();
});

contentSchema.statics={

    //链表查询
    fetch:function(cb){
        return this.find({}).populate('userid').sort({createDate:-1}).limit(100).exec(cb);

    },
    findById:function(id,cb){
        return this.findOne({id:id})
    }
};

const Content=mongoose.model('content',contentSchema);
module.exports=Content;
