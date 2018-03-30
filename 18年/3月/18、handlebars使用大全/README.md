# handlebars使用大全

- [1、基本使用方法](#class1)

### <div id='class1'>1、使用方式：</div>


### <div id='class2'>2、初级</div>
数据：
```
{ 
    title: 'Express', 
    obj:{
        version: 'v4.3', 
        category: 'node', 
        "date~": '2016'
    }
}
```
模板：
```html
<p>{ {title} }</p>
<p>{ {obj.version} }</p>
<p>{ {obj/category} }</p>
<p>{ {obj.date~} }</p>
```

** “&&”,"||","!"这类逻辑判断是不能出现在表达式中的！**


### <div id='class3'>3、中级: helper</div>

#### <div id='class3.1'>3.1、默认helper: helper</div>

**if else**
用法1：
```html
  { {#if author} }
    <h1>{ {firstName} } { {lastName} }</h1>
  { {else} }
    <h1>Unknown Author</h1>
  { {/if} }
```
用法2：
```html
{ {#if isActive} }
  <img src="star.gif" alt="Active">
{ {else if isInactive} }
  <img src="cry.gif" alt="Inactive">
{ {/if} }
```
if else 的语法只能判断是否有值，不能做逻辑判断

**unless**
与if相反的helper
```html
 { {#unless license} }
  <h3 class="warning">WARNING: This entry does not have a license!</h3>
 { {/unless} }
```
上面这段代码就等价于  
```html
{ {#if license} }
{ {else} }
<h3 class="warning">WARNING: This entry does not have a license!</h3>
{ {/if} }
```















参考资料：[handlebars玩家指南](http://cnodejs.org/topic/56a2e8b1cd415452622eed2d)