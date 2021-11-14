# 调试技巧


### $0
在console 面板里面直接输入 `$0` 就是当前选中的element


### console.log
给文字不同的样式：                           
`console.log('%c流下了没有技术的眼泪', 'font-size: 20px; color: red')`

给背景图：                       
`console.log('%c流下了没有技术的眼泪！！%c  ', 'font-size: 20px; color: red', 'background: url('图片地址'); font-size: 40px; background-size: cover;')`


### 定位代码内存泄漏
1、使用工具：`Memory`

使用 Heap snapshot 可以获取当前内存的快照， 多次操作之后多次拍摄快照， 如果占用内存一直上升， 就说明可能存在内存泄漏。                        
中途可以使用 CG ， 如果使用 CG 之后， 内存还是不下来， 就确实是内存泄漏了

**查看内存泄漏的原因**
选择 Comparison 就可以对比两个快照

![02](http://q89fxq7ss.bkt.clouddn.com/20200401_02.jpg)

2、点击窗口 --> 任务管理器                    
就可以试试看到当前 tab 页签的实时内存变化

3、使用 Performance monitor                
![01](http://q89fxq7ss.bkt.clouddn.com/20200401_01.png)
这个可以实时监控内存使用情况








