# Tree-Shaking攻略

## 死代码和活代码

死代码： Webpack 跟踪整个应用程序的 import/export 语句，因此，如果它看到导入的东西**最终没有被使用**，它会认为那是“死代码”，并会对其进行 tree-shaking 。

举例子：                    
```
// 导入并赋值给 JavaScript 对象，然后在下面的代码中被用到
// 这会被看作“活”代码，不会做 tree-shaking
import Stuff from './stuff';
doSomething(Stuff);


// 导入并赋值给 JavaScript 对象，但在接下来的代码里没有用到
// 这就会被当做“死”代码，会被 tree-shaking
import Stuff from './stuff';
doSomething();


// 导入但没有赋值给 JavaScript 对象，也没有在代码里用到
// 这会被当做“死”代码，会被 tree-shaking
import './stuff';
doSomething();


// 导入整个库，但是没有赋值给 JavaScript 对象，也没有在代码里用到
// 非常奇怪，这竟然被当做“活”代码，因为 Webpack 对库的导入和本地代码导入的处理方式不同。
import 'my-lib';
doSomething();
```


## tree-shaking 支持的方式 import

以 `lodash` 举例子                      
```
// 全部导入 (不支持 tree-shaking)
import _ from 'lodash';

// 具名导入(支持 tree-shaking)
import { debounce } from 'lodash';
// 直接导入具体的模块 (支持 tree-shaking)
import debounce from 'lodash/lib/debounce';
```


## 基于webpack tree-shaking

- 必须处于生产模式                  
- 必须将优化选项 “usedExports” 设置为true。这意味着 Webpack 将识别出它认为没有被使用的代码，并在最初的打包步骤中给它做标记。               
- TerserPlugin

```js
// Base Webpack Config for Tree Shaking
const config = {
 mode: 'production',
 optimization: {
  usedExports: true,
  minimizer: [
   new TerserPlugin({...})
  ]
 }
};
```


## 副作用
有些模块导入，只要被引入，就会对应用程序产生重要的影响。一个很好的例子就是全局样式表，或者设置全局配置的JavaScript 文件。                                        
Webpack 认为这样的文件有“副作用”。具有副作用的文件不应该做 tree-shaking。                        
默认地将所有代码视为有副作用。这可以保护你免于删除必要的文件，但这意味着 Webpack 的默认行为实际上是不进行 tree-shaking。                         
我们可以配置我们的项目，告诉 Webpack 它是没有副作用的，可以进行 tree-shaking。


## 如何告诉 Webpack 你的代码无副作用
`package.json` 有一个特殊的属性 `sideEffects`，就是为此而存在的。它有三个可能的值：

- true 是默认值，如果不指定其他值的话。这意味着所有的文件都有副作用，也就是没有一个文件可以 tree-shaking。
- false 告诉 Webpack 没有文件有副作用，所有文件都可以 tree-shaking。
- 第三个值 […] 是文件路径数组。它告诉 webpack，除了数组中包含的文件外，你的任何文件都没有副作用。

```
// 所有文件都有副作用，全都不可 tree-shaking
{
 "sideEffects": true
}

// 没有文件有副作用，全都可以 tree-shaking
{
 "sideEffects": false
}

// 只有这些文件有副作用，所有其他文件都可以 tree-shaking，但会保留这些文件
{
 "sideEffects": [
  "./src/file1.js",
  "./src/file2.js"
 ]
}
```


## 全局css副作用
这是因为这样的导入被 `webpack` 视为死代码，并被删除。
```
// 导入全局 CSS
import './MyStylesheet.css';
```

每种文件类型的每个规则都有自己的 `sideEffects` 标志。这会覆盖之前为匹配规则的文件设置的所有 `sideEffects` 标志。

为了保留全局 CSS 文件，我们只需要设置这个特殊的 `sideEffects` 标志为 `true`，就像这样:
```js
// 全局 CSS 副作用规则相关的 Webpack 配置
const config = {
 module: {
  rules: [
   {
    test: /regex/,
    use: [loaders],
    sideEffects: true
   }
  ]
 } 
};
```





### 参考文章
- [Webpack 4 Tree Shaking 终极优化指南](https://juejin.im/post/5dcec27d5188254b0147e619#heading-0)
