# git 常用命令汇总

### 名词               
- master: 默认开发分支                
- origin: 默认远程版本库                   
- Index / Stage：暂存区                 
- Workspace：工作区                 
- Repository：仓库区（或本地仓库）                 
- Remote：远程仓库                   


### 1、新建代码库                 
在当前目录新建一个git代码仓库： `git init`                    

新建一个目录，将其初始化为git代码仓库： `git init [project-name]`             

下载一个项目和他的整个代码历史： `git clone [url]`



### 2、配置                
显示当前git配置: `git config --list`                  

编辑git配置文件： `git config -e [--global]`                   

设置提交代码时候的用户信息：  
```
git config [--global] user.name "[name]"     
git config [--global] user.emial "[emial address]"                        
```

### 3、增加/删除/修改文件                

查看状态： `git status`                  

查看变更内容： `git diff`              

添加指定文件到本地缓存区： `git add [file1] [file2] ...`

添加指定文件目录到本地缓存区，包含子目录： `git add [dir]`   

添加当前目录的所有文件到本地缓存区： `gti add .`

添加每个变化文件前，都会要求确认。对同一个文件的多处变化，可以实现分次提交： `git add -p`             

删除工作区文件，并且将这次删除放入本地缓存区： `git rm [file1] [file2] ...` 

停止追踪指定文件，但是该文件会保留在工作区: `git rm --cached [file]`

更改文件，并且将这个改名放入本地缓存区： `git mv [file-originame] [file-newname]`               


### 4、代码提交
提交缓存区到仓库： `git commit -m [message]`

提交缓存区指定文件到仓库： `git commit [file1] [file2] ... -m [message]`

提交工作区子长此commit之后的变化，直接到仓库区： `git commit -a`             

提交是显示所有diff信息: `git commit -v`

使用一次新的commit,替换上一次的提交           
如果代码没有任何新变化，则用来改写上一次commit的提交信息： `git commit --amend -m [message]`

重新做一次commit, 并包括指定文件的新变化： `git commit --amend [file1] [file2] ...`              


