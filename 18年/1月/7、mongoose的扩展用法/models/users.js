/**
 * Created by Administrator on 2015/12/9.
 */
var mongoose=require('mongoose');
var UsersSchema=require('../schemas/users');
var Users=mongoose.model('Users',UsersSchema);
module.exports=Users;