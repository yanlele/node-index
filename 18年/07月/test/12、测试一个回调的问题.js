


function getName(name) {
    console.log(name);
}

function action(callback) {
    if(callback) {
        callback()
    }
}

action(getName.bind('123'));