## 基础篇


### 第一节
授权可执行shell 文件： `chmod +x test.sh`

#### 打印输出
echo： 是Shell的一个内部指令，用于在屏幕上打印出指定的字符串。                            
```bash
echo arg 
echo -e arg #执行arg里的转义字符。echo加了-e默认会换行
echo arg > myfile #显示结果重定向至文件，会生成myfile文件
```

printf：格式化输出语句。 printf 命令用于格式化输出， 是echo命令的增强版。它是C语言printf()库函数的一个有限的变形，并且在语法上有些不同。

