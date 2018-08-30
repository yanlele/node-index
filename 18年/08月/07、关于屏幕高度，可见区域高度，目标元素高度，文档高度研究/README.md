# JS中关于clientWidth offsetWidth scrollWidth 等的含义

```
网页可见区域宽： document.body.clientWidth;                     
网页可见区域高： document.body.clientHeight;                        
网页可见区域宽(包括边线的宽)： document.body.offsetWidth;                     
网页可见区域高(包括边线的宽)： document.body.offsetHeight;                        

网页正文全文宽： document.body.scrollWidth;                     
网页正文全文高： document.body.scrollHeight;                        

网页被卷去的高： document.body.scrollTop;                       
网页被卷去的左： document.body.scrollLeft;                      

网页正文部分上： window.screenTop;                      
网页正文部分左： window.screenLeft;                     

屏幕分辨率的高： window.screen.height;                      
屏幕分辨率的宽： window.screen.width;                       

屏幕可用工作区高度： window.screen.availHeight;                       
屏幕可用工作区宽度：window.screen.availWidth;                         
```                 
