# css动画

css动画主要分类：
transition补间动画；keyframe关键帧动画；逐帧动画；

## <div class='class01'>1、补间动画</div>            
位置-平移（left/right/margin/transform）      
方位-旋转（transform）        
大小-缩放（transform）        
透明度（opacity）        
其他-线性变换（transform）          

基础用法： `transition: property duration timing-function delay;`            

常见 timing-function      
linear	            规定以相同速度开始至结束的过渡效果（等于 cubic-bezier(0,0,1,1)）。            
ease	            规定慢速开始，然后变快，然后慢速结束的过渡效果（cubic-bezier(0.25,0.1,0.25,1)）。         
ease-in	            规定以慢速开始的过渡效果（等于 cubic-bezier(0.42,0,1,1)）。      
ease-out	        规定以慢速结束的过渡效果（等于 cubic-bezier(0,0,0.58,1)）。          
ease-in-out	        规定以慢速开始和结束的过渡效果（等于 cubic-bezier(0.42,0,0.58,1)）。            

[关于贝塞尔曲线设定的一个网址](http://web.chacuo.net/css3beziertool)


