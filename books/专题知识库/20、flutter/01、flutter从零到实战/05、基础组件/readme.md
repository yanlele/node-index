# 基础组件

<!-- toc -->

- [文本与样式](#%E6%96%87%E6%9C%AC%E4%B8%8E%E6%A0%B7%E5%BC%8F)
  * [Text](#text)
  * [TextStyle](#textstyle)
  * [TextSpan](#textspan)
  * [DefaultTextStyle](#defaulttextstyle)
  * [字体](#%E5%AD%97%E4%BD%93)
- [按钮](#%E6%8C%89%E9%92%AE)
- [图片与ICON](#%E5%9B%BE%E7%89%87%E4%B8%8Eicon)
  * [加载图片](#%E5%8A%A0%E8%BD%BD%E5%9B%BE%E7%89%87)
  * [ICON](#icon)
- [单选开关和复选框](#%E5%8D%95%E9%80%89%E5%BC%80%E5%85%B3%E5%92%8C%E5%A4%8D%E9%80%89%E6%A1%86)

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

### 加载图片
在 `pubspec.yaml` 中的 `flutter` 部分添加如下内容：                     
```yaml
assets:
  - images/avatar.png
```

加载图片：                   
```dart
Image(
  image: AssetImage("images/avatar.png"),
  width: 100.0
);

Image.asset("images/avatar.png",
  width: 100.0,
);

// 加载远程图片 
Image(
  image: NetworkImage("https://avatars2.githubusercontent.com/u/20411648?s=460&v=4"),
  width: 100.0,
)
```

参数：                 
```dart
const Image({
  ...
  this.width, //图片的宽
  this.height, //图片高度
  this.color, //图片的混合色值
  this.colorBlendMode, //混合模式
  this.fit,//缩放模式
  this.alignment = Alignment.center, //对齐方式
  this.repeat = ImageRepeat.noRepeat, //重复方式
  ...
})
```

### ICON

**官方 icon**                             
使用方式：https://api.flutter.dev/flutter/material/Icons-class.html                                     
icon 库： https://fonts.google.com/icons?selected=Material+Icons


**使用 iconfont**                     
本地声明应用字体库                               
```
fonts:
  - family: myIcon  #指定一个字体名
    fonts:
      - asset: fonts/iconfont.ttf
```

我们定义一个MyIcons类，功能和Icons类一样：将字体文件中的所有图标都定义成静态变量：                         
```dart
class MyIcons{
  // book 图标
  static const IconData book = const IconData(
      0xe614, 
      fontFamily: 'myIcon', 
      matchTextDirection: true
  );
  // 微信图标
  static const IconData wechat = const IconData(
      0xec7d,  
      fontFamily: 'myIcon', 
      matchTextDirection: true
  );
}
```

使用
```dart
Row(
  mainAxisAlignment: MainAxisAlignment.center,
  children: <Widget>[
    Icon(MyIcons.book,color: Colors.purple),
    Icon(MyIcons.wechat,color: Colors.green),
  ],
)
```




## 单选开关和复选框
```dart
Switch(
  value: _switchSelected,//当前状态
  onChanged:(value){
    //重新构建页面  
    setState(() {
      _switchSelected=value;
    });
  },
),
Checkbox(
  value: _checkboxSelected,
  activeColor: Colors.red, //选中时的颜色
  onChanged:(value){
    setState(() {
      _checkboxSelected=value;
    });
  } ,
)
```


## 输入框与表单
### 输入框
TextField 用于文本输入            

属性较多， 可以参考文档： https://book.flutterchina.club/chapter3/input_and_form.html#_3-5-1-textfield

先来看一个比较简单的输入框案例             
```dart
Column(
  children: <Widget>[
    TextField(
      autofocus: true,
      decoration: InputDecoration(
        labelText: "用户名",
        hintText: "用户名或邮箱",
        prefixIcon: Icon(Icons.person)
      ),
    ),
    TextField(
      decoration: InputDecoration(
        labelText: "密码",
        hintText: "您的登录密码",
        prefixIcon: Icon(Icons.lock)
      ),
      obscureText: true,
    ),
  ],
);
```

**获取输入内容**                        
```dart
// 定义 TextEditingController
TextEditingController _unameController = TextEditingController();

// 挂载 TextEditingController
TextField(
  autofocus: true,
  controller: _unameController, //设置controller
  ...
)

// 通过controller获取输入框内容
print(_unameController.text)
```

**监听文本变化**                      
方式一： onChanged
```dart
TextField(
    autofocus: true,
    onChanged: (v) {
      print("onChange: $v");
    }
)
```

方式二： controller           
```dart
@override
void initState() {
  //监听输入改变  
  _unameController.addListener((){
    print(_unameController.text);
  });
}
```


**TextEditingController 的其他功能**                 
```dart
TextEditingController _selectionController =  TextEditingController();

// 设置默认值，并从第三个字符开始选中后面的字符 
_selectionController.text="hello world!";
_selectionController.selection=TextSelection(
  baseOffset: 2,
  extentOffset: _selectionController.text.length
);

TextField(
controller: _selectionController,
)
```

**控制焦点**
焦点可以通过 `FocusNode` 和 `FocusScopeNode` 来控制

点击第一个按钮可以将焦点从第一个TextField挪到第二个TextField。            
点击第二个按钮可以关闭键盘。
```dart
FocusNode focusNode1 = FocusNode();
FocusNode focusNode2 = FocusNode();
FocusScopeNode? focusScopeNode;

// 将焦点从第一个TextField移到第二个TextField
// 这是一种写法
FocusScope.of(context).requestFocus(focusNode2);

// 这是第二种写法
if(null == focusScopeNode){
focusScopeNode = FocusScope.of(context);
}
focusScopeNode.requestFocus(focusNode2);

// 失焦
// 当所有编辑框都失去焦点时键盘就会收起  
focusNode1.unfocus();
focusNode2.unfocus();
```

**监听焦点状态改变**            
```dart
...
// 创建 focusNode   
FocusNode focusNode = FocusNode();
...
// focusNode绑定输入框   
TextField(focusNode: focusNode);
...
// 监听焦点变化    
focusNode.addListener((){
   print(focusNode.hasFocus);
});
```

**自定义样式**
```dart
/// TextField 相关知识
/// 自定义样式
class YLTextFieldCustomerStyle extends StatelessWidget {
  const YLTextFieldCustomerStyle({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Theme(
      // 这个地方可以复写全局样式
      // 比如说我有多个 TextField 的场景， 就可以用这个
      data: Theme.of(context).copyWith(
        hintColor: Colors.grey[200],
        inputDecorationTheme: const InputDecorationTheme(
          labelStyle: TextStyle(color: Colors.grey),
          hintStyle: TextStyle(color: Colors.grey, fontSize: 14),
        ),
      ),
      child: Column(
        children: const [
          TextField(
            decoration: InputDecoration(
              label: Text("用户名"),
              hintText: "请输入用户名",
              prefixIcon: Icon(Icons.person),
              // 未获得焦点时候下划线颜色
              // enabledBorder: UnderlineInputBorder(
              //   borderSide: BorderSide(color: Colors.grey),
              // ),
              // // 获得焦点时候下划线颜色
              // focusedBorder: UnderlineInputBorder(
              //   borderSide: BorderSide(color: Colors.blue),
              // ),
            ),
          ),
          TextField(
            decoration: InputDecoration(
              // border: InputBorder.none,
              prefixIcon: Icon(Icons.lock),
              labelText: "密码",
              hintText: "请输入密码",
              // 这个地方的样式， 会覆盖上面 Theme 的样式
              hintStyle: TextStyle(color: Color(0xFF90CAF9), fontSize: 13),
              labelStyle: TextStyle(color: Color(0xFF90CAF9)),
            ),
            obscureText: true,
          )
        ],
      ),
    );
  }
}
```


### Form

**定义**              
```dart
Form({
  required Widget child,
  bool autovalidate = false,
  WillPopCallback onWillPop,
  VoidCallback onChanged,
})
```

`Form` 的子孙元素必须是 `FormField` 类型                  
```dart
const FormField({
  ...
  FormFieldSetter<T> onSaved, //保存回调
  FormFieldValidator<T>  validator, //验证回调
  T initialValue, //初始值
  bool autovalidate = false, //是否自动校验。
})
```

**FormState**
FormState为Form的State类，可以通过 `Form.of()` 或 `GlobalKey` 获得。
我们可以通过它来对Form的子孙FormField进行统一操作。

- FormState.validate()
- FormState.save()
- FormState.reset()

**示例**                
一个完整的例子， 自己体会
```dart
import 'package:flutter/material.dart';

class YLFormTestRoute extends StatefulWidget {
  const YLFormTestRoute({Key? key}) : super(key: key);

  @override
  State<YLFormTestRoute> createState() => _YLFormTestRouteState();
}

class _YLFormTestRouteState extends State<YLFormTestRoute> {
  // name
  final TextEditingController _unameController = TextEditingController();

  // pwd
  final TextEditingController _pwdController = TextEditingController();

  final GlobalKey _formKey = GlobalKey<FormState>();

  @override
  Widget build(BuildContext context) {
    return Form(
      key: _formKey,
      // 表单验证是否开启
      // autovalidateMode: AutovalidateMode.always,
      child: Column(
        children: [
          TextFormField(
            autovalidateMode: AutovalidateMode.onUserInteraction,
            autofocus: true,
            controller: _unameController,
            decoration: const InputDecoration(
              labelText: "labelText",
              hintText: "请输入用户名",
              icon: Icon(Icons.person),
            ),
            validator: (value) {
              return value!.trim().isNotEmpty ? null : "用户名不能为空";
            },
          ),
          TextFormField(
            controller: _pwdController,
            decoration: const InputDecoration(
              labelText: "密码",
              hintText: "请输入密码",
              icon: Icon(Icons.lock),
            ),
            obscureText: true,
            validator: (value) {
              return value!.trim().length > 5 ? null : "密码不能少于6位";
            },
          ),

          // 登录按钮
          Padding(
            padding: const EdgeInsets.all(28),
            child: Row(
              children: [
                Expanded(
                  child: Builder(builder: (context) {
                    return ElevatedButton(
                      child: const Padding(
                        padding: EdgeInsets.all(16),
                        child: Text("登录"),
                      ),
                      onPressed: () {
                        // GlobalKey 方式
                        FormState formState = _formKey.currentState as FormState;
                        if (formState.validate()) {
                          // 通过验证
                          print("通过验证");
                        }

                        // Form.of 方式
                        if ((Form.of(context) as FormState).validate()) {
                          // 通过验证
                          print("通过验证22");
                        }
                      },
                    );
                  }),
                )
              ],
            ),
          ),
        ],
      ),
    );
  }
}
```
