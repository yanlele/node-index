# jquery获取表单数据

```javascript
    let data = {};
    let t = $('form').serializeArray();
    t.push({holdType: 1});
    $.each(t, function () {
        data[this.name] = this.value;
    });
```

这里data对象里面存的就是表单的数据了！