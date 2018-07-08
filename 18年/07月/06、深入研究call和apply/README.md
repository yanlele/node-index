# 深入研究call和apply                

## apply()与call()的区别                
JavaScript中的每一个Function对象都有一个apply()方法和一个call()方法，它们的语法分别为：         
```javascript
/*apply()方法*/
function.apply(thisObj[, argArray])

/*call()方法*/
function.call(thisObj[, arg1[, arg2[, [,...argN]]]]);
```

**它们各自的定义：**                
apply：调用一个对象的一个方法，用另一个对象替换当前对象。例如： `B.apply(A, arguments);` 即A对象应用B对象的方法。           
call：调用一个对象的一个方法，用另一个对象替换当前对象。例如： `B.call(A, args1,args2);` 即A对象调用B对象的方法。               


**它们的共同之处：**                    
都“可以用来代替另一个对象调用一个方法，将一个函数的对象上下文从初始的上下文改变为由thisObj指定的新对象”。               

**它们的不同之处：**                
