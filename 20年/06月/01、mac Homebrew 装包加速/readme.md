## mac Homebrew 装包加速

官网安装命令：
`/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/uninstall)"`

官网卸载命令：
`/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/uninstall)"`

国内官网安装基本很慢，速度不忍直视，5KB/s......；这速度怎么对得起科学上网？大部分情况是安装了一会就报错，然后是这个样子：
`Failed to connect to raw.githubusercontent.com port 443: Connection refused`


简单五步，搞定HomeBrew安装

### 第一步：创建HomeBrew文件夹

首先确保`/usr/local/Homebrew`文件夹不存在，存在的话删除，然后执行：
`sudo mkdir /usr/local/Homebrew`

### 第二步：git克隆
`sudo git clone https://mirrors.ustc.edu.cn/brew.git /usr/local/Homebrew`

或者
`sudo git clone https://mirrors.aliyun.com/homebrew/brew.git /usr/local/Homebrew`

或者
`sudo git clone https://mirrors.tuna.tsinghua.edu.cn/git/homebrew/brew.git /usr/local/Homebrew`

回车后，会提示Receiving objects: xx% 等待下载完成。

### 第三步：创建一个快捷方式到/usr/local/bin目录
`sudo ln -s /usr/local/Homebrew/bin/brew /usr/local/bin/brew`                               
如果提示File exists表示/usr/local/bin文件夹里面已经有brew，删除后再运行第三步。

### 第四步：创建core文件夹 并 再次git克隆
`sudo mkdir -p /usr/local/Homebrew/Library/Taps/homebrew/homebrew-core`

以及
`sudo git clone https://mirrors.ustc.edu.cn/homebrew-core.git /usr/local/Homebrew/Library/Taps/homebrew/homebrew-core`

或者
`sudo git clone https://mirrors.aliyun.com/homebrew/homebrew-core.git /usr/local/Homebrew/Library/Taps/homebrew/homebrew-core`

或者
`sudo git clone https://mirrors.tuna.tsinghua.edu.cn/git/homebrew/homebrew-core.git /usr/local/Homebrew/Library/Taps/homebrew/homebrew-core`

等待

### 第五步：获取权限 并 运行更新
`sudo chown -R $(whoami) /usr/local/Homebrew`

以及
`brew update`

稍等一会儿～大功告成！Homebrew 安装完成

使用 Homebrew 安装 Apple（或您的 Linux 系统）没有预装但 你需要的东西。

最后设置：设置环境变量，再运行下面两句后，重启终端：(命令中的链接地址可以替换为第二步或者第四步中对应的链接地址)
`echo 'export HOMEBREW_BOTTLE_DOMAIN=https://mirrors.ustc.edu.cn/homebrew-bottles' >> ~/.zshrc`                     
`echo 'export HOMEBREW_BOTTLE_DOMAIN=https://mirrors.ustc.edu.cn/homebrew-bottles' >> ~/.bash_profile`                              


brew 有一个自检程序，如果有问题自检试试：
`brew doctor`

查看全部安装路径
`brew list`

更详细的内容请到官网查看：https://brew.sh/index_zh-cn

文章来源：https://blog.csdn.net/u010458765/article/details/104730037/
