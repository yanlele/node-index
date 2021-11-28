## centos7安装nvm


1安装版本管理工具git                        
`yum install git`
查看git版本
`git --version`


2 安装Node.js版本管理工具nvm
`curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.11/install.sh | bash`

或者
`wget -qO- https://raw.githubusercontent.com/creationix/nvm/v0.33.11/install.sh | bash`

还可以用下面这种方法
`git clone git://github.com/creationix/nvm.git ~/nvm`

验证安装
`command -v nvm`

设置nvm自动运行
`echo "source ~/nvm/nvm.sh" >> ~/.bashrc`               
`source ~/.bashrc`

查询Node.js版本
`nvm list-remote`

安装Node.js版本
`nvm install v7.6.0`

切换Node.js版本
`nvm use v7.6.0`

升级npm
`npm -g install npm@5.7.1`
