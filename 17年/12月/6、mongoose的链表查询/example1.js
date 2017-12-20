Comment.findOne({'content': 'walala'}).populate({path:'author', select: 'name'})
    .exec().then(function(user) {
    console.log(user);
}).catch(function(reason) {
    console.log(reason);
});

//result
/*
{ _id: 584a030733604a156a4f6601,
    author: { _id: 584a030733604a156a4f65ff, name: 'Tom' },
    content: 'walala',
        __v: 0
}*/
