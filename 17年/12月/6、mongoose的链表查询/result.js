> db.users.find().pretty()
{
    "_id" : ObjectId("584a030733604a156a4f65ff"),
    "name" : "Tom",
    "age" : 19,
    "comments" : [
    ObjectId("584a030733604a156a4f6601")
],
    "posts" : [
    ObjectId("584a030733604a156a4f6600")
],
    "__v" : 1
}
> db.posts.find().pretty()
{
    "_id" : ObjectId("584a030733604a156a4f6600"),
    "author" : ObjectId("584a030733604a156a4f65ff"),
    "title" : "test",
    "content" : "wakaka",
    "comments" : [
    ObjectId("584a030733604a156a4f6601")
],
    "__v" : 1
}
> db.comments.find().pretty()
{
    "_id" : ObjectId("584a030733604a156a4f6601"),
    "author" : ObjectId("584a030733604a156a4f65ff"),
    "content" : "walala",
    "__v" : 0
}