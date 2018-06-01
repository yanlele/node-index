#  关于时间模块moment的使用

[也可以直接看官方文档](https://github.com/moment/momentjs.com/tree/master/docs/moment)

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

> 可以接受的常见时间字符串为：          
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

## String + Format  接受时间字符串，设定接受的日期格式
```
moment(String, String);                     //普通的格式校验
moment(String, String, String);             //moment.utc() - 大多数用不到
moment(String, String, Boolean);            //是否为严格模式，默认false
moment(String, String, String, Boolean);
```

> 使用：         
```
moment("12-25-1995", "MM-DD-YYYY");
moment("12-25-1995", "MM-DD-YYYY");
moment("12/25/1995", "MM-DD-YYYY");
```

**对应字符串字母含义 **                      
> Year, month, and day tokens         

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


> Week year, week, and weekday tokens         

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

> Hour, minute, second, millisecond, and offset tokens            

|Input|	Example	| Description|          
|:-|:-|:-|    
|H HH|	0..23|	Hours (24 hour time)|
|h hh|	1..12|	Hours (12 hour time used with a A.)|
|k kk|	1..24|	Hours (24 hour time from 1 to 24)|
|a A|	am pm|	Post or ante meridiem (Note the one character a p are also considered valid)|
|m mm|	0..59|	Minutes|
|s ss|	0..59|	Seconds|
|S SS SSS|	0..999|	Fractional seconds|
|Z ZZ|	+12:00|	Offset from UTC as +-HH:mm, +-HHmm, or Z|


> 严格模式          

```javascript
moment('It is 2012-05-25', 'YYYY-MM-DD').isValid();       // true
moment('It is 2012-05-25', 'YYYY-MM-DD', true).isValid(); // false
moment('2012-05-25',       'YYYY-MM-DD', true).isValid(); // true
moment('2012.05.25',       'YYYY-MM-DD', true).isValid(); // false
```


## String + Formats  接受多种格式解析
语法： `moment(String, String[], String, Boolean);`            

示例：         
```javascript
moment("12-25-1995", ["MM-DD-YYYY", "YYYY-MM-DD"]);
moment("29-06-1995", ["MM-DD-YYYY", "DD-MM", "DD-MM-YYYY"]);    // uses the last format
moment("05-06-1995", ["MM-DD-YYYY", "DD-MM-YYYY"]);             // uses the first format
moment("29-06-1995", ["MM-DD-YYYY", "DD-MM-YYYY"], 'fr');       // uses 'fr' locale
moment("29-06-1995", ["MM-DD-YYYY", "DD-MM-YYYY"], true);       // uses strict parsing
moment("05-06-1995", ["MM-DD-YYYY", "DD-MM-YYYY"], 'fr', true); // uses 'fr' locale and strict parsing
```

## Object 对象解析
语法： `moment({unit: value, ...});`

示例：         
```javascript
moment({ hour:15, minute:10 });
moment({ y    :2010, M     :3, d   :5, h    :15, m      :10, s      :3, ms          :123});
moment({ year :2010, month :3, day :5, hour :15, minute :10, second :3, millisecond :123});
moment({ years:2010, months:3, days:5, hours:15, minutes:10, seconds:3, milliseconds:123});
moment({ years:2010, months:3, date:5, hours:15, minutes:10, seconds:3, milliseconds:123});
moment({ years:'2010', months:'3', date:'5', hours:'15', minutes:'10', seconds:'3', milliseconds:'123'});  // from 2.11.0
```


## Unix Timestamp (milliseconds)接受13位毫秒值
语法： `moment(Number);`               

示例：     
```javascript
var day = moment(1318781876406);
```

## Unix Timestamp (seconds) 接受10位分钟值
语法: `moment.unix(Number)`      

使用示例：           
```javascript
var day = moment.unix(1318781876);
var day = moment.unix(1318781876.721);
var day = moment.unix(1318781876).utc();
```

## Date 时间对象                
语法： `moment(Date);`             

使用示例:           
```javascript
var day = new Date(2011, 9, 16);
var dayWrapper = moment(day);
```

## Array 接受数组对象           
语法： `moment(Number[]);`                 
其中数组对应顺序为： `[year, month, day, hour, minute, second, millisecond]`              
备注: 这里有一个很坑爹的地方， month这个东西，是从0开始的，0 表示1月份           

使用示例：           
```javascript
moment([2010, 1, 14, 15, 25, 50, 125]); // February 14th, 3:25:50.125 PM            
moment([2010]);        // January 1st
moment([2010, 6]);     // July 1st
moment([2010, 6, 10]); // July 10th
```

## 设置 年月日时分秒毫秒的设置和获取
语法：
```javascript
moment().millisecond(Number);
moment().millisecond(); // Number
moment().milliseconds(Number);
moment().milliseconds(); // Number

moment().second(Number);
moment().second(); // Number
moment().seconds(Number);
moment().seconds(); // Number

moment().minute(Number);
moment().minute(); // Number
moment().minutes(Number);
moment().minutes(); // Number

moment().hour(Number);
moment().hour(); // Number
moment().hours(Number);
moment().hours(); // Number

moment().date(Number);
moment().date(); // Number
moment().dates(Number);
moment().dates(); // Number

moment().year(year).month(month).date(day)
```
如果超过的情况，就用复数形式              