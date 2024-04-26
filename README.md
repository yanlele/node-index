# index

这个项目以为创建之初时间比较早，目的就是为了记录自己开发过程中遇到的坑和问题。
后来渐渐演变为记录一些学习知识的一个记录文档， 以为很多东西很感兴趣，但是学习了之后使用场景不多， 导致遗忘比较快，
所以我写文章的时候， 就尽量写的详细， 能整理为一个体系的就尽量整理为一个体系。

当时目标就是 JS 点击就能 run, html 双击就能跑，毫无工程化可言。 我新起了一个项目 [node-index-core](https://github.com/yanlele/node-index-core),
这个项目只放置代码， 本项目只放置学习文章。相互配合，同时更新，前端系列的学习和维护 一直会坚持到我整个职业生涯。

## 目录

<!-- toc -->

- [专题知识库](#%E4%B8%93%E9%A2%98%E7%9F%A5%E8%AF%86%E5%BA%93)
  - [react 专题](#react-%E4%B8%93%E9%A2%98)
  - [ECMAScript 最新语法](#ecmascript%E6%9C%80%E6%96%B0%E8%AF%AD%E6%B3%95)
  - [css 专题](#css%E4%B8%93%E9%A2%98)
  - [javascript 设计模式](#javascript%E8%AE%BE%E8%AE%A1%E6%A8%A1%E5%BC%8F)
  - [基础知识点总结\_非常重要](#%E5%9F%BA%E7%A1%80%E7%9F%A5%E8%AF%86%E7%82%B9%E6%80%BB%E7%BB%93_%E9%9D%9E%E5%B8%B8%E9%87%8D%E8%A6%81)
  - [canvas 总结](#canvas%E6%80%BB%E7%BB%93)
  - [算法学习](#%E7%AE%97%E6%B3%95%E5%AD%A6%E4%B9%A0)
  - [学习 javascript 数据结构与算法](#%E5%AD%A6%E4%B9%A0javascript%E6%95%B0%E6%8D%AE%E7%BB%93%E6%9E%84%E4%B8%8E%E7%AE%97%E6%B3%95)
  - [DOM 和 BOM](#dom%E5%92%8Cbom)
  - [深入 webpack 工程化](#%E6%B7%B1%E5%85%A5webpack%E5%B7%A5%E7%A8%8B%E5%8C%96)
  - [学习 TypeScript](#%E5%AD%A6%E4%B9%A0typescript)
  - [测试专题](#%E6%B5%8B%E8%AF%95%E4%B8%93%E9%A2%98)
  - [深入浅出 MySQL 数据库开发 优化与管理维护](#%E6%B7%B1%E5%85%A5%E6%B5%85%E5%87%BAmysql-%E6%95%B0%E6%8D%AE%E5%BA%93%E5%BC%80%E5%8F%91-%E4%BC%98%E5%8C%96%E4%B8%8E%E7%AE%A1%E7%90%86%E7%BB%B4%E6%8A%A4)
  - [Linux 相关学习](#linux%E7%9B%B8%E5%85%B3%E5%AD%A6%E4%B9%A0)
  - [前端数据可视化 D3.js 学习](#%E5%89%8D%E7%AB%AF%E6%95%B0%E6%8D%AE%E5%8F%AF%E8%A7%86%E5%8C%96d3js%E5%AD%A6%E4%B9%A0)
  - [docker&DevOps](#dockerdevops)
  - [小程序](#%E5%B0%8F%E7%A8%8B%E5%BA%8F)
  - [RXJS 学习专题 - 已经放弃（因为看不到收益）](#rxjs%E5%AD%A6%E4%B9%A0%E4%B8%93%E9%A2%98---%E5%B7%B2%E7%BB%8F%E6%94%BE%E5%BC%83%E5%9B%A0%E4%B8%BA%E7%9C%8B%E4%B8%8D%E5%88%B0%E6%94%B6%E7%9B%8A)
  - [微前端专题](#%E5%BE%AE%E5%89%8D%E7%AB%AF%E4%B8%93%E9%A2%98)
  - [好用的库与框架](#%E5%A5%BD%E7%94%A8%E7%9A%84%E5%BA%93%E4%B8%8E%E6%A1%86%E6%9E%B6)
  - [性能分析与性能优化](#%E6%80%A7%E8%83%BD%E5%88%86%E6%9E%90%E4%B8%8E%E6%80%A7%E8%83%BD%E4%BC%98%E5%8C%96)
  - [vue](#vue)
  - [工程化专题](#%E5%B7%A5%E7%A8%8B%E5%8C%96%E4%B8%93%E9%A2%98)
- [知识库](#%E7%9F%A5%E8%AF%86%E5%BA%93)
  - [前端技术知识](#%E5%89%8D%E7%AB%AF%E6%8A%80%E6%9C%AF%E7%9F%A5%E8%AF%86)
    - [web 相关](#web%E7%9B%B8%E5%85%B3)
    - [web 功能实现](#web%E5%8A%9F%E8%83%BD%E5%AE%9E%E7%8E%B0)
    - [移动端相关](#%E7%A7%BB%E5%8A%A8%E7%AB%AF%E7%9B%B8%E5%85%B3)
    - [网络与网络安全相关](#%E7%BD%91%E7%BB%9C%E4%B8%8E%E7%BD%91%E7%BB%9C%E5%AE%89%E5%85%A8%E7%9B%B8%E5%85%B3)
    - [浏览器相关](#%E6%B5%8F%E8%A7%88%E5%99%A8%E7%9B%B8%E5%85%B3)
    - [前端模板引擎(这个已经落伍了， es6 模板字符串更加强大)](#%E5%89%8D%E7%AB%AF%E6%A8%A1%E6%9D%BF%E5%BC%95%E6%93%8E%E8%BF%99%E4%B8%AA%E5%B7%B2%E7%BB%8F%E8%90%BD%E4%BC%8D%E4%BA%86-es6-%E6%A8%A1%E6%9D%BF%E5%AD%97%E7%AC%A6%E4%B8%B2%E6%9B%B4%E5%8A%A0%E5%BC%BA%E5%A4%A7)
    - [样式与布局](#%E6%A0%B7%E5%BC%8F%E4%B8%8E%E5%B8%83%E5%B1%80)
    - [常见的工具方法实现](#%E5%B8%B8%E8%A7%81%E7%9A%84%E5%B7%A5%E5%85%B7%E6%96%B9%E6%B3%95%E5%AE%9E%E7%8E%B0)
    - [JS 原理与语法相关](#js%E5%8E%9F%E7%90%86%E4%B8%8E%E8%AF%AD%E6%B3%95%E7%9B%B8%E5%85%B3)
    - [静态资源相关研究](#%E9%9D%99%E6%80%81%E8%B5%84%E6%BA%90%E7%9B%B8%E5%85%B3%E7%A0%94%E7%A9%B6)
    - [项目与工程相关](#%E9%A1%B9%E7%9B%AE%E4%B8%8E%E5%B7%A5%E7%A8%8B%E7%9B%B8%E5%85%B3)
    - [项目实践相关](#%E9%A1%B9%E7%9B%AE%E5%AE%9E%E8%B7%B5%E7%9B%B8%E5%85%B3)
    - [零碎基础算法问题](#%E9%9B%B6%E7%A2%8E%E5%9F%BA%E7%A1%80%E7%AE%97%E6%B3%95%E9%97%AE%E9%A2%98)
    - [编译与转译](#%E7%BC%96%E8%AF%91%E4%B8%8E%E8%BD%AC%E8%AF%91)
    - [TypeScript 相关](#typescript%E7%9B%B8%E5%85%B3)
    - [git 相关](#git%E7%9B%B8%E5%85%B3)
    - [渲染与项目性能优化](#%E6%B8%B2%E6%9F%93%E4%B8%8E%E9%A1%B9%E7%9B%AE%E6%80%A7%E8%83%BD%E4%BC%98%E5%8C%96)
    - [图形与图表](#%E5%9B%BE%E5%BD%A2%E4%B8%8E%E5%9B%BE%E8%A1%A8)
  - [技术生态圈](#%E6%8A%80%E6%9C%AF%E7%94%9F%E6%80%81%E5%9C%88)
    - [jetbrains 体系](#jetbrains-%E4%BD%93%E7%B3%BB)
    - [mac 体系](#mac-%E4%BD%93%E7%B3%BB)
    - [职业发展与规划](#%E8%81%8C%E4%B8%9A%E5%8F%91%E5%B1%95%E4%B8%8E%E8%A7%84%E5%88%92)
    - [项目思考](#%E9%A1%B9%E7%9B%AE%E6%80%9D%E8%80%83)
    - [展望未来技术方向](#%E5%B1%95%E6%9C%9B%E6%9C%AA%E6%9D%A5%E6%8A%80%E6%9C%AF%E6%96%B9%E5%90%91)
    - [其他应用技术方向](#%E5%85%B6%E4%BB%96%E5%BA%94%E7%94%A8%E6%8A%80%E6%9C%AF%E6%96%B9%E5%90%91)
  - [Node 技术知识](#node%E6%8A%80%E6%9C%AF%E7%9F%A5%E8%AF%86)
    - [Node 基础知识](#node%E5%9F%BA%E7%A1%80%E7%9F%A5%E8%AF%86)
    - [模块规范](#%E6%A8%A1%E5%9D%97%E8%A7%84%E8%8C%83)
    - [node api](#node-api)
    - [node 应用技术](#node-%E5%BA%94%E7%94%A8%E6%8A%80%E6%9C%AF)
    - [node 服务端](#node-%E6%9C%8D%E5%8A%A1%E7%AB%AF)
    - [爬虫](#%E7%88%AC%E8%99%AB)
    - [内存优化](#%E5%86%85%E5%AD%98%E4%BC%98%E5%8C%96)
    - [V8 引擎](#v8%E5%BC%95%E6%93%8E)
    - [GraphQL](#graphql)
    - [mock 数据](#mock%E6%95%B0%E6%8D%AE)
    - [Node 项目构建](#node%E9%A1%B9%E7%9B%AE%E6%9E%84%E5%BB%BA)
    - [深入原理研究](#%E6%B7%B1%E5%85%A5%E5%8E%9F%E7%90%86%E7%A0%94%E7%A9%B6)
    - [npm](#npm)
    - [包管理](#%E5%8C%85%E7%AE%A1%E7%90%86)
    - [Deno](#deno)
    - [展望 Node 未来](#%E5%B1%95%E6%9C%9Bnode%E6%9C%AA%E6%9D%A5)
  - [日常采坑与记录](#%E6%97%A5%E5%B8%B8%E9%87%87%E5%9D%91%E4%B8%8E%E8%AE%B0%E5%BD%95)
  - [优秀技术文档收集与前沿技术归档](#%E4%BC%98%E7%A7%80%E6%8A%80%E6%9C%AF%E6%96%87%E6%A1%A3%E6%94%B6%E9%9B%86%E4%B8%8E%E5%89%8D%E6%B2%BF%E6%8A%80%E6%9C%AF%E5%BD%92%E6%A1%A3)
  - [优秀的开源项目](#%E4%BC%98%E7%A7%80%E7%9A%84%E5%BC%80%E6%BA%90%E9%A1%B9%E7%9B%AE)
  - [基础功能探索](#%E5%9F%BA%E7%A1%80%E5%8A%9F%E8%83%BD%E6%8E%A2%E7%B4%A2)
- [发展与 OKR](#%E5%8F%91%E5%B1%95%E4%B8%8Eokr)
  - [发布的 npm 开源模块](#%E5%8F%91%E5%B8%83%E7%9A%84npm%E5%BC%80%E6%BA%90%E6%A8%A1%E5%9D%97)
  - [在折腾的个人项目](#%E5%9C%A8%E6%8A%98%E8%85%BE%E7%9A%84%E4%B8%AA%E4%BA%BA%E9%A1%B9%E7%9B%AE)
  - [研究的项目](#%E7%A0%94%E7%A9%B6%E7%9A%84%E9%A1%B9%E7%9B%AE)
  - [研究的问题](#%E7%A0%94%E7%A9%B6%E7%9A%84%E9%97%AE%E9%A2%98)
  - [源码研究](#%E6%BA%90%E7%A0%81%E7%A0%94%E7%A9%B6)
  - [自我管理](#%E8%87%AA%E6%88%91%E7%AE%A1%E7%90%86)

<!-- tocstop -->

## 专题知识库

### [react 专题](/books/专题知识库/01、react专题/README.md)

- [基础语法使用](/books/专题知识库/01、react专题/README.md#%E5%9F%BA%E7%A1%80%E8%AF%AD%E6%B3%95%E4%BD%BF%E7%94%A8)
- [状态管理](/books/专题知识库/01、react专题/README.md#%E7%8A%B6%E6%80%81%E7%AE%A1%E7%90%86)
- [react-router](/books/专题知识库/01、react专题/README.md#react-router)
- [其他知识点和实战相关知识点](/books/专题知识库/01、react专题/README.md#%E5%85%B6%E4%BB%96%E7%9F%A5%E8%AF%86%E7%82%B9%E5%92%8C%E5%AE%9E%E6%88%98%E7%9B%B8%E5%85%B3%E7%9F%A5%E8%AF%86%E7%82%B9)
- [react hooks](/books/专题知识库/01、react专题/README.md#react-hooks)
- [源码分析](/books/专题知识库/01、react专题/README.md#%E6%BA%90%E7%A0%81%E5%88%86%E6%9E%90)
- [其他经典文章](/books/专题知识库/01、react专题/README.md#%E5%85%B6%E4%BB%96%E7%BB%8F%E5%85%B8%E6%96%87%E7%AB%A0)
- [其他的一些研究话题](/books/专题知识库/01、react专题/README.md#%E5%85%B6%E4%BB%96%E7%9A%84%E4%B8%80%E4%BA%9B%E7%A0%94%E7%A9%B6%E8%AF%9D%E9%A2%98)

### [ECMAScript 最新语法](/books/专题知识库/02、ECMAScript最新语法/README.md)

- [let 和 const](/books/专题知识库/02、ECMAScript最新语法/1、let和const/let和const.md)
- [变量的解构赋值](/books/专题知识库/02、ECMAScript最新语法/2、变量的解构赋值/变量的解构赋值.md)
- [字符串的扩展](/books/专题知识库/02、ECMAScript最新语法/3、字符串的扩展/3、字符串的扩展.md)
- [数值的扩展和 Math 对象的扩展](/books/专题知识库/02、ECMAScript最新语法/4、数值的扩展和Math对象的扩展/4、数值的扩展和Math对象的扩展.md)
- [数组的扩展](/books/专题知识库/02、ECMAScript最新语法/5、数组的扩展/README.md)
- [函数的扩展](/books/专题知识库/02、ECMAScript最新语法/6、函数的扩展/README.md)
- [对象的扩展](/books/专题知识库/02、ECMAScript最新语法/7、对象的扩展/README.md)
- [Proxy 和 Reflect](/books/专题知识库/02、ECMAScript最新语法/8、Proxy和Reflect/README.md)
- [Set 和 Map 数据结构](/books/专题知识库/02、ECMAScript最新语法/9、Set和Map数据结构/README.md)
- [Iterator 和 for...of 循环](/books/专题知识库/02、ECMAScript最新语法/10、Iterator%20和%20for...of%20循环/README.md)
- [Generator](/books/专题知识库/02、ECMAScript最新语法/11、Generator/README.md)
- [Promise](/books/专题知识库/02、ECMAScript最新语法/12、Promise对象/README.md)
- [其他知识点儿的总结](/books/专题知识库/02、ECMAScript最新语法/13、其他知识点儿的总结)
- [es10 的新特性](/books/专题知识库/02、ECMAScript最新语法/14、es10的新特性/readme.md)

### [css 专题](/books/专题知识库/03、css3专题/README.md)

- [基础知识](/books/专题知识库/03、css3专题/README.md#%E5%9F%BA%E7%A1%80%E7%9F%A5%E8%AF%86)
- [进阶与案例](/books/专题知识库/03、css3专题/README.md#%E8%BF%9B%E9%98%B6%E4%B8%8E%E6%A1%88%E4%BE%8B)
- [其他知识总结](/books/专题知识库/03、css3专题/README.md#%E5%85%B6%E4%BB%96%E7%9F%A5%E8%AF%86%E6%80%BB%E7%BB%93)

### [javascript 设计模式](/books/专题知识库/04、js设计模式/README.md)

- [第二篇、创建型设计模式](/books/专题知识库/04、js设计模式/02篇、创建型设计模式/README.md)
- [第三篇、结构型设计模式](/books/专题知识库/04、js设计模式/03篇、结构型设计模式/README.md)
- [第四篇、行为型设计模式](/books/专题知识库/04、js设计模式/04篇、行为型设计模式/README.md)
- [第五篇、技巧型设计模式](/books/专题知识库/04、js设计模式/05篇、技巧型设计模式/README.md)
- [第六篇、架构型设计模式](/books/专题知识库/04、js设计模式/06篇、架构型设计模式/README.md)

### [基础知识点总结\_非常重要](/books/专题知识库/05、基础知识点专题/README.md)

### [canvas 总结](/books/专题知识库/06、canvas总结/README.md)

### [算法学习](/books/专题知识库/07、算法学习/readme.md)

### [学习 javascript 数据结构与算法](/books/专题知识库/08、学习javascript数据结构与算法/README.md)

- [01 章、javascript 基础](/books/专题知识库/08、学习javascript数据结构与算法/README.md#01%E7%AB%A0javascript%E5%9F%BA%E7%A1%80)
- [03 章、栈](/books/专题知识库/08、学习javascript数据结构与算法/README.md#03%E7%AB%A0%E6%A0%88)
- [04 章、队列](/books/专题知识库/08、学习javascript数据结构与算法/README.md#04%E7%AB%A0%E9%98%9F%E5%88%97)
- [05 章、链表](/books/专题知识库/08、学习javascript数据结构与算法/README.md#05%E7%AB%A0%E9%93%BE%E8%A1%A8)
- [06 章、集合](/books/专题知识库/08、学习javascript数据结构与算法/README.md#06%E7%AB%A0%E9%9B%86%E5%90%88)
- [07 章、字典和散列表](/books/专题知识库/08、学习javascript数据结构与算法/README.md#07%E7%AB%A0%E5%AD%97%E5%85%B8%E5%92%8C%E6%95%A3%E5%88%97%E8%A1%A8)
- [08 章、树](/books/专题知识库/08、学习javascript数据结构与算法/README.md#08%E7%AB%A0%E6%A0%91)
- [09 章、图](/books/专题知识库/08、学习javascript数据结构与算法/README.md#09%E7%AB%A0%E5%9B%BE)
- [10 章、排序和搜索算法](/books/专题知识库/08、学习javascript数据结构与算法/README.md#10%E7%AB%A0%E6%8E%92%E5%BA%8F%E5%92%8C%E6%90%9C%E7%B4%A2%E7%AE%97%E6%B3%95)

### [DOM 和 BOM](/books/专题知识库/09、DOM和BOM/README.md)

### [深入 webpack 工程化](/books/专题知识库/10、深入webpack工程化/README.md)

- [基础](/books/专题知识库/10、深入webpack工程化/README.md#%E5%9F%BA%E7%A1%80)
- [webpack 优化问题](/books/专题知识库/10、深入webpack工程化/README.md#webpack%E4%BC%98%E5%8C%96%E9%97%AE%E9%A2%98)
- [其他补充知识点](/books/专题知识库/10、深入webpack工程化/README.md#%E5%85%B6%E4%BB%96%E8%A1%A5%E5%85%85%E7%9F%A5%E8%AF%86%E7%82%B9)
- [实战案例](/books/专题知识库/10、深入webpack工程化/README.md#%E5%AE%9E%E6%88%98%E6%A1%88%E4%BE%8B)
- [webpack 插件和 loader 开发](/books/专题知识库/10、深入webpack工程化/README.md#webpack%E6%8F%92%E4%BB%B6%E5%92%8Cloader%E5%BC%80%E5%8F%91)
- [其他](/books/专题知识库/10、深入webpack工程化/README.md#%E5%85%B6%E4%BB%96)
- [遗留问题待解决](/books/专题知识库/10、深入webpack工程化/README.md#%E9%81%97%E7%95%99%E9%97%AE%E9%A2%98%E5%BE%85%E8%A7%A3%E5%86%B3)

### [学习 TypeScript](https://github.com/yanlele/TyepScript-learning)

- [一文读懂 TypeScript 泛型及应用（ 7.8K 字）](https://juejin.im/post/6844904184894980104)
- [你不知道的 TypeScript 泛型（万字长文，建议收藏）](https://juejin.im/post/6844904196827774990)
- [1.2W 字 | 了不起的 TypeScript 入门教程](https://juejin.im/post/6844904182843965453)
- [TypeScript 中的声明文件](https://juejin.im/post/6844903869328146440)
- [结合实例学习 Typescript](https://juejin.im/post/6876981358346895368)
- [一份不可多得的 TS 学习指南（1.8W 字）](https://juejin.im/post/6872111128135073806)

### [测试专题](/books/专题知识库/11、测试专题/README.md)

- [01 篇 javascript 单元测试框架 mochajs 详解](/books/专题知识库/11、测试专题/README.md#01%E7%AF%87-javascript%E5%8D%95%E5%85%83%E6%B5%8B%E8%AF%95%E6%A1%86%E6%9E%B6mochajs%E8%AF%A6%E8%A7%A3)
- [02 篇 断言库 chai](/books/专题知识库/11、测试专题/README.md#02%E7%AF%87-%E6%96%AD%E8%A8%80%E5%BA%93chai)
- [03 篇 代码覆盖率工具 Istanbul 入门教程](/books/专题知识库/11、测试专题/README.md#03%E7%AF%87-%E4%BB%A3%E7%A0%81%E8%A6%86%E7%9B%96%E7%8E%87%E5%B7%A5%E5%85%B7-istanbul-%E5%85%A5%E9%97%A8%E6%95%99%E7%A8%8B)
- [04 篇 node 层服务端 api 接口测试](/books/专题知识库/11、测试专题/README.md#04%E7%AF%87-node%E5%B1%82%E6%9C%8D%E5%8A%A1%E7%AB%AFapi%E6%8E%A5%E5%8F%A3%E6%B5%8B%E8%AF%95)
- [05 篇 TypeScript 测试](/books/专题知识库/11、测试专题/README.md#05%E7%AF%87-typescript%E6%B5%8B%E8%AF%95)
- [06 篇 Jest 测试框架](/books/专题知识库/11、测试专题/README.md#06%E7%AF%87-jest%E6%B5%8B%E8%AF%95%E6%A1%86%E6%9E%B6)
- [07 篇 react 测试: jest+enzyme](/books/专题知识库/11、测试专题/README.md#07%E7%AF%87-react%E6%B5%8B%E8%AF%95-jestenzyme)
- [08 篇 E2E](/books/专题知识库/11、测试专题/README.md#08%E7%AF%87-e2e)
- [其他](/books/专题知识库/11、测试专题/README.md#%E5%85%B6%E4%BB%96)

### [深入浅出 MySQL 数据库开发 优化与管理维护](/books/专题知识库/12、深入浅出MySQL%20数据库开发%20优化与管理维护/README.md)

### [Linux 相关学习](/books/专题知识库/13、Linux相关知识点/README.md)

- [基础部分](/books/专题知识库/13、Linux相关知识点/01、基础部分/README.md)
- [应用服务器](/books/专题知识库/13、Linux相关知识点/02、应用服务部分/README.md)
- [数据库服务](/books/专题知识库/13、Linux相关知识点/03、数据库服务/README.md)
- [其他服务](/books/专题知识库/13、Linux相关知识点/04、其他服务/README.md)
- [shell](/books/专题知识库/13、Linux相关知识点/05、shell/readme.md)
  - [Shell 重定向 ＆>file、2>&1、1>&2 、/dev/null 的区别](https://blog.csdn.net/u011630575/article/details/52151995)
- [vim](/books/专题知识库/13、Linux相关知识点/06、vim/readme.md)
- [nginx](/books/专题知识库/13、Linux相关知识点/07、nginx/readme.md)
- [CI&CD](/books/专题知识库/13、Linux相关知识点/08、CI&CD/readme.md)

### [前端数据可视化 D3.js 学习](https://github.com/yanlele/D3.js-learning)

### [docker&DevOps](/books/专题知识库/14、docker&Devops/readme.md)

### [小程序](/books/专题知识库/15、小程序/readme.md)

### [RXJS 学习专题 - 已经放弃（因为看不到收益）](/books/专题知识库/16、RXJS学习专题/README.md)

### [微前端专题](/books/专题知识库/17、微前端专题/readme.md)

### [好用的库与框架](/books/专题知识库/18、好用的库与框架推荐/readme.md)

### [性能分析与性能优化](/books/专题知识库/19、性能分析与性能优化/readme.md)

### vue

- [vue 项目实际开发总结](/books/发展与OKR/03、研究的项目/01、vue项目实际开发总结/README.md)
- [MVVM 双向绑定原理研究与简单的双向绑定实现(包含简单的事件绑定)](/books/专题知识库/05、基础知识点专题/other/11、双向绑定核心代码/README.md)
- [深度解析！Vue3 & React Hooks 新 UI 组件原理：Modal 弹窗](https://juejin.im/post/6844904100992155661)
- [\*\* 史上最强 vue 总结---面试开发全靠它了](https://juejin.im/post/6850037277675454478)
- [vue 使用的转场特效插件 - vueg](https://github.com/jaweii/vueg)
- [全面解析 vue3.0 diff 算法](https://juejin.im/post/6861960532048642061)

### [工程化专题](/books/专题知识库/21、工程化专题/README.md)

### [谷歌扩展程序](/books/专题知识库/22、chorme extensions/readmd.md)

## 知识库

### 前端技术知识

#### web 相关

- [web-component](/books/知识库/01、前端技术知识/18、webComponent/README.md)
- [[译] 2018 来谈谈 Web Component](https://juejin.cn/post/6844903661403897870)
- [前端存储除了 localStorage 还有啥](https://juejin.cn/post/6844904192549584903)
- [忍法，scroll 翻滚之术！](https://juejin.cn/post/6844904081559912462)
- [这些 Web API 真的有用吗?](https://juejin.cn/post/6844903922922962958)

#### web 功能实现

- [层叠轮播图的简易制作](https://www.cnblogs.com/Tohold/p/9429890.html)
- [js 焦点图片层叠轮播切换滚动](http://www.51qianduan.com/article/110.html)
- [原生 js 实现图片层叠轮播切换效果](https://teakki.com/p/57dfb317d3a7507f975e8270)
- [瀑布流](https://juejin.im/post/5ed5b9a26fb9a047a07f2c30)
- [原生 JavaScript 实现造日历](https://juejin.im/post/5cd1aa3a6fb9a0323b7e5e5c)
- [15 个元素实现无限滚动 \*\*](https://juejin.cn/post/6844903944297136135)
- [H5 直播的疯狂点赞动画是如何实现的？(附完整源码)](https://juejin.cn/post/6844904126476730375)
- [模仿实现一个直播的点赞动画](https://juejin.cn/post/6844904151952916487)
- [基于 HTML5 技术的幻灯片编辑、播放、控制的全套方案](https://github.com/Jinjiang/h5slides)

#### 移动端相关

- [移动端 rem 转换的办法和策略](/books/知识库/01、前端技术知识/03、移动端rem转换的办法和策略/README.md)
- [vue 移动端 h5 适配解决方案（rem or vw）](https://juejin.cn/post/6844903917126434829)
- [关于 JS 的触摸方法](/books/知识库/01、前端技术知识/13、关于JS的触摸方法研究/README.md)
- [微信小程序 - 扩展插件（发送请求、Promise API、表单验证、Restful API）](https://github.com/skyvow/wx-extend)
- [你了解过移动端适配吗](https://juejin.cn/post/6844903631993454600)

#### 网络与网络安全相关

- [深入 fetch](/books/知识库/01、前端技术知识/01、深入fetch/README.md)
- [手写 axios 核心原理，再也不怕面试官问我 axios 原理](https://juejin.cn/post/6856706569263677447)
- [骚年，你确定没有人在折腾你的站点吗？](https://juejin.cn/post/6844903966505975822)
- [axios 的一些基本用法](/books/知识库/01、前端技术知识/21、axios的一些基本用法/README.md)
- [Ajax,jQuery ajax,axios 和 fetch 介绍、区别以及优缺点](https://juejin.im/post/5d5e673ff265da03d2114646)
- [《HTTP 权威指南》每章的知识点总结](https://github.com/woai30231/http)

#### 浏览器相关

- [Chrome 调试技巧](/books/知识库/01、前端技术知识/02、Chrome调试技巧/readme.md)
- [关于屏幕高度，可见区域高度，目标元素高度，文档高度研究](/books/知识库/01、前端技术知识/14、关于屏幕高度，可见区域高度，目标元素高度，文档高度研究/README.md)
- [\*\* 近万字新手 chrome 扩展开发简单入门](https://juejin.cn/post/6844904127932137485)
- [从零开始写一个采集图片的 chrome 插件](https://juejin.cn/post/6844904097829617678)
- [当浏览器全面禁用三方 Cookie](https://juejin.cn/post/6844904128557105166)
- [浏览器里的本地数据库：IndexedDB](https://juejin.cn/post/6844903965792927752)
- [Chrome 插件开发全攻略 \*\*](https://github.com/sxei/chrome-plugin-demo)
- [Chrome DevTools 之 NetWork 面板](https://juejin.im/post/6844904036085301261)

#### 前端模板引擎(这个已经落伍了， es6 模板字符串更加强大)

- [doT 模板引擎基础语法知识点](/books/知识库/01、前端技术知识/04、doT模板引擎基本语法/README.md)
- [handlebars 使用大全](/books/知识库/01、前端技术知识/06、handlebars使用大全/README.md)
- [handlebars-helpers 主要使用说明和源码解析](/books/知识库/01、前端技术知识/07、handlebars-helpers主要使用说明和源码解析/README.md)

#### 样式与布局

- [flex 布局的学习](/books/知识库/01、前端技术知识/05、flex布局的学习/README.md)
- [清除浮动的解决方案总结](/books/专题知识库/05、基础知识点专题/other/08、清除浮动的解决方案总结/README.md)
- [移动端弹出层滚动时禁止 body 滚动，静止滚动](/books/知识库/01、前端技术知识/11、移动端弹出层滚动时禁止body滚动，静止滚动/README.md)
- [css3 新单位 vw、vh、vmin、vmax 的使用详解](/books/知识库/01、前端技术知识/12、css3新单位vw、vh、vmin、vmax的使用详解/README.md)
- [非常厉害的关于 css 样式](https://github.com/chokcoco/iCSS)
- [垂直和水平居中方案](/books/专题知识库/05、基础知识点专题/other/04、水平和垂直方案/README.md)
- [CSS3 的 calc()使用](https://www.w3cplus.com/css3/how-to-use-css3-calc-function.html)
- [纯 CSS 实现多行文字截断](/books/知识库/01、前端技术知识/17、纯CSS实现多行文字截断/readme.md)
- [你未必知道的 49 个 CSS 知识点](https://juejin.im/post/5d3eca78e51d4561cb5dde12#heading-37)
- [灵活运用 CSS 开发技巧(66 个实用技巧，值得收藏)](https://juejin.cn/post/6844903926110617613)
- [不受控制的 position:fixed](https://www.imooc.com/article/67784)
- [Flex 弹性布局（附超 Q 小 demo 🐸 小青蛙 ） \*\* ](https://juejin.im/post/5cba07005188251b960f56eb)
- [灵活运用 CSS 开发技巧](https://juejin.im/post/5d4d0ec651882549594e7293)
- [前端展示太长，截取为点点点](/books/知识库/01、前端技术知识/24、前端展示太长，截取为点点点/README.md)
- [如何让 json 转为 style 样式字符串， 适用于小程序](/books/知识库/01、前端技术知识/25、thumbStyle/README.md)

#### 常见的工具方法实现

- [数字金额转繁体中文大写字符串](/books/知识库/07、基础功能探索/01、人民币大小写互换/README.md)
- [js 整理常见数组方法和字符串方法操作](/books/知识库/01、前端技术知识/08、整理常见数组和字符串操作/README.md)
- [深入 javascript 中 Math 算数对象与精确到小数位的向上舍入和向下舍入解决办法](/books/知识库/01、前端技术知识/09、深入javascript中Math算数对象与精确到小数位的向上舍入和向下舍入解决办法/README.md)

#### JS 原理与语法相关

- [关于闭包的研究](/books/专题知识库/05、基础知识点专题/other/01、关于闭包的研究/README.md)
- [You Don't Need jQuery](https://github.com/nefe/You-Dont-Need-jQuery/blob/master/README.zh-CN.md)
- [关于 this 指针的研究](/books/专题知识库/05、基础知识点专题/other/02、关于this指针的研究/README.md)
- [实现函数防抖](/books/专题知识库/05、基础知识点专题/other/06、实现函数防抖/README.md)
- [实现函数节流](/books/专题知识库/05、基础知识点专题/other/07、实现函数节流/README.md)
- [深入理解 JavaScript 中的尾调用](/books/专题知识库/05、基础知识点专题/other/13、深入理解JavaScript中的尾调用/README.md)
- [FormData 使用方法详解](https://www.jianshu.com/p/e438fb2238cf)
- [基于 JavaScript 判断浏览器到底是关闭还是刷新](http://udn.yyuap.com/forum.php?mod=viewthread&tid=96309)
- [实现 js 熔断机制](https://juejin.cn/post/6844903920649650184)
- [如何避开 JavaScript 浮点数计算精度问题（如 0.1+0.2!==0.3）](https://blog.csdn.net/u013347241/article/details/79210840)
- [通过实现 25 个数组方法来理解及高效使用数组方法(长文,建议收藏)](https://juejin.im/post/5d82c12ff265da03a31d6f92)
- [为了性能选择 for 循环遍历？](https://juejin.cn/post/6844904191425511432)
- [JavaScript 装饰器](https://juejin.cn/post/6844904100144889864)
- [js 中的 pipe](/books/知识库/01、前端技术知识/20、js中的pipe/readme.md)
- [每个 JavaScript 工程师都应懂的 33 个概念](https://github.com/stephentian/33-js-concepts)
- [常用的正则验证例子](/books/专题知识库/05、基础知识点专题/other/05、正则验证/README.md)
- [css 加载会造成阻塞吗？](/books/知识库/01、前端技术知识/22、css加载会造成阻塞吗/index.md)
- [Base64 原理](https://juejin.cn/post/6844903698045370376)
- [复杂判断的优雅写法](/books/知识库/01、前端技术知识/26、复杂判断的优雅写法/README.md)

- 异步问题

  - [深入理解 JavaScript 异步](https://github.com/wangfupeng1988/js-async-tutorial)
  - [JavaScript 异步、栈、事件循环、任务队列](https://segmentfault.com/a/1190000011198232)
  - [在 JS 循环中正确使用 async 与 await](https://blog.csdn.net/sanstu/article/details/90904852)

- 深浅拷贝

  - [Object.assign()与深拷贝](</books/知识库/01、前端技术知识/23、Object.assign()与深拷贝/README.md>)
  - [如何写出一个惊艳面试官的深拷贝?](https://juejin.cn/post/6844903929705136141)
  - [引用、浅拷贝及深拷贝 到 Map、Set（含对象 assign、freeze 方法、WeakMap、WeakSet 及数组 map、reduce 等等方法） \*\*](https://juejin.im/post/5d843abe6fb9a06af510050c)
  - [关于深拷贝和浅拷贝的实现](/books/专题知识库/05、基础知识点专题/other/03、关于深拷贝和浅拷贝的实现/README.md)

- reduce 使用
  - [你为什么这么强，什么都敢盘（reduce）](https://juejin.cn/post/6844903923229130766)
  - [\*\* 25 个你不得不知道的数组 reduce 高级用法](https://juejin.cn/post/6844904063729926152)
- call、apply、bind
  - [深入 call、apply、bind 实现原理](/books/专题知识库/05、基础知识点专题/other/12、深入call、apply、bind实现原理/README.md)
  - [深入研究 call 和 apply(实现继承)](/books/专题知识库/05、基础知识点专题/other/18、深入研究call和apply/README.md)

#### 静态资源相关研究

- [关于图片预加载的研究](/books/知识库/01、前端技术知识/10、关于图片预加载的研究/README.md)
- [《SVG 精髓》 阅读笔记](https://github.com/xswei/SVG_Essentials)
- [canvas 导出图片方法总结](https://www.cnblogs.com/dupd/p/5893754.html)
- [点击链接下载图片研究](/books/知识库/01、前端技术知识/16、点击链接下载的研究/readme.md)
- [一文了解文件上传全过程（1.8w 字深度解析，进阶必备）](https://juejin.cn/post/6844904106658643982)

#### 项目与工程相关

- [ts 配置文件详解](/books/知识库/01、前端技术知识/15、ts配置文件详解/readme.md)
- [Yarn Workspace 使用指南](https://www.jianshu.com/p/990afa30b6fe)
- [项目规范（包含 git 管理项目的使用）](https://github.com/elsewhencode/project-guidelines/blob/master/README-zh.md)
- [指定文件、指定行、指定代码块不使用 ESLint 语法检查](https://blog.csdn.net/u013362969/article/details/81215336)
- [eslint 配置文件 eslintrc 参数详解](/books/知识库/02、技术生态圈/04、eslint配置文件eslintrc参数详解/README.md)
- [常用 eslint 配置](/books/知识库/02、技术生态圈/06、常用eslint配置/README.md)
- [常用 tslint 配置](/books/知识库/02、技术生态圈/07、常用tslint配置/README.md)
- [eslint 检测 TS 项目](/books/知识库/02、技术生态圈/09、eslint检测TS项目/README.md)
- [Commitizen(git-cz)配置](</books/知识库/02、技术生态圈/02、Commitizen(git-cz)配置/readme.md>)
- [使用 husky、prettier、lint、commitlint 构建规范化项目实践](/books/知识库/02、技术生态圈/08、使用husky、prettier、lint、commitlint构建规范化项目实践/README.md)
- lerna
  - [使用 lerna 管理大型前端项目](https://www.jianshu.com/p/2f9c05b119c9)
  - [lerna 的基础使用](https://www.jianshu.com/p/8b7e6025354b)
  - [Lerna 中文教程详解](https://segmentfault.com/a/1190000019350611?utm_source=tag-newest)
  - [All in one：项目级 monorepo 策略最佳实践](https://fed.taobao.org/blog/taofed/do71ct/uihagy/)
  - [Monorepo 的这些坑](https://jishuin.proginn.com/p/763bfbd5d610)
- commitLint
  - [commitlint+husky 规范 commit 日志](https://blog.csdn.net/wei371522/article/details/84070803)
  - [Git commit message 和工作流规范](https://www.imooc.com/article/16780)
  - [Git 提交消息: git-cz](https://www.jianshu.com/p/28617fd95c67)
- [项目创建从 editorconfig 和 prettier 开始](https://juejin.cn/post/6860440041039069191)
- [一文搞懂 peerDependencies](https://juejin.cn/post/6844904134248759309)
- [使用 ESLint+Prettier 来统一前端代码风格](https://juejin.cn/post/6844903621805473800)
- [重新认识 package.json](https://juejin.cn/post/6844904159226003463)
- [谷歌出品的 Web 打包方案：Web Bundles 技术揭秘](https://mp.weixin.qq.com/s/_7_KrY_ozbUZxzUlCU_B4w)

#### 项目实践相关

- [讲道理，仅 3 行核心 css 代码的 rate 评分组件](https://juejin.cn/post/6844903919106129934)
- [基于 HTML5 Canvas 的拓扑组件开发](https://juejin.cn/post/6844903924260929550)
- [使用 WebGL 去实现一个拖拽式 UI 代码生成 App](https://juejin.cn/post/6846687604096630792)
- [为什么 Vue3.0 使用 Proxy 实现数据监听？defineProperty 表示不背这个锅](https://juejin.cn/post/6844903965180575751)
- [Ant Design 中使用 CodeMirror2 代码编辑器](https://www.jianshu.com/p/4d5ef6808da7)
- [请你实现一个大文件上传和断点续传](https://juejin.cn/post/6844904046436843527)
- [编写一个 axios 这样的库](https://juejin.cn/post/6844904047699296263)
- [前端轻量化部署脚手架实践](https://juejin.cn/post/6844904046986280967)
- [手动实现高仿 github 的内容 diff 效果](https://juejin.cn/post/6857316059851325453)
- [原生 JS 封装拖动验证滑块你会吗？](https://juejin.cn/post/6844904175910780941)
- [1 小时搞定 cropper.js 制作头像/图片上传、裁剪、并发送至后端](https://juejin.cn/post/6844903955915341831)
- [一张刮刮卡竟包含这么多前端知识点](https://juejin.cn/post/6844903952157245447)
- 可视化拖拽组件库
  - [可视化拖拽组件库一些技术要点原理分析 \*\* ](https://juejin.cn/post/6908502083075325959)
  - [可视化拖拽组件库一些技术要点原理分析（二）\*\*](https://juejin.cn/post/6918881497264947207)
  - [可视化拖拽组件库一些技术要点原理分析（三）](https://juejin.cn/post/6929302655118344200)
- [2021 如何让你的 Table 组件无限可能](https://juejin.cn/post/6920874509834649607)
- [React 实现简易的图片拖动排序](https://juejin.cn/post/6896712416928169991)
- [从破解某设计网站谈前端水印](https://juejin.cn/post/6900713052270755847)
- [实现 Web 端自定义截屏](https://juejin.cn/post/6924368956950052877)

#### 零碎基础算法问题

- [手写算法并记住它：快速排序（5 行代码简单版）](https://juejin.cn/post/6844903938290876430)
- [树形对象查找](/books/知识库/01、前端技术知识/19、树形对象查找/readme.md)
- [前端该如何准备数据结构和算法？](https://juejin.im/post/5d5b307b5188253da24d3cd1)

#### 编译与转译

- AST 抽象语法树

  - [AST 入门](https://juejin.cn/post/6885146952877031432)
  - [抽象语法树（AST）](https://segmentfault.com/a/1190000016231512)
  - [AST 详解与运用](https://juejin.cn/post/6885146952877031432)
  - [AST 原理，让你蜕变为高级前端工程师的原理](https://juejin.cn/post/6854573222071894029)
  - [平庸前端码农之蜕变 — AST](https://juejin.cn/post/6844903725228621832)

- babel
  - [深入浅出 Babel 上篇：架构和原理 + 实战](https://juejin.im/post/6844903956905197576)
  - [深入浅出 Babel 下篇：既生 Plugin 何生 Macros](https://juejin.im/post/6844903961820921869)
  - [babel 配置-各阶段的 stage 的区别](https://blog.csdn.net/wang252949/article/details/79064046)

#### TypeScript 相关

- [从零开始配置 TypeScript 项目](https://juejin.im/post/6856410900577026061)
- [会写 TypeScript 但你真的会 TS 编译配置吗？](https://www.51cto.com/article/694463.html)

#### git 相关

- [git 常用命令汇总/git 命令行](/books/知识库/02、技术生态圈/01、git常用命令汇总/README.md)
- [git 使用 SSH 密匙配置](/books/知识库/02、技术生态圈/02、git使用SSH密匙配置/README.md)
- [README 文件语法解读，即 Github Flavored Markdown 语法介绍](https://github.com/guodongxiaren/README)
- [MarkDown 添加图片的三种方式 - 找时间自己总结一边](https://blog.csdn.net/slaughterdevil/article/details/79255933)
- [GithubPages 教程 在 GithubPages 上搭建个人主页](https://blog.csdn.net/yanzhenjie1003/article/details/51703370)
- [Git Submodule 项目子模块管理](https://blog.csdn.net/xiangzhihong8/article/details/80535495)
- [git commit message emoji 使用指南](https://github.com/liuchengxu/git-commit-emoji-cn)
- [Github 上开源项目 readme 里好看的高大上的有趣的徽章从何而来](https://blog.csdn.net/xialonghua/article/details/87373052)
- [gitbook-use](https://github.com/zhangjikai/gitbook-use)
- [你可能不知道的 15 个有用的 Github 功能](https://juejin.cn/post/6844904193396834318)
- [git clone 太慢了的解决办法](/books/知识库/02、技术生态圈/12、git%20clone%20太慢了的解决办法/readme.md)
- [github 开发人员在七夕搞事情：remote: Support for password authentication was removed on August 13, 2021.](https://blog.csdn.net/weixin_41010198/article/details/119698015)
- [Github 自动发版机器人配置](https://juejin.cn/post/6920049554264064008)
- [Github 实用技巧](/books/知识库/02、技术生态圈/13、Github实用技巧/README.md)
- [GitHub 如何选择合适的 license](/books/知识库/02、技术生态圈/15、GitHub如何选择合适的license/README.md)

#### 渲染与项目性能优化

- [高性能渲染十万条数据](https://juejin.cn/post/6844903938894872589)
- [\*\* 如何实现高性能的在线 PDF 预览](https://juejin.cn/post/6844904176296656903)
- [关于内存泄漏的文章](https://github.com/zhansingsong/js-leakage-patterns)

#### 图形与图表

- [Three.js 零基础入门教程](http://www.yanhuangxueyuan.com/Three.js/)
- [一步步带你实现 web 全景看房——three.js](https://juejin.cn/post/6844903918409875469)

### 技术生态圈

#### jetbrains 体系

- [WebStrom Live Template 建代码块](https://blog.csdn.net/liangrongliu1991/article/details/79626960)
- [jetbrains:同步服务器代码](https://www.jianshu.com/p/49442ec9bc9f)
- [在 WebStorm 中，配置能够识别 Vue CLI 3 创建的项目的别名 alias @](https://juejin.im/post/6844903802185891848)
- [WebStorm 关闭自动保存功能添加\*星星标记](https://blog.csdn.net/fisherapp1995/article/details/85063199)

#### mac 体系

- [Mac 机上安装 nvm 遇到的坑--nvm command not found](https://www.cnblogs.com/giggle/p/7075548.html)
- [brew 常用命令行](/books/知识库/02、技术生态圈/03、brew常用命令行/README.md)
- [Mac 系统占用空间大、空间不够、查看系统文件大小分布](https://blog.csdn.net/u011423056/article/details/79450845)
- [mac Homebrew 装包加速](/books/知识库/02、技术生态圈/11、mac_Homebrew装包加速/readme.md)
- [解决 mac 安装 homebrew 后报错-bash: brew: command not found](https://blog.csdn.net/li396864285/article/details/52572163)
- [mac 上安装 nvm 遇到的坑](https://www.jianshu.com/p/f6c3ecfdbd97)

#### 职业发展与规划

- [前端职业规划 - 写给那些想去和刚去大厂的年轻人(鸡汤有毒)](https://juejin.im/post/6854828407890477064)
- [简析解决问题的通用方法论](https://juejin.cn/post/6891167960589664264)
- [技术人员升级打怪的方法论](https://juejin.cn/post/6900939109670322189)

#### 项目思考

- [【深度思考】如何优雅告知用户，网站正在升级维护？](https://juejin.im/post/6857673247819989000)
- [测试金字塔实战](https://insights.thoughtworks.cn/practical-test-pyramid/)
- [\*\* 前端代码质量-圈复杂度原理和实践](https://juejin.im/post/6844903965792927751)

#### 展望未来技术方向

- [从 GraphQL 到前端数据管理的革命 - GraphQL 干货笔记](https://juejin.im/post/6844904196848762888)

#### 其他应用技术方向

- [手把手教你快速搭建专属的 storybook](https://juejin.cn/post/6844903752982331405)

### Node 技术知识

#### Node 基础知识

- [【译】Node.js 子进程：你需要知道的一切](https://mp.weixin.qq.com/s/6reZnrYaD-1BZ50nwWYS3g)
- [关于 node.js 中流的理解](https://juejin.im/post/5cbaba8ce51d456e747c5343)
- [深入理解 Node.js 中的进程与线程](https://juejin.im/post/6844903908385488903)

#### 模块规范

- [CommonJs 模块规范](/books/知识库/03、Node技术知识/1、commonjs/README.md)
- [require 时，exports 和 module.exports 的区别你真的懂吗？](https://juejin.im/post/5d5639c7e51d453b5c1218b4)

#### node api

- [node 基础 api_path](/books/知识库/03、Node技术知识/02、node基础api_path/README.md)
- [node 基础 api_Buffer](/books/知识库/03、Node技术知识/03、node基础api_Buffer/README.md)
- [node 基础 api_event](/books/知识库/03、Node技术知识/04、node基础api_event/README.md)
- [node 基础 api_fs](/books/知识库/03、Node技术知识/05、node基础api_fs/README.md)

#### node 应用技术

- [把文档文本文件(\*.docx)转换文 html](https://github.com/mwilliamson/mammoth.js)
- [前后端对称加解密解决方案](/books/知识库/03、Node技术知识/08、前后端对称加解密解决方案/README.md)
- [封装日志模块 - 基于 chalk](/books/知识库/03、Node技术知识/09、封装日志输出模块/README.md)
- [WebSocket 和 Socket.io](https://www.jianshu.com/p/4e80b931cdea)
- [使用 Proxy 构建响应式系统](https://juejin.im/post/6844903950093664264)
- [【图文详解】200 行 JS 代码，带你实现代码编译器（人人都能学会）](https://juejin.im/post/6844904105937207304)
- [如何优雅的实现消息通信？](https://juejin.im/post/6865444445479927821)

#### node 服务端

- [用于 node.js 的 HTTP 请求日志程序中间件:morgan](https://github.com/expressjs/morgan)
- [linux 安装 mongoDB 与 NodeJs 远程连接](https://juejin.im/post/5cb6cc72518825327854752e)
- [前端工程师须知的 CORS 知识](https://juejin.im/post/5cbaa6ef5188253feb5855be)
- [《大前端进阶 Node.js》系列 双十一秒杀系统（进阶必看）](https://juejin.im/post/6844904095514378254)
- 项目部署
  - [pm2 实践指南](https://juejin.cn/post/6844904048768843784)
  - [快速线上部署的模块 now](https://github.com/zeit/now-cli)
- orm
  - [Sequelize 文档的中文版本](https://github.com/demopark/sequelize-docs-Zh-CN)

#### 爬虫

- [node 爬虫](/books/知识库/03、Node技术知识/10、node爬虫/readme.md)

#### 内存优化

- [node 内存优化](/books/专题知识库/05、基础知识点专题/other/15、node内存优化/README.md)

#### V8 引擎

- [V8 引擎初步介绍](/books/专题知识库/05、基础知识点专题/other/14、V8引擎初步介绍/README.md)
- [JavaScript-V8 引擎](https://juejin.im/post/6844903950089453575)

#### GraphQL

- [GraphQL + Apollo + Vue 牛刀小试](https://juejin.im/post/5cecc597e51d454fbe24a61a)
- [apollo-graphql 自己使用的一点姿势](https://juejin.im/post/5ca2bd5c51882543e4506fbf)

#### mock 数据

- [5 分钟教你用 nodeJS 手写一个 mock 数据服务器](https://juejin.im/post/5d7345bce51d453b76258503)
- [前端 mock 解决方案](/books/知识库/02、技术生态圈/10、前端mock解决方案/README.md)

#### Node 项目构建

- [从 0 构建一个 TS-Node 项目](/books/知识库/03、Node技术知识/11、从0构建一个TS-Node项目/README.md)

#### 深入原理研究

- [使用四十行代码实现一个核心 koa](https://juejin.im/post/6844904096516816904)
- [你不能不知道的 Koa 实现原理](https://juejin.im/post/5d1964bfe51d454fd8057bcb)

#### npm

- [发布、安装自己的 npm 模块](https://www.cnblogs.com/yanhua2017/p/7748491.html)
- [npm 镜像源的切换问题](/books/知识库/02、技术生态圈/05、npm镜像源切换问题/README.md)
- [分分钟教会你搭建企业级的 npm 私有仓库](https://juejin.im/post/6844904196651630599)

#### 包管理

- [Pnpm: 最先进的包管理工具](https://juejin.cn/post/7001794162970361892)

#### Deno

- [Deno 正式发布，彻底弄明白和 node 的区别](https://juejin.im/post/6844904158617665544)

#### 展望 Node 未来

- [[译] Node.js 新特性将颠覆 AI、物联网等更多惊人领域](https://juejin.im/post/6844903985053188109)

### 日常采坑与记录

- [audio 标签兼容性自动播放解决方案](/books/知识库/04、日常采坑与记录/02、audio标签兼容性自动播放解决方案/README.md)
- [填坑-输入中文时，拼音阶段会触发 input 事件](/books/知识库/04、日常采坑与记录/03、填坑-输入中文时，拼音阶段会触发input事件/03、填坑-输入中文时，拼音阶段会触发input事件.md)

### 优秀技术文档收集与前沿技术归档

- [目录索引](/books/知识库/05、优秀技术文档与前沿技术归档/README.md)

### 优秀的开源项目

- [优秀开源项目搜藏目录](/books/知识库/06、优秀开源项目/README.md)

### 基础功能探索

- [人民币大小写互换](/books/知识库/07、基础功能探索/01、人民币大小写互换/README.md)

## 发展与 OKR

### 发布的 npm 开源模块

- [koa2 日志监控中间件:koa-logs-middleware](https://github.com/yanlele/koa-logs-middleware)
- [前端工程化](https://github.com/yanlele/le-cli)
- [前端工程化 - 模板项目](https://github.com/cli-template-build)
- [小程序接入 redux](https://github.com/yanlele/redux2miniapp)

### 在折腾的个人项目

- [在折腾的个人项目 - 总目录](/books/发展与OKR/02、在折腾的个人项目/README.md)
- [基于 vue 和 express 的一个小型电商全栈项目](https://github.com/yanlele/nodeMall)
- [react 新闻站项目 pc+移动双端](https://github.com/yanlele/React-News)
- [基于 socket.IO 的一个较为复杂的项目案例，参考自《node.js 实战》](https://github.com/yanlele/chatApplication)
- [react 实战项目实战一：基于 socket.io 和 express 的一个全栈项目](https://github.com/yanlele/ReactAppChatWork)
- [基于 vue 的一些列 vue 全家桶的技术实现实例](https://github.com/yanlele/vueModel)
- [webpack3 的学习与代码示例](https://github.com/yanlele/webpack3Study)
- [基于 vue 的移动端在线音乐播放器](https://github.com/yanlele/yanle-music)
- [koa2 的学习笔记项目 demo](https://github.com/yanlele/koa-study)

### 研究的项目

### 研究的问题

### 源码研究

- [源码研究](https://github.com/Source-Research/main)

### 自我管理

- [待研究知识 \*\*](/books/发展与OKR/06、自我管理/01、待研究知识/README.md)
- [规划](/books/发展与OKR/06、自我管理/02、规划/README.md)
- [思考](/books/发展与OKR/06、自我管理/03、思考/README.md)
