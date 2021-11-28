// 图片轮播图
let LoopImages = function(imgArr, container) {
    this.imagesArray = imgArr;
    this.container = container;
};
LoopImages.prototype = {
    // 创建轮播图片
    crateImage() {
        console.log('创建轮播图片')
    },

    // 切换下一个图片
    changeImage() {
        console.log('切换下一个图片')
    }
};

// 上下滑动切换类
let SlideLoopImg = function(imgArr, container) {
    //继承
    LoopImages.call(this, imgArr, container);
};
SlideLoopImg.prototype = new LoopImages();
SlideLoopImg.prototype.changeImage = function () {
    console.log('上下滑动切换')
};


// 隐藏出现切换类
let FadeLoopImg = function(imgArr, container, arrow) {
    // 继承
    LoopImages.call(this, imgArr, container);
    this.arrow = arrow;
};
FadeLoopImg.prototype = new LoopImages();
FadeLoopImg.prototype.changeImage = function () {
    console.log('隐藏出现切换类')
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
console.log(fadeImg.container);
fadeImg.changeImage();