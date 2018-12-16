# 深入学习react高阶组件

## 1.高阶组件的介绍

### 高阶函数的基本概念
函数可以作为参数被传递                             
函数可以作为返回值输出                             

### 高阶组件
高阶组件就是接受一个组件作为参数并返回一个新的组件函数                                                         
高阶组件是一个函数， 并不是一个组件                                      

使用实例：先举一个场景的例子， 有B， C 两个不同的组件，但是他们用公共的父容器组件A， 那么我们在写代码的时候， 就可以写出如下的一个简单的高阶组件：                       
// 父容器A
```jsx harmony
import React, {Component} from 'react';
function A(WrappedComponent) {
    return class A extends Component {
        render() {
            return (
                <div>
                    我是A组件
                    <br/>
                    <WrappedComponent/>
                </div>
            )
        }
    }
}
export default A;
```

子组件B：
```jsx harmony
import React, {Component} from 'react';
import A from "components/view/A";
class B extends Component {
    render() {
        return (
            <div>
                我是B组件
            </div>
        )
    }
}
export default A(B);
```

子组件C：
```jsx harmony
import React, {Component} from 'react';
import A from "components/view/A";
class C extends Component {
    render() {
        return (
            <div>
                我是C组件
            </div>
        )
    }
}
export default A(C)
```

使用：                 
```jsx harmony
import React, {Component} from 'react';
import B from 'components/view/B';
import C from 'components/view/C';

class HOComponent extends Component {
    render() {
        return (
            <div>
                <h2>我是高阶组件</h2>
                <B />
                <hr/>
                <C />
            </div>
        )
    }
}
export default HOComponent;
```

高阶组件的一个实现流程:                        
实现一个普通的组件 --->>> 讲普通组价使用函数包裹起来                                                  

高阶组件的使用：                                        
1、直接当做一个函数来使用就行了：                                       
```jsx harmony
import React, {Component} from 'react';
import A from "components/view/A";
import D from "components/view/D";

class B extends Component {
    render() {
        return (
            <div>
                我是B组件
            </div>
        )
    }
}
export default D(A(B));
```

2、利用babel 装饰器模块是用 @WrappedComponent 注解的方式使用                                 
需要安装模块： `babel-plugin-transform-decorators-legacy`
使用的时候如下：
```json
{
  "presets": [
    "env",
    "react",
    "stage-0"
  ],
  "plugins": [
    "react-hot-loader/babel",
    "transform-runtime",
    "transform-decorators-legacy",
    ["import", {
      "libraryName": "antd",
      "libraryDirectory": "es",
      "style": "css"
    }]
  ]
}
```

具体使用， 可以直接看 项目 build-react-index
