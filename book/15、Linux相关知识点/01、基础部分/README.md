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


### <div id="class01-02">SSH连接</div>
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
