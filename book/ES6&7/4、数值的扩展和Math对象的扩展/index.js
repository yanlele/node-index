var person = {
    sayName() {
        console.log(this.name);
    },
    get firstName() {
        return "Nicholas";
    }
};
person.sayName.name // "sayName"
person.firstName.name // "get firstName"