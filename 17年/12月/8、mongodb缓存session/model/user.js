const mongoose=require('mongoose');

let userSchema=new mongoose.Schema({
    name:{
        type:String
    },
    age:Number,
    address:String
});

userSchema.pre('save',function(next){
    console.log('保存成功');
    next()
});

userSchema.statics={

};

module.exports=mongoose.model('user',userSchema);