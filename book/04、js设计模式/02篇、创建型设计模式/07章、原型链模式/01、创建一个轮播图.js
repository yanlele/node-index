let LoopImages = function(imgArr, container) {
    this.imagesArray = imgArr;              // 轮播图片数组
    this.container = container;             // 轮播图片容器
    this.createImage = function(){};        // 创建轮播图片
    this.changeImage = function(){};        // 切换下一张图片
};

// 上下滑动切换类
let SlideLoopImg = function(imgArr, container) {
    //继承
    LoopImages.call(this, imgArr, container);

    // 重写方法
    this.changeImage = function() {
        console.log('上下滑动切换')
    }
};

// 隐藏出现切换类
let FadeLoopImg = function(imgArr, container, arrow) {
    // 继承
    LoopImages.call(this, imgArr, container);
    this.arrow = arrow;
    this.changeImage = function() {
        console.log('隐藏出现切换类');
    }
};

//实例化一个对象
let fadeImg = new FadeLoopImg([
    '1.jpg',
    '2.jpg',
    '3.jpg',
], 'slide', [
    'left.jpg',
    'right.jpg'
]);