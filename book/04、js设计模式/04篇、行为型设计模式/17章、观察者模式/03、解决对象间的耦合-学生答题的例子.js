let Observer = require('./01、创建一个订阅者');
let observer = new Observer();

// 学生类
let Student = function (result) {
    let that = this;
    that.result = result;
    // 回答问题动作
    that.say = function () {
        console.log(that.result);
    }
};
// 所有学生都可以回答问题，他们回答问题的方法answer
Student.prototype.answer = function (question) {
    // 注册问题
    observer.regist(question, this.say)
};
// 如果学生睡着了，就没有办法回答问题了
Student.prototype.sleep = function (question) {
    console.log(this.result + question + ' 已经注销');
    // 取消对老师的监听
    observer.remove(question, this.say)
};

// 教师类，是一个发布者，他需要一个提问方法
let Teacher = function(){};
Teacher.prototype.ask = function (question) {
    console.log(`问题是 ${question}`);
    // 发布问题
    observer.fire(question);
};

/*测试*/
// 创建三个学生对象
let student1 = new Student('学生1 回答问题');
let student2 = new Student('学生2 回答问题');
let student3 = new Student('学生3 回答问题');

// 这三个同学监听老师的提问
student1.answer('什么是设计模式');
student1.answer('简述观察者模式');
student2.answer('什么是设计模式');
student3.answer('什么是设计模式');
student3.answer('简述观察者模式');
// 3同学睡着了，注销监听
student3.sleep('简述观察者模式');

// 教师类
let teacher = new Teacher();
teacher.ask('什么是设计模式');
teacher.ask('简述观察者模式');



