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
});
var Comment = mongoose.model('comment', commentSchema);

exports.User = User;
exports.Post = Post;
exports.Comment = Comment;
