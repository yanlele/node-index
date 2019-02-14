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


### 5、分支                  
显示所有本地分支： `git branch`

列出所有远程分支： `git branch -r`

列出所有本地分支和远程分支： `git branch -a`

创建一个新分支，但是依然停留在当前分支： `git branch [branch-name]`

新建一个分支，与指定的远程分支建立追踪关系： `git branch --track [branch] [remote-branch]`

删除分支： `git branch -d [branch-name]`

删除远程分支：         
```
git push origin --delete [branch-name]          
git branch -dr [remote/branch]
```

新建一个分支，并切换到改分支上面： `git checkout -b [branch]`

切换到指定分支，并更新工作区： `git checkout [branch-name]`

切换到删给一个分支： `git checkout -`

建立追踪关系，在现有分支和指定的远程分支之间： `git branch --set-upstream [branch] [remote-branch]`

提交新建的本地分支到远程： `git push --set-upstream origin [branch-name]`

合并指定分支到当前分支： `git merge [branch]`

衍合指定分支到当前分支： `git rebase <branch>`

选择一个commit, 合并进当前分支： `git cherry-ipck [commit]`


### 6、标签
列出所有本地标签： `git tag`         

基于最新提交创建标签： `git tag <tagname>`

删除标签： `git tag -d <tagname>`

删除远程tag: `git push origin :refs/tags/[tagname]`

查看tag信息： `git show [tag]`

提交指定tag: `git push [remote] [tag]`

提交所有tag: `git push [remote] --tags`

新建一个分支， 指定某个tag： `git checkout -b [branch] [tag]`


### 7、查看信息
查看有变更的文件： `git status`

显示当前分支的所有历史版本： `git log`

显示commit历史，以及每次commit发生变更的文件： `git log --stat`

搜索提交历史， 根据关键词： `git log -S [keyword]`

显示某个commit之后的所有变动，每个commit占据一行： `git log [tag] HEAD --pretty=format:%s`

显示某个commit之后的所有变动，其“提交说明”必须符合搜索条件： `git log [tag] HEAD --grep feature`

显示某个文件的版本历史， 包括文件改名：                
```
git log --follow [file]
git whatchanged [file]
```

显示指定文件相关的每一次diff: `git log -p [file]`

显示过去5次提交： `git log -5 --pertty --oneline`

显示所有提交过的用户， 按提交次数排序： `git shortlog -sn`

显示指定文件是什么人在什么时间修改过： `git blame [file]`

显示缓存区和工作去的差异： `git diff`

显示暂存区和上一个commit的差异： `git diff --cached [file]`

显示工作区和当前分支最新的commit之间的差异： `git diff HEAD`

显示两次提交之间的差异： `git diff [first-branch]...[second-branch]`

显示今天提交了多少行代码： `git diff --shortstat "@{0 day ago}"`

显示某次提交的元素数据和内容变化： `git show [commit]`

显示某次提交发生变化的文件： `git show --name-only [commit]`                      

显示某次提交时候，某个文件的内容： `git show [commit]:[filename]`

显示当然分支的最近几次提交： `git reflog`


### 8、远程操作
下载远程仓库的所有变动： `git fetch [remote]`

取回远程仓库的变化，并与本地分支合并： `git pull [remote] [branch]`

显示所有远程仓库： `git remote -v`

显示某个远程仓库的信息： `git remote show [remote]`

添加一个新的远程仓库，并命名： `git remote add [shortname] [url]`

上传本地指定分支到远程仓库： `git push [remote] [branch]`

强行推送当前分支到远程仓库，即便是有冲突： `git push [remote] --force`               

推送所有分支到远程仓库: `git push [remote] --all`


### 9、撤销                    
撤销工作目录中所有未提交的文件的修改内容： `git reset --head HEAD`

撤销指定的未提交文件的修改内容： `git checkout HEAD <file>`

撤销指定的提交： `git revert <commit>`

退回到之前1天的版本： `git log --before="1 days"`

恢复暂存区的指定文件到工作区： `git checkout [file]`

恢复某个commit的文件到暂存区和工作区： `git checkout [commit] [file]`

恢复暂存区的所有文件到工作区： `git checkout .`

重置暂存区的指定文件，与上一次commit保持一致，但是工作区不变： `git reset [file]`

重置暂存区与工作区，与上一次commit保持一致： `git reset --hard`

重置当前分支的指针为commit，同事重置暂存区，但是工作区不变： `git rest [commit]`

重置当前分支的HEAD为指定commit, 同事重置暂存区和工作去，与指定commit一致： `git rest --hard [commit]`

重置当前HEAD为指定commit, 但保持暂存区和工作去不变： `git rest --keep [commit]`

创建一个新的commit， 用来撤销指定的commit。                    
后者所有变化都将被前者抵消，并且应用于当前分支： `git revert [commit]`



暂时将未提交的变化移除，稍后在移入： 
```
git stash
git stash pop
```


### 10、其他
打包生成一个可供发布的压缩包： `git archive`

强制提交回退的代码： `git push -f origin master`;

一个回滚的方法： [https://www.cnblogs.com/human/p/5128482.html](https://www.cnblogs.com/human/p/5128482.html)

#### 修改git commit message
比如要修改的commit是倒数第三条，使用下述命令                       
`git rebase -i HEAD~3`

把相对应的把pick改为edit， 然后:wq 保存退出， 接下来按照提示一路走下来就可以了。有提示的。
具体文章也可以参看这个文章： [如何修改Git commit的信息](https://www.cnblogs.com/shenh062326/p/git.html)


- [git合并多个提交](https://www.cnblogs.com/tocy/p/git-rebase-merge-commit.html)
