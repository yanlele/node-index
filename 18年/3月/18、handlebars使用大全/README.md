# handlebars使用大全

- [1、基本使用方法](#class1)
- [2、初级用法](#class2)
- [3、中级用法:helper](#class3)
    - [3.1、默认helper](#class3.1)
    - [3.2、自定义helper](#class3.2)

### <div id='class1'>1、使用方式：</div>
```html
<script src="../../../jquery.min.js"></script>
<script src="handlebars-v4.0.5.js"></script>

<!--HTML：-->
<div class="yanle">12312313</div>

<!--Template:-->
<script id="entry-template" type="text/x-handlebars-template">
    <div class="entry">
        <h1>{{cname}}</h1>
        <div class="body">
            {{questionInfo.title}}
        </div>
    </div>
</script>
```

JavaScript：
```javascript
    var source = $("#entry-template").html();
    var template = Handlebars.compile(source);

    var context = {
        "cid": "id",
        "cname": "cname",
        "pid": "pid",
        "pname": "pname",
        "questionInfo": {"clicks": 0, "content": "内容", "qid": "111", "score": 0, "stickFlag": false, "title": "标题"}
    };
    var html = template(context);

    $('.yanle').html(html);
```

公司的用法：
```javascript
var Handlebars = require('handlebars');
var template3 = Handlebars.compile(require('html!./templates/authentication_company_date3.html'));
$('#user-info3').html(template3(res.data));
```


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

#### <div id='class3.1'>3.1、默认helper</div>

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

**each**
each相当于for循环。不过有些地方需要注意：            
- 可以用相对路径的方式来获取上一层的上下文。（上下文概念跟js中的上下文差不多，比如在each passage代码块内，每一次循环上下文一次是passage[0],passage[1]…）     
- 一些默认变量，@first/@last 当该对象为数组中第一个/最后一个时返回真值。如果数组成员为值而非对象，@index表示当前索引值，可以用@key或者this获取当前值           
- 可以用 as |xxx|的形式给变量起别名，循环中通过别名可以引用父级变量值。当然也可以通过相对路径的方式引用父级变量。          
示例1:        
```html
{ {#each passage} }
    { {#each paragraphs} }
      { {@../index} }:{ {@index} }:{ {this} }</p>
    { {else} }
      <p class="empty">No content</p>
    { {/each} }
{ {/each} }
```

示例2：        
```html
{ {#each array as |value, key|} }
  { {#each child as |childValue, childKey|} }
    { {key} } - { {childKey} }. { {childValue} }
  { {/each} }
{ {/each} }
```

示例3：同时也可以用来遍历对象，这时@key表示属性名,this表示对应的值
```html
{ {#each object} }
  { {@key} }: { {this} }
{ {/each} }
```

**with**
一般情况下，Handlebars模板会在编译的阶段的时候进行context传递和赋值。使用with的方法，我们可以将context转移到数据的一个section里面（如果你的数据包含section）。        
这个方法在操作复杂的template时候非常有用。       
json数据如下:       
```
{
  title: "My first post!",
  author: {
    firstName: "Charles",
    lastName: "Jolley"
  }
}
```

使用示例：
```html
<div class="entry">  
  <h1>{{title}}</h1>
  {{#with author}}
  <h2>By {{firstName}} {{lastName}}</h2>
  {{/with}}
</div>  
```

**path路径的使用**
Handlebar支持路径和mustache,Handlebar还支持嵌套的路径，使得能够查找嵌套低于当前上下文的属性
可以通过.来访问属性也可以使用../,来访问父级属性。
json数据局格式如下
```
{
    "person":{ "name": "Alan" },
    "company":{"name": "Rad, Inc." }
};
```
使用方法：
```html
{{#with person}}
    <h1>{{../company.name}}</h1>
{{/with}}
```

#### <div id='class3.2'>3.2、自定义helper</div>
**行级helper**
传变量时可以用this指针来指代它访问属性，通过逻辑判断后可以返回一段html代码，不过太建议这样做。考虑以后的维护性，这种html代码和js代码混合起来的维护性是比较差的，如果要抽象层组件还是使用分页比较好。       
模板：     
```html
{{agree_button person}}
```
注册helper：       
```javascript
hbs.registerHelper('agree_button', function(p) {
  console.log(p===this);//==> true
  var blog = hbs.handlebars.escapeExpression(this.person.blog),
      name = hbs.handlebars.escapeExpression(this.person.name);

  return new hbs.handlebars.SafeString(
    "<a href='"+blog+"'>"+ name + "</button>"
  );
});
```

数据：     
```
var context = {
    person:{name: "亚里士朱德", blog: "https://yalishizhude.github.io"} };
};
```

输出html :
```html
  <a href="https://yalishizhude.github.io">亚里士朱德</a>
```
[示例代码1：自定义行级helper](./01、自定义行级helper.html)

**块级helper**











参考资料：[handlebars玩家指南](http://cnodejs.org/topic/56a2e8b1cd415452622eed2d)