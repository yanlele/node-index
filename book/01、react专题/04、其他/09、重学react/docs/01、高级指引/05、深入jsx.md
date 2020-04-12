# 深入jsx

<!-- toc -->

- [指定 React 元素类型](#%E6%8C%87%E5%AE%9A-react-%E5%85%83%E7%B4%A0%E7%B1%BB%E5%9E%8B)
  * [React 必须在作用域内](#react-%E5%BF%85%E9%A1%BB%E5%9C%A8%E4%BD%9C%E7%94%A8%E5%9F%9F%E5%86%85)
  * [在 JSX 类型中使用点语法](#%E5%9C%A8-jsx-%E7%B1%BB%E5%9E%8B%E4%B8%AD%E4%BD%BF%E7%94%A8%E7%82%B9%E8%AF%AD%E6%B3%95)
  * [用户定义的组件必须以大写字母开头](#%E7%94%A8%E6%88%B7%E5%AE%9A%E4%B9%89%E7%9A%84%E7%BB%84%E4%BB%B6%E5%BF%85%E9%A1%BB%E4%BB%A5%E5%A4%A7%E5%86%99%E5%AD%97%E6%AF%8D%E5%BC%80%E5%A4%B4)
  * [在运行时选择类型](#%E5%9C%A8%E8%BF%90%E8%A1%8C%E6%97%B6%E9%80%89%E6%8B%A9%E7%B1%BB%E5%9E%8B)
- [子元素](#%E5%AD%90%E5%85%83%E7%B4%A0)
  * [函数作为子元素](#%E5%87%BD%E6%95%B0%E4%BD%9C%E4%B8%BA%E5%AD%90%E5%85%83%E7%B4%A0)
  * [布尔类型、Null 以及 Undefined 将会忽略](#%E5%B8%83%E5%B0%94%E7%B1%BB%E5%9E%8Bnull-%E4%BB%A5%E5%8F%8A-undefined-%E5%B0%86%E4%BC%9A%E5%BF%BD%E7%95%A5)

<!-- tocstop -->

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

### 子元素

#### 函数作为子元素
JSX 中的 JavaScript 表达式将会被计算为字符串、React 元素或者是列表。
不过，props.children 和其他 prop 一样，它可以传递任意类型的数据，而不仅仅是 React 已知的可渲染类型。
```typescript jsx
// 调用子元素回调 numTimes 次，来重复生成组件
function Repeat(props) {
  let items = [];
  for (let i = 0; i < props.numTimes; i++) {
    items.push(props.children(i));
  }
  return <div>{items}</div>;
}

function ListOfTenThings() {
  return (
    <Repeat numTimes={10}>
      {(index) => <div key={index}>This is item {index} in the list</div>}
    </Repeat>
  );
}
```

#### 布尔类型、Null 以及 Undefined 将会忽略



