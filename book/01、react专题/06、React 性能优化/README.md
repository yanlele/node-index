# React 性能优化

目录

## react组件的性能优化（渲染角度优化）

### 查看性能工具
在最新的React16版本中，我们可以直接在url后加上?react_pref，
就可以在chrome浏览器的performance，我们可以查看User Timeing来查看组件的加载时间。


### render里面尽量减少新建变量和bind函数，传递参数是尽量减少传递参数的数量
首先我们先思考一个问题，比如我要实现一个点击按钮使相应的num增加1，我们有哪一些方法。

大家应该都能想到，无非就是三种：
```jsx
<button onClick={this.handleClick}>btn1</button>
<button onClick={this.handleClick.bind(this)}>btn1</button>
<button onClick={() => this.handleClick()}>btn1</button>
```
第一种是在构造函数中绑定this，第二种是在render()函数里面绑定this，第三种就是使用箭头函数，都能实现上述方法；
第一种的性能最好。                           
因为第一种，构造函数每一次渲染的时候只会执行一遍；                                       
而第二种方法，在每次render()的时候都会重新执行一遍函数；                                        
第三种方法的话，每一次render()的时候，都会生成一个新的箭头函数，即使两个箭头函数的内容是一样的。                                        

### 定制shouldComponentUpdate函数
shouldComponentUpdate是决定react组件什么时候能够不重新渲染的函数，但是这个函数默认的实现方式就是简单的返回一个true。
也就是说，默认每次更新的时候都要调用所用的生命周期函数，包括render函数，重新渲染。

我们可以看一个这样的例子: 我们可以清晰的看到虽然demo组件里的title值没有改变，但是还是render了。
```jsx harmony
class App extends Component {
    constructor(props) {
        super(props);
        this.handleTitle = this.handleTitle.bind(this);
        this.handleNum = this.handleNum.bind(this);
        this.state = {
            title: 'hello',
            num: 0
        }
    }
    
    render() {
        return (
            <div>
                <h2>num: {this.state.num}</h2>
                <button onClick={this.handleNum}>add number</button>
                <button onClick={this.handleTitle}>set title</button>
                <Demo title={this.state.title}></Demo>
            </div>
        )
    }
    
    handleNum() {
        
    }
    
    handleTitle() {
        
    }
}

class Demo extends Component {
    shouldComponentUpdate(nextProps, nextState) {
        if(nextState.title === this.props.title) {
            return false;
        }
        return true;
    }
    
    render() {
        console.log('执行')
        return (
            <div>
                I am demo , title: {this.props.title}
            </div>
        )
    }
}
```
只有当demo的title值发生改变的时候，我们才去render，我们可以看一下效果.

在最新的react中，react给我们提供了React.PureComponent，
官方也在早期提供了名为react-addons-pure-render-mixin插件来重新实现shouldComponentUpdate生命周期方法。

### Immutable.js
javascript中的对象一般都是可变的，因为使用了引用赋值.
```js
foo = { a : 1 };
bar = foo;
bar.a = 2;
```

当我们给bar.a赋值后，会发现foo.a也变成了2，虽然我们可以通过深拷贝与浅拷贝解决这个问题，但是这样做非常的昂贵，对cpu和内存会造成浪费。                               
这里就需要用到Immutable，通过Immutable创建的Immutable Data一旦被创建，就不能再更改。
对Immutable对象进行修改、添加或删除操作，都会返回一个新的Immutable对象。

使用Map生成一个immutable对象                    
```js
import { Map , is } from 'immutable';

let obj = Map({
  'name': 'react study',
  'course': Map({name: 'react+redux'})
})

let obj1 = obj.set('name','darrell');

console.log(obj.get('course') === obj1.get('course')); // 返回true
console.log(obj === obj1); // 返回false
```

优点：                             
减少内存的使用                             
并发安全                                
降低项目的复杂度                                
便于比较复杂数据，定制shouldComponentUpdate方便                              

缺点:                                             
对现有项目入侵严重                                               
容易与原生的对象进行混淆                                                


### 多个react组件性能优化，key的优化
react为了追求高性能，采用了时间复杂度为O(N)来比较两个属性结构的区别，因为要确切比较两个树形结构，需要通过O(N^3)，这会降低性能。
关于key的使用我们要注意的是，这个key值要稳定不变的，就如同身份证号之于我们是稳定不变的一样。                       
一个常见的错误就是，拿数组的的下标值去当做key，这个是很危险的，代码如下，我们一定要避免。                          

## redux性能优化：reselect（数据获取时优化）
这个时候，reselect就应运而生了，它的动作原理：只要相关的状态没有改变，那么就直接使用上一次的缓存结果。
可以参考这个文章： [翻译|Redux的中间件-Reselect](https://www.jianshu.com/p/6e38c66366cd)







参考文章
- [React 性能优化，你需要知道的几个点](https://www.jianshu.com/p/333f390f2e84)
- [翻译|Redux的中间件-Reselect](https://www.jianshu.com/p/6e38c66366cd)