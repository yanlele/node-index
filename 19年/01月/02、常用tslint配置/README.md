# 常用tslint配置

```json
{
  // 禁止给类的构造函数的参数添加修饰符
  "no-parameter-properties": false,
  // 禁止使用 debugger
  "no-debugger": false,
  // 禁止行尾有空格
  "no-trailing-whitespace": false,
  // 禁止无用的表达式
  "no-unused-expression": true,
  // 定义过的变量必须使用
  "no-unused-variable": true,
  // 变量必须先定义后使用
  "no-use-before-declare": true,
  // 禁止使用 var
  "no-var-keyword": true,
  // 必须使用 === 或 !==，禁止使用 == 或 !=，与 null 比较时除外
  "triple-equals": true,
  // 指定类成员的排序规则
  "member-ordering": false,
  // 禁止将 this 赋值给其他变量，除非是解构赋值
  "no-this-assignment": [
    false,
    {
      "allowed-names": [
        "^self$",
        "^that$"
      ],
      "allow-destructuring": true
    }
  ],
  // 必须使用箭头函数，除非是单独的函数声明或是命名函数
  "only-arrow-functions": [
    true,
    "allow-declarations",
    "allow-named-functions"
  ],
  // 禁止出现空代码块，允许 catch 是空代码块
  "no-empty": [
    true,
    "allow-empty-catch"
  ],
  // 禁止无用的类型断言
  "no-unnecessary-type-assertion": true,
  // 使用 return; 而不是 return undefined;
  "return-undefined": true,
  // 禁止对 array 使用 for in 循环
  "no-for-in-array": true,
  "comment-format": [
    true,
    "check-space"
  ],
  // 单行注释格式化规则
  // 定义函数时如果用到了覆写，则必须将覆写的函数写到一起
  "adjacent-overload-signatures": true,
  // 禁止对函数的参数重新赋值
  "no-parameter-reassignment": true,
  // if 后面必须有 {，除非是单行 if
  "curly": [
    true,
    "ignore-same-line"
  ],
  // for in 内部必须有 hasOwnProperty
  "forin": true,
  // 禁止在分支条件判断中有赋值操作
  "no-conditional-assignment": true,
  // 禁止使用 new 来生成 String, Number 或 Boolean
  "no-construct": true,
  // 禁止 super 在一个构造函数中出现两次
  "no-duplicate-super": true,
  // 禁止在 switch 语句中出现重复测试表达式的 case
  "no-duplicate-switch-case": true,
  // 禁止出现重复的变量定义或函数参数名
  "no-duplicate-variable": [
    true,
    "check-parameters"
  ],
  // 禁止使用 eval
  "no-eval": true,
  // 禁止对对象字面量进行类型断言（断言成 any 是允许的）
  "no-object-literal-type-assertion": true,
  // 禁止没必要的 return await
  "no-return-await": true,
  // 禁止在数组中出现连续的逗号，如 let foo = [,,]
  "no-sparse-arrays": true,
  // 禁止 throw 字符串，必须 throw 一个 Error 对象
  "no-string-throw": true,
  // switch 的 case 必须 return 或 break
  "no-switch-case-fall-through": true,
  // 使用实例的方法时，必须 bind 到实例上
  "no-unbound-method": [
    true,
    "ignore-static"
  ],
  // 使用 { ...foo, bar: 1 } 代替 Object.assign({}, foo, { bar: 1 })
  // 前者的类型检查更完善
  "prefer-object-spread": true,
  // parseInt 必须传入第二个参数
  "radix": true,
  // 必须使用 isNaN(foo) 而不是 foo === NaN
  "use-isnan": true,
  //
  //
  // 可维护性
  // 这些规则可以增加代码的可维护性
  //
  // 禁止函数的循环复杂度超过 20，https://en.wikipedia.org/wiki/Cyclomatic_complexity
  "cyclomatic-complexity": [
    true,
    20
  ],
  // 禁止使用废弃（被标识了 @deprecated）的 API
  "deprecation": true,
  // 一个缩进必须用四个空格替代
  "indent": [
    true,
    "spaces",
    4
  ],
  // 禁止出现重复的 import
  "no-duplicate-imports": true,
  // 禁止一个文件中出现多个相同的 namespace
  "no-mergeable-namespace": true,
  // 文件类型必须时 utf-8
  "encoding": true,
  // import 语句中，关键字之间的间距必须是一个空格
  "import-spacing": true,
  // 接口可以 implement extend 和 merge
  "interface-over-type-literal": true,
  // new 后面只必须有一个空格
  "new-parens": true,
  // 类型断言必须使用 as Type，禁止使用 <Type>
  // <Type> 容易被理解为 jsx
  "no-angle-bracket-type-assertion": true,
  // 禁止连续超过三行空行
  "no-consecutive-blank-lines": [
    true,
    3
  ],
  // 禁止使用特殊空白符（比如全角空格）
  "no-irregular-whitespace": true,
  // 禁止使用 JSDoc，因为 TypeScirpt 已经包含了大部分功能
  "no-redundant-jsdoc": true,
  // 禁止使用三斜杠引入类型定义文件
  "no-reference-import": true,
  // 禁止变量定义时赋值为 undefined
  "no-unnecessary-initializer": true,
  // 小数必须以 0. 开头，禁止以 . 开头，并且不能以 0 结尾
  "number-literal-format": true,
  // 必须使用 a = {b} 而不是 a = {b: b}
  "object-literal-shorthand": true,
  // 变量申明必须每行一个，for 循环的初始条件中除外
  "one-variable-per-declaration": [
    true,
    "ignore-for-loop"
  ],
  // if 后的 { 禁止换行
  "one-line": true,
  // 必须使用单引号，jsx 中必须使用双引号
  "quotemark": [
    true,
    "single",
    "jsx-double",
    "avoid-template",
    "avoid-escape"
  ],
  // 行尾必须有分号
  "semicolon": [
    true,
    "always",
    "ignore-interfaces"
  ],
  // 函数名前必须有空格
  "space-before-function-paren": [
    true,
    "asyncArrow"
  ],
  // 括号内首尾禁止有空格
  "space-within-parens": [
    true,
    0
  ],
  // 禁止 finally 内出现 return, continue, break, throw 等
  // finally 会比 catch 先执行
  "no-unsafe-finally": true
}
```