// 若是用字符串填写，select 同时作用于两个字段，即 author 和 comments 都会填充 name age content，若该字段没有这些数据，则不填充。
Post.findOne({'title': 'test'}).populate('author comments', 'name age content -_id').exec()
    .then(function (post) {
        console.log(post);
    }).catch(function (reason) {
    console.log(reason);
});

// 数组形式可以单独对某一字段用 select 选择要填充的数据。
Post.findOne({'title': 'test'}).populate([{path: 'author', select: 'name age -_id'}, {
    path: 'comments',
    select: 'content -_id'
}]).exec()
    .then(function (post) {
        console.log(post);
    }).catch(function (reason) {
    console.log(reason);
});

//result
/*
{
    _id: 584a030733604a156a4f6600,
    author: { name: 'Tom', age: 19 },
    title: 'test',
        content: 'wakaka',
    __v: 1,
    comments: [ { content: 'walala' } ]
}*/
