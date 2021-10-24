function createBook(name, time, type) {
    let o  = new Object();
    o.name = name;
    o.time = time;
    o.type = type;
    o.getName = function() {
        console.log(this.name);
    };
    return o;
}

let book1 = createBook('js book', 2018, 'js');
let book2 = createBook('css book', 2017, 'css');

book1.getName();
book2.getName();