//把不变化的分离出来：所有动物都会发生
let makeSound = function(animal) {
    animal.sound();
};

let dog = function(){

};
dog.prototype.sound = function() {
    console.log('汪汪汪')
};

let duck = function(){

};
duck.prototype.sound = function(){
    console.log('嘎嘎嘎')
};

makeSound(new dog());
makeSound(new duck());