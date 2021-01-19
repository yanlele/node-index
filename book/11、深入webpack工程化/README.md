# Webpack  前端工程化             

我的目的是这个做一个最强大的webpack教程手册，供以后工作中翻阅查询                

### 目录

<!-- toc -->

- [基础](#%E5%9F%BA%E7%A1%80)
- [webpack优化问题](#webpack%E4%BC%98%E5%8C%96%E9%97%AE%E9%A2%98)
- [其他补充知识点](#%E5%85%B6%E4%BB%96%E8%A1%A5%E5%85%85%E7%9F%A5%E8%AF%86%E7%82%B9)
- [实战案例](#%E5%AE%9E%E6%88%98%E6%A1%88%E4%BE%8B)
- [webpack插件和loader开发](#webpack%E6%8F%92%E4%BB%B6%E5%92%8Cloader%E5%BC%80%E5%8F%91)
- [其他](#%E5%85%B6%E4%BB%96)
- [遗留问题待解决](#%E9%81%97%E7%95%99%E9%97%AE%E9%A2%98%E5%BE%85%E8%A7%A3%E5%86%B3)

<!-- tocstop -->

### 基础           
- [一、由浅入深Webpack](./01、由浅入深Webpack/README.md#class1)
    - [01、最基本的使用webpack](./01、由浅入深Webpack/README.md#class1-item01)
    - [02、打包js](./01、由浅入深Webpack/README.md#class1-item02)
    - [03、编译ES6/7](./01、由浅入深Webpack/README.md#class1-item03)
    - [04、编译打包TS](./01、由浅入深Webpack/README.md#class1-item04)
    - [05、提取公用代码](./01、由浅入深Webpack/README.md#class1-item05)
    - [06、代码分割和懒加载](./01、由浅入深Webpack/README.md#class1-item06)                 
    - [07、处理css: style-loader](./01、由浅入深Webpack/README.md#class1-item07)
    - [08、处理css: css-loader](./01、由浅入深Webpack/README.md#class1-item08)
    - [09、配置less/sass](./01、由浅入深Webpack/README.md#class1-item09)
    - [10、提取css](./01、由浅入深Webpack/README.md#class1-item10)
    - [11、postCss-in-webpack](./01、由浅入深Webpack/README.md#class1-item11)
    - [12、Tree-shaking](./01、由浅入深Webpack/README.md#class1-item12)
    
- [二、由浅入深Webpack - 进阶](./02、由浅入深Webpack-进阶/README.md#class2)
    - [01、文件处理 - 图片处理](./02、由浅入深Webpack-进阶/README.md#class2-item01)
    - [02、文件处理-字体处理](./02、由浅入深Webpack-进阶/README.md#class2-item02)
    - [03、文件处理-处理第三方JS库](./02、由浅入深Webpack-进阶/README.md#class2-item03)
    - [04、html-in-webpack-生成html](./02、由浅入深Webpack-进阶/README.md#class2-item04)
    - [05、html中引入图片](./02、由浅入深Webpack-进阶/README.md#class2-item05)
    - [06、配合优化](./02、由浅入深Webpack-进阶/README.md#class2-item06)

- [三、webpack构建本地开发环境](./03、webpack构建本地开发环境/README.md#class3)
    - [01、webpack_watch_mode](./03、webpack构建本地开发环境/README.md#class3-item01)
    - [02、webpack_dev_server](./03、webpack构建本地开发环境/README.md#class3-item02)
    - [03、代理远程接口](./03、webpack构建本地开发环境/README.md#class3-item03)
    - [04、模块热更新](./03、webpack构建本地开发环境/README.md#class3-item04)
    - [05、开启调试模式Source Map](./03、webpack构建本地开发环境/README.md#class3-item05)
    - [06、设置EsLint检查代码格式](./03、webpack构建本地开发环境/README.md#class3-item06)
    - [07、区分开发环境和生产环境](./03、webpack构建本地开发环境/README.md#class3-item07)
    - [08、使用middleware搭建开发环境](./03、webpack构建本地开发环境/README.md#class3-item08)
    
- [四、webpack实战场景](./04、webpack实战场景/README.md#class4)
    - [01、打包结果分析](./04、webpack实战场景/README.md#class4-item01)
    - [02、打包速度优化](./04、webpack实战场景/README.md#class4-item02)
    - [03、长缓存优化](./04、webpack实战场景/README.md#class4-item03)
    - [04、webpack多页面应用](./04、webpack实战场景/README.md#class4-item04)


### webpack优化问题
- [图片处理](./05、webpack优化问题/01、图片处理.md)
- [pre-commit限制提交检测](./05、webpack优化问题/02、pre-commit限制提交检测.md)
- [prettier和lint检测](./05、webpack优化问题/03、prettier和lint检测.md)
- [优化插件](./05、webpack优化问题/04、优化插件.md)
- [优化打包速度](./05、webpack优化问题/05、优化打包速度.md)
- [webpack 系列一：最佳配置指北](https://github.com/sisterAn/blog/issues/68)
- [webpack 系列二：优化90%打包速度](https://github.com/sisterAn/blog/issues/63)
- [webpack 系列三：优化开发体验](https://github.com/sisterAn/blog/issues/64)
- [webpack 系列四：优化包体积](https://github.com/sisterAn/blog/issues/65)
- [webpack 系列五：优化首屏加载时间及流畅度](https://github.com/sisterAn/blog/issues/66)
- [五种可视化方案分析 webpack 打包性能瓶颈](https://github.com/sisterAn/blog/issues/67)
- [Webpack优化总会让你不得不爱](https://juejin.im/post/6844904079320154126)
- [Webpack4+Babel7优化70%速度](https://juejin.im/post/6844903784305393677)
- [webpack优化](https://juejin.im/post/6844903927687675912)
- [浅谈 webpack 性能优化（内附巨详细 webpack 学习笔记）](https://juejin.im/post/6844904142675279886)
- [带你深度解锁Webpack系列(基础篇)](https://juejin.im/post/6844904079219490830)
- [带你深度解锁Webpack系列(优化篇)](https://juejin.im/post/6844904093463347208)
- [Webpack优化——将你的构建效率提速翻倍](https://juejin.im/post/6844903924806189070)
- [项目不知道如何做性能优化？不妨试一下代码分割](https://juejin.im/post/6844904101134729229)
- [Webpack按需加载秒开应用](https://juejin.im/post/6844903791456681992)
    
    
    
### 其他补充知识点
- [Tree-Shaking攻略](./06、其他/01、Tree-Shaking攻略/01、Tree-Shaking攻略.md)
- [** webpack 中那些最易混淆的 5 个知识点](./06、其他/02、五个易混淆的概念/02、五个易混淆的概念.md)
- [重学webpack4重要知识点](./06、其他/03、重学webpack4重要知识点/03、重学webpack4重要知识点.md)
- [webpack4系列中文教程和配套代码](https://github.com/dongyuanxin/webpack-demos)
- [学习webpack4.0的最新配置语法和新特性](https://github.com/wlx200510/webpack4.x-learn)
- [Webpack-dev-server的proxy用法](https://www.jianshu.com/p/f489e7764cb8)
- [babel-polyfill的几种使用方法](https://blog.csdn.net/weixin_41224029/article/details/90213067)
- [Webpack 再深入再总结](https://juejin.im/post/5e17c1dd6fb9a02fd67e9990?utm_source=gold_browser_extension)
- [webpack devtool篇](https://www.jianshu.com/p/62dc120d96d0)
- [Webpack 之 basic chunk graph](https://juejin.im/post/6844903952870440968)
- [Webpack之externals用法详解](https://juejin.im/post/6844904190083350542)
- [带你深度解锁Webpack系列(进阶篇)](https://juejin.im/post/6844904084927938567)
- [通过这6个很棒的Webpack插件提高您的生产力](https://juejin.im/post/6844904149406973960)
- [看完这篇，面试再也不怕被问 Webpack 热更新](https://juejin.im/post/6844903953092591630)


### 实战案例
- [从零搭建React全家桶框架教程 - 已经很过时了](https://github.com/brickspert/blog/issues/1)
- [配置一套属于自己的React项目的webpack配置](https://github.com/heyushuo/Webpack-React)
- [从零开始配置TypeScript + React + React-Router + Redux + Webpack开发环境](https://www.cnblogs.com/baqiphp/p/7647912.html)
- [Demos && Courses for Webpack 4](https://github.com/dongyuanxin/webpack-demos)
- [tsx+webpack4](https://github.com/cli-template-build/tsx-app)
- [一步步从零开始用 webpack 搭建一个大型项目 - *** ](https://juejin.im/post/5de06aa851882572d672c1ad)
- [webpack 最佳配置指北](https://juejin.im/post/5e0e1153e51d45414b74de65)
- [再不会webpack敲得代码就不香了(近万字实战)](https://juejin.im/post/5de87444518825124c50cd36)
- [微信小程序工程化探索之webpack实战](https://juejin.im/post/6844904131405037576)
- [[2.7w字]我是这样搭建 React+Typescript项目环境的(上)](https://juejin.im/post/6860129883398668296)
- [[2.7w字]我是这样搭建 React+Typescript项目环境的(下)](https://juejin.im/post/6860134655568871437)
- [「一劳永逸」由浅入深配置webpack4](https://juejin.im/post/6859888538004783118)
- [「前端工程化」从0-1搭建react，ts脚手架（1.2w字超详细教程）](https://juejin.cn/post/6919308174151385096)

    
### webpack插件和loader开发
- [npm link的使用](https://www.jianshu.com/p/aaa7db89a5b2)
- [巧用 webpack loader 实现项目的定制化](https://www.jqhtml.com/44792.html)
- [深入Webpack-编写Loader](https://segmentfault.com/a/1190000012718374)
    
    
### 其他
- [Webpack 原理浅析](https://juejin.im/post/6854818576470933512)
- [搜罗一切webpack的好文章](https://github.com/webpack-china/awesome-webpack-cn)
- [手写webpack核心原理，再也不怕面试官问我webpack原理 **](https://juejin.im/post/6854573217336541192)
- [了不起的 Webpack 构建流程学习指南](https://juejin.im/post/6844904196634837000)
- [十大webpack优化插件](https://juejin.im/post/6844903951649734663)
- [了不起的 Webpack HMR 学习指南（含源码分析）](https://juejin.im/post/6844904193136787470)
- [「一劳永逸」由浅入深配置webpack4](https://juejin.im/post/6859888538004783118)
- [再来一打Webpack面试题](https://juejin.im/post/6844904094281236487)


### 遗留问题待解决              

1、postcss 的独立配置文件怎么写                            
2、打包后的js和css 如何自动插入到页面中去                    
3、多页应用程序打包方式                
4、在任意位置的图片地址访问问题处理办法



