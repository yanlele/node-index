class YANLE {
    constructor() {
        this.myName = '123'
    }

    getName() {
        console.log(this.myName)
    }

    static getAge() {
        console.log(123);
    }
}

let yanle = new YANLE();
yanle.getName();
YANLE.getAge();
