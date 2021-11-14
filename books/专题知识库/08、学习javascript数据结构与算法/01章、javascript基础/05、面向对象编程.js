//方式1
// let obj = new Object({});


//方式2
// let obj = {};
// obj = {
//     name: {
//         first: 'Gandalf',
//         last: 'the Grey'
//     },
//     address: 'Middle Earth'
// };



//方式3
function Book(title,pages, isbn) {
    this.title = title;
    this.pages = pages;
    this.isbn = isbn;
}
let book =new Book('title', 'page', 'isbn');
console.log(book.title); //输出书名
book.title = 'new title'; //修改书名
console.log(book.title); //输出新的书名
//使用原型扩展
Book.prototype.printTitle = function() {
    console.log(this.title)
};
console.log(book);
console.log(book.__proto__);


