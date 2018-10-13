## 基础部分

### <div id="class01-01">01、前置知识</div>

查看ip:                   
ipconfig                
ip addr                     
vi /etc/sysconfig/network-scripts/ifcfg-xx  这个里面去改变 ONBOOT=yes 就可以让我们访问ip了                  

安装命令： yum install net-tools
网络服务重启： service network restart

安装net-tools: `yum install net-tools` 安装了这个之后，就可以使用ifconfig这个命令了

#### 切换默认源： 
例如却换 http://mirrors.163.com/.help/centos.html

如果是阿里云的云服务器，其实是不用管这个问题的，他们的速度非常快；

如果需要查看主机版本： cat /etc/redhat-release

wget XXXXXXXXXX


#### 安装vim:
`yum install vim`
阿里云的centos也是默认安装了这个玩意儿的。


### <div id="class01-02">SSH</div>
Secure Shell  网络安全协议

#### 服务端SSH
安装： yum install openssh-server          
启动： service sshd start              
开机启动： chkconfig sshd on        

默认会有 openssh-clients 这个东西可以让我们在服务器的Linux连接别的服务器Linux         

阿里云其实也自己默认安装了这个东西了。                     
ssh serviceName@ip 就可以直接连接服务端了

#### SSH config
可以批量管理多个SSH。 通常存放在 ~/.ssh/config  

配置语法：

|:-|:-|
|Host|别名|
|HostName|主机名|
|Port|端口|
|User|用户名|
|IdentityFile|密匙文件的路径|

举一个简单的例子：
```
cd ~/.ssh
touch config

vim config

// 修改文件了， 例如我们把文件修改为这样
host "yanle"
    HostName 192.168.0.101
    User root
    Port 22

// 然后保存退出
```

这个时候我们想要连接 主机 `192.168.0.101` 就可以直接 ssh yanle 就可以连接了。 这种情况一般出现在我们的Linux系统想要连接别的服务器系统的情况。                    
如果有多态服务器，那么按着这个命名规则，在config 中继续配置就可以了。

mac 的路径跟Linux 是一样的。windows不需要这个。。。。


#### SSH 安全密码登录
ssh key 使用非堆成加密方式生成公钥和私钥                                
存放路径 ~/.ssh/config                      
公钥是可以对外公开的，放在服务器的 ~/.ssh/authorized_keys

密钥的生成 ssh-keygen -t rsa 或者 ssh-keygen -t dsa                
创建的时候，会默认让我们输入我们的文件名，生成之后的密钥就直接放在了 ~/.ssh/ 这个文件夹下面。

一般的使用情况是window生成公钥，然后把公钥放在服务器上， 就可以直接连接了。


#### SSH 安全端口
修改端口： vim /etc/ssh/sshd_config  默认22             
这个地方有一个字段port 就可以更改SSH连接的端口号了。 可以允许多个端口。


### <div id="class01-03">软件命令</div>
软件包管理： yum                      
安装软件： yum install xxx               
卸载软件： yum remove xxx                
搜索软件： yum search xxx                
清理缓存： yum clean packages            
列出已经安装： yum list                
软件包信息： yum info xxx                 

     
### <div id="class01-04">服务器硬件资源相关命令</div>
内存: free -m                         
硬盘： df -h               
负载： w/top               
cup个数/核数： cat /proc/cpuinfo             
可视化磁盘： fdisk


### <div id="class01-05">05、文件操作命令行</div>
#### 文件目录结构
根目录: /               
家目录: /home               
临时目录: /tmp           
配置目录: /etc               
用户程序目录: /usr                 

查看文件列表: ls -al                      

#### 文件操作的基本命令

|命令|解释|
|:-|:-|
ls|查看目录下面的文件
touch | 新建文件
mkdir|新建文件夹
rm|删除文件和目录
cp|复制
mv|移动
pwd|现实路径

说明：                 
- 创建文件夹的时候， 如果想创建多层级的文件夹，可以这样创建                 
mkdir -p yanle/test/test1/test2 这样就可以了

- 删除文件夹的时候要这样操作                 
`rm -r dir_name/` 这样可以循环删除文件夹里面的内容， 但是这样会一遍一遍的询问是否删除文件夹                     
`rm -rf dir_name/` 强制删除文件夹，不会提示

- 复制和剪切文件的操作                   
`cp pathName targetPathName` 要不要斜杠都可以                        
`cp -r pathName targetPathName` 如果是文件夹的复制操作，需要加上 -r

- 复制命令详解                
命令格式：cp [-adfilprsu] 源文件(source) 目标文件(destination)              
cp [option] source1 source2 source3 ... directory

参数说明：
-a:是指archive的意思，也说是指复制所有的目录
-d:若源文件为连接文件(link file)，则复制连接文件属性而非文件本身
-f:强制(force)，若有重复或其它疑问时，不会询问用户，而强制复制
-i:若目标文件(destination)已存在，在覆盖时会先询问是否真的操作
-l:建立硬连接(hard link)的连接文件，而非复制文件本身
-p:与文件的属性一起复制，而非使用默认属性
-r:递归复制，用于目录的复制操作
-s:复制成符号连接文件(symbolic link)，即“快捷方式”文件
-u:若目标文件比源文件旧，更新目标文件 







