# css动画

css动画主要分类：
transition补间动画；keyframe关键帧动画；逐帧动画；

## <div class='class01'>1、补间动画 transition</div>            
位置-平移（left/right/margin/transform）      
方位-旋转（transform）        
大小-缩放（transform）        
透明度（opacity）        
其他-线性变换（transform）          

基础用法： `transition: property duration timing-function delay;`            

常见 | timing-function      
:- | :-
linear	           | 规定以相同速度开始至结束的过渡效果（等于 cubic-bezier(0,0,1,1)）。            
ease	           | 规定慢速开始，然后变快，然后慢速结束的过渡效果（cubic-bezier(0.25,0.1,0.25,1)）。         
ease-in	           | 规定以慢速开始的过渡效果（等于 cubic-bezier(0.42,0,1,1)）。      
ease-out	       | 规定以慢速结束的过渡效果（等于 cubic-bezier(0,0,0.58,1)）。          
ease-in-out	       | 规定以慢速开始和结束的过渡效果（等于 cubic-bezier(0.42,0,0.58,1)）。            

[代码示例2](./demo/02-transition.html);         
[关于贝塞尔曲线设定的一个网址](http://web.chacuo.net/css3beziertool)


## <div class='class02'>2、关键帧动画</div>   
相当于多个补间动画，与元素状的变化无关，更加灵活        
关键字： `animation`、`@keyframes`       
基础语法： `animation: name duration timing-function delay iteration-count direction fill-mode play-state;`

属性：     
animation-name	                指定要绑定到选择器的关键帧的名称        
animation-duration	            动画指定需要多少秒或毫秒完成      
animation-timing-function	    设置动画将如何完成一个周期       
animation-delay	                设置动画在启动前的延迟间隔。      
[animation-iteration-count](http://www.runoob.com/cssref/css3-pr-animation-iteration-count.html)       定义动画的播放次数。      
[animation-direction](http://www.runoob.com/cssref/css3-pr-animation-direction.html)	            指定是否应该轮流反向播放动画。     
[animation-fill-mode](http://www.runoob.com/cssref/css3-pr-animation-fill-mode.html)	            规定当动画不播放时（当动画完成时，或当动画有一个延迟未开始播放时），要应用到元素的样式。            
[animation-play-state](http://www.runoob.com/cssref/css3-pr-animation-play-state.html)	        指定动画是否正在运行或已暂停。             

[代码示例3](./demo/03-keyframe.html)



## <div class='class03'>3、逐帧动画</div>
适用于无法补间动画计算的动画；资源比较大；使用steps;           

[代码示例4](./demo/04-animal.html)
