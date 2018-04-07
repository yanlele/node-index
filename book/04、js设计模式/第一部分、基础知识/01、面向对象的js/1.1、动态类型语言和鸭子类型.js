let duck = {
    duckSinging: function(){
        console.log('嘎嘎嘎')
    }
};

let chicken = {
    duckSinging: function() {
        console.log('嘎嘎嘎')
    }
};

let choir = [];//合唱团

let join = function(animal) {
    if(animal && typeof animal.duckSinging === 'function') {
        choir.push(animal);
        console.log('恭喜加入合唱团');
        console.log('合唱团的人数为', choir.length);
    }
};

join(duck);
join(chicken);