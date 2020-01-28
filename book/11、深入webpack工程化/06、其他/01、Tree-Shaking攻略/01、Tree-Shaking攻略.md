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




### 参考文章
- [Webpack 4 Tree Shaking 终极优化指南](https://juejin.im/post/5dcec27d5188254b0147e619#heading-0)
