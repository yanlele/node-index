let FlyWeight = {
    moveX: function (x) {
        this.x = x
    },
    moveY: function (y) {
        this.y = y
    }
};

// 让人移动
let Player = function (x, y, c) {
    this.x = x;
    this.y = y;
    this.color = c
};
Player.prototype = FlyWeight;
Player.prototype.changeC = function (c) {
    this.color = c;
};

// 让精灵移动
let Spirit = function (x, y, r) {
    this.x = x;
    this.y = y;
    this.r = r;
};
Spirit.prototype = FlyWeight;
Spirit.prototype.changeR = function (r) {
    this.r = r;
};

/*使用*/
// 创建一个人
let person = new Player(5,6,'red');
console.log(person);
person.moveX(6);
person.moveY(7);
person.changeC('pink');
console.log(person);