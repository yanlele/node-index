function Animal(name){
    this.name = name;
    this.showName = function(){
        console.log(this.name);
    }
}

function Cat(name){
    Animal.apply(this,[name]);
}

let cat = new Cat("咕咕");
cat.showName();

/*call的用法*/
Animal.call(this,name);