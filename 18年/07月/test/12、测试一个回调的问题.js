function getName(name) {
    console.log(name);
}

function action(callback) {
    let args = Array.prototype.slice.call(arguments, 1);

    if(callback) {
        callback(args[0])
    }
}

action(getName, 'yanle');