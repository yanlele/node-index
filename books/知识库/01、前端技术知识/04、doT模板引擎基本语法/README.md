# doT模板引擎基本语法
- 1、for interpolation 赋值        
  
格式：{{= }}       
数据源：{"name":"Jake","age":31}        
区域: `<div id="interpolation"></div>`    
模板： 
```html
<script id="interpolationtmpl" type="text/x-dot-template">
    <div>Hi {{=it.name}}!</div>
    <div>{{=it.age || ''}}</div>
</script>
```
调用方式：   
```javascript
var dataInter = {"name":"Jake","age":31};
var interText = doT.template($("#interpolationtmpl").text());
$("#interpolation").html(interText(dataInter));
```


- 2、for evaluation for in 循环    

格式： 
```html
{{ for var key in data { }} 
    {{= key }} 
{{ } }}
```
数据源：
```json
{
    "name": "Jake", 
    "age": 31, 
    "interests": [
        "basketball", 
        "hockey", 
        "photography"
    ], 
    "contact": {
        "email": "jake@xyz.com", 
        "phone": "999999999"
    }
}
```    
区域: `<div id="evaluation"></div>`   
模板： 
```html
<script id="evaluationtmpl" type="text/x-dot-template">
    {{ for(var prop in it) { }}
        <div>KEY:{{= prop }}---VALUE:{{= it[prop] }}</div>
    {{ } }}
</script>
```
调用方式：   
```javascript
var dataEval = {"name":"Jake","age":31,"interests":["basketball","hockey","photography"],"contact":{"email":"jake@xyz.com","phone":"999999999"}};
var evalText = doT.template($("#evaluationtmpl").text());
$("#evaluation").html(evalText(dataEval));
```


- 3、for array iteration 数组

格式： 
```html
{{~data.array :value:index }}
    ...
{{~}}
```
数据源：
```json
{
    "array": [
        "banana", 
        "apple", 
        "orange"
    ]
}
```    
区域: `<div id="arrays"></div>`   
模板： 
```html
<script id="arraystmpl" type="text/x-dot-template">
    {{~it.array:value:index}}
        <div>{{= index+1 }}{{= value }}!</div>
    {{~}}
</script>
```
调用方式：   
```javascript
var dataArr = {"array":["banana","apple","orange"]};
var arrText = doT.template($("#arraystmpl").text());
$("#arrays").html(arrText(dataArr));
```

- 4、{{? }} for conditionals 条件

格式： 
```html
{{? }} if
{{?? }} else if
{{??}} else
```
数据源：
```json
{
    "name": "Jake", 
    "age": 31
}
```    
区域: `<div id="condition"></div>`   
模板： 
```html
<script id="conditionstmpl" type="text/x-dot-template">
    {{? !it.name }}
    <div>Oh, I love your name, {{=it.name}}!</div>
    {{?? !it.age === 0}}
    <div>Guess nobody named you yet!</div>
    {{??}}
    You are {{=it.age}} and still dont have a name?
    {{?}}
</script>
```
调用方式：   
```javascript
var dataEncode = {"uri":"http://jq22.com/?keywords=Yoga","html":"<div style='background: #f00; height: 30px; line-height: 30px;'>html元素</div>"};
var EncodeText = doT.template($("#conditionstmpl").text());
$("#encode").html(EncodeText(dataEncode));
```

- 5、for interpolation with encoding   插入html

格式： 
```html
{{!it.uri}}
```
数据源：
```json
{
    "uri": "http://jq22.com/?keywords=Yoga"
}
```    
区域: `<div id="encode"></div>`   
模板： 
```html
<script id="encodetmpl" type="text/x-dot-template">
    Visit {{!it.uri}} {{!it.html}}
</script>
```
调用方式：   
```javascript
var dataEncode = {"uri":"http://jq22.com/?keywords=Yoga","html":"<div style='background: #f00; height: 30px; line-height: 30px;'>html元素</div>"};
var EncodeText = doT.template($("#encodetmpl").text());
$("#encode").html(EncodeText(dataEncode));
```

- 6、{{# }} for compile-time evaluation/includes and partials    
    {{## #}} for compile-time defines

数据源：
```json
{"name":"Jake","age":31}
```    
区域: `<div id="part"></div>`   
模板： 
```html
<script id="parttmpl" type="text/x-dot-template">
    {{##def.snippet:
    <div>{{=it.name}}</div>{{#def.joke}}
    #}}
    {{#def.snippet}}
    {{=it.html}}
</script>
```
调用方式：   
```javascript
var dataPart = {"name":"Jake","age":31,"html":"<div style='background: #f00; height: 30px; line-height: 30px;'>html元素</div>"};
var defPart = {"joke":"<div>{{=it.name}} who?</div>"};
var partText = doT.template($("#parttmpl").text(), undefined, defPart);
$("#part").html(partText(dataPart))
```
