## 基础部分

目录
- [01、前置知识](#class01-01)
- [02、SSH](#class01-02)
- [03、软件命令](#class01-03)
- [04、服务器硬件资源相关命令](#class01-04)
- [05、文件操作命令行](#class01-05)
- [06、文本编辑器vim](#class01-06)
- [07、系统级命令操作用户](#class01-07)
- [08、防火墙相关](#class01-08)
- [09、提权与文件上传和下载](#class01-09)



### <div id="class01-01">01、前置知识</div>

查看ip:                   
ipconfig                
ip addr                     
vi /etc/sysconfig/network-scripts/ifcfg-xx  这个里面去改变 ONBOOT=yes 就可以让我们访问ip了                  

安装命令： yum install net-tools
网络服务重启： service network restart

安装net-tools: `yum install net-tools` 安装了这个之后，就可以使用ifconfig这个命令了

#### 切换默认源： 
例如却换 `http://mirrors.163.com/.help/centos.html`

如果是阿里云的云服务器，其实是不用管这个问题的，他们的速度非常快；

如果需要查看主机版本： cat /etc/redhat-release

wget XXXXXXXXXX
`wget -O /etc/yum.repos.d/CentOS-Base.repo http://mirrors.aliyun.com/repo/Centos-7.repo`


#### 安装vim:
`yum install vim`
阿里云的centos也是默认安装了这个玩意儿的。


### <div id="class01-02">02、SSH</div>
Secure Shell  网络安全协议

#### 服务端SSH

说明|命令
:-|:-
安装 | yum install openssh-server          
启动 | service sshd start              
开机启动 | chkconfig sshd on        

默认会有 openssh-clients 这个东西可以让我们在服务器的Linux连接别的服务器Linux         

阿里云其实也自己默认安装了这个东西了。                     
ssh serviceName@ip 就可以直接连接服务端了

#### SSH config
可以批量管理多个SSH。 通常存放在 ~/.ssh/config  

配置语法：

| 名称 | 描述|
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


#### 免密登录服务器
进入本地电脑的 bash 终端`ssh-keygen -t rsa -P '' -C "your.address@gmail.com"`                        

本地公钥上传到服务器： `scp ~/.ssh/id_rsa.pub root@192.168.1.68:~/.ssh/id_rsa_yanle_mac_3.pub`

在服务器上面，最后将上传好的公钥追加到 authorized_keys 文件中，同样的如果没有就新建一个。
` cat ~/.ssh/id_rsa_yanle_mac_3.pub >> ~/.ssh/authorized_keys`

退出之后就可以 在本地就可以直接免密登录到服务器了



### <div id="class01-03">03、软件命令</div>

说明 | 命令
:-|:-
软件包管理| yum                      
安装软件| yum install xxx               
卸载软件| yum remove xxx                
搜索软件| yum search xxx                
清理缓存| yum clean packages            
列出已经安装| yum list                
软件包信息| yum info xxx                 
查看某软件安装位置 | whereis xxx

     
### <div id="class01-04">04、服务器硬件资源相关命令</div>

说明 | 命令
:-|:-
内存| free -m                         
硬盘| df -h               
负载| w/top               
cup个数/核数| cat /proc/cpuinfo             
可视化磁盘| fdisk


### <div id="class01-05">05、文件操作命令行</div>
#### 文件目录结构

说明 | 路径
:-|:-
根目录| /               
家目录| /home               
临时目录| /tmp           
配置目录| /etc               
用户程序目录| /usr                 

查看文件列表: ls -al                      

#### 文件操作的基本命令

|命令|解释|
|:-|:-|
ls|查看目录下面的文件
touch | 新建文件
mkdir|新建文件夹
rm|删除文件和目录
cp|复制
mv|移动 还可以更改文件名字
pwd|现实路径， 获取当前路径， 获取路径

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

- mv 命令详解

|命令|解释|
|:-|:-|
mv 文件名 文件名 |	将源文件名改为目标文件名
mv 文件名 目录名 |	将文件移动到目标目录
mv 目录名 目录名 |	目标目录已存在，将源目录移动到目标目录；目标目录不存在则改名
mv 目录名 文件名 |	出错



参数 | 说明
:- | :-
-a|是指archive的意思，也说是指复制所有的目录
-d|若源文件为连接文件(link file)，则复制连接文件属性而非文件本身
-f|强制(force)，若有重复或其它疑问时，不会询问用户，而强制复制
-i|若目标文件(destination)已存在，在覆盖时会先询问是否真的操作
-l|建立硬连接(hard link)的连接文件，而非复制文件本身
-p|与文件的属性一起复制，而非使用默认属性
-r|递归复制，用于目录的复制操作
-s|复制成符号连接文件(symbolic link)，即“快捷方式”文件
-u|若目标文件比源文件旧，更新目标文件 


### <div id="class01-06">06、文本编辑器vim</div>
命令大全： [http://www.runoob.com/linux/linux-vim.html](http://www.runoob.com/linux/linux-vim.html)                                  
[Mac终端 vi/vim 的简单使用](https://www.cnblogs.com/fanxiaocong/p/7070130.html)

vim创建文件并且打开： vim fileName                   
快速移动到行位或者行首：非插入模式，大写模式下按下 G 移动到行尾 、 小写模式下按下 gg 两次，移动到行首                                            
删除某一行: 非插入模式下面 按下两次小写的 dd 就可以了                                
撤销删除： 非插入模式，按下小写的 u 就可以了                    
复制和粘贴： 非插入模式， 在某一行按下两个yy ，然后在想要粘贴的行， 按下p                    

#### 文件权限
文件权限 4-2-1

权限| 数字
:-|:-
r（读） | 4
w（写） | 2
x（可执行） | 1

#### 文件的所搜、查找、读取

命令|解释
:-|:-
tail | 从文件尾部读取
head | 从文件头部读取
cat | 读取整个文件
more | 分页读取文件
less | 可控分页
grep | 搜索关键字
find | 查找文件
wc | 统计个数

**使用示范**

命令 | 描述
:-|:-
`grep "123" yanle` | 就可以搜索目标内容
`grep -n "123" yanle` | 可以显示在第几行
`cat yanle | wc -l` | 统计文件有多少行
`grep "123" yanle | wc -l` | 就可以搜索目标内容的行数
`grep "2018-10-15 15:51" yannle | more` | 分页查看某一个时间的内容

**找找命令**

命令 | 描述
:-|:-
`find . -name "*.c"` | 将目前目录及其子目录下所有延伸档名是 c 的文件列出来。
`find /etc/ -name "*.conf"` | 查找etc目录机器子目录下面所有后缀名为 conf 的文件列出来。
`find . -type f` | 将目前目录其其下子目录中所有一般文件列出, 其中 f 表示文件 d 表示文件夹。
`find . -ctime -20` | 将目前目录及其子目录下所有最近 20 天内更新过的文件列出
`find /var/log -type f -mtime +7 -ok rm {} \;` | 查找/var/log目录中更改时间在7日以前的普通文件，并在删除之前询问它们
`find . -type f -perm 644 -exec ls -l {} \;` | 查找前目录中文件属主具有读、写权限，并且文件所属组的用户和其他用户具有读权限的文件
`find / -type f -size 0 -exec ls -l {} \;` | 为了查找系统中所有文件长度为0的普通文件，并列出它们的完整路径：


#### 文件解压缩
tar 的常用命令

命令 | 描述
:-|:-
tar -czvf test.tar.gz a.c | 压缩 a.c文件为test.tar.gz
tar -tzvf test.tar.gz  | 列出压缩文件内容 `-rw-r--r-- root/root     0 2010-05-24 16:51:59 a.c`
tar -xzvf test.tar.gz a.c | 解压文件

-czvf 这个命令 第二个参数说明打包方式是gz的打包方式，第三个参数v 表示要现实这个文件的情况


### <div id="class01-07">07、系统级命令操作用户</div>

命令 | 描述
:-|:-
useradd userName | 添加用户
adduser userName | 添加用户
userdel -r userName | 删除用户
passwd userName | 设置密码

用户相关的添加操作要放到 /home 目录下面


### <div id="class01-08">08、防火墙相关</div>

命令 | 描述
:-|:-
安装防火墙 | yum install firewalld
启动防火墙 | service firewalld start
重庆防火墙 | service firewalld restart
检查防火墙状态 | service firewalld status
关闭或者禁用防火墙 | service firewalld stop/disable

其他相关命令补充：

命令 | 描述
:-|:-
`ps -ef | grep firewall` | 可以查看防火墙的启动状态，是否启动
firewall-cmd --state | 查看防火墙的状态
firewall-cmd --get-zones | 查看区域
firewall-cmd --get-default-zones | 查看默认区域
firewall-cmd --list-all-zone | 查看每一个区域具体配置信息


#### 补充知识点儿: iptables防火墙
```
# 查看防火墙状态
service iptables status  

# 停止防火墙
service iptables stop  

# 启动防火墙
service iptables start  

# 重启防火墙
service iptables restart  

# 永久关闭防火墙
chkconfig iptables off  

# 永久关闭后重启
chkconfig iptables on　


# 开启80端口
vim /etc/sysconfig/iptables
# 加入如下代码
-A INPUT -m state --state NEW -m tcp -p tcp --dport 80 -j ACCEPT

# 保存退出后重启防火墙
service iptables restart
```


#### 添加一个服务，允许一个服务访问

命令 | 描述
:-|:-
firewall-cmd --add-service=ssh | 添加某一个服务
firewall-cmd --query-service=ssh | 有没有查询服务
firewall-cmd --remove-service=ssh | 移除某一个服务
firewall-cmd --list-service=ssh | 列出有哪些服务
firewall-cmd --query-port=22/tcp | 查询22端口是否有tcp协议
firewall-cmd --add-port=22/tcp | 22端口添加tcp协议
firewall-cmd --list-port=22/top | 列出有哪些服务

防火墙控制的有两个方向一个是服务，一个是端口。我们常用的都是端口这种的方式控制。


### <div id="class01-09">09、提权与文件上传和下载</div>

命令 | 描述
:-|:-
sudo | 提权
chown -R test:test /data | 更改文件或者文件夹的权限所属人为test
wget XXX / curl -o saveFileName XXX | 下载， 其中XX是下载地址, saveFileName 是保存的文件的名字
scp（scp yanle.txt test@ip:/tmp/）| 上传把本地指定的文件上传到服务器指定位置
scp（scp test@ip:/tmp/yanle.txt ./）| 把服务器的文件下载到本地来

其实xshell 也可以实现文件的上传和下载。但是 要求我们在服务器上安装一个软件，名字叫做 lrzsz: yum install lrzsz                 
这个命令是需要在服务器上执行的：
在root 用户中 输入visudo 进入 文件命令之后 大写G 就可以找到文件末尾了。
这个时候在下面这一段中，加入我们自己的用户就可以了
```
## Allows people in group wheel to run all commands
%wheel  ALL=(ALL)       ALL
test ALL=(ALL)       ALL

service network restart
```

命令 | 描述
:-|:-
rz | 上传到服务器的文件
sz fileName | 服务器上文件下载到本地
