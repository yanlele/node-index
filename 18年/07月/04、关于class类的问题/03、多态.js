class Action {
    constructor(name) {
        this.name = name;
    }

    init(age) {
        const args1 = Array.prototype.slice.call(arguments, 1);
        const args = Array.prototype.slice.call(arguments, 1);
        console.log(args);
        console.log(args1);
        console.log(this.name);
        console.log(age);
    }
}

module.exports = Action;