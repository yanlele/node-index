# handlebars使用大全

- [1、基本使用方法](#class1)
- [2、初级用法](#class2)
- [3、中级用法:helper](#class3)
    - [3.1、默认helper](#class3.1)
    - [3.2、自定义helper](#class3.2)
- [4、高级玩家：partial](#class4)
    - [4.1、基础引用](#class4.1)
    - [4.1、动态分页](#class4.2)
    - [4.1、内联分页](#class4.3)

### <div id='class1'>1、使用方式：</div>
```html
<script src="https://cdn.bootcdn.net/ajax/libs/jquery/2.2.4/jquery.min.js"></script>
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
<p>{ {title}}</p>
<p>{ {obj.version}}</p>
<p>{ {obj/category}}</p>
<p>{ {obj.date~}}</p>
```

** “&&”,"||","!"这类逻辑判断是不能出现在表达式中的！**


### <div id='class3'>3、中级: helper</div>

#### <div id='class3.1'>3.1、默认helper</div>

**if else**
用法1：
```html
  {{#if author}}
    <h1>{{firstName}} {{lastName}}</h1>
  {{else}}
    <h1>Unknown Author</h1>
  {{/if}}
```
用法2：
```html
{{#if isActive}}
  <img src="star.gif" alt="Active">
{{else if isInactive}}
  <img src="cry.gif" alt="Inactive">
{{/if}}
```
if else 的语法只能判断是否有值，不能做逻辑判断

**unless**
与if相反的helper
```html
 {{#unless license}}
  <h3 class="warning">WARNING: This entry does not have a license!</h3>
 {{/unless}}
```
上面这段代码就等价于  
```html
{{#if license}}
{{else}}
<h3 class="warning">WARNING: This entry does not have a license!</h3>
{{/if}}
```

**each**
each相当于for循环。不过有些地方需要注意：            
- 可以用相对路径的方式来获取上一层的上下文。（上下文概念跟js中的上下文差不多，比如在each passage代码块内，每一次循环上下文一次是passage[0],passage[1]…）     
- 一些默认变量，@first/@last 当该对象为数组中第一个/最后一个时返回真值。如果数组成员为值而非对象，@index表示当前索引值，可以用@key或者this获取当前值           
- 可以用 as |xxx|的形式给变量起别名，循环中通过别名可以引用父级变量值。当然也可以通过相对路径的方式引用父级变量。          
示例1:        
```html
{{#each passage}}
    {{#each paragraphs}}
      {{@../index}}:{{@index}}:{{this}}</p>
    {{else}}
      <p class="empty">No content</p>
    {{/each}}
{{/each}}
```

示例2：        
```html
{{#each array as |value, key|}}
  {{#each child as |childValue, childKey|}}
    {{key}} - {{childKey}}. {{childValue}}
  {{/each}}
{{/each}}
```

示例3：同时也可以用来遍历对象，这时@key表示属性名,this表示对应的值
```html
{{#each object}}
  {{@key}}: {{this}}
{{/each}}
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
    person:{name: "亚里士朱德", blog: "https://yalishizhude.github.io"}};
};
```

输出html :
```html
  <a href="https://yalishizhude.github.io">亚里士朱德</a>
```
[示例代码1：自定义行级helper](./01、自定义行级helper.html)

**块级helper**
块级helper获取参数的方式跟之前差不多，只是最后多了一个参数，这个参数有两个函数fn和revers可以和else搭配使用。后面将会讲解。          
模板：     
```html
{{#list nav}}
  <a href="{{url}}">{{title}}</a>
{{/list}}
```     

注册helper：           
```javascript
Handlebars.registerHelper('list', function(context, options) {
  var ret = "<ul>";
  for(var i=0, j=context.length; i<j; i++) {
    ret = ret + "<li>" + options.fn(context[i]) + "</li>";
  }
  return ret + "</ul>";
});
```         

数据：         
```
{
  nav: [
    { url: "https://yalishihzude.github.io", title: "blog" },
    { url: "https://www.github.com/yalishizhude", title: "github" },
  ]
}
```

html页面：     
```html
<ul>
    <li>  <a href="https://yalishizhude.github.io">blog</a> </li>
    <li>  <a href="https://www.github.com/yalishizhude">github</a> </li>
</ul>
```         

### <div id='class4'>4、高级用法：partial</div>
比较推崇使用分页来实现组件化。分页跟helper一样需要先注册。在hbs模块中可以批量注册，比较简单。         
hbs.registerPartials(__dirname + '/views/partials');            


#### <div id='class4.1'>4.1、基础引用</div>      
用“>”来引用模板，这种情况一般用来处理页头页尾这种简单的分页。后面可以传入参数。           
`{{> myPartial param}}`         
当使用块级表达式时，我们通常添加“#”，而分页是“>”，所以块级分页使用“#>”，这里表示如果layout分页不存在则显示块内的内容My Content。       
```html
{{#> layout }}
  My Content
{{/layout}}
```

#### <div id='class4.2'>4.2、动态分页</div>      
当然也可以用表达式来代替分页名称        
{{> (whichPartial) }}         
当分页中一部分代码是固定的，另一部分是变化的时候，可以在分页中添加“@partial-block”，这时当引用这个分页时，在内部编写代码将会填充到这个位置。          
partial.hbs：        
```html
{{> [@partial-block](/user/partial-block) }}
```

模板：     
```html
{{#>partial}}
https:yalishizhude.github.io
{{/partial}}
```

html页面：
```html
https:yalishizhude.github.io
```

#### <div id='class4.3'>4.3、内联分页</div>          
当有多段代码需要填充到分页时,可以用如下方法。分页中内嵌分页变量，模板中通过内联分页的方式传入。        
模板：     
```html
{{#> partial}}
  {{#*inline "nav"}}
  {{/inline}}
  {{#*inline "content"}}
    https://yalishizhude.github.io
  {{/inline}}
{{/partial}}
```

partial.hbs：            
```html
<div class="nav">
  {{> nav}}
</div>
<div class="content">
  {{> content}}
</div>
```

html页面：     
```html
<div class="nav">
    test
</div>
<div class="content">
    https://yanle.github.com
</div>
```


参考资料：[handlebars玩家指南](http://cnodejs.org/topic/56a2e8b1cd415452622eed2d)
