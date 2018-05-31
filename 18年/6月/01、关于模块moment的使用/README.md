#  关于时间模块moment的使用

## Now 获取当前时间
具体语法：           
```javascript
moment();
// From 2.14.0 onward, also supported
moment([]);
moment({});
```

## String 传值的情况
`moment(String);`这样也可以得到一个完整的moment时间对象            
```javascript
let time = moment(new Date().getTime());
console.log(time);
```

可以接受的常见时间字符串为：          
```
2013-02-08               # A calendar date part
20130208                 # Basic (short) full date
2013-02-08T09            # An hour time part separated by a T
2013-02-08 09            # An hour time part separated by a space
2013-02-08 09:30         # An hour and minute time part
2013-02-08 09:30:26      # An hour, minute, and second time part
2013-02-08 09:30:26.123  # An hour, minute, second, and millisecond time part
2013-02-08 24:00:00.000  # hour 24, minute, second, millisecond equal 0 means next day at midnight
20130208T080910,123      # Short date and time up to ms, separated by comma
20130208T080910.123      # Short date and time up to ms
20130208T080910          # Short date and time up to seconds
20130208T0809            # Short date and time up to minutes
20130208T08              # Short date and time, hours only
13位时间毫秒值            
```

`moment("not a real date").isValid(); // false` 这个函数还可以帮助我们校验是否是一个正确的可以解析的时间字符串         

## String + Format  接受时间字符串，转为固定的日期格式
```
moment(String, String);
moment(String, String, String);
moment(String, String, Boolean);
moment(String, String, String, Boolean);
```

使用：         
```
moment("12-25-1995", "MM-DD-YYYY");
```

对应字符串字母含义           
Year, month, and day tokens         

|Input|	Example	| Description|          
|:-|:-|:-|          
|YYYY|2014|4 or 2 digit year|           
|YY|	14|	2 digit year|           
|Y|	-25|	Year with any number of digits and sign|            
|Q|	1..4|	Quarter of year. Sets month to first month in quarter.|         
|M| MM|	1..12	Month number|   
|MMM| MMMM|	Jan..December	Month name in locale set by moment.locale()|
|D| DD|	1..31	Day of month|
|Do|	1st..31st|	Day of month with ordinal|
|DDD| DDDD|	1..365	Day of year|
|X|	1410715640.579|	Unix timestamp|
|x|	1410715640579|	Unix ms timestamp|


Week year, week, and weekday tokens         

|Input|	Example	| Description|          
|:-|:-|:-|          
|gggg|	2014|	Locale 4 digit week year|
|gg|	14|	Locale 2 digit week year|
|w ww|	1..53|	Locale week of year|
|e|	0..6|	Locale day of week|
|ddd dddd|	Mon...Sunday|	Day name in locale set by moment.locale()|
|GGGG|	2014|	ISO 4 digit week year|
|GG|	14|	ISO 2 digit week year|
|W WW|	1..53|	ISO week of year|
|E|	1..7|	ISO day of week|



