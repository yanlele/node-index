# 深入jsx

实际上，JSX 仅仅只是 `React.createElement(component, props, ...children)` 函数的语法糖。

例如：                 
```typescript jsx
<MyButton color="blue" shadowSize={2}>
  Click Me
</MyButton>
```

会编译为：
```typescript jsx
React.createElement(
  MyButton,
  {color: 'blue', shadowSize: 2},
  'Click Me'
)
```

### 指定 React 元素类型
大写字母开头的 JSX 标签意味着它们是 React 组件。这些标签会被编译为对命名变量的直接引用，所以，当你使用 JSX <Foo /> 表达式时，Foo 必须包含在作用域内。

#### React 必须在作用域内
简单点儿说， 就是要引用 React: `import React from 'react'` , 尽管表面上貌似没有直接使用， 但是必须要有。


#### 在 JSX 类型中使用点语法
当你在一个模块中导出许多 React 组件时，这会非常方便。
```typescript jsx
import React from 'react';

const MyComponents = {
  DatePicker: function DatePicker(props) {
    return <div>Imagine a {props.color} datepicker here.</div>;
  }
}

function BlueDatePicker() {
  return <MyComponents.DatePicker color="blue" />;
}
```

#### 用户定义的组件必须以大写字母开头
大写字母开头的元素则对应着在 JavaScript 引入或自定义的组件，如 `<Foo />` 会编译为 `React.createElement(Foo)`。


#### 在运行时选择类型
```typescript jsx
import React from 'react';
import { PhotoStory, VideoStory } from './stories';

const components = {
  photo: PhotoStory,
  video: VideoStory
};

function Story(props) {
  // 正确！JSX 类型可以是大写字母开头的变量。
  const SpecificStory = components[props.storyType];
  return <SpecificStory story={props.story} />;
}
```




