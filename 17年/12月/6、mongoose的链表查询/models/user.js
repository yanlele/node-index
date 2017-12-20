const mongoose=require('mongoose');

let UsersSchema=new mongoose.Schema({
    username:{unique:true, type:String},
    password:String,
    name:String,
    createDate:String,
    headPicture:String,
    random:String
});

//保存方法：save
UsersSchema.pre('save',function(next){
    console.log('执行了save');
    next();
});

UsersSchema.statics={
    fetch:function(cb){
        return this.find({}).exec(cb);

    },
    findById:function(id,cb){
        return this.findOne({id:id})
    }
};

const User=mongoose.model('user',UsersSchema);
module.exports=User;