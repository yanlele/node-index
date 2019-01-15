## <div id="class06">架构型设计模式</div>


### <div id="class06-35">35、同步模块模式</div>
#### 描述
**模块化**：                        
将复杂的系统分解成高内聚、低耦合的模块， 使系统开发变得可控、可维护、可扩展， 提高模块的重复使用率。

**同步模块模式**:                                 
请求发出去之后， 无论模块是否存在， 立即执行后续的逻辑， 实现模块开发中对模块的立即使用。

#### 实际场景
**场景一**:                            
开发导航添加新消息提示引导， 但是别人还在修改导航， 这个时候， 就形成了一种开发排队的现象。                                     
开发一个模块管理核心。
```js
/*
    * 模块化开发就是讲复杂的系统分解为高内聚，低耦合的模块。
    * 每个工程师都可以去开发自己的模块实现复杂的系统可控， 可维护， 可扩展。 模块相互之间可以调用
    * 要点： 首先要有一个模块管理器， 管理模块的创建和调度
    * 模块调动： 调用分为两类， 一类同步模块调用的实现， 第二类是一步模块的实现
    * */
// 模块管理对象F
class F {
    /**
     * 创建模块
     * @param str
     * @param fn
     * @returns {*}
     */
    static define(str, fn) {
        let parts = str.split('.'),
            old = this,
            parent = this,
            i = 0,
            len = 0;                // i 是模块成绩， len是模块层级长度
        // 如果第一个模块是管理模块器， 则移除
        if (parts[0] === 'F') {
            parts = parts.slice(1);
        }
        // 屏蔽对define与module模块
        if (parts[0] === 'define' || parts[0] === 'module') {
            return false;
        }

        // 遍历路由模块并且定义每层模块
        for (len = parts.length; i < len; i++) {
            // 如果父模块中不存在当前模块
            if (typeof parent[parts[i]] === 'undefined') {
                // 申明当前模块
                parent[parts[i]] = {};
            }
            // 缓存下一层的祖父模块
            old = parent;
            // 缓存下一层的父级模块
            parent = parent[parts[i]];
        }
        // 如果给定模块方法则定义该模块方法
        if (fn) {
            // 此时 i 等于 parts.length , 所以要减一
            old[parts[--i]] = fn();
        }
        return this;
    };

    // 使用模块
    static module() {
        let args = Array.prototype.slice.call(arguments),               // 参数转为数组
            fn = args.pop(),                // 获取执行的函数
            parts = args[0] && args[0] instanceof Array ? args[0] : args,
            modules = [],               // 依赖模块列表
            modIDs = [],                // 模块路由
            i = 0,                      // 依赖路由
            ilen = parts.length,        // 依赖模块长度
            parent, j, jlen;            // 分别是福模块， 模块路由层级索引， 模块路由层级长度

        // 遍历依赖模块
        while (i < ilen) {
            if(typeof parts[i] === 'string') {
                parent = this;
                modIDs = parts[i].replace(/^F\./, '').split('.');
                // 遍历模块路由层级
                for(j = 0, jlen = modIDs.length; j< jlen; j++) {
                    // 重置父模块
                    parent = parent[modIDs[j]] || false;
                }
                // 将模块添加到依赖模块列表中去。
                modules.push(parent);
            } else {
                // 直接头添加依赖模块列表中
                modules.push(parts[i]);
            }
            // 获取下一个依赖
            i++;
        }
        fn.apply(null, modules);
    }
}
```
代码示例： [场景1-排队开发的场景](./35章、同步模块模式/01、排队开发的场景.html)


### <div id="class06-36">36、异步模块模式</div>
#### 描述
**模块化**：                        
将复杂的系统分解成高内聚、低耦合的模块， 使系统开发变得可控、可维护、可扩展， 提高模块的重复使用率。

**异步模块模式**:                                 
请求发出去之后， 继续执行其他业务逻辑， 知道模块加载完成执行后续的逻辑， 实际模块开发中对模块加载完成后引用。

#### 实际场景
场景一                     
对于加载的文件模块调用， 及时加载这个文件还是调用不到的。
