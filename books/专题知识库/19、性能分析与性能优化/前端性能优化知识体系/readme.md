# 前端性能优化知识体系


## 所以，到底如何准确衡量网站的性能？                                    
- **是否发生？** 导航是否成功启动？服务器是否有响应？                      
- **是否有用？** 是否已渲染可以与用户互动的足够内容？                      
- **是否可用？** 用户可以与页面交互，还是页面仍在忙于加载？                
- **是否令人愉快？** 交互是否顺畅而自然，没有滞后和卡顿？                 


### 第一部分，Performance Metrics
![https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9b13e5d0846e4e9799840e66ffb2a616~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9b13e5d0846e4e9799840e66ffb2a616~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp)

**是否发生？**

指标 | 描述                 
:- | :-             
TTFB (Time to First Byte)    |  首字节到达的时间点。                                                                      
FP (First Paint)             |  首次绘制，标记浏览器渲染任何在视觉上不同于导航前屏幕内容的时间点。                              
FCP (First Contentful Paint) |  首次内容绘制，标记浏览器渲染来自 DOM 第一位内容的时间点，内容可能是文本、图像等元素。             


TTFB、FP 和 FCP 这些指标标记出浏览器开始绘制内容的时间点，这些时刻等同于告诉用户：“浏览器已经开始处理服务器的返回了，你的请求已经发生了！”


**是否有用？**


指标 | 描述                 
:- | :-             
FMP (First Meaningful Paint)    |  首次有效绘制，是指首次绘制对用户有用内容的时间点。                                                                      
LCP (Largest Contentful Paint)  |  最大内容绘制时间，计算从页面开始加载到用户与页面发生交互（点击，滚动） 这段时间内，最大元素绘制的时间， 该时间会随着页面渲染变化而变化，因为页面中的最大元素在渲染过程中可能会发生改变。                              
SI (Speed Index)                |  速度指标，填充页面内容的速度，取开始加载到最后完成渲染，每一时刻页面未完成度的积分。页面的视觉完成度（visually complete）是基于 SSIM(Structural similarity Index) 计算的。




## 参考文档

- [前端性能优化知识体系](https://juejin.cn/post/7063754993072865287)
- [Web Performance Metrics 与 Core Web Vitals 简介 —— 现代前端性能各个指标的具体含义和设计理念](https://juejin.cn/post/6883444297614983175)
