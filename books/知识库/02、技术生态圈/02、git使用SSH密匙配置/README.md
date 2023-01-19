# git使用SSH密匙配置

第一个要配置的是你个人的用户名称和电子邮件地址。这两条配置很重要，每次 Git 提交时都会引用这两条信息，说明是谁提交了更新，所以会随更新内容一起被永久纳入历史记录：

```
$ git config --global user.name "John Doe"
$ git config --global user.email johndoe@example.com
```

如果用了 --global 选项，那么更改的配置文件就是位于你用户主目录下的那个，以后你所有的项目都会默认使用这里配置的用户信息。如果要在某个特定的项目中使用其他名字或者电邮，只要去掉 --global 选项重新配置即可，新的设定保存在当前项目的 .git/config 文件里。


git支持https和git两种传输协议，github分享链接时会有两种协议可选：git协议链接、https协议链接      
git使用https协议，每次pull, push都会提示要输入密码，使用git协议，然后使用ssh密钥，这样免去每次都输密码的麻烦      

## 初次使用git的用户要使用git协议大概需要三个步骤：
### 一、生成密钥对
大多数 Git 服务器都会选择使用 SSH 公钥来进行授权。系统中的每个用户都必须提供一个公钥用于授权，没有的话就要生成一个。
生成公钥的过程在所有操作系统上都差不多。首先你要确认一下本机是否已经有一个公钥。

SSH 公钥默认储存在账户的主目录下的 ~/.ssh 目录。进去看看：     
```
$ cd ~/.ssh
$ ls
authorized_keys2  id_dsa       known_hosts config            id_dsa.pub
```
看一下有没有id_rsa和id_rsa.pub(或者是id_dsa和id_dsa.pub之类成对的文件)，有 .pub 后缀的文件就是公钥，另一个文件则是密钥。    
假如没有这些文件，甚至连 .ssh 目录都没有，可以用 ssh-keygen 来创建。该程序在 Linux/Mac 系统上由 SSH 包提供，而在 Windows 上则包含在 MSysGit 包里：     
```
$ ssh-keygen -t rsa -C "your_email@youremail.com"

Creates a new ssh key using the provided email # Generating public/private rsa key pair.

Enter file in which to save the key (/home/you/.ssh/id_rsa):
```
直接按Enter就行。然后，会提示你输入密码，如下(建议输一个，安全一点，当然不输也行，应该不会有人闲的无聊冒充你去修改你的代码)：      
```
Enter same passphrase again: [Type passphrase again]
```
完了之后，大概是这样：     
```
Your public key has been saved in /home/you/.ssh/id_rsa.pub.
The key fingerprint is: # 01:0f:f4:3b:ca:85:d6:17:a1:7d:f0:68:9d:f0:a2:db your_email@youremail.com
```
到此为止，你本地的密钥对就生成了。       

### 二、添加公钥到你的远程仓库（github）
 1、查看你生成的公钥：        
 ```
 $ cat ~/.ssh/id_rsa.pub
 
 ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQC0X6L1zLL4VHuvGb8aJH3ippTozmReSUzgntvk434aJ/v7kOdJ/MTyBlWXFCR+HAo3FXRitBqxiX1nKhXpHAZsMciLq8vR3c8E7CjZN733f5AL8uEYJA+YZevY5UCvEg+umT7PHghKYaJwaCxV7sjYP7Z6V79OMCEAGDNXC26IBMdMgOluQjp6o6j2KAdtRBdCDS/QIU5THQDxJ9lBXjk1fiq9tITo/aXBvjZeD+gH/Apkh/0GbO8VQLiYYmNfqqAHHeXdltORn8N7C9lOa/UW3KM7QdXo6J0GFlBVQeTE/IGqhMS5PMln3 admin@admin-PC
 ```
 
 2、登陆你的github帐户。点击你的头像，然后 `Settings -> 左栏点击 SSH and GPG keys -> 点击 New SSH key`
 
 3、然后你复制上面的公钥内容，粘贴进“Key”文本域内。 title域，自己随便起个名字。
 
 4、点击 Add key。
完成以后，验证下这个key是不是正常工作：
```
$ ssh -T git@github.com

Attempts to ssh to github
```
如果，看到：`Hi xxx! You've successfully authenticated, but GitHub does not # provide shell access.` 恭喜你，你的设置已经成功了。


### 三、修改git的remote url
使用命令 git remote -v 查看你当前的 remote url        
```
$ git remote -v
origin https://github.com/someaccount/someproject.git (fetch)
origin https://github.com/someaccount/someproject.git (push)
```
如果是以上的结果那么说明此项目是使用https协议进行访问的（如果地址是git开头则表示是git协议）     
你可以登陆你的github，就像本文开头的图例，你在上面可以看到你的ssh协议相应的url，类似：       
复制此ssh链接，然后使用命令 `git remote set-url origin git://new.url.here` 来调整你的url。        
然后你可以再用命令 git remote -v 查看一下，url是否已经变成了ssh地址。       
然后你就可以愉快的使用git fetch, git pull , git push，再也不用输入烦人的密码了      


### 四、其他
如果之前设置了密码， 后来不想要密码了， 可以这样：              
1、`ssh-keygen -p` 然后直接回车就行了

2、`Enter old passphrase:` 输入旧密码

3、`Enter new passphrase (empty for no passphrase):` 输入新密码或者不输入密码

之后， 在git提交的时候， 就可以直接不用输入密码了


## mac13 ssh 不可用场景解决办法
升级到 macOS Ventura 后，无法使用 SSH 命令登入服务器；
就默认关闭了 ssh-rsa 算法。那么 macOS Ventura 内置使用的 OpenSSH_9.0p1 也是默认关闭了 ssh-rsa 算法。

### 方案一：重新生成 ed25519 算法的密钥
```
ssh-keygen -t ed25519 -C "your_email@youremail.com"
```

### 方案二：重新启用 RSA/SHA1
```
# 启用单个主机或者地址：（如果不懂 Host xxx-host 的含义，建议使用启用全部场景）
# 在 ~/.ssh/config 文件的对应主机配置里新增2行：
Host xxx-host
    HostkeyAlgorithms +ssh-rsa
    PubkeyAcceptedAlgorithms +ssh-rsa


# 默认全部场景都启用：
# 配置里有 Host * 配置的，需要写到 Host * 内
Host *
    HostkeyAlgorithms +ssh-rsa
    PubkeyAcceptedAlgorithms +ssh-rsa

# 没有的，在 ~/.ssh/config 文件的顶部插入或者尾部新增2行：
HostkeyAlgorithms +ssh-rsa
PubkeyAcceptedAlgorithms +ssh-rsa
```



### 参考文章
- [参看文章链接](https://www.cnblogs.com/superGG1990/p/6844952.html)
- [mac 清除/修改SSH的私钥密码](https://blog.csdn.net/qq_36545656/article/details/89478254)

