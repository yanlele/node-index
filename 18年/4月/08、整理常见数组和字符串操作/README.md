## 常见字符串操作

[主要可以查看W3C，字符串操作](http://www.runoob.com/jsref/jsref-obj-string.html)

| 方法 | 描述 |
| :- | :- |
|charAt()|返回在指定位置的字符。|
|indexOf()	| 返回某个指定的字符串值在字符串中首次出现的位置。|
|lastIndexOf() |	从后向前搜索字符串，并从起始位置（0）开始计算返回字符串最后出现的位置。|
|replace()|	在字符串中查找匹配的子串， 并替换与正则表达式匹配的子串。|
|split()|	把字符串分割为字符串数组。|
|string.substr(start,howmany)|substr() 方法可在字符串中抽取从 开始 下标开始的指定数目的字符。|
|string.substring(startIndex, endIndex)| 取字符串中介于两个指定下标之间的字符。 |
|string.slice(start,end)|提取字符串的片断，并在新的字符串中返回被提取的部分。返回新的字符串。|


## 常见数组的操作

[可以查看W3C，数组操作](http://www.runoob.com/jsref/jsref-obj-array.html)

| 方法 | 描述 |             
| :- | :- |     
|concat()|连接两个或更多的数组，并返回结果。|        
|entries()|	返回数组的可迭代对象。|        
|array.every(function(currentValue,index,arr), thisValue)|用于检测数组所有元素是否都符合指定条件|      
|array.fill(value, start, end)|方法用于将一个固定值替换数组的元素。|      
|array.filter(function(currentValue,index,arr), thisValue)|创建一个新的数组，新数组中的元素是通过检查指定数组中符合条件的所有元素|     
|find()	|返回符合传入测试（函数）条件的数组元素。|      
|findIndex()	|返回符合传入测试（函数）条件的数组元素索引。|        
|forEach()	|数组每个元素都执行一次回调函数。|      
|[Array.from(object, mapFunction, thisValue)](http://www.runoob.com/jsref/jsref-from.html)| 通过给定的对象中创建一个数组。 |      
|indexOf()	|搜索数组中的元素，并返回它所在的位置。|       
|join()	|把数组的所有元素放入一个字符串。|      
|array.map(function(currentValue,index,arr), thisValue)|方法返回一个新数组，数组中的元素为原始数组元素调用函数处理后的值。|      
|pop()	|删除数组的最后一个元素并返回删除的元素。|      
|push()	|向数组的末尾添加一个或更多元素，并返回新的长度。|          
|shift()	|删除并返回数组的第一个元素。|        
|unshift()|向数组的开头添加一个或更多元素，并返回新的长度。|        
|array.slice(startIndex, endIndex)|方法可从已有的数组中返回选定的元素。 slice() 方法不会改变原始数组。会返回新的数组|          
|array.some(function(currentValue,index,arr),thisValue)|方法用于检测数组中的元素是否满足指定条件（函数提供）。|
|[array.splice(index,howmany,item1,.....,itemX)](http://www.runoob.com/jsref/jsref-splice.html)|方法用于插入、删除或替换数组的元素。|

[数组的一个实例](./index.js)




