# jquery的遍历方法可以获取复选框所欲的选中值

```javascript
$("input:checkbox:checked").each(function(index,element));   // 为所有选中的复选框执行函数，函数体中可以取出每个复选框的值
$("input:checkbox:checked").map(function(index,domElement)); // 将所有选中的复选框通过函数返回值生成新的jQuery 对象
```


### 核心JS示例
```javascript
$("input:button").click(function () {
    text = $("input:checkbox[name='message']:checked").map(function (index, elem) {
        return $(elem).val();
    }).get();   //这里就可以吧对象序列化为array
    let arr = [];
    $("input:checkbox[name='message']:checked").each(function (index, element) {
        arr.push($(element).val());
    });
    console.log(text);
    console.log(typeof text);
    console.log([1, 2, 3, 4, 5, 6]);
    console.log(typeof [1, 2, 3, 4, 5, 6]);

    console.log('arr',arr);
});
```

### [示例请看这里](./index.html)

