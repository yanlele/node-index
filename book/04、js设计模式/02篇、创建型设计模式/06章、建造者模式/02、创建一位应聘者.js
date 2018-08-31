let Human = function(param) {
    this.skill = param && param.skill || '保密';
    this.hobby = param && param.hobby || '保密';
};
Human.prototype = {
    getSkill() {
        return this.skill;
    },
    getHobby() {
        return this.hobby
    }
};
//实例化姓名类
let Named = function(name) {
    let that = this;
    (function(name, that) {
        that.whileName = name;
        if(name.indexOf(' ') > -1) {
            that.firstName = name.slice(0, name.indexOf(' '));
            that.secondName = name.slice(name.indexOf(' '));
        }
    })(name, that)
};
// 实例化工作职位类
let Work = function(work) {
    let that = this;
    (function(work, thar) {
        switch (work) {
            case 'code':
                that.work = '工程师';
                that.workDescript = '写代码';
                break;
            case 'UI':
            case 'UE':
                that.work = '设计师';
                that.workDescript = '艺术工作';
                break;
            case 'teach':
                that.work = '教师';
                thar.workDescript = '教书育人';
                break;
            default:
                that.work = work;
                that.workDescript = '没有你描述的职位'
        }
    })(work, that)
};
//期望的职位
Work.prototype.changeWork = function(work) {
    this.work = work;
};
//添加职位描述
Work.prototype.changeDescript = function(setence) {
    this.workDescript = setence;
};


let Person = function(name, work, params) {
    // 应聘者缓存对象
    let _person = new Human(params);
    // 姓名解析
    _person.name = new Named(name);
    // 应聘者职位
    _person.work = new Work(work);
    return _person;
};
//测试
let person = new Person('小 明', 'code');
console.log(person.skill);
console.log(person.hobby);
console.log(person.name.firstName);
console.log(person.work.work);
console.log(person.work.workDescript);
person.work.changeDescript('更改了职位描述');
console.log(person.work.workDescript);