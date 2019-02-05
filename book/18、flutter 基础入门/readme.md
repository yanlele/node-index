# Flutter基础入门

关于环境搭建 可直接看中文网就可以了， 首先第一步， 一定要翻墙， 不翻墙一切免谈； 记得要下载JDK8， 这一点官网并没有说。。。

## 常用组件
### 01.Text Widget文本组件的使用
Text()的使用

看一下最基础的HelloWold代码。
```dart
import 'package:flutter/material.dart';

void main() => runApp(MyApp());
class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    // TODO: implement build
    return MaterialApp(
      title: 'Text Widget',
      home: Scaffold(
        body: Center(
          child: Text('hello yanle'),
        ),
      ),
    );
  }
}
```

#### 01-1.TextAlign属性
TextAlign属性就是文本的对齐方式，它的属性值有如下几个                                 
- center: 文本以居中形式对齐,这个也算比较常用的了。
- left:左对齐，经常使用，让文本居左进行对齐，效果和start一样。
- right :右对齐，使用频率也不算高。
- start:以开始位置进行对齐，类似于左对齐。
- end: 以为本结尾处进行对齐，不常用。有点类似右对齐.

总结起来，也就算三个对齐方式，left(左对齐)、center（居中对齐）、right（右对齐）。我们来看一下具体代码：
```dart
body: Center(
  child: Text(
    'hello yanle 我和东方红富士康的积分大法是好饿是uavvk 熟练度附近发动机浪费扫地',
    textAlign: TextAlign.center,
  ),
```

#### 01-2.maxLines属性
设置最多显示的行数，比如我们现在只显示1行，类似一个新闻列表的题目。代码如下：
```dart
child: Text(
    'hello yanle 我和东方红富士康的积分大法是好饿是uavvk 熟练度附近发动机浪费扫地',
    textAlign: TextAlign.center,
    maxLines: 1,
  ),
```
设置好后，文字只能显示出1行了。

#### 01-3.overflow属性
overflow属性是用来设置文本溢出时，如何处理,它有下面几个常用的值供我们选择。              
- clip：直接切断，剩下的文字就没有了，感觉不太友好，体验性不好。
- ellipsis:在后边显示省略号，体验性较好，这个在工作中经常使用。
- fade: 溢出的部分会进行一个渐变消失的效果，当然是上线的渐变，不是左右的哦。
```dart
child: Text(
    'hello yanle 我和东方红富士康的积分大法是好饿是uavvk 熟练度附近发动机浪费扫地',
    textAlign: TextAlign.center,
    maxLines: 1,
    overflow: TextOverflow.ellipsis,
),
```

#### 01-4.style属性
style属性的内容比较多，具体的你可以查一下API，我这里带作一个效果，方便大家快速学会Style的用法。                      
我们下面要作的效果为，字体大小为25.0,颜色为粉红色,并且有一个下划线。
```dart
body: Center(
  child: Text(
    'hello yanle 我和东方红富士康的积分大法是好饿是uavvk 熟练度附近发动机浪费扫地',
    textAlign: TextAlign.left,
    maxLines: 1,
    overflow: TextOverflow.ellipsis,
    style: TextStyle(
      fontSize: 25.0,
      color: Color.fromARGB(255, 255, 150, 150),
      decoration: TextDecoration.underline,
      decorationStyle: TextDecorationStyle.solid
    ),
  ),
)
```
其他更多的样式相关的api, 可以看这个链接[TextStyle class](https://docs.flutter.io/flutter/painting/TextStyle-class.html)

### 02.Container容器组件的使用
Container（容器控件）在Flutter是经常使用的控件，它就相当于我们HTML里的<div>标签，
每个页面或者说每个视图都离不开它。那这节课我们就来学习一下。

#### 02-1.Alignment属性
其实容器的作用就是方便我们进行布局的，Flutter这点也作的很好，我们先来看容器属性中的 **Alignment**。                            
这个属性针对的是Container内child的对齐方式，也就是容器子内容的对齐方式，并不是容器本身的对齐方式。                    
先作一个效果：建立一个容器，然后容器内加入一段文字Hello JSPang, 并让它居中对齐。                                 

这时候可以看见，我们的文本已经居中显示在手机屏幕上了。当然它的对齐方式还有如下几种：                          
```dart
body: Center(
  child: Container(
    alignment: Alignment.center,
    child: Text(
      'hello yanle',
      style: TextStyle(
        fontSize: 40
      ),
    ),
  )
)
```
- bottomCenter:下部居中对齐。
- botomLeft: 下部左对齐。
- bottomRight：下部右对齐。
- center：纵横双向居中对齐。
- centerLeft：纵向居中横向居左对齐。
- centerRight：纵向居中横向居右对齐。
- topLeft：顶部左侧对齐。
- topCenter：顶部居中对齐。
- topRight： 顶部居左对齐。

#### 02-2.设置宽、高和颜色属性
设置宽、高和颜色属性是相对容易的，只要在属性名称后面加入浮点型数字就可以了，比如要设置宽是500，高是400，颜色为亮蓝色。
```dart
body: Center(
  child: Container(
    alignment: Alignment.center,
    width: 500,
    height: 400,
    color: Colors.lightBlue,
    child: Text(
      'hello yanle',
      style: TextStyle(
        fontSize: 40,
        color: Colors.white
      ),
    ),
  )
)
```

---------------------

上节已经简单的学习了一下Container容器组件的用法，这节我们继续学习，主要讲解一下的**padding,margin和decoration**这几个属性。我们先来看看Padding属性。

#### 02-3.padding属性
padding的属性就是一个内边距，它和你使用的前端技术CSS里的padding表现形式一样，
指的是Container边缘和child内容的距离。先来看一个内边距为10的例子。
```dart
child: Container(
    alignment: Alignment.center,
    width: 500,
    height: 400,
    color: Colors.lightBlue,
    padding: const EdgeInsets.all(10),
    child: Text(
        'hello yanle',
        style: TextStyle(
        fontSize: 40,
        color: Colors.white
        ),
    ),
)
```
上面主要的padding代码就一句。                              

`padding:const EdgeInsets.all(10.0),` 这句的意思是设置Container的内边距是10，左右上下全部为10，这看起来非常容易。
那我们再加大一点难度。如果上边距为30，左边距为10，这时候EdgeInsets.all()就满足不了我们了。

**`EdgeInsets.fromLTRB(value1,value2,value3,value4)`**：                         
我们用EdgeInsets.fromLTRB(value1,value2,value3,value4) 可以满足我们的需求，LTRB分别代表左、上、右、下。

那我们设置上边距为30，左边距为10，就可以用下面的代码来编写。
```dart
child: Container(
    alignment: Alignment.topLeft,
    width: 500,
    height: 400,
    color: Colors.lightBlue,
    padding: const EdgeInsets.fromLTRB(10, 30, 0, 0),
    child: Text(
      'hello yanle',
      style: TextStyle(
        fontSize: 40,
        color: Colors.white
      ),
    ),
  )
```





## 参考文章
- [Flutter中文网](https://flutterchina.club)
- [JSpang Flutter系列教程和文章](https://jspang.com)

