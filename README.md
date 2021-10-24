# index

这个项目以为创建之初时间比较早，目的就是为了记录自己开发过程中遇到的坑和问题。 
后来渐渐演变为记录一些学习知识的一个记录文档， 以为很多东西很感兴趣，但是学习了之后使用场景不多， 导致遗忘比较快， 
所以我写文章的时候， 就尽量写的详细， 能整理为一个体系的就尽量整理为一个体系。

当时目标就是JS 点击就能run, html双击就能跑，毫无工程化可言。 我新起了一个项目 [node-index-core](https://github.com/yanlele/node-index-core), 
这个项目只放置代码， 本项目只放置学习文章。相互配合，同时更新，前端系列的学习和维护 一直会坚持到我整个职业生涯。


## 目录

<!-- toc -->

- [已经发布npm的开源模块](#%E5%B7%B2%E7%BB%8F%E5%8F%91%E5%B8%83npm%E7%9A%84%E5%BC%80%E6%BA%90%E6%A8%A1%E5%9D%97)
- [对别人项目的研究（详细阅读源码之后写下的一些笔记和项目注释-已完成）](#%E5%AF%B9%E5%88%AB%E4%BA%BA%E9%A1%B9%E7%9B%AE%E7%9A%84%E7%A0%94%E7%A9%B6%E8%AF%A6%E7%BB%86%E9%98%85%E8%AF%BB%E6%BA%90%E7%A0%81%E4%B9%8B%E5%90%8E%E5%86%99%E4%B8%8B%E7%9A%84%E4%B8%80%E4%BA%9B%E7%AC%94%E8%AE%B0%E5%92%8C%E9%A1%B9%E7%9B%AE%E6%B3%A8%E9%87%8A-%E5%B7%B2%E5%AE%8C%E6%88%90)
- [人项目列表（已完成）](#%E4%BA%BA%E9%A1%B9%E7%9B%AE%E5%88%97%E8%A1%A8%E5%B7%B2%E5%AE%8C%E6%88%90)
- [正在进行的个人项目 - 包含待研究的项目(进行中)](#%E6%AD%A3%E5%9C%A8%E8%BF%9B%E8%A1%8C%E7%9A%84%E4%B8%AA%E4%BA%BA%E9%A1%B9%E7%9B%AE---%E5%8C%85%E5%90%AB%E5%BE%85%E7%A0%94%E7%A9%B6%E7%9A%84%E9%A1%B9%E7%9B%AE%E8%BF%9B%E8%A1%8C%E4%B8%AD)
- [源码研究](#%E6%BA%90%E7%A0%81%E7%A0%94%E7%A9%B6)
- [专题笔记归类(简书总结)](#%E4%B8%93%E9%A2%98%E7%AC%94%E8%AE%B0%E5%BD%92%E7%B1%BB%E7%AE%80%E4%B9%A6%E6%80%BB%E7%BB%93)
  * [react简书笔记](#react%E7%AE%80%E4%B9%A6%E7%AC%94%E8%AE%B0)
  * [ES6/7简书笔记](#es67%E7%AE%80%E4%B9%A6%E7%AC%94%E8%AE%B0)
  * [03、css专题](#03css%E4%B8%93%E9%A2%98)
  * [04、javascript设计模式](#04javascript%E8%AE%BE%E8%AE%A1%E6%A8%A1%E5%BC%8F)
  * [05、基础知识点总结 ** 非常重要](#05%E5%9F%BA%E7%A1%80%E7%9F%A5%E8%AF%86%E7%82%B9%E6%80%BB%E7%BB%93--%E9%9D%9E%E5%B8%B8%E9%87%8D%E8%A6%81)
  * [06、canvas总结](#06canvas%E6%80%BB%E7%BB%93)
  * [07、算法学习](#07%E7%AE%97%E6%B3%95%E5%AD%A6%E4%B9%A0)
  * [09、学习javascript数据结构与算法](#09%E5%AD%A6%E4%B9%A0javascript%E6%95%B0%E6%8D%AE%E7%BB%93%E6%9E%84%E4%B8%8E%E7%AE%97%E6%B3%95)
  * [10、DOM和BOM](#10dom%E5%92%8Cbom)
  * [11、深入webpack工程化](#11%E6%B7%B1%E5%85%A5webpack%E5%B7%A5%E7%A8%8B%E5%8C%96)
  * [12、学习TypeScript](#12%E5%AD%A6%E4%B9%A0typescript)
  * [13、测试专题](#13%E6%B5%8B%E8%AF%95%E4%B8%93%E9%A2%98)
  * [14、深入浅出MySQL 数据库开发 优化与管理维护](#14%E6%B7%B1%E5%85%A5%E6%B5%85%E5%87%BAmysql-%E6%95%B0%E6%8D%AE%E5%BA%93%E5%BC%80%E5%8F%91-%E4%BC%98%E5%8C%96%E4%B8%8E%E7%AE%A1%E7%90%86%E7%BB%B4%E6%8A%A4)
  * [15、Linux相关学习](#15linux%E7%9B%B8%E5%85%B3%E5%AD%A6%E4%B9%A0)
  * [16、前端数据可视化D3.js学习](#16%E5%89%8D%E7%AB%AF%E6%95%B0%E6%8D%AE%E5%8F%AF%E8%A7%86%E5%8C%96d3js%E5%AD%A6%E4%B9%A0)
  * [17、数据结构与算法专题 - todo](#17%E6%95%B0%E6%8D%AE%E7%BB%93%E6%9E%84%E4%B8%8E%E7%AE%97%E6%B3%95%E4%B8%93%E9%A2%98---todo)
  * [18、flutter 基础入门](#18flutter-%E5%9F%BA%E7%A1%80%E5%85%A5%E9%97%A8)
  * [20、docker&DevOps](#20dockerdevops)
  * [21、小程序](#21%E5%B0%8F%E7%A8%8B%E5%BA%8F)
  * [22、必须要学好英语](#22%E5%BF%85%E9%A1%BB%E8%A6%81%E5%AD%A6%E5%A5%BD%E8%8B%B1%E8%AF%AD)
  * [23、RXJS学习专题 - 放弃中（因为看不到收益）](#23rxjs%E5%AD%A6%E4%B9%A0%E4%B8%93%E9%A2%98---%E6%94%BE%E5%BC%83%E4%B8%AD%E5%9B%A0%E4%B8%BA%E7%9C%8B%E4%B8%8D%E5%88%B0%E6%94%B6%E7%9B%8A)
  * [25、自我管理](#25%E8%87%AA%E6%88%91%E7%AE%A1%E7%90%86)
  * [26、微前端专题](#26%E5%BE%AE%E5%89%8D%E7%AB%AF%E4%B8%93%E9%A2%98)
  * [27、好用的库与框架 **](#27%E5%A5%BD%E7%94%A8%E7%9A%84%E5%BA%93%E4%B8%8E%E6%A1%86%E6%9E%B6-)
  * [28、性能分析](#28%E6%80%A7%E8%83%BD%E5%88%86%E6%9E%90)
  * [29、源码研究](#29%E6%BA%90%E7%A0%81%E7%A0%94%E7%A9%B6)
- [通用功能js模块组件](#%E9%80%9A%E7%94%A8%E5%8A%9F%E8%83%BDjs%E6%A8%A1%E5%9D%97%E7%BB%84%E4%BB%B6)
  * [原生组件和公用功能部分](#%E5%8E%9F%E7%94%9F%E7%BB%84%E4%BB%B6%E5%92%8C%E5%85%AC%E7%94%A8%E5%8A%9F%E8%83%BD%E9%83%A8%E5%88%86)
- [基础知识归类](#%E5%9F%BA%E7%A1%80%E7%9F%A5%E8%AF%86%E5%BD%92%E7%B1%BB)
  * [踩坑记录和一些项目的总结](#%E8%B8%A9%E5%9D%91%E8%AE%B0%E5%BD%95%E5%92%8C%E4%B8%80%E4%BA%9B%E9%A1%B9%E7%9B%AE%E7%9A%84%E6%80%BB%E7%BB%93)
  * [前端基础](#%E5%89%8D%E7%AB%AF%E5%9F%BA%E7%A1%80)
  * [vue](#vue)
  * [前端周边生态圈技术栈](#%E5%89%8D%E7%AB%AF%E5%91%A8%E8%BE%B9%E7%94%9F%E6%80%81%E5%9C%88%E6%8A%80%E6%9C%AF%E6%A0%88)
  * [node其他知识点](#node%E5%85%B6%E4%BB%96%E7%9F%A5%E8%AF%86%E7%82%B9)
  * [杂项](#%E6%9D%82%E9%A1%B9)
  * [其他优秀技术文章与前沿技术收集](#%E5%85%B6%E4%BB%96%E4%BC%98%E7%A7%80%E6%8A%80%E6%9C%AF%E6%96%87%E7%AB%A0%E4%B8%8E%E5%89%8D%E6%B2%BF%E6%8A%80%E6%9C%AF%E6%94%B6%E9%9B%86)
  * [值得好好学习的开源项目](#%E5%80%BC%E5%BE%97%E5%A5%BD%E5%A5%BD%E5%AD%A6%E4%B9%A0%E7%9A%84%E5%BC%80%E6%BA%90%E9%A1%B9%E7%9B%AE)
- [年度计划和日志目录](#%E5%B9%B4%E5%BA%A6%E8%AE%A1%E5%88%92%E5%92%8C%E6%97%A5%E5%BF%97%E7%9B%AE%E5%BD%95)
  * [17年](#17%E5%B9%B4)
  * [18年](#18%E5%B9%B4)
  * [19年](#19%E5%B9%B4)
  * [20年](#20%E5%B9%B4)

<!-- tocstop -->

## 知识库


### 前端基础知识


### 前端周边技术生态圈


### Node基础知识


### 日常采坑与记录


### 优秀技术文档收集与前沿技术归档


### 优秀的开源项目



- [DoraCMS是基于Nodejs+express+mongodb编写的一套内容管理系统:DoraCMS](https://github.com/doramart/DoraCMS)
- [koa+TypeScript构建商城类项目服务端*****](https://github.com/yanlele/koa-typescript)
- [《Node.js从入门到上线》—— Koa2 + MongoDB 搭建博客系统](https://github.com/liuxing/node-blog)
- [koa2构建工具koa2-starter-cli](https://github.com/liuxing/koa2-starter-cli)
- [《Node.js入门教程》](https://github.com/liuxing/node-abc)
- [canvas-test](https://github.com/whxaxes/canvas-test)
- [超多经典 canvas 实例，动态离子背景、移动炫彩小球、贪吃蛇、坦克大战、是男人就下100层、心形文字等等等](https://github.com/bxm0927/canvas-special)
- [一个基于Phaser的小游戏集合](https://github.com/channingbreeze/games)
- [vue+koa2 实现一个简单电商网站](https://github.com/liutaochange/Vue-and-Koa2)
- [基于vue2 + vue-router + vuex 构建的一个新闻类单页面应用 —— 今日头条（移动端）](https://github.com/uncleLian/vue2-news)
- [time-formater:在javascript中显示日期](https://github.com/pengng/time-formater)


### 基础功能探索
- [人民币大小写互换](/books/知识库/07、基础功能探索/01、人民币大小写互换/README.MD)
- [audio标签兼容性自动播放解决方案](/books/知识库/04、日常采坑与记录/02、audio标签兼容性自动播放解决方案/README.md)


## 专题知识库

### [react 专题](books/专题知识库/01、react专题/README.md)
- [基础语法使用](books/专题知识库/01、react专题/README.md#%E5%9F%BA%E7%A1%80%E8%AF%AD%E6%B3%95%E4%BD%BF%E7%94%A8)
- [状态管理](books/专题知识库/01、react专题/README.md#%E7%8A%B6%E6%80%81%E7%AE%A1%E7%90%86)
- [react-router](books/专题知识库/01、react专题/README.md#react-router)
- [其他知识点和实战相关知识点](books/专题知识库/01、react专题/README.md#%E5%85%B6%E4%BB%96%E7%9F%A5%E8%AF%86%E7%82%B9%E5%92%8C%E5%AE%9E%E6%88%98%E7%9B%B8%E5%85%B3%E7%9F%A5%E8%AF%86%E7%82%B9)
- [react hooks](books/专题知识库/01、react专题/README.md#react-hooks)
- [源码分析](books/专题知识库/01、react专题/README.md#%E6%BA%90%E7%A0%81%E5%88%86%E6%9E%90)
- [其他经典文章](books/专题知识库/01、react专题/README.md#%E5%85%B6%E4%BB%96%E7%BB%8F%E5%85%B8%E6%96%87%E7%AB%A0)
- [其他的一些研究话题](books/专题知识库/01、react专题/README.md#%E5%85%B6%E4%BB%96%E7%9A%84%E4%B8%80%E4%BA%9B%E7%A0%94%E7%A9%B6%E8%AF%9D%E9%A2%98)



### [ECMAScript最新语法](/books/专题知识库/02、ECMAScript最新语法/README.md)
- [let和const](/books/专题知识库/02、ECMAScript最新语法/1、let和const/let和const.md)
- [变量的解构赋值](/books/专题知识库/02、ECMAScript最新语法/2、变量的解构赋值/变量的解构赋值.md)
- [字符串的扩展](/books/专题知识库/02、ECMAScript最新语法/3、字符串的扩展/3、字符串的扩展.md)
- [数值的扩展和Math对象的扩展](/books/专题知识库/02、ECMAScript最新语法/4、数值的扩展和Math对象的扩展/4、数值的扩展和Math对象的扩展.md)
- [数组的扩展](/books/专题知识库/02、ECMAScript最新语法/5、数组的扩展/README.md)
- [函数的扩展](/books/专题知识库/02、ECMAScript最新语法/6、函数的扩展/README.md)
- [对象的扩展](/books/专题知识库/02、ECMAScript最新语法/7、对象的扩展/README.md)
- [Proxy和Reflect](/books/专题知识库/02、ECMAScript最新语法/8、Proxy和Reflect/README.md)
- [Set和Map数据结构](/books/专题知识库/02、ECMAScript最新语法/9、Set和Map数据结构/README.md)
- [Iterator 和 for...of 循环](/books/专题知识库/02、ECMAScript最新语法/10、Iterator%20和%20for...of%20循环/README.md)
- [Generator](/books/专题知识库/02、ECMAScript最新语法/11、Generator/README.md)
- [Promise](/books/专题知识库/02、ECMAScript最新语法/12、Promise对象/README.md)
- [其他知识点儿的总结](/books/专题知识库/02、ECMAScript最新语法/13、其他知识点儿的总结)
- [es10的新特性](/books/专题知识库/02、ECMAScript最新语法/14、es10的新特性/readme.md)



### [css专题](/books/专题知识库/03、css3专题/README.md)
- [基础知识](/books/专题知识库/03、css3专题/README.md#%E5%9F%BA%E7%A1%80%E7%9F%A5%E8%AF%86)
- [进阶与案例](/books/专题知识库/03、css3专题/README.md#%E8%BF%9B%E9%98%B6%E4%B8%8E%E6%A1%88%E4%BE%8B)
- [其他知识总结](/books/专题知识库/03、css3专题/README.md#%E5%85%B6%E4%BB%96%E7%9F%A5%E8%AF%86%E6%80%BB%E7%BB%93)


### [javascript设计模式](/books/专题知识库/04、js设计模式/README.md)
- [第二篇、创建型设计模式](/books/专题知识库/04、js设计模式/02篇、创建型设计模式/README.md)
  - [第三章-简单工程模式](/books/专题知识库/04、js设计模式/02篇、创建型设计模式/README.md#%E7%AC%AC%E4%B8%89%E7%AB%A0-%E7%AE%80%E5%8D%95%E5%B7%A5%E7%A8%8B%E6%A8%A1%E5%BC%8F)
  - [第四章-工厂方法模式](/books/专题知识库/04、js设计模式/02篇、创建型设计模式/README.md#%E7%AC%AC%E5%9B%9B%E7%AB%A0-%E5%B7%A5%E5%8E%82%E6%96%B9%E6%B3%95%E6%A8%A1%E5%BC%8F)
  - [第五章-抽象工厂模式](/books/专题知识库/04、js设计模式/02篇、创建型设计模式/README.md#%E7%AC%AC%E4%BA%94%E7%AB%A0-%E6%8A%BD%E8%B1%A1%E5%B7%A5%E5%8E%82%E6%A8%A1%E5%BC%8F)
  - [第六章-建造者模式](/books/专题知识库/04、js设计模式/02篇、创建型设计模式/README.md#%E7%AC%AC%E5%85%AD%E7%AB%A0-%E5%BB%BA%E9%80%A0%E8%80%85%E6%A8%A1%E5%BC%8F)
  - [第七章-原型链模式](/books/专题知识库/04、js设计模式/02篇、创建型设计模式/README.md#%E7%AC%AC%E4%B8%83%E7%AB%A0-%E5%8E%9F%E5%9E%8B%E9%93%BE%E6%A8%A1%E5%BC%8F)
  - [第八章-单例模式](/books/专题知识库/04、js设计模式/02篇、创建型设计模式/README.md#%E7%AC%AC%E5%85%AB%E7%AB%A0-%E5%8D%95%E4%BE%8B%E6%A8%A1%E5%BC%8F)
- [第三篇、结构型设计模式](/books/专题知识库/04、js设计模式/03篇、结构型设计模式/README.md)
  - [第九章、外观模式](/books/专题知识库/04、js设计模式/03篇、结构型设计模式/README.md#%E7%AC%AC%E4%B9%9D%E7%AB%A0%E5%A4%96%E8%A7%82%E6%A8%A1%E5%BC%8F)
  - [第十章、适配器模式](/books/专题知识库/04、js设计模式/03篇、结构型设计模式/README.md#%E7%AC%AC%E5%8D%81%E7%AB%A0%E9%80%82%E9%85%8D%E5%99%A8%E6%A8%A1%E5%BC%8F)
  - [第十一章、代理模式](/books/专题知识库/04、js设计模式/03篇、结构型设计模式/README.md#%E7%AC%AC%E5%8D%81%E4%B8%80%E7%AB%A0%E4%BB%A3%E7%90%86%E6%A8%A1%E5%BC%8F)
  - [第十二章、装饰者模式](/books/专题知识库/04、js设计模式/03篇、结构型设计模式/README.md#%E7%AC%AC%E5%8D%81%E4%BA%8C%E7%AB%A0%E8%A3%85%E9%A5%B0%E8%80%85%E6%A8%A1%E5%BC%8F)
  - [第十三章、桥接模式](/books/专题知识库/04、js设计模式/03篇、结构型设计模式/README.md#%E7%AC%AC%E5%8D%81%E4%B8%89%E7%AB%A0%E6%A1%A5%E6%8E%A5%E6%A8%A1%E5%BC%8F)
  - [第十四章、组合模式](/books/专题知识库/04、js设计模式/03篇、结构型设计模式/README.md#%E7%AC%AC%E5%8D%81%E5%9B%9B%E7%AB%A0%E7%BB%84%E5%90%88%E6%A8%A1%E5%BC%8F)
  - [第十五章、享元模式](/books/专题知识库/04、js设计模式/03篇、结构型设计模式/README.md#%E7%AC%AC%E5%8D%81%E4%BA%94%E7%AB%A0%E4%BA%AB%E5%85%83%E6%A8%A1%E5%BC%8F)
- [第四篇、行为型设计模式](/books/专题知识库/04、js设计模式/04篇、行为型设计模式/README.md)
  - [第十六章、模板方法模式](/books/专题知识库/04、js设计模式/04篇、行为型设计模式/README.md#%E7%AC%AC%E5%8D%81%E5%85%AD%E7%AB%A0%E6%A8%A1%E6%9D%BF%E6%96%B9%E6%B3%95%E6%A8%A1%E5%BC%8F)
  - [第十七章、观察者模式](/books/专题知识库/04、js设计模式/04篇、行为型设计模式/README.md#%E7%AC%AC%E5%8D%81%E4%B8%83%E7%AB%A0%E8%A7%82%E5%AF%9F%E8%80%85%E6%A8%A1%E5%BC%8F)
  - [解决对象间的耦合](/books/专题知识库/04、js设计模式/04篇、行为型设计模式/README.md#%E8%A7%A3%E5%86%B3%E5%AF%B9%E8%B1%A1%E9%97%B4%E7%9A%84%E8%80%A6%E5%90%88)
  - [第十八章、状态模式](/books/专题知识库/04、js设计模式/04篇、行为型设计模式/README.md#%E7%AC%AC%E5%8D%81%E5%85%AB%E7%AB%A0%E7%8A%B6%E6%80%81%E6%A8%A1%E5%BC%8F)
  - [第十九章、策略模式](/books/专题知识库/04、js设计模式/04篇、行为型设计模式/README.md#%E7%AC%AC%E5%8D%81%E4%B9%9D%E7%AB%A0%E7%AD%96%E7%95%A5%E6%A8%A1%E5%BC%8F)
  - [第二十章、责任链模式](/books/专题知识库/04、js设计模式/04篇、行为型设计模式/README.md#%E7%AC%AC%E4%BA%8C%E5%8D%81%E7%AB%A0%E8%B4%A3%E4%BB%BB%E9%93%BE%E6%A8%A1%E5%BC%8F)
  - [第二十一章、命令模式](/books/专题知识库/04、js设计模式/04篇、行为型设计模式/README.md#%E7%AC%AC%E4%BA%8C%E5%8D%81%E4%B8%80%E7%AB%A0%E5%91%BD%E4%BB%A4%E6%A8%A1%E5%BC%8F)
  - [第二十二章、访问者模式](/books/专题知识库/04、js设计模式/04篇、行为型设计模式/README.md#%E7%AC%AC%E4%BA%8C%E5%8D%81%E4%BA%8C%E7%AB%A0%E8%AE%BF%E9%97%AE%E8%80%85%E6%A8%A1%E5%BC%8F)
  - [第二十三、中介者模式](/books/专题知识库/04、js设计模式/04篇、行为型设计模式/README.md#%E7%AC%AC%E4%BA%8C%E5%8D%81%E4%B8%89%E4%B8%AD%E4%BB%8B%E8%80%85%E6%A8%A1%E5%BC%8F)
  - [第二十四章、备忘录模式](/books/专题知识库/04、js设计模式/04篇、行为型设计模式/README.md#%E7%AC%AC%E4%BA%8C%E5%8D%81%E5%9B%9B%E7%AB%A0%E5%A4%87%E5%BF%98%E5%BD%95%E6%A8%A1%E5%BC%8F)
  - [第二十五章、迭代器模式](/books/专题知识库/04、js设计模式/04篇、行为型设计模式/README.md#%E7%AC%AC%E4%BA%8C%E5%8D%81%E4%BA%94%E7%AB%A0%E8%BF%AD%E4%BB%A3%E5%99%A8%E6%A8%A1%E5%BC%8F)
  - [第二十六章、解释器](/books/专题知识库/04、js设计模式/04篇、行为型设计模式/README.md#%E7%AC%AC%E4%BA%8C%E5%8D%81%E5%85%AD%E7%AB%A0%E8%A7%A3%E9%87%8A%E5%99%A8)









## 个人发展与OKR



### 发布的npm开源模块
- [koa2日志监控中间件:koa-logs-middleware](https://github.com/yanlele/koa-logs-middleware)
- [前端工程化](https://github.com/yanlele/le-cli)
- [前端工程化 - 模板项目](https://github.com/cli-template-build)
- [小程序接入redux](https://github.com/yanlele/redux2miniapp)

### 在折腾的个人项目
- [基于vue和express的一个小型电商全栈项目](https://github.com/yanlele/nodeMall)
- [react新闻站项目pc+移动双端](https://github.com/yanlele/React-News)
- [基于socket.IO 的一个较为复杂的项目案例，参考自《node.js实战》](https://github.com/yanlele/chatApplication)
- [react实战项目实战一：基于socket.io和express的一个全栈项目](https://github.com/yanlele/ReactAppChatWork)
- [基于vue的一些列vue全家桶的技术实现实例](https://github.com/yanlele/vueModel)
- [webpack3的学习与代码示例](https://github.com/yanlele/webpack3Study)
- [基于vue的移动端在线音乐播放器](https://github.com/yanlele/yanle-music)
- [koa2的学习笔记项目demo](https://github.com/yanlele/koa-study)



### 源码研究



------------------------------------------------------------------------------------------------------------------------------------




### 专题笔记归类(简书总结)







    
#### [04、javascript设计模式](/books/专题知识库/04、js设计模式)
- [第二篇、创建型设计模式](/books/专题知识库/04、js设计模式/02篇、创建型设计模式/README.md#class02)               
  - [03章、简单工程模式](/books/专题知识库/04、js设计模式/02篇、创建型设计模式/README.md#class02-03)
  - [04章、工厂方法模式](/books/专题知识库/04、js设计模式/02篇、创建型设计模式/README.md#class02-04)
  - [05章、抽象工厂模式](/books/专题知识库/04、js设计模式/02篇、创建型设计模式/README.md#class02-05)
  - [06章、建造者模式](/books/专题知识库/04、js设计模式/02篇、创建型设计模式/README.md#class02-06)
  - [07章、原型链模式](/books/专题知识库/04、js设计模式/02篇、创建型设计模式/README.md#class02-07)
  - [08章、单例模式](/books/专题知识库/04、js设计模式/02篇、创建型设计模式/README.md#class02-08)
- [第三篇、结构型设计模式](/books/专题知识库/04、js设计模式/03篇、结构型设计模式/README.md#class03)
  - [09章、外观模式](/books/专题知识库/04、js设计模式/03篇、结构型设计模式/README.md#class03-09)
  - [10章、适配器模式](/books/专题知识库/04、js设计模式/03篇、结构型设计模式/README.md#class03-10)
  - [11章、代理模式](/books/专题知识库/04、js设计模式/03篇、结构型设计模式/README.md#class03-11)
  - [12章、装饰者模式](/books/专题知识库/04、js设计模式/03篇、结构型设计模式/README.md#class03-12)
  - [13章、桥接模式](/books/专题知识库/04、js设计模式/03篇、结构型设计模式/README.md#class03-13)
  - [14章、组合模式](/books/专题知识库/04、js设计模式/03篇、结构型设计模式/README.md#class03-14)
  - [15章、享元模式](/books/专题知识库/04、js设计模式/03篇、结构型设计模式/README.md#class03-15)
- [第四篇、行为型设计模式](/books/专题知识库/04、js设计模式/04篇、行为型设计模式/README.md#class04)
  - [16章、模板方法模式](/books/专题知识库/04、js设计模式/04篇、行为型设计模式/README.md#class04-16)
  - [17章、观察者模式](/books/专题知识库/04、js设计模式/04篇、行为型设计模式/README.md#class04-16)
  - [18章、状态模式](/books/专题知识库/04、js设计模式/04篇、行为型设计模式/README.md#class04-16)
  - [19章、策略模式](/books/专题知识库/04、js设计模式/04篇、行为型设计模式/README.md#class04-16)
  - [20章、责任链模式](/books/专题知识库/04、js设计模式/04篇、行为型设计模式/README.md#class04-16)
  - [21章、命令模式](/books/专题知识库/04、js设计模式/04篇、行为型设计模式/README.md#class04-16)
  - [22章、访问者模式](/books/专题知识库/04、js设计模式/04篇、行为型设计模式/22-26章节.md#class04-22)
  - [23章、中介者模式](/books/专题知识库/04、js设计模式/04篇、行为型设计模式/22-26章节.md#class04-22)
  - [24章、备忘录模式](/books/专题知识库/04、js设计模式/04篇、行为型设计模式/22-26章节.md#class04-22)
  - [25章、迭代器模式](/books/专题知识库/04、js设计模式/04篇、行为型设计模式/22-26章节.md#class04-22)
  - [26章、解释器](/books/专题知识库/04、js设计模式/04篇、行为型设计模式/22-26章节.md#class04-22)
- [第五篇、技巧型设计模式](/books/专题知识库/04、js设计模式/05篇、技巧型设计模式/27-30章节.md)
  - [27章、链式模式](/books/专题知识库/04、js设计模式/05篇、技巧型设计模式/27-30章节.md#class05-27)
  - [28章、委托模式](/books/专题知识库/04、js设计模式/05篇、技巧型设计模式/27-30章节.md#class05-28)
  - [29章、数据访问对象模式](/books/专题知识库/04、js设计模式/05篇、技巧型设计模式/27-30章节.md#class05-29)
  - [30、节流模式](/books/专题知识库/04、js设计模式/05篇、技巧型设计模式/27-30章节.md#class05-30)
  - [31、简单模板模式](/books/专题知识库/04、js设计模式/05篇、技巧型设计模式/31-34章节.md#class05-31)
  - [32、惰性模式](/books/专题知识库/04、js设计模式/05篇、技巧型设计模式/31-34章节.md#class05-32)
  - [33、参与者模式](/books/专题知识库/04、js设计模式/05篇、技巧型设计模式/31-34章节.md#class05-33)
  - [34、等待着模式](/books/专题知识库/04、js设计模式/05篇、技巧型设计模式/31-34章节.md#class05-34)
- [第六篇、架构型设计模式](/books/专题知识库/04、js设计模式/06篇、架构型设计模式/README.md)
  - [35、同步模块模式](/books/专题知识库/04、js设计模式/06篇、架构型设计模式/README.md#class06-35)
  - [36、异步模块模式](/books/专题知识库/04、js设计模式/06篇、架构型设计模式/README.md#class06-36)
  - [37、Widget模式](/books/专题知识库/04、js设计模式/06篇、架构型设计模式/README.md#class06-37)


#### [05、基础知识点总结 ** 非常重要](/book/05、基础知识点专题)


#### [06、canvas总结](/book/06、canvas总结)
        

#### [07、算法学习](/book/07、算法学习)


#### [09、学习javascript数据结构与算法](/book/09、学习javascript数据结构与算法)
- [01章、javascript基础](/book/09、学习javascript数据结构与算法/README.md#class01)
    - [1.5、面向对象编程](/book/09、学习javascript数据结构与算法/README.md#class01-05)
- [03章、栈](/book/09、学习javascript数据结构与算法/README.md#class03)
    - [3.1、栈的创建](/book/09、学习javascript数据结构与算法/README.md#class03-01)
    - [3.2、从十进制到二进制](/book/09、学习javascript数据结构与算法/README.md#class03-02)
- [04章、队列](/book/09、学习javascript数据结构与算法/README.md#class04)
    - [4.1、创建队列](/book/09、学习javascript数据结构与算法/README.md#class04-01)
    - [4.2、优先队列](/book/09、学习javascript数据结构与算法/README.md#class04-02)
    - [4.3、循环队列](/book/09、学习javascript数据结构与算法/README.md#class04-03)
- [05章、链表](/book/09、学习javascript数据结构与算法/README.md#class05)
    - [5.1、创建一个链表](/book/09、学习javascript数据结构与算法/README.md#class05-01)
    - [5.2、双向链表](/book/09、学习javascript数据结构与算法/README.md#class05-02)
- [06章、集合](/book/09、学习javascript数据结构与算法/README.md#class06)
    - [6.1、创建一个集合](/book/09、学习javascript数据结构与算法/README.md#class06-01)
    - [6.2、集合操作](/book/09、学习javascript数据结构与算法/README.md#class06-02)
- [07章、字典和散列表](/book/09、学习javascript数据结构与算法/README.md#class07)
    - [7.1、字典](/book/09、学习javascript数据结构与算法/README.md#class07-01)
    - [7.2、散列表](/book/09、学习javascript数据结构与算法/README.md#class07-02)
- [08章、树](/book/09、学习javascript数据结构与算法/README.md#class08)
    - [8.1、树的相关术语](/book/09、学习javascript数据结构与算法/README.md#class08-01)
    - [8.2、二叉树和二叉搜索树](/book/09、学习javascript数据结构与算法/README.md#class08-02)              
    - [8.3、树的遍历](/book/09、学习javascript数据结构与算法/README.md#class08-03)
    - [8.4、搜索树中的值](/book/09、学习javascript数据结构与算法/README.md#class08-04)
- [09章、图](/book/09、学习javascript数据结构与算法/README.md#class09)
    - [9.1 图的相关术语](/book/09、学习javascript数据结构与算法/README.md#class09-01)
    - [9.2 图的表示](/book/09、学习javascript数据结构与算法/README.md#class09-02)
    - [9.3 创建图类](/book/09、学习javascript数据结构与算法/README.md#class09-03)
    - [9.4 图的遍历](/book/09、学习javascript数据结构与算法/README.md#class09-04)
- [10章、排序和搜索算法](/book/09、学习javascript数据结构与算法/README.md#class10)
    - [10.1 排序算法](/book/09、学习javascript数据结构与算法/README.md#class10-01)
    - [10.2 搜索算法](/book/09、学习javascript数据结构与算法/README.md#class10-02)


#### [10、DOM和BOM](/book/10、DOM和BOM)


#### [11、深入webpack工程化](/book/11、深入webpack工程化/README.md)
- [基础](/book/11、深入webpack工程化/README.md#%E5%9F%BA%E7%A1%80)
- [webpack优化问题](/book/11、深入webpack工程化/README.md#webpack%E4%BC%98%E5%8C%96%E9%97%AE%E9%A2%98)
- [其他补充知识点](/book/11、深入webpack工程化/README.md#%E5%85%B6%E4%BB%96%E8%A1%A5%E5%85%85%E7%9F%A5%E8%AF%86%E7%82%B9)
- [实战案例](/book/11、深入webpack工程化/README.md#%E5%AE%9E%E6%88%98%E6%A1%88%E4%BE%8B)
- [webpack插件和loader开发](/book/11、深入webpack工程化/README.md#webpack%E6%8F%92%E4%BB%B6%E5%92%8Cloader%E5%BC%80%E5%8F%91)
- [其他](/book/11、深入webpack工程化/README.md#%E5%85%B6%E4%BB%96)
- [遗留问题待解决](/book/11、深入webpack工程化/README.md#%E9%81%97%E7%95%99%E9%97%AE%E9%A2%98%E5%BE%85%E8%A7%A3%E5%86%B3)


#### [12、学习TypeScript](https://github.com/yanlele/TyepScript-learning)
- [一文读懂 TypeScript 泛型及应用（ 7.8K字）](https://juejin.im/post/6844904184894980104)
- [你不知道的 TypeScript 泛型（万字长文，建议收藏）](https://juejin.im/post/6844904196827774990)
- [1.2W字 | 了不起的 TypeScript 入门教程](https://juejin.im/post/6844904182843965453)
- [TypeScript 中的声明文件](https://juejin.im/post/6844903869328146440)
- [结合实例学习 Typescript](https://juejin.im/post/6876981358346895368)
- [一份不可多得的 TS 学习指南（1.8W字）](https://juejin.im/post/6872111128135073806)


#### [13、测试专题](/book/13、测试专题)
- [01篇、javascript单元测试框架mochajs详解](/book/13、测试专题/README.md#01%E7%AF%87javascript%E5%8D%95%E5%85%83%E6%B5%8B%E8%AF%95%E6%A1%86%E6%9E%B6mochajs%E8%AF%A6%E8%A7%A3)
- [02篇、断言库chai](/book/13、测试专题/README.md#02%E7%AF%87%E6%96%AD%E8%A8%80%E5%BA%93chai)
- [03篇、代码覆盖率工具 Istanbul 入门教程](/book/13、测试专题/README.md#03%E7%AF%87%E4%BB%A3%E7%A0%81%E8%A6%86%E7%9B%96%E7%8E%87%E5%B7%A5%E5%85%B7-istanbul-%E5%85%A5%E9%97%A8%E6%95%99%E7%A8%8B)
- [04篇、node层服务端api接口测试](/book/13、测试专题/README.md#04%E7%AF%87node%E5%B1%82%E6%9C%8D%E5%8A%A1%E7%AB%AFapi%E6%8E%A5%E5%8F%A3%E6%B5%8B%E8%AF%95)
- [05篇、TypeScript测试](/book/13、测试专题/README.md#05%E7%AF%87typescript%E6%B5%8B%E8%AF%95)
- [06篇、Jest测试框架](/book/13、测试专题/README.md#06%E7%AF%87jest%E6%B5%8B%E8%AF%95%E6%A1%86%E6%9E%B6)
- [07篇、react测试：jest+enzyme](/book/13、测试专题/README.md#07%E7%AF%87react%E6%B5%8B%E8%AF%95jestenzyme)
- [其他](/book/13、测试专题/README.md#%E5%85%B6%E4%BB%96)


#### [14、深入浅出MySQL 数据库开发 优化与管理维护](/book/14、深入浅出MySQL%20数据库开发%20优化与管理维护)
- [mysql下载与安装问题整理](./18年/09月/02、mysql下载与安装问题整理/)
- [node_mysql模块的使用](./18年/09月/03、node_mysql模块的使用/index.js)
- [MySQL 三万字精华总结 + 面试100 问，和面试官扯皮绰绰有余（收藏系列）](https://juejin.im/post/6850037271233331208)


#### [15、Linux相关学习](/book/15、Linux相关知识点/README.md)
- [基础部分](/book/15、Linux相关知识点/01、基础部分/README.md)
- [应用服务器](/book/15、Linux相关知识点/02、应用服务部分/README.md)
- [数据库服务](/book/15、Linux相关知识点/03、数据库服务/README.md)
- [其他服务](/book/15、Linux相关知识点/04、其他服务/README.md)
- [shell](/book/15、Linux相关知识点/05、shell)
- [vim](/book/15、Linux相关知识点/06、vim)
- [nginx](/book/15、Linux相关知识点/07、nginx)
- [CI&CD](/book/15、Linux相关知识点/08、CI&CD)


#### [16、前端数据可视化D3.js学习](https://github.com/yanlele/D3.js-learning)


#### [17、数据结构与算法专题 - todo](/book/17、数据结构与算法专题)


#### [18、flutter 基础入门](/book/18、flutter%20基础入门)
- [「 Dart Js Ts 」给前端工程师的一张Dart语言入场券](https://juejin.im/post/6844904153064407054)


#### [20、docker&DevOps](/book/20、docker&Devops)


#### [21、小程序](/book/21、小程序)


#### [22、必须要学好英语](/book/22、必须要学好英语)


#### [23、RXJS学习专题 - 放弃中（因为看不到收益）](/book/23、RXJS学习专题/23、RXJS学习专题.md)


#### [25、自我管理](/book/25、自我管理/readme.md)


#### [26、微前端专题](/book/26、微前端专题/readme.md)


#### [27、好用的库与框架 **](/book/27、好用的库与框架推荐/readme.md)


#### [28、性能分析](/book/28、性能分析/readme.md)


#### [29、源码研究]((https://github.com/Source-Research/main))



### 通用功能js模块组件



### 基础知识归类

#### [踩坑记录和一些项目的总结](./01、踩坑总结)
- [对隐藏右边滚动条的研究](./01、踩坑总结/01、对隐藏右边滚动条的研究/index.html)
- [给table的tr加不上bottom样式的解决方案](01、踩坑总结/02、给table的tr加不上bottom样式的解决方案/README.md)
- [jquery老项目模块cmd改装方案](01、踩坑总结/03、jquery老项目模块cmd改装方案/index.js)
- [关于定制化select的一些解决方案](01、踩坑总结/04、关于定制化select的一些解决方案/index.html)
- [端口被占用情况解决方案](01、踩坑总结/05、端口被占用情况解决方案/README.md)
- [git使用SSH密匙配置](01、踩坑总结/06、git使用SSH密匙配置/README.md) 
- [渐变背景色](01、踩坑总结/07、渐变背景色/index.html)
- [关于select获取值和value](01、踩坑总结/08、关于select获取值和value/index.html)
- [更改checkBox的默认样式](01、踩坑总结/09、更改checkBox的默认样式/index.html) 
- [input属性为number，maxlength不起作用如何解决](01、踩坑总结/10、input属性为number，maxlength不起作用如何解决/index.html)
- [基于jquery的锚点跳转](01、踩坑总结/11、基于jquery的锚点跳转/index.html)
- [git常用命令汇总, git命令行](01、踩坑总结/12、git常用命令汇总/README.md)
- [Mac系统占用空间大、空间不够、查看系统文件大小分布](https://blog.csdn.net/u011423056/article/details/79450845)


#### 前端基础
- [改造bootstrap的模态框功能modal](./通用功能js模块/jquery/1、modal)    
- [移动端商城购物车触控拉动](./通用功能js模块/jquery/2、touch/touch.js)
- [日历js组件独立(可以自己定制化样式)](./通用功能js模块/jquery/3、calendar/AutoDate.js)
- [空中撒金币特效](./通用功能js模块/jquery/4、点击撒金币特效/canvas撒金币.html)
- [jquery 实现轮播图](./18年/3月/12、jquery%20实现轮播图/index.html)
- [jQuery网站公告上下滚动自动轮播代码](./18年/3月/13、jQuery网站公告上下滚动自动轮播代码/index.html)
- [jquery上传组件plupload使用示例](./18年/3月/15、jquery上传组件plupload使用示例/index.js)
- [其他开源常用模块组件收录目录](./通用功能js模块/other)
- [对象的拷贝](./18年/1月/对象拷贝/对象拷贝.js)
- [数组去重算法汇总](./18年/1月/数组去重.js)
- [常见排序算法](./18年/3月/01、常见排序算法)
- [移动端rem转换的办法和策略](./18年/3月/04、移动端rem转换的办法和策略)
- [常用移动端项目head设置内容解析](./18年/3月/05、常用移动端项目head设置内容解析)
- [doT模板引擎基础语法知识点](./18年/3月/08、doT模板引擎基本语法/README.md)
- [flex布局的学习](./18年/3月/09、flex布局的学习)
- [html表格合并单元格](./18年/3月/14、html表格合并单元格/index.html)
- [清除浮动的解决方案总结](./18年/3月/16、清除浮动的解决方案总结/README.md)
- [数字金额转繁体中文大写字符串](./18年/4月/01、数字金额转繁体中文大写字符串/index.js)
- [handlebars使用大全](./18年/3月/18、handlebars使用大全/README.md)
- [handlebars-helpers主要使用说明和源码解析](./18年/4月/06、handlebars-helpers主要使用说明和源码解析)
- [JS实现倒计时精确到天数,时,分,秒或者精确到时、分、秒（小时数累加）](./18年/4月/02、JS实现倒计时精确到天数,时,分,秒或者精确到时、分、秒（小时数累加）/index.html)
- [多个promise嵌套实例](./18年/4月/03、多个promise嵌套实例/README.md)
- [关于一个高阶函数的案例](./18年/4月/test/03、关于一个高阶函数的案例.js)
- [js整理常见数组方法和字符串方法操作](./18年/4月/08、整理常见数组和字符串操作/README.md)
- [一个简单的echarts示例](./18年/5月/02、一个简单的echarts示例/README.md)
- [关于时间模块moment的使用](./18年/6月/01、关于模块moment的使用/)
- [深入javascript中Math算数对象与精确到小数位的向上舍入和向下舍入解决办法](./18年/6月/02、深入javascript中Math算数对象与精确到小数位的向上舍入和向下舍入解决办法)
- [reduce()处理对象](./18年/6月/03、reduce()处理对象/index.js)
- [Object.assign() 与 深拷贝](./18年/6月/04、Object.assign()%20与%20深拷贝)
- [深入理解 JavaScript 异步](https://github.com/wangfupeng1988/js-async-tutorial)
- [搜罗一切webpack的好文章](https://github.com/webpack-china/awesome-webpack-cn)
- [总结css3的常用示例 ***](./18年/6月/09、总结css3的常用示例)
- [关于class类的问题](./18年/07月/04、关于class类的问题)
- [关于深拷贝和浅拷贝的实现](./18年/07月/05、关于深拷贝和浅拷贝的实现)
- [深入研究call和apply(实现继承)](./18年/07月/06、深入研究call和apply)
- [关于图片预加载的研究](./18年/07月/09、关于图片预加载的研究)
- [移动端弹出层滚动时禁止body滚动，静止滚动](./18年/07月/12、移动端弹出层滚动时禁止body滚动，静止滚动)
- [《SVG精髓》 阅读笔记](https://github.com/xswei/SVG_Essentials)
- [css3新单位vw、vh、vmin、vmax的使用详解](./18年/08月/01、css3新单位vw、vh、vmin、vmax的使用详解/)
- [关于闭包的研究](./18年/08月/02、关于闭包的研究/)
- [You Don't Need jQuery](https://github.com/nefe/You-Dont-Need-jQuery/blob/master/README.zh-CN.md)
- [关于JS的触摸方法](./18年/08月/08、关于JS的触摸方法研究/)
- [关于屏幕高度，可见区域高度，目标元素高度，文档高度研究](./18年/08月/07、关于屏幕高度，可见区域高度，目标元素高度，文档高度研究/)
- [非常厉害的关于css样式](https://github.com/chokcoco/iCSS)
- [lodash中常用的方法](./18年/09月/07、lodash中常用的方法/index.js)
- [生成UUID算法总结](./18年/09月/08、生成UUID算法总结/index.js)
- [ts配置文件详解](./18年/09月/09、ts配置文件详解/tsconfig.json)
- [js实现数组里面对象的去重](./18年/10月/03、js实现数组里面对象的去重/)
- [fetch的使用](./18年/11月/01、fetch的使用/api.js)
- [前端展示太长，截取为点点点](./18年/11月/03、前端展示太长，截取为点点点/README.md)
- [关于this指针的研究](./18年/11月/02、关于this指针的研究/README.md)
- [垂直和水平居中方案](./18年/11月/04、水平和垂直方案/README.md)
- [深入fetch](./18年/11月/05、深入fetch/README.md)
- [深入call、apply、bind实现原理](./18年/11月/06、深入call、apply、bind实现原理/README.md)
- [实现函数防抖](./18年/11月/07、实现函数防抖/README.md)
- [实现函数节流](./18年/11月/08、实现函数节流/README.md)
- [深入理解JavaScript中的尾调用](./18年/11月/09、深入理解JavaScript中的尾调用/README.md)
- [Promise原理与实现](./18年/12月/05、Promise原理与实现/README.md)
- [常用工具库收集:licia](https://github.com/liriliri/licia)
- [lodash中文文档](http://lodash.net)
- [CSS3的calc()使用](https://www.w3cplus.com/css3/how-to-use-css3-calc-function.html)
- [lodash的一些高级用法](./19年/01月/03、lodash的一些高级用法)
- [JavaScript 异步、栈、事件循环、任务队列](https://segmentfault.com/a/1190000011198232)
- [FormData使用方法详解](https://www.jianshu.com/p/e438fb2238cf)
- [基于JavaScript判断浏览器到底是关闭还是刷新](http://udn.yyuap.com/forum.php?mod=viewthread&tid=96309)
- [canvas导出图片方法总结](https://www.cnblogs.com/dupd/p/5893754.html)
- [点击链接下载图片研究](./19年/03月/06、点击链接下载的研究)
- [thumbStyle](./19年/04月/03、thumbStyle/styleToCssString.js)
- [纯 CSS 实现多行文字截断](./19年/04月/04、纯%20CSS%20实现多行文字截断)
- [微信小程序 - 扩展插件（发送请求、Promise API、表单验证、Restful API）](https://github.com/skyvow/wx-extend)
- [实现js熔断机制](https://juejin.im/post/5d5c941e6fb9a06b28635429)
- [一个合格(优秀)的前端都应该阅读这些文章](https://juejin.im/post/5d387f696fb9a07eeb13ea60)
- [前端进阶必备，github 优质资源整理分享！](https://juejin.im/post/5d3edad9f265da03a652f133)
- [实现一个掘金Style的文章编辑器](https://juejin.im/post/5d5cd37ff265da0391351965#heading-7)
- [讲道理，仅3行核心css代码的rate评分组件](https://juejin.im/post/5d57adf5f265da03e3697e1b)
- [你未必知道的49个CSS知识点](https://juejin.im/post/5d3eca78e51d4561cb5dde12#heading-37)
- [你为什么这么强，什么都敢盘（reduce）](https://juejin.im/post/5d60353f5188253f64390b7d)
- [基于 HTML5 Canvas 的拓扑组件开发](https://juejin.im/post/5d631a246fb9a06b2e3cff04)
- [灵活运用CSS开发技巧(66个实用技巧，值得收藏)](https://juejin.im/post/5d4d0ec651882549594e7293)
- [如何避开JavaScript浮点数计算精度问题（如0.1+0.2!==0.3）](https://blog.csdn.net/u013347241/article/details/79210840)
- [手写算法并记住它：快速排序（5行代码简单版）](https://juejin.im/post/5d75b4d45188250c992d5919)
- [不受控制的 position:fixed](https://www.imooc.com/article/67784)
- [骚年，你确定没有人在折腾你的站点吗？](https://juejin.im/post/5da1329ce51d45783a772a11)
- [填坑-输入中文时，拼音阶段会触发input事件](./19年/10月/03、填坑-输入中文时，拼音阶段会触发input事件/03、填坑-输入中文时，拼音阶段会触发input事件.md)
- [web-component](./19年/10月/04、webComponent/04、webComponent.md)
- [层叠轮播图的简易制作](https://www.cnblogs.com/Tohold/p/9429890.html)
- [js焦点图片层叠轮播切换滚动](http://www.51qianduan.com/article/110.html)
- [原生js实现图片层叠轮播切换效果](https://teakki.com/p/57dfb317d3a7507f975e8270)
- [babel配置-各阶段的stage的区别](https://blog.csdn.net/wang252949/article/details/79064046)
- [树形对象查找](./20年/03月/01、树形对象查找/readme.md)
- [瀑布流](https://juejin.im/post/5ed5b9a26fb9a047a07f2c30)
- [原生JavaScript实现造日历](https://juejin.im/post/5cd1aa3a6fb9a0323b7e5e5c)
- [Flex弹性布局（附超Q小demo 🐸 小青蛙 ） ** ](https://juejin.im/post/5cba07005188251b960f56eb)
- [通过实现25个数组方法来理解及高效使用数组方法(长文,建议收藏)](https://juejin.im/post/5d82c12ff265da03a31d6f92)
- [引用、浅拷贝及深拷贝 到 Map、Set（含对象assign、freeze方法、WeakMap、WeakSet及数组map、reduce等等方法） **](https://juejin.im/post/5d843abe6fb9a06af510050c)
- [灵活运用CSS开发技巧](https://juejin.im/post/5d4d0ec651882549594e7293)
- [超详细的 Promise 理解与实现](https://juejin.im/post/6857934319886893064)
- [前端 Promise 常见的应用场景](https://juejin.im/post/6844904131702833159)
- [Promise 执行过程的正确理解姿势](https://juejin.im/post/6844903974563233799)
- [【JavaScript】必须要会的手写Promise](https://juejin.im/post/6844904142087913486)
- [从零开始配置 TypeScript 项目](https://juejin.im/post/6856410900577026061)
- [新手前端不要慌! 给你10根救命稻草](https://juejin.im/post/6844903955441401870)
- [15个元素实现无限滚动 **](https://juejin.im/post/5d7f80796fb9a06b24434d4e)
- [手写axios核心原理，再也不怕面试官问我axios原理](https://juejin.im/post/6856706569263677447)
- [使用WebGL去实现一个拖拽式UI代码生成App](https://juejin.im/post/6846687604096630792)
- [vue移动端h5适配解决方案（rem or vw）](https://juejin.im/post/6844903917126434829)
- [H5 直播的疯狂点赞动画是如何实现的？(附完整源码)](https://juejin.im/post/6844904126476730375)
- [模仿实现一个直播的点赞动画](https://juejin.im/post/6844904151952916487)
- [** 25个你不得不知道的数组reduce高级用法](https://juejin.im/post/6844904063729926152)
- [为了性能选择for循环遍历？](https://juejin.im/post/6844904191425511432)
- [[译] 2018 来谈谈 Web Component](https://juejin.im/post/6844903661403897870)
- [前端存储除了 localStorage 还有啥](https://juejin.im/post/6844904192549584903)
- [忍法，scroll 翻滚之术！](https://juejin.im/post/6844904081559912462)
- [JavaScript 装饰器](https://juejin.im/post/6844904100144889864)
- [骚年，你确定没有人在折腾你的站点吗？](https://juejin.im/post/6844903966505975822)
- [为什么Vue3.0使用Proxy实现数据监听？defineProperty表示不背这个锅](https://juejin.im/post/6844903965180575751)
- [如何写出一个惊艳面试官的深拷贝?](https://juejin.im/post/6844903929705136141)
- [引用、浅拷贝及深拷贝 到 Map、Set（含对象assign、freeze方法、WeakMap、WeakSet及数组map、reduce等等方法）](https://juejin.im/post/6844903951247081485)
- [jquery 获取多个checkbox的值](./18年/3月/10、jquery%20获取多个checkbox的值)
- [jquery获取表单form数据](./18年/3月/17、jquery获取表单数据/README.md)
- [关于jquery的deferred对象](./18年/07月/10、关于jquery的deferred对象)
- [js中的pipe](./docs/2021年/07月/02、js中的pipe/readme.md)

        

#### vue
- [vuex官方经典实例和使用](./18年/1月/shopping-cart)
- [vue项目实际开发总结](./18年/3月/03、vue项目实际开发总结)
- [MVVM双向绑定原理研究与简单的双向绑定实现(包含简单的事件绑定)](./18年/3月/06、双向绑定核心代码)
- [github上VUE 开源项目汇总](./18年/3月/07、VUE开源项目汇总/README.md)
- [深度解析！Vue3 & React Hooks 新UI组件原理：Modal 弹窗](https://juejin.im/post/6844904100992155661)
- [** 史上最强vue总结---面试开发全靠它了](https://juejin.im/post/6850037277675454478)
- [swiper](./通用功能js模块/vue/1、swiper/swiper.vue)
- [vue使用的转场特效插件 - vueg](https://github.com/jaweii/vueg)
- [全面解析 vue3.0 diff算法](https://juejin.im/post/6861960532048642061)
    

#### 前端周边生态圈技术栈
- [Yarn Workspace 使用指南](https://www.jianshu.com/p/990afa30b6fe)
- [axios 的一些基本用法](./17年/12月/10、axios%20的一些基本用法)
- [常用的正则验证例子](./17年/12月/13、正则验证/README.md)
- [获取设备信息(推荐使用模块mobile-detect)](./17年/12月/14、获取设备信息专题/index.js)
- [nvm常用命令行](./18年/3月/11、nvm常用命令行/README.md)
- [微信分享JS-SDK](./18年/4月/04、微信分享JS-SDK/index.js)
- [brew常用命令行](./02、生态圈技术栈/01、brew常用命令行/README.md)
- [Mac机上安装nvm遇到的坑--nvm command not found](https://www.cnblogs.com/giggle/p/7075548.html)
- [mac常用命令行](./02、生态圈技术栈/03、mac常用命令行/README.md)
- [README文件语法解读，即Github Flavored Markdown语法介绍](https://github.com/guodongxiaren/README)
- [egret-core(html5游戏引擎)](https://github.com/egret-labs/egret-core)
- [项目规范（包含git管理项目的使用）](https://github.com/elsewhencode/project-guidelines/blob/master/README-zh.md)
- [MarkDown添加图片的三种方式 - 找时间自己总结一边](https://blog.csdn.net/slaughterdevil/article/details/79255933)
- [html转换为img、html转换为pdf:render-html-to-pdf](https://github.com/linwalker/render-html-to-pdf)
- [GithubPages教程 在GithubPages上搭建个人主页](https://blog.csdn.net/yanzhenjie1003/article/details/51703370)
- [一篇文章，教你学会Git](https://mp.weixin.qq.com/s/-TC07TQoiTNRUJIdBv46SQ)
- [发布、安装自己的npm模块](https://www.cnblogs.com/yanhua2017/p/7748491.html)
- [eslint配置文件eslintrc参数详解](./18年/09月/01、eslint配置文件eslintrc参数详解/)
- [2018前端常见题汇总，不定时更新](https://github.com/qianbin01/frontend_train)
- [npm镜像源的切换问题](./18年/09月/05、npm镜像源切换问题/README.md)
- [基于HTML5技术的幻灯片编辑、播放、控制的全套方案](https://github.com/Jinjiang/h5slides)
- [每个 JavaScript 工程师都应懂的33个概念](https://github.com/stephentian/33-js-concepts)
- [JavaScript音频播放库](https://github.com/goldfire/howler.js)
- [内容一键复制到剪切板模块](https://github.com/zenorocha/clipboard.js)
- [参数校验模块:parameter](https://github.com/node-modules/parameter)
- [WebStrom Live Template 建代码块](https://blog.csdn.net/liangrongliu1991/article/details/79626960)
- [Git的奇技淫巧](https://github.com/521xueweihan/git-tips)
- [Sequelize 文档的中文版本](https://github.com/demopark/sequelize-docs-Zh-CN)
- [常用eslint配置](./19年/01月/01、常用eslint配置)
- [常用tslint配置](./19年/01月/02、常用tslint配置)
- [解决mac安装homebrew后报错-bash: brew: command not found](https://blog.csdn.net/li396864285/article/details/52572163)
- [mac 上安装 nvm 遇到的坑](https://www.jianshu.com/p/f6c3ecfdbd97)
- [使用lerna管理大型前端项目](https://www.jianshu.com/p/2f9c05b119c9)
- [lerna的基础使用](https://www.jianshu.com/p/8b7e6025354b)
- [Lerna 中文教程详解](https://segmentfault.com/a/1190000019350611?utm_source=tag-newest)
- [Git Submodule项目子模块管理](https://blog.csdn.net/xiangzhihong8/article/details/80535495)
- [commitlint+husky规范commit 日志](https://blog.csdn.net/wei371522/article/details/84070803)
- [Git commit message和工作流规范](https://www.imooc.com/article/16780)
- [git合并多个提交](https://www.cnblogs.com/tocy/p/git-rebase-merge-commit.html)
- [Git提交消息: git-cz](https://www.jianshu.com/p/28617fd95c67)
- [数据驱动、渐进式Canvas库，配备Chrome调试插件，支持微信小游戏、物理引擎、2D&3D混合渲染等](https://github.com/c-zhuo/easycanvas)
- [git commit message emoji 使用指南](https://github.com/liuchengxu/git-commit-emoji-cn)
- [impress.js制作漂亮前端页面级别PPT](https://github.com/impress/impress.js)
- [Github上开源项目readme里好看的高大上的有趣的徽章从何而来](https://blog.csdn.net/xialonghua/article/details/87373052)
- [nodeppt: 把md文档做成PPT](https://github.com/ksky521/nodeppt)
- [对于水印的研究](./19年/03月/04、水印)
- [css加载会造成阻塞吗？](./19年/03月/05、css%20加载会造成阻塞吗？/index.md)
- [Dexie.js:A Minimalistic Wrapper for IndexedDB](https://github.com/dfahlander/Dexie.js)
- [Commitizen(git-cz)配置](./19年/04月/02、Commitizen(git-cz)配置)
- [从输入url到页面展示到底发生了什么？](https://mp.weixin.qq.com/s?__biz=MzU2MTI4MjI0MQ==&mid=2247486007&idx=1&sn=176d131e0d35bf9ede04c31effd51e48&chksm=fc7a6799cb0dee8f472b2f44eaa1adc312f99cf3f053bd00f24c2dc1265d83c9823b128a4eaf&mpshare=1&scene=23&srcid=0408UkbC9si520rEHA2w5oCc)
- [gitbook-use](https://github.com/zhangjikai/gitbook-use)
- [抽象语法树（AST）](https://segmentfault.com/a/1190000016231512)
- [WebStorm 关闭自动保存功能添加*星星标记](https://blog.csdn.net/fisherapp1995/article/details/85063199)
- [LeetCode 算法题刷题心得](https://www.jianshu.com/p/8876704ea9c8) 
- [git操作之git clean删除一些没有git add的文件](https://www.cnblogs.com/pcx105/p/10036781.html)
- [react源码分析(3)：react的事件委托机制](https://www.jianshu.com/p/b249793fd2a7)
- [基于storage开发缓存库 - 源码研究](https://github.com/myronliu347/store.js)
- [Git中tag标签的使用](https://blog.csdn.net/wei78008023/article/details/81866590)
- [这些Web API真的有用吗?](https://juejin.im/post/5d5df391e51d453b1e478ad0)
- [typescript 类型映射 （ReadOnly、Partial）](https://blog.csdn.net/qq_30101131/article/details/83214295)
- [Ant Design中使用CodeMirror2代码编辑器](https://www.jianshu.com/p/4d5ef6808da7)
- [Ajax,jQuery ajax,axios和fetch介绍、区别以及优缺点](https://juejin.im/post/5d5e673ff265da03d2114646)
- [高性能渲染十万条数据](https://juejin.im/post/5d76f469f265da039a28aff7)
- [使用husky、prettier、lint、commitlint构建规范化项目实践](./19年/09月/01、使用husky、prettier、lint、commitlint构建规范化项目实践/01、使用husky、prettier、lint、commitlint构建规范化项目实践.md)
- [eslint检测TS项目](./19年/09月/02、eslint检测TS项目/02、eslint检测TS项目.md)
- [指定文件、指定行、指定代码块不使用ESLint语法检查](https://blog.csdn.net/u013362969/article/details/81215336)
- [前端mock解决方案](./19年/08月/02、前端mock解决方案/02、前端mock解决方案.md)
- [在 JS 循环中正确使用 async 与 await](https://blog.csdn.net/sanstu/article/details/90904852)
- [简单好用的动画库：anime](https://github.com/juliangarnier/anime)
- [请你实现一个大文件上传和断点续传](https://juejin.im/post/5dff8a26e51d4558105420ed)
- [编写一个axios这样的库](https://juejin.im/post/5e16e5d76fb9a02fd742a92b)
- [pm2 实践指南](https://juejin.im/post/5e1fa941e51d451c774dcc18)
- [前端轻量化部署脚手架实践](https://juejin.im/post/5e1bfbadf265da3e3077005e)
- [React SSR 服务端渲染和同构原理 **](https://juejin.im/post/5d7deef6e51d453bb13b66cd)
- [揭秘vue/react组件库中5个"作者不造的XX"](https://juejin.im/post/5d89cd156fb9a06acb3ee19e)
- [手动实现高仿github的内容diff效果](https://juejin.im/post/6857316059851325453)
- [手写webpack核心原理，再也不怕面试官问我webpack原理 **](https://juejin.im/post/6854573217336541192)
- [【万字长文警告】从头到尾彻底理解服务端渲染SSR原理 **](https://juejin.im/post/6856321751115431944)
- [AST原理，让你蜕变为高级前端工程师的原理](https://juejin.im/post/6854573222071894029)
- [** 近万字新手 chrome 扩展开发简单入门](https://juejin.im/post/6844904127932137485)
- [原生JS封装拖动验证滑块你会吗？](https://juejin.im/post/6844904175910780941)
- [** 如何实现高性能的在线 PDF 预览](https://juejin.im/post/6844904176296656903)
- [从零开始写一个采集图片的chrome插件](https://juejin.im/post/6844904097829617678)
- [你可能不知道的15个有用的Github功能](https://juejin.im/post/6844904193396834318)
- [一文了解文件上传全过程（1.8w字深度解析，进阶必备）](https://juejin.im/post/6844904106658643982)
- [今天教你烤一份香喷喷的Electron](https://juejin.im/post/6854573221467914248)
- [艰难用echarts模拟甘特图, 直到我发现了dhtmlxGantt](https://juejin.im/post/6844904106042064910)
- [你了解过移动端适配吗](https://juejin.im/post/6844903631993454600)
- [深入浅出 Babel 上篇：架构和原理 + 实战](https://juejin.im/post/6844903956905197576)
- [深入浅出 Babel 下篇：既生 Plugin 何生 Macros](https://juejin.im/post/6844903961820921869)
- [1小时搞定cropper.js制作头像/图片上传、裁剪、并发送至后端](https://juejin.im/post/6844903955915341831)
- [优秀前端必知的话题：我们应该做些力所能及的优化](https://juejin.im/post/6844903688222277640)
- [当浏览器全面禁用三方 Cookie](https://juejin.im/post/6844904128557105166)
- [浏览器里的本地数据库：IndexedDB](https://juejin.im/post/6844903965792927752)
- [一张刮刮卡竟包含这么多前端知识点](https://juejin.im/post/6844903952157245447)
- [揭秘vue/react组件库中5个"作者不造的XX"](https://juejin.im/post/6844903951729426439)
- [《前端那些事》从0到1开发工具库](https://juejin.im/post/6844904127923765256)
- [Chrome插件开发全攻略 **](https://github.com/sxei/chrome-plugin-demo)
- [AST入门](https://juejin.im/post/6885146952877031432)
- [前端搞工程化：从零打造性能检测库 ** ](https://juejin.cn/post/6919295789630455815)
- [最新性能指标 **](https://juejin.cn/post/6850037270729359367)
- [可视化拖拽组件库一些技术要点原理分析 ** ](https://juejin.cn/post/6908502083075325959)
- [可视化拖拽组件库一些技术要点原理分析（二）**](https://juejin.cn/post/6918881497264947207)
- [可视化拖拽组件库一些技术要点原理分析（三）](https://juejin.cn/post/6929302655118344200)
- [2021如何让你的Table组件无限可能](https://juejin.cn/post/6920874509834649607)
- [还在看那些老掉牙的性能优化文章么？这些最新性能指标了解下](https://juejin.cn/post/6850037270729359367)
- [前端搞工程化：从零打造性能检测库「源码 + 视频」**](https://juejin.cn/post/6919295789630455815)
- [项目创建从editorconfig和prettier开始](https://juejin.cn/post/6860440041039069191)
- [一文搞懂peerDependencies](https://juejin.cn/post/6844904134248759309)
- [React 实现简易的图片拖动排序](https://juejin.cn/post/6896712416928169991)
- [Base64原理](https://juejin.cn/post/6844903698045370376)
- [AST详解与运用](https://juejin.cn/post/6885146952877031432)
- [手把手教你快速搭建专属的storybook](https://juejin.cn/post/6844903752982331405)
- [使用ESLint+Prettier来统一前端代码风格](https://juejin.cn/post/6844903621805473800)
- [从破解某设计网站谈前端水印](https://juejin.cn/post/6900713052270755847)
- [实现Web端自定义截屏](https://juejin.cn/post/6924368956950052877)
- [Chrome DevTools之NetWork面板](https://juejin.im/post/6844904036085301261)
- [重新认识 package.json](https://juejin.cn/post/6844904159226003463)

   

#### node其他知识点
- [mongoose的链表查询](./17年/12月/7、mongoose的链表查询)
- [mongodb 缓存session](./17年/12月/8、mongodb缓存session)
- [mongoose的扩展用法](./18年/1月/7、mongoose的扩展用法)
- [mongoose创建数据结构和实现基本的增删改查](./18年/1月/13、mongoose创建数据结构和实现基本的增删改查)
- [通过express来读取mock数据（这是一个失败的实例，不要学习，仅供参考）](./17年/12月/5、通过express来读取mock数据（这是一个失败的实例，不要学习，仅供参考）)
- [express中间件原理](./18年/1月/express中间件的原理/express中间件原理.js)
- [express装载路由方式](./18年/1月/8、express装载路由的方法)
- [express登录拦截与校验](./18年/1月/9、登录拦截与校验)
- [express日志](./18年/1月/10、express日志打印)
- [koa2-sql项目搭建的示例（通过sql链接数据库）](./18年/1月/12、koa2项目框架搭建)
- [上传文件的测试](/17年/12月/1、上传文件的测试)
- [async/await专题](./17年/12月/2、async&&await)
- [fs模块对文件夹的操作](./17年/12月/3、fs模块学习)
- [fs模块对文件的操作](./17年/12月/4、fs对文件的操作)
- [mock终极解决方案(mock2easy-middleware)](./17年/12月/6、mock终极解决方案/server.js)
- [使用multer处理文件上传](./17年/12月/9、使用multer处理文件上传)
- [CommonJs模块规范](./18年/2月/1、commonjs)
- [node基础api_path](./18年/2月/3、node基础api_path)
- [node基础api_Buffer](./18年/2月/4、node基础api_Buffer)
- [node基础api_event](./18年/2月/5、node基础api_event)
- [node基础api_fs](./18年/2月/6、node基础api_fs)
- [单元测试(mocha)](./18年/2月/7、单元测试)
- [大型服务端项目测试(mocha)和UT覆盖示例](./18年/3月/02、大型服务端项目测试和UT覆盖示例)
- [关于一个随机分类的分组的一个项目](./18年/5月/03、关于一个随机分类的分组的一个项目/)
- [关于取重算法的研究](./18年/5月/04、关于取重算法的研究/)
- [nodejs生成表格和解析表格](./18年/5月/05、nodejs生成表格和解析表格/)
- [nodejs实现控制台输入输出](./18年/5月/06、nodejs实现控制台输入输出/)
- [把文档文本文件(*.docx)转换文html](https://github.com/mwilliamson/mammoth.js)
- [Create PDF files using React](https://github.com/diegomura/react-pdf)
- [Create, read and edit .zip files with Javascript](https://github.com/Stuk/jszip)
- [mocha测试post和get请求](./18年/6月/05、mocha测试post和get请求)
- [前后端对称加解密解决方案](./18年/07月/01、前后端对称加解密解决方案/index.js)
- [封装日志模块 - 基于chalk](./18年/07月/02、封装日志输出模块/index.js)
- [封装web-app启动模块](./18年/07月/03、封装web-app启动模块/boot.js)
- [通过user_agent判断用户设备类型（移动还是PC）](./18年/07月/13、通过user_agent判断用户设备类型（移动还是PC）/index.js)
- [获取客户端IP](./18年/07月/14、获取客户端IP/index.js)
- [读取递归目录的路径模块: recursive-readdir](https://github.com/jergason/recursive-readdir)
- [将glob表达式转换为JavaScript RegExp对象:minimatch](https://github.com/isaacs/minimatch)
- [用于node.js的HTTP请求日志程序中间件:morgan](https://github.com/expressjs/morgan)
- [handlebars-helpers注入服务端渲染方法](./18年/07月/15、handlebars-helpers注入服务端渲染方法)
- [对官方handlebars-layouts进行扩展，支持指定particles](./18年/07月/16、对官方handlebars-layouts进行扩展，支持指定particles/handlebars-layout.js)
- [js加解密库: crypto-js](https://github.com/brix/crypto-js)
- [服务端生成二维码:qr-image](https://github.com/alexeyten/qr-image)
- [客户端生成二维码:jrQrcode](https://github.com/diamont1001/jrQrcode)
- [Inquirer.js交互式命令行工具](./18年/08月/05、Inquirer.js交互式命令行工具/)
- [对commander的研究](./18年/08月/06、对commander的研究/)
- [测试框架mochajs详解](https://github.com/zhaosaisai/mocha-in-chinese)
- [对日志监控系统的研究(bunyan)](./18年/09月/04、对日志监控系统的研究(bunyan)/)
- [启动本地文件服务的一个模块serve](https://github.com/zeit/serve)
- [快速线上部署的模块now](https://github.com/zeit/now-cli)
- [Windows上使用redis的文章](https://blog.csdn.net/u010137839/article/details/80210328)
- [koa连接redis做缓存](./18年/10月/01、koa连接redis做缓存/README.md)
- [json验证模块jsonschema的使用](./18年/10月/02、json验证模块jsonschema的使用/)
- [Safely and quickly serialize JavaScript objects](https://github.com/davidmarkclements/fast-safe-stringify)
- [关于内存泄漏的文章](https://github.com/zhansingsong/js-leakage-patterns)
- [WebSocket和Socket.io](https://www.jianshu.com/p/4e80b931cdea)
- [深度递归合并JS对象](https://github.com/KyleAMathews/deepmerge)
- [深度递归对比JS对象](https://github.com/flitbit/diff)
- [《HTTP权威指南》每章的知识点总结](https://github.com/woai30231/http)
- [V8引擎初步介绍](./18年/12月/03、V8引擎初步介绍/README.md)
- [node内存优化](./18年/12月/04、node内存优化/README.md)
- [深度对比算法研究](./18年/12月/06、深度对比算法研究/buildDiff.js)
- [html输出文件结构](./19年/03月/01、html输出文件结构)
- [node-rd: 遍历目录下面所有文件目录](./19年/03月/03、node-rd)
- [node爬虫](./19年/04月/01、node爬虫)
- [Cross platform setting of environment scripts:cross-env](https://github.com/kentcdodds/cross-env)
- [Download and extract a git repository (GitHub, GitLab, Bitbucket) from node.](https://github.com/flipxfx/download-git-repo)
- [基于node的代码生成器](https://github.com/yanlele/node-index-core/tree/master/packages/19%E5%B9%B4/05%E6%9C%88/01%E3%80%81%E4%BB%A3%E7%A0%81%E7%94%9F%E6%88%90%E5%99%A8)
- [【译】Node.js 子进程：你需要知道的一切](https://mp.weixin.qq.com/s/6reZnrYaD-1BZ50nwWYS3g)
- [yargs the modern, pirate-themed successor to optimist.](https://github.com/yargs/yargs)
- [localForage: 本地存储解决方案](https://github.com/localForage/localForage)
- [写一个 JS 调用栈可视化工具 hound-trace](https://juejin.im/post/5d555ca851882554a13f7cad)
- [一步步带你实现web全景看房——three.js](https://juejin.im/post/5d57967a6fb9a06b017e4b62)
- [前端该如何准备数据结构和算法？](https://juejin.im/post/5d5b307b5188253da24d3cd1)
- [GraphQL + Apollo + Vue 牛刀小试](https://juejin.im/post/5cecc597e51d454fbe24a61a)
- [apollo-graphql 自己使用的一点姿势](https://juejin.im/post/5ca2bd5c51882543e4506fbf)
- [require时，exports和module.exports的区别你真的懂吗？](https://juejin.im/post/5d5639c7e51d453b5c1218b4)
- [5分钟教你用nodeJS手写一个mock数据服务器](https://juejin.im/post/5d7345bce51d453b76258503)
- [从0构建一个TS-Node项目](./19年/12月/01、从0构建一个TS-Node项目/01、从0构建一个TS-Node项目.md)
- [关于node.js中流的理解](https://juejin.im/post/5cbaba8ce51d456e747c5343)
- [linux安装mongoDB与NodeJs远程连接](https://juejin.im/post/5cb6cc72518825327854752e)
- [前端工程师须知的CORS知识](https://juejin.im/post/5cbaa6ef5188253feb5855be)
- [你不能不知道的Koa实现原理](https://juejin.im/post/5d1964bfe51d454fd8057bcb)
- [深入理解Node.js 中的进程与线程](https://juejin.im/post/6844903908385488903)
- [JavaScript-V8引擎](https://juejin.im/post/6844903950089453575)
- [Deno 正式发布，彻底弄明白和 node 的区别](https://juejin.im/post/6844904158617665544)
- [使用 Proxy 构建响应式系统](https://juejin.im/post/6844903950093664264)
- [使用四十行代码实现一个核心 koa](https://juejin.im/post/6844904096516816904)
- [[译] Node.js 新特性将颠覆 AI、物联网等更多惊人领域](https://juejin.im/post/6844903985053188109) 
- [【图文详解】200行JS代码，带你实现代码编译器（人人都能学会）](https://juejin.im/post/6844904105937207304)
- [《大前端进阶 Node.js》系列 双十一秒杀系统（进阶必看）](https://juejin.im/post/6844904095514378254)
- [如何优雅的实现消息通信？](https://juejin.im/post/6865444445479927821)
    
    

#### 杂项
- [Hbase中多版本(version)数据获取办法](https://blog.csdn.net/liuchuanhong1/article/details/53895234/)
- [Docker上安装运行Hbase](https://blog.csdn.net/liuchuanhong1/article/details/53895234/)
- [HBase基本概念与基本使用](https://www.cnblogs.com/swordfall/p/8737328.html#auto_id_9)
- [jetbrains:同步服务器代码](https://www.jianshu.com/p/49442ec9bc9f)
- [mac Homebrew 装包加速](./20年/06月/01、mac%20Homebrew%20装包加速/readme.md)
- [前端职业规划 - 写给那些想去和刚去大厂的年轻人(鸡汤有毒)](https://juejin.im/post/6854828407890477064)
- [【深度思考】如何优雅告知用户，网站正在升级维护？](https://juejin.im/post/6857673247819989000)
- [从GraphQL到前端数据管理的革命 - GraphQL干货笔记](https://juejin.im/post/6844904196848762888)
- [好玩的Jenkins](https://juejin.im/post/6844904176078553096)
- [分分钟教会你搭建企业级的 npm 私有仓库](https://juejin.im/post/6844904196651630599)
- [在 WebStorm 中，配置能够识别 Vue CLI 3 创建的项目的别名 alias @](https://juejin.im/post/6844903802185891848)
- [技术探索：60 天急速自研-前端埋点监控跟踪系统大浪子](https://juejin.im/post/6844903954199887880)
- [** 前端代码质量-圈复杂度原理和实践](https://juejin.im/post/6844903965792927751)
- [git clone 太慢了的解决办法](./docs/2020年/08月/01、git%20clone%20太慢了的解决办法/readme.md)
- [简析解决问题的通用方法论](https://juejin.cn/post/6891167960589664264)
- [技术人员升级打怪的方法论](https://juejin.cn/post/6900939109670322189)
- [测试金字塔实战](https://insights.thoughtworks.cn/practical-test-pyramid/)
- [键盘控制工具: Karabiner-Elements](https://github.com/pqrs-org/Karabiner-Elements)
- [控制应用缩放-眼镜: Spectacle allows you to organize your windows without using a mouse.](https://github.com/eczarny/spectacle)
- [syncd是一款开源的代码部署工具](https://github.com/dreamans/syncd)
- [磁力链接聚合搜索](https://github.com/xiandanin/magnetW)
- [使用jetbrains](https://www.macwk.com/article/jetbrains-crack)
- [访问github的九种办法](https://mp.weixin.qq.com/s/3LfveCU2Hm7N6OnV3Gtx3Q)
- [谷歌出品的Web打包方案：Web Bundles 技术揭秘](https://mp.weixin.qq.com/s/_7_KrY_ozbUZxzUlCU_B4w)
- [github开发人员在七夕搞事情：remote: Support for password authentication was removed on August 13, 2021.](https://blog.csdn.net/weixin_41010198/article/details/119698015)




    
#### 其他优秀技术文章与前沿技术收集
- 博客部分
  - [前端九部](https://github.com/frontend9/fe9-library)
  - [冴羽博客](https://github.com/mqyqingfeng/Blog)
  - [梁少峰博客](https://github.com/youngwind/blog)
  - [@chenshenhai的博客](https://github.com/chenshenhai/blog)
  - [木易杨博客](https://github.com/yygmind/blog)
  - [木易杨说 - 掘金](https://juejin.im/user/56dea4aa7664bf00559f002d/posts)
  - [浪里行舟博客:vue、页面优化、js](https://github.com/ljianshu/Blog)
  - [颜海镜的个人博客:react以及杂类](https://github.com/yanhaijing/yanhaijing.github.io)
  - [ljianshu博客](https://github.com/ljianshu/Blog)
  - [多个关于react的好文章合集: 搭建react全家桶、react高阶组件、react-router4、理解redux](https://github.com/brickspert/blog)                     
  - [SunShinewyf博客:webpack、koa、express、egg、react](https://github.com/SunShinewyf/issue-blog)                      
  - [muwoo/blogs博客：关于vue 源码解析](https://github.com/muwoo/blogs)
  - [forthealllight博客：关于react、js、node、Three.js](https://github.com/forthealllight/blog)
  - [hoperyy/blog:各种文章累心过得收集](https://github.com/hoperyy/blog)
  - [言川的博客](https://github.com/lihongxun945/myblog)
  - [xiaozhi的博客](https://github.com/qq449245884/xiaozhi)
  - [alienzhou/blog](https://github.com/alienzhou/blog)
  - [AnnVoV/blog](https://github.com/AnnVoV/blog/issues)
  - [前端面试 | 设计模式手册 | Webpack4教程 | NodeJs实战 | Js版·剑指offer刷题笔记 ](https://github.com/dongyuanxin/blog)
  - [这个人的博客里面有对puppeteer的研究](https://me.csdn.net/qupan1993)
  - [Full-Stack-Library ** 非常重要](https://github.com/ViktorWong/Full-Stack-Library)
  - [lcxfs1991/blog ** 较高水准的blog](https://github.com/lcxfs1991/blog)
  - [sisterAn/blog](https://github.com/sisterAn/blog/issues)
  - [leetcode-javascript - LeetCode 力扣的 JavaScript 题解和思路](https://github.com/sl1673495/leetcode-javascript/issues)
  - [frontend-hard-mode-interview](https://github.com/coffe1891/frontend-hard-mode-interview)
  - [** 江南一点雨](https://me.csdn.net/u012702547)
  - [** 神三元](https://juejin.im/user/430664257382462/posts)
  - [前端进阶之路](https://github.com/KieSun/FE-advance-road)
  - [Miller: 对源码有所研究](https://juejin.cn/user/395479918064007/posts)
  - [jartto](http://jartto.wang/all-categories/)

- 文章部分
  - [node-interview](https://github.com/ElemeFE/node-interview/tree/master/sections/zh-cn)
  - [《Node.js从入门到上线》A blog build with Koa2](https://github.com/liuxing/node-blog)
  - [《Koa.js 设计模式-学习笔记》](https://github.com/chenshenhai/koajs-design-note)
  - [vue源码解析](https://github.com/muwoo/blogs)
  - [每日时报，会以前端技术体系为主要分享课题](https://github.com/wubaiqing/zaobao)
  - [《快乐的 Linux 命令行》](https://github.com/billie66/TLCL)
  - [学习资源 or 大前端导航](https://github.com/webproblem/learning-article)
  - [Styled-Components](https://segmentfault.com/a/1190000014682665)
  - [redux-observable](https://redux-observable-cn.js.org)
  - [内网渗透TIPS相关文章](https://github.com/Ridter/Intranet_Penetration_Tips)
  - [learning-threejs](https://github.com/josdirksen/learning-threejs)
  - [Fiber and hooks](https://github.com/132yse/fre)
  - [Python数据挖掘与实战](https://github.com/LinXueyuanStdio/PythonDataMining)
  - [JS 全栈开发，技术栈：Egg.js + Vue.js + MySQL](https://github.com/padipata/js-summarize)
  - [《动手学深度学习》](https://github.com/d2l-ai/d2l-zh)
  - [侧重后端应用与对Node核心的理解](https://github.com/jimuyouyou/node-interview-questions)
  - [TS + React + Antd + Koa2 + MongoDB实现的 TodoList 全栈应用](https://github.com/B2D1/TodoList)
  - [前端算法基础**](https://github.com/Advanced-Frontend/Daily-Interview-Question)
  - [git rebase 还是 merge的使用场景最通俗的解释](https://www.jianshu.com/p/4079284dd970)
  - [Java 程序员眼中的 Linux](https://github.com/judasn/Linux-Tutorial)
  - [浏览器数据库 IndexedDB 入门教程](http://www.ruanyifeng.com/blog/2018/07/indexeddb.html)
  - [跨域资源共享 CORS 详解](http://www.ruanyifeng.com/blog/2016/04/cors.html)
  - [走进Vue-cli源码，自己动手搭建前端脚手架工具](https://www.jianshu.com/p/749b22170b7b)
  - [vue-cli的简单实现](https://www.jianshu.com/p/fe174b7eeee3)
  - [使用 NPM 发布与维护 TypeScript 模块](https://my.oschina.net/fenying/blog/1607571)
  - [腾讯云开发者手册](https://cloud.tencent.com/developer/devdocs)
  - [腾讯云开发者手册 - nest](https://cloud.tencent.com/developer/doc/1281)
  - [React + Electron 搭建一个桌面应用](https://juejin.im/post/5a6a91276fb9a01cbd58ce32)
  - [从浏览器渲染原理，说一说如何实现高效的动画](https://juejin.im/post/5d2491ba6fb9a07ecf724b69)
  - [react源码分析(3)：react的事件委托机制](https://www.jianshu.com/p/b249793fd2a7)
  - [Git中tag标签的使用](https://blog.csdn.net/wei78008023/article/details/81866590)
  - [前端该如何准备数据结构和算法？](https://juejin.im/post/5d5b307b5188253da24d3cd1#heading-17)
  - [** 一个合格(优秀)的前端都应该阅读这些文章](https://juejin.im/post/6844903896637259784)


#### 值得好好学习的开源项目
- [Node - 从0基础到实战企业官](https://juejin.im/post/5c1f8e52f265da6170071e43)
- [一个完整的react+redux项目示例和人总结](https://github.com/bailicangdu/react-pxq)
- [某博客知识点儿，写的很好，找个时间可以多学习一下](https://github.com/muwoo/blogs)
- [基于 node.js + Mongodb 构建的后台系统](https://github.com/bailicangdu/node-elm)
- [react-redux-typescript-boilerplate](https://github.com/rokoroku/react-redux-typescript-boilerplate)
- [react-webpack-typescript-starter](https://github.com/vikpe/react-webpack-typescript-starter)
- [typescript-react-redux](https://github.com/rjz/typescript-react-redux)
- [TypeScript [ React + React-Router + Redux + Redux-Thunk ] Starter](https://github.com/welearnmore/WLM-TypeScript-React-Starter)
- [webpack4 + React 16 + TypeScript:react-cli](https://github.com/BruceCham/react-cli)
- [nodepress: nest](https://github.com/surmon-china/nodepress)
- [blog-service: nest](https://github.com/jkchao/blog-service)
- [Flutter完整项目，WanAndroid客户端](https://github.com/Sky24n/flutter_wanandroid)
- [活动页杀手，快速搭建活动页，告别加班~(提供一个比较好的解决方案思路)](https://github.com/muwoo/rose)
- [GSYGithubAppFlutter](https://github.com/CarGuo/GSYGithubAppFlutter)
- [yuque app that builded by flutter](https://github.com/okoala/yuque)
- [express基本使用](https://github.com/zzwwjjdj319/express)
- [使用koa 2 + vue 2搭建自己的博客系统](https://github.com/StudentWan/ashen-blog)
- [《一起学 Node.js》](https://github.com/nswbmw/N-blog)
- [《Go语言四十二章经》](https://github.com/ffhelicopter/Go42)
- [基于node&typescript重写知乎助手](https://github.com/YaoZeyuan/zhihuhelp_with_node)
- [zhihu-flutter: Flutter 高仿知乎 UI](https://github.com/HackSoul/zhihu-flutter)
- [基于 React + NodeJS + Express + MongoDB 开发的一个社区系统(**极其经典**)](https://github.com/54sword/xiaoduyu.com)
- [rap2-docker](https://github.com/Rynxiao/rap2-docker)
- [一起学习造系列文章及源码](https://github.com/JOE-XIE/MyWheel)
- [基于Node.js+MySQL开发的开源微信小程序商城](https://github.com/tumobi/nideshop-mini-program)
- [nestjs-realworld-example-app:nest+typeorm](https://github.com/lujakob/nestjs-realworld-example-app)
- [一个完整electron桌面记账程序](https://github.com/hilanmiao/LanMiaoDesktop)
- [基于 React Hooks 与 flex 布局，实现了大部分功能的思维导图](https://github.com/Mongkii/RMind)
- [基于storage开发缓存库 - 源码研究](https://github.com/myronliu347/store.js)
- [使用nodejs和react做的简易聊天室](https://juejin.im/post/5d5661b3f265da039e12b7d2)
- [antd-form-builder](https://github.com/rekit/antd-form-builder)
- [“从零到部署”Vue全栈电商应用系列教程---正式完结](https://juejin.im/post/5e7577816fb9a07c83350011)
- [keep-alive实现原理](https://juejin.im/post/5e1ed2635188254c46131aaf)
    
    


### <div id="class09">年度计划和日志目录</div>

#### 17年
- [17年计划书和记录](./17年/17年前端进阶计划.md)
        
        
#### 18年
- [18年计划书和记录](18年/18年计划书.md)
    
    
#### 19年
- [19计划书 - 上半年](./19年/19年计划书.md#19年上半年计划书)
- [19年文档记录](./19年/19年计划书.md)

#### 20年
- [20年的学习计划和安排](./20年/20年计划书.md)
