# 基础组件

<!-- toc -->

- [文本与样式](#%E6%96%87%E6%9C%AC%E4%B8%8E%E6%A0%B7%E5%BC%8F)
  * [Text](#text)
  * [TextStyle](#textstyle)
  * [TextSpan](#textspan)
  * [DefaultTextStyle](#defaulttextstyle)
  * [字体](#%E5%AD%97%E4%BD%93)
- [按钮](#%E6%8C%89%E9%92%AE)

<!-- tocstop -->

## 文本与样式

### Text
Text 类似于 P 标签                               

```dart
Text("Hello world",
  textAlign: TextAlign.left, // 左对齐
);

Text("Hello world! I'm Jack. "*4,
  maxLines: 1, // 只展示一行
  overflow: TextOverflow.ellipsis, // 超过一行的用 ...
);

Text("Hello world",
  textScaleFactor: 1.5, // 放大 1.5 倍
);
```

### TextStyle
```dart
Text("Hello world",
  style: TextStyle(
    color: Colors.blue,
    fontSize: 18.0,
    height: 1.2,  
    fontFamily: "Courier",
    background: Paint()..color=Colors.yellow,
    decoration:TextDecoration.underline,
    decorationStyle: TextDecorationStyle.dashed
  ),
);
```


### TextSpan
类似于 span 标签                                                 
定义：                         
```dart
const TextSpan({
  TextStyle style,                  // 
  Sting text,                       // 
  List<TextSpan> children,          //
  GestureRecognizer recognizer,     // 对该文本片段上用于手势进行识别处理
});
```

使用：                             
```dart
Text.rich(TextSpan(
    children: [
     TextSpan(
       text: "Home: "
     ),
     TextSpan(
       text: "https://flutterchina.club",
       style: TextStyle(
         color: Colors.blue
       ),  
       recognizer: _tapRecognizer
     ),
    ]
))
```

### DefaultTextStyle
设置全局样式                          
```dart
DefaultTextStyle(
  //1.设置文本默认样式  
  style: TextStyle(
    color:Colors.red,
    fontSize: 20.0,
  ),
  textAlign: TextAlign.start,
  child: Column(
    crossAxisAlignment: CrossAxisAlignment.start,
    children: <Widget>[
      Text("hello world"),
      Text("I am Jack"),
      Text("I am Jack",
        style: TextStyle(
          inherit: false, //2.不继承默认样式
          color: Colors.grey
        ),
      ),
    ],
  ),
);
```


### 字体
加载字体                            
```yaml
flutter:
  fonts:
    - family: Raleway
      fonts:
        - asset: assets/fonts/Raleway-Regular.ttf
        - asset: assets/fonts/Raleway-Medium.ttf
          weight: 500
        - asset: assets/fonts/Raleway-SemiBold.ttf
          weight: 600
    - family: AbrilFatface
      fonts:
        - asset: assets/fonts/abrilfatface/AbrilFatface-Regular.ttf
```

使用字体                    
```dart
// 声明文本样式
const textStyle = const TextStyle(
  fontFamily: 'Raleway',
);

// 使用文本样式
var buttonText = const Text(
  "Use the font for this text",
  style: textStyle,
);
```

使用 package 中的字体                         
```dart
const textStyle = const TextStyle(
  fontFamily: 'Raleway',
  package: 'my_package', //指定包名
);
```


## 按钮
Material 组件库中提供了多种按钮组件如 `ElevatedButton`、`TextButton`、`OutlineButton`、`IconButton`；                     

```dart
ElevatedButton.icon(
  icon: Icon(Icons.send),
  label: Text("发送"),
  onPressed: _onPressed,
),
OutlineButton.icon(
  icon: Icon(Icons.add),
  label: Text("添加"),
  onPressed: _onPressed,
),
TextButton.icon(
  icon: Icon(Icons.info),
  label: Text("详情"),
  onPressed: _onPressed,
),
IconButton(
    icon: Icon(Icons.thumb_up),
    onPressed: () {},
)
```


## 图片与ICON

