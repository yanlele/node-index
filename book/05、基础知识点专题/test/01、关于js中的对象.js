function employee(name, job, born) {
    this.name = name;
    this.job = job;
    this.born = born;
}

let bill = new employee("Bill Gates", "Engineer", 1985);

employee.prototype.salary = 20000;
employee.getName = function(name) {
    console.log(this.name)
};

console.log(bill.getName());