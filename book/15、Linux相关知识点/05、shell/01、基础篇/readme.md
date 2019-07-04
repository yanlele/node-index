## 基础篇


### 第一节-入门
授权可执行shell 文件： `chmod +x test.sh`

#### 打印输出
echo： 是Shell的一个内部指令，用于在屏幕上打印出指定的字符串。                            
```bash
echo arg 
echo -e arg #执行arg里的转义字符。echo加了-e默认会换行
echo arg > myfile #显示结果重定向至文件，会生成myfile文件
```

**printf**：格式化输出语句。 printf 命令用于格式化输出， 是echo命令的增强版。它是C语言printf()库函数的一个有限的变形，并且在语法上有些不同。
```bash
printf  format-string  [arguments...]
#format-string 为格式控制字符串，arguments 为参数列表。功能和用法与c语言的 printf 命令类似。

# 双引号
printf "%d %s\n" 10 "abc"
10 abc
# 单引号与双引号效果一样 
printf '%d %s\n' 10 "abc" 
10 abc

# 没有引号也可以输出
printf %s abc
abc

# 但是下面的会出错：
printf %d %s 10 abc 
#因为系统分不清楚哪个是参数，这时候最好加引号了。


# 格式只指定了一个参数，但多出的参数仍然会按照该格式输出，format-string 被重用
$ printf %s a b c
abc
$ printf "%s\n" a b c
a
b
c

# 如果没有 arguments，那么 %s 用NULL代替，%d 用 0 代替
$ printf "%s and %d \n" 
and 0
```


**read**： 命令行从输入设备读入内容
```bash
#!/bin/bash

# Author : lalal

echo "What is your name?"
read NAME #输入
echo "Hello, $NAME"
```


#### 定义变量
**定义变量**： `variableName="value"`  **变量名和等号之间不能有空格**

**使用一个定义过的变量**，只要在变量名前面加美元符号（$）即可，如：
```bash
your_name="lalal"
echo $your_name
echo ${your_name}

for skill in C PHP Python Java 
do
    echo "I am good at ${skill}Script"
done
```
建议最好加上花括号

**readonly**                        
在变量前面加readonly 命令可以将变量定义为只读变量，只读变量的值不能被改变。                  
```bash
url="http://www.baidu.com"
readonly url
url="http://www.baidu.com"
```


#### 特殊变量

变量 |	含义
:-|:-
$0|	当前脚本的文件名
$n|	传递给脚本或函数的参数。n 是一个数字，表示第几个参数。例如，第一个参数是$1，第二个参数是$2。
$#|	传递给脚本或函数的参数个数。
$*|	传递给脚本或函数的所有参数。
$@|	传递给脚本或函数的所有参数。被双引号(" ")包含时，与 $* 稍有不同
$?|	上个命令的退出状态，或函数的返回值。
$$|	当前Shell进程ID。对于 Shell 脚本，就是这些脚本所在的进程ID。

示例
```bash
#!/bin/bash
echo "File Name: $0"
echo "First Parameter : $1"
echo "First Parameter : $2"
echo "Quoted Values: $@"
echo "Quoted Values: $*"
echo "Total Number of Parameters : $#"
```

结果
```bash
$./test.sh Zara Ali
File Name : ./test.sh
First Parameter : Zara
Second Parameter : Ali
Quoted Values: Zara Ali
Quoted Values: Zara Ali
Total Number of Parameters : 2
```
