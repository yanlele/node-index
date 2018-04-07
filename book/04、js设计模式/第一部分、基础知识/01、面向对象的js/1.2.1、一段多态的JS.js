let makeSound = function (animal) {
    if (animal instanceof duck) {
        console.log('嘎嘎嘎')
    } else if (animal instanceof dog) {
        console.log('汪汪汪')
    }
};

function duck() {
}

function dog() {
}

makeSound(new duck());
makeSound(new dog());