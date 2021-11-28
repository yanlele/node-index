let Demo = function(){
    if(!(this instanceof Demo)) {
        return new Demo();
    }
};
Demo.proptotype = {
    show() {
        console.log('获取成功');
    }
};
let d = new Demo();
d.show();
let d = Demo();
d.show();
