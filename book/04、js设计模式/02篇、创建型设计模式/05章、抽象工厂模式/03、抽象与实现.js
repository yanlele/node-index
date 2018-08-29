//抽象工厂
let VehicleFactory = function(subType, superType) {
    if(typeof VehicleFactory[superType] === 'function') {
        // 缓存类
        function F(){}
        // 集成父类的属性和方法
        F.prototype = new VehicleFactory[superType]();
        // 将子类的constructor 指向子类
        superType.constructor = subType;
        // 子类原型继承 父类
        subType.prototype = new F();
    } else {
        throw new Error('没有创建该类抽象对象');
    }
};
// 小汽车抽象类
VehicleFactory.Car = function() {
    this.type = 'car'
};
VehicleFactory.Car.prototype = {
    getPrice() {
        return new Error('抽象方法不能被调用')
    },
    getSpeed() {
        return new Error('抽象方法不能被调用')
    }
};

// 公交车
VehicleFactory.Bus = function() {
    this.type = 'bus'
};
VehicleFactory.Bus.prototype = {
    getPrice() {
        return new Error('抽象方法不能被调用')
    },
    getSpeed() {
        return new Error('抽象方法不能被调用')
    }
};

// 货车抽象类
VehicleFactory.Truck = function() {
    this.type = 'truck'
};
VehicleFactory.Truck.prototype = {
    getPrice() {
        return new Error('抽象方法不能被调用')
    },
    getSpeed() {
        return new Error('抽象方法不能被调用')
    }
};

/*具体实现*/
//宝马汽车子类
let BMW = function(price, speed) {
    this.price = price;
    this.speed = speed;
};
VehicleFactory(BMW, 'Car');
BMW.prototype.getPrice = function() {
    return this.price;
};
BMW.prototype.getSpeed = function() {
    return this.speed;
};
//兰博基尼汽车子类
let Lamborghini = function(price, speed) {
    this.price = price;
    this.speed = speed;
};
VehicleFactory(Lamborghini, 'Car');
Lamborghini.prototype.getPrice = function() {
    return this.price;
};
Lamborghini.prototype.getSpeed = function() {
    return this.speed;
};

//宇通汽车子类
let YUTONG = function(price, speed) {
    this.price = price;
    this.speed = speed;
};
VehicleFactory(YUTONG, 'Bus');
YUTONG.prototype.getPrice = function() {
    return this.price;
};
YUTONG.prototype.getSpeed = function() {
    return this.speed;
};

//奔驰汽车子类
let BenzTruck = function(price, speed) {
    this.price = price;
    this.speed = speed;
};
VehicleFactory(BenzTruck, 'Truck');
BenzTruck.prototype.getPrice = function() {
    return this.price;
};
BenzTruck.prototype.getSpeed = function() {
    return this.speed;
};

let truck = new BenzTruck(10000, 100);
console.log(truck.getPrice());
console.log(truck.type);
console.log(truck.getSpeed());