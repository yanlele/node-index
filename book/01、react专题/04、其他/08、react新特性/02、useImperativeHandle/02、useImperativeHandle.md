## useImperativeHandle

useImperativeHandle 是 hook 中提供的允许我们 ref 一个function component 的方案，也是 Hook 在 TypeScript 中使用最复杂的场景。                        
useImperativeHandle 可以让你在使用 ref 时自定义暴露给父组件的实例值。
在大多数情况下，应当避免使用 ref 这样的命令式代码。useImperativeHandle 应当与 forwardRef 一起使用：
```typescript jsx
function FancyInput(props, ref) {
  const inputRef = useRef();
  useImperativeHandle(ref, () => ({
    focus: () => {
      inputRef.current.focus();
    }
  }));
  return <input ref={inputRef} ... />;
}
FancyInput = forwardRef(FancyInput);
```

在本例中，渲染 <FancyInput ref={fancyInputRef} /> 的父组件可以调用 fancyInputRef.current.focus()。


### 来一段有生命力的例子





