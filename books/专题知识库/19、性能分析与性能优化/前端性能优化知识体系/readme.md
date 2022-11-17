# 前端性能优化知识体系


## 所以，到底如何准确衡量网站的性能？                                    
- **是否发生？** 导航是否成功启动？服务器是否有响应？                      
- **是否有用？** 是否已渲染可以与用户互动的足够内容？                      
- **是否可用？** 用户可以与页面交互，还是页面仍在忙于加载？                
- **是否令人愉快？** 交互是否顺畅而自然，没有滞后和卡顿？                 


## 第一部分，Performance Metrics
![01](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9b13e5d0846e4e9799840e66ffb2a616~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image)

### 是否发生？

指标 | 描述                 
:- | :-             
TTFB (Time to First Byte)    |  首字节到达的时间点。                                                                      
FP (First Paint)             |  首次绘制，标记浏览器渲染任何在视觉上不同于导航前屏幕内容的时间点。                              
FCP (First Contentful Paint) |  首次内容绘制，标记浏览器渲染来自 DOM 第一位内容的时间点，内容可能是文本、图像等元素。             


TTFB、FP 和 FCP 这些指标标记出浏览器开始绘制内容的时间点，这些时刻等同于告诉用户：“浏览器已经开始处理服务器的返回了，你的请求已经发生了！”


### 是否有用？


指标 | 描述                 
:- | :-             
FMP (First Meaningful Paint)    |  首次有效绘制，是指首次绘制对用户有用内容的时间点。                                                                      
LCP (Largest Contentful Paint)  |  最大内容绘制时间，计算从页面开始加载到用户与页面发生交互（点击，滚动） 这段时间内，最大元素绘制的时间， 该时间会随着页面渲染变化而变化，因为页面中的最大元素在渲染过程中可能会发生改变。                              
SI (Speed Index)                |  速度指标，填充页面内容的速度，取开始加载到最后完成渲染，每一时刻页面未完成度的积分。页面的视觉完成度（visually complete）是基于 SSIM(Structural similarity Index) 计算的。


### 是否可用？

#### Long Tasks

耗时任务。浏览器是单线程，所有任务会被添加到主线程的队列中逐个执行。
如果有任务耗时过长，主线程就会被阻塞，其他任务就只能等待，包括那些由用户交互产生的任务，从而无法及时响应用户。

页面应该在 100 ms 内响应用户输入，否则就会被用户认为卡顿。                           
页面应该在 100 ms 内响应用户输入，否则就会被用户认为卡顿。要实现小于 100 ms 的响应，单个任务必须在 50 ms 内完成。
这样即使用户的输入行为发生在某个任务刚开始的时候，并且耗时 50 ms，在这个任务结束后，主线程仍有 50 ms 时间来响应用户输入，总响应时间在 100 ms 内。                         
![02](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9453dab5e5a04a4b9587fa14904792c2~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image)

通过 Chrome DevTools 或 Long Task API 能方便地发现这些耗时任务。
![03](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/099b9f7641b0450c81c2e7dee65a654a~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image)



#### TTI (Time to Interactive)

可交互时间，用于标记页面已进行视觉渲染并能可靠响应用户输入的时间点。
![04](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1df10e0d84a74ffca17356b8ba7de7aa~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image)


#### TBT (Total Blocking Time)

总共阻塞时间，计算的是从 FCP 到 TTI 之间，主线程阻塞的总时间。阻塞时间是指单次任务占用主线程超过 50 ms 的部分。

![05](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/42972e57fcb44341aea453bfcd985b0d~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image)                                
![06](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/db9d8942dd66466fbe11cdc8fcaf2f8f~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image)                                
![07](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c7feedbf0e99411d9ee2a275bdff2a8a~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image)                            


#### FID (First Input Delay)

首次输入延迟，指用户首次输入到页面响应的时间。我们都知道第一印象的重要性，网站亦是如此。首次输入延迟会成为用户对网站很重要的第一印象，决定用户有可能成为忠实用户或者弃之而去。                         
FID 仅关注用户离散的操作，如点击，轻击，按键等，其他交互如滚动和缩放，并不是 FID 关注的。

![08](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/890efe2a4d2445dabba108db7c19e141~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image)


### 是否令人愉快？
#### CLS (Cumulative Layout Shift)
累计布局偏移。测量在页面的整个生命周期中发生的每个意外的样式移动所造成的布局偏移分数的总和。

某次布局偏移分数 = 影响分数 * 距离分数。前一帧和当前帧的所有不稳定元素的可见区域的并集（占视口总面积的一部分）是当前帧的影响分数。



## 参考文档

- [前端性能优化知识体系](https://juejin.cn/post/7063754993072865287)
- [Web Performance Metrics 与 Core Web Vitals 简介 —— 现代前端性能各个指标的具体含义和设计理念](https://juejin.cn/post/6883444297614983175)
