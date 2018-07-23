# 移动端弹出层滚动时禁止body滚动                 

## 1.弹出层出现时给body添加一个css样式：height:100%;overflow:hidden;弹出层消失再去掉这个类。                  
测试结果：chrome手机模拟器还真可以，but到了我的安卓手机上，扑街了···                    

之后又看到有人提到，是要html也设置同样的样式才会有效果，所以同样给html添加了这个类，弹出层消失时去掉这个类。                  
测试结果：效果是有了，弹出层内可以滚动，底层不滚动了，but当弹出层出现，底层body会回到页面顶部，这个并不是我想要的。所以此方法XX。               


## 2.弹出层出现时给body添加样式position:fixed，并算出当时页面的scrollTop滚动值，给body一个负的top值来保证body不会回到顶部，弹出层消失时恢复。                    
以下代码基于jquery.               
```javascript
var top = 0;//给top变量一个初始值，以便下方赋值并引用。
$('.tan').click(function(){//点击事件弹出层显示，
    $('.div2').show(); //弹出层出现     
    top = $(window).scrollTop();//获取页面的scrollTop；
    $('body').css("top",-top+"px");//给body一个负的top值；
    $('body').addClass('add');//给body增加一个类，position:fixed; 
});
$('.close').click(function(){//弹出层消失点击事件
    $('.div2').hide(); //弹出层消失
    $('body').removeClass('add');//去掉给body的类
    $(window).scrollTop(top);//设置页面滚动的高度，如果不设置，关闭弹出层时页面会回到顶部。
});
```
     
## 3.无意中发现定位层之间好像是不会传递事件的，将弹窗之外的元素包在一个div里，给这个div设置定位样式，给宽高是充满屏幕的，设置overflow:auto;这样这个div和弹出层就是两个定位层，滑动弹出层时不会传递到div上的。                  
```less
第一种：div{
    position:absolute;
    top:0;
    bottom:0;
    left:0;
    overflow:auto;
  }
第二种：div{
    height:100%;//前提设置他的父元素都是100%的高才可以充满屏幕高度；
    position:absolute;
    top:0;
    left:0;
    overflow:auto;
  }
```
给div设置以上两种其中一种样式就可以，第一种的bottom：0和第二种height:100%都是为了固定div的高度是屏幕的高度，
overflow:auto使滚动发生在div内部，这样弹出层的滚动就不会传递给div了,如果不给设置高度，弹出层的滚动事件仍然会传递给body，
div就会随着body滚动。

测试结果：和第二个方法结果差不多，效果是有了，但是在ipone手机上定位层上下滑动效果不佳。                      


## 4.最后的方法还是用到插件了，iScroll.js，这个js有自己的滑动方式，实现原理是阻止元素默认滑动事件，用这个插件自己的滑动方式实现滑动。             
[以下是我测试页面的全部代码](./test.html)                    

原理是：弹出层分两层，一个是滑动层tan,一个是背景层bg,给背景层阻止默认滑动事件，这样滑动它的时候不会影响底层，滑动层tan用了插件的滑动方式，也不会传递底层，这样就解决的滑动层滑动而body不滚动。

此方法是没有阻止body的滚动，而是阻止了传递滑动事件的发生。

测试结果：完美！                


## 最后的办法                
有一个这样的样式属性不知道大家是否知晓：            
`-webkit-overflow-scrolling : touch;  //可以让页面在Native端滚动时模拟原生的弹性滚动效果`                   
在需要滚动的元素上加上这个，第二、三种出现的问题就解决了。           

