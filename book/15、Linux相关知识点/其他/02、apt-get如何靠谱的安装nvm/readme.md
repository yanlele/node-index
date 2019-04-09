## apt-get如何靠谱的安装nvm

方法：[https://github.com/creationix/nvm#git-install](https://github.com/creationix/nvm#git-install)

- `cd ~/`  切到主目录
- `git clone https://github.com/creationix/nvm.git .nvm`  克隆代码到文件夹 .nvm
- `cd ~/.nvm`  进入nvm代码目录
- `. nvm.sh`  执行命令
- `~/.bash_profile`  加入系统环境变量
- `nvm alias default <version>`  设置启动node默认版本

在终端里面，执行 nvm --version ，出来版本号，说明安装成功 

查看远程版本: `nvm ls-remote`

安装版本: `nvm install 10.9.0`  

切换版本: `nvm use 10.9.0`

查看所有版本: `nvm ls`



