let getName = function(flag) {

    if(flag) {
        return function(name) {
            console.log(name)
        }
    } else {
        console.log('no name')
    }
};


getName(true)('yanle');
getName(false);