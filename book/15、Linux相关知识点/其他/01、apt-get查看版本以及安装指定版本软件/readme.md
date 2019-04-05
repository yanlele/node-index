apt-get 安装指定版本软件

有时候 Ubuntu安装软件时候会提示你缺少对应版本的软件，这时候你就需要用到 sudo apt-get install softname=version 来安装对应的软件。
```
sudo apt-get install  openssh-client=1:6.6p1-2ubuntu1
// 上面安装的是  1:6.6p1-2ubuntu1    openssh-client
```

列出一个软件的版本的命令是 sudo apt-cache madison soft_name
```
sudo apt-cache madison  openssh-client
```
