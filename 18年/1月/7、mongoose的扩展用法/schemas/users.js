//users：用户模式文件
var mongoose=require('mongoose');
var UsersSchema=new mongoose.Schema({
    username:{unique:true, type:String},
    password:String,
    name:String,
    createDate:String,
    headPicture:String,
    random:String
})
//保存方法：save
UsersSchema.pre('save',function(next){
    if(this.isNew){

    }
   // console.log('11111');
    next();
})

UsersSchema.statics={
    fetch:function(cb){
        return this.find({}).exec(cb);

    },
    findById:function(id,cb){
        return this.findOne({id:id})
    }
}

module.exports=UsersSchema;