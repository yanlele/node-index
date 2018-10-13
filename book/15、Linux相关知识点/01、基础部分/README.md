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


### <div id="class01-02"> </div>
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

