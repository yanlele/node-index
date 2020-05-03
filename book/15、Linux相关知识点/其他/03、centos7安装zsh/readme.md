## centos7安装zsh

`yum install -y zsh`

`chsh -s /bin/zsh`                  

`yum install -y git`                    

`sh -c "$(curl -fsSL https://raw.githubusercontent.com/robbyrussell/oh-my-zsh/master/tools/install.sh)"`


## 插件安装
#### 可选择、命令补全
```
cd ~/.oh-my-zsh/custom/plugins/

git clone https://github.com/zsh-users/zsh-autosuggestions

vi ~/.zshrc
```


#### 安装高亮插件
```
cd ~/.oh-my-zsh/custom/plugins/

git clone https://github.com/zsh-users/zsh-syntax-highlighting.git

vi ~/.zshrc
```


