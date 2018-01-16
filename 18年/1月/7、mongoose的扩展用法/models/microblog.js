/**
 * Created by Administrator on 2015/12/13.
 */
var mongoose=require('mongoose');
var MicroblogSchema=require('../schemas/microblog');
var Microblog=mongoose.model('Microblog',MicroblogSchema);

module.exports=Microblog;