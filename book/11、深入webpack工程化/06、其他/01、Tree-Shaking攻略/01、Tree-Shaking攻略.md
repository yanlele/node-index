# Tree-Shaking攻略

<!-- toc -->

- [死代码和活代码](#%E6%AD%BB%E4%BB%A3%E7%A0%81%E5%92%8C%E6%B4%BB%E4%BB%A3%E7%A0%81)
- [tree-shaking 支持的方式 import](#tree-shaking-%E6%94%AF%E6%8C%81%E7%9A%84%E6%96%B9%E5%BC%8F-import)
- [基于webpack tree-shaking](#%E5%9F%BA%E4%BA%8Ewebpack-tree-shaking)
- [副作用](#%E5%89%AF%E4%BD%9C%E7%94%A8)
- [如何告诉 Webpack 你的代码无副作用](#%E5%A6%82%E4%BD%95%E5%91%8A%E8%AF%89-webpack-%E4%BD%A0%E7%9A%84%E4%BB%A3%E7%A0%81%E6%97%A0%E5%89%AF%E4%BD%9C%E7%94%A8)
- [全局css副作用](#%E5%85%A8%E5%B1%80css%E5%89%AF%E4%BD%9C%E7%94%A8)
- [模块概念](#%E6%A8%A1%E5%9D%97%E6%A6%82%E5%BF%B5)
- [jest场景](#jest%E5%9C%BA%E6%99%AF)
  * [本地jest](#%E6%9C%AC%E5%9C%B0jest)
  * [配置 Jest 重新编译库代码](#%E9%85%8D%E7%BD%AE-jest-%E9%87%8D%E6%96%B0%E7%BC%96%E8%AF%91%E5%BA%93%E4%BB%A3%E7%A0%81)
- [针对特定库的优化](#%E9%92%88%E5%AF%B9%E7%89%B9%E5%AE%9A%E5%BA%93%E7%9A%84%E4%BC%98%E5%8C%96)
  * [MomentJS](#momentjs)
  * [lodash](#lodash)
- [参考文章](#%E5%8F%82%E8%80%83%E6%96%87%E7%AB%A0)

<!-- tocstop -->

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

## 模块概念
```js
// Commonjs
const stuff = require('./stuff');
module.exports = stuff;

// es2015 
import stuff from './stuff';
export default stuff;
```
Babel 假定我们使用 es2015 模块编写代码，并转换 JavaScript 代码以使用 commonjs 模块。                        
但是，**Webpack 不支持使用 commonjs 模块来完成 tree-shaking**。

**为了进行 tree-shaking，我们需要将代码编译到 es2015 模块。**

为了让我们编译的代码使用 es2015 模块，我们需要做的就是告诉 babel 不要管它们。
```js
// es2015 模块的基本 Babel 配置
const config = {
 presets: [
  [
   '[@babel/preset-env]',
   {
    modules: false
   }
  ]
 ]
};
```

把 `modules` 设置为 `false`，就是告诉 babel 不要编译模块代码。这会让 Babel 保留我们现有的 `es2015 import/export` 语句。

**如果你有要导入的库，则必须将这些库编译为 es2015 模块以便进行 tree-shaking 。**

## jest场景
Jest 是基于 NodeJS 开发的，而 NodeJS 不支持 es2015 模块。

### 本地jest
开发和生产环境我们需要 es2015 模块，而测试环境需要 commonjs 模块。还好，Babel 配置起来非常容易：
```js
// 分环境配置Babel 
const config = {
 env: {
  development: {
   presets: [
    [
     '[@babel/preset-env](http://twitter.com/babel/preset-env)',
     {
      modules: false
     }
    ]
   ]
  },
  production: {
   presets: [
    [
     '[@babel/preset-env](http://twitter.com/babel/preset-env)',
     {
      modules: false
     }
    ]
   ]
  },
  test: {
   presets: [
    [
     '[@babel/preset-env](http://twitter.com/babel/preset-env)',
     {
      modules: 'commonjs'
     }
    ]
   ],
   plugins: [
    'transform-es2015-modules-commonjs' // Not sure this is required, but I had added it anyway
   ]
  }
 }
};
```

所有的项目本地代码能够正常编译，Jest 测试能运行了。**但是，使用 es2015 模块的第三方库代码依然不能运行。**                       
这是因为，Jest (尤其是 babel-jest) 在跑测试之前编译代码的时候，默认忽略任何来自node_modules 的代码。


### 配置 Jest 重新编译库代码
```
// 重新编译库代码的 Jest 配置 
const path = require('path');
const librariesToRecompile = [
 'Library1',
 'Library2'
].join('|');
const config = {
 transformIgnorePatterns: [
  `[\\\/]node_modules[\\\/](?!(${librariesToRecompile})).*$`
 ],
 transform: {
  '^.+\.jsx?$': path.resolve(__dirname, 'transformer.js')
 }
};
```
`transformIgnorePatterns` 是 `Jest` 配置的一个功能，它是一个正则字符串数组。
任何匹配这些正则表达式的代码，都不会被 babel-jest 重新编译。默认是一个字符串“node_modules”。这就是为什么Jest 不会重新编译任何库代码。

`transform`配置设置它用于在重新编译所有代码时加载我们的 Babel 配置。


## 针对特定库的优化

### MomentJS
除了 momentjs 所有的多语言包
```js
// 用 IgnorePlugin 移除多语言包
const { IgnorePlugin } from 'webpack';
const config = {
 plugins: [
  new IgnorePlugin(/^\.\/locale$/, /moment/)
 ]
};
```

**Moment-Timezone**                         
保留本世纪的年份数据，就可以将体积缩小90%。这种情况需要用到一个特殊的 Webpack 插件。
```js
// MomentTimezone Webpack Plugin
const MomentTimezoneDataPlugin = require('moment-timezone-data-webpack-plugin');
const config = {
 plugins: [
  new MomentTimezoneDataPlugin({
   startYear: 2018,
   endYear: 2100
  })
 ]
};
```

### lodash
```js
// Babel Transform Imports
// Babel config
const config = {
 plugins: [
  [
   'transform-imports',
   {
    'lodash-es': {
     transform: 'lodash/${member}',
     preventFullImport: true
    },
    'react-bootstrap': {
     transform: 'react-bootstrap/es/${member}', // The es folder contains es2015 module versions of the files
     preventFullImport: true
    }
   }
  ]
 ]
};

// 这些库不再支持全量导入，否则会报错
import _ from 'lodash-es';

// 具名导入依然支持
import { debounce } from 'loash-es';

// 不过这些具名导入会被babel编译成这样子
// import debounce from 'lodash-es/debounce';
```



## 参考文章
- [Webpack 4 Tree Shaking 终极优化指南](https://juejin.im/post/5dcec27d5188254b0147e619#heading-0)
