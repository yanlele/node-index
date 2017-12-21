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