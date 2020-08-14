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

选择一个commit, 合并进当前分支： `git cherry-pick [commit]`


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

显示今天提交了多少行代码 - 代码统计： `git diff --shortstat "@{0 day ago}"`

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

使用命令行：git commit --amend   就可以进入到修改message 的vim 里面去, 修改信息之后:wq 退出

在使用命令行： git rebase --continue

最后强行提交： git push --force


具体文章也可以参看这个文章： [如何修改Git commit的信息](https://www.cnblogs.com/shenh062326/p/git.html)


#### 处理提交commit revert 的情况
git log   找到提交的HEAD                                     
撤销指定的提交： `git revert <commit>`                          
git push 就OK了



#### 多个提交合并
`git rebase -i commitId` 或者 `git rebase -i HEAD~n` 这样可以检出我们需要的rebase                            
需要注意的是： s 命令是指针对新分支衍合到老分支                       

改了之后， 就可以修改合并的message 了                         

然后强行push : git push --force

说明： 如果废弃rebase : git rebase --abort

- [git 几个commit点合并成一个commit点](https://blog.csdn.net/u013276277/article/details/82470177)
- [git合并多个提交](https://www.cnblogs.com/tocy/p/git-rebase-merge-commit.html)


#### cherry-pick合并多个commit
**1、使用方法以及作用**                      

git cherry-pick可以选择某一个分支中的一个或几个commit(s)来进行操作（操作的对象是commit）。
例如，假设我们有个稳定版本的分支，叫v2.0，另外还有个开发版本的分支v3.0，我们不能直接把两个分支合并，
这样会导致稳定版本混乱，但是又想增加一个v3.0中的功能到v2.0中，这里就可以使用cherry-pick了。

就是对已经存在的commit 进行 再次提交；

使用方法如下： `git cherry-pick <commit id>`                   

查询commit id 的查询可以使用git log查询（查询版本的历史），最简单的语法如下： `git log`                      
详细的git log 语法如下： `git log [<options>] [<since>..<until>] [[--] <path>...]`                                          
主要参数选项如下：                           
--p：按补丁显示每个更新间的差异                           
--stat：显示每次更新的修改文件的统计信息                         
--shortstat：只显示--stat中最后的行数添加修改删除统计                         
--name-only：尽在已修改的提交信息后显示文件清单                           
--name-status：显示新增、修改和删除的文件清单                           
--abbrev-commit：仅显示SHA-1的前几个字符，而非所有的40个字符                           
--relative-date：使用较短的相对时间显示（例如："two weeks ago"）                         
--graph：显示ASCII图形表示的分支合并历史                          
--pretty：使用其他格式显示历史提交信息   

结果大概如下：             
```
commit 0771a0c107dbf4c96806d22bbc6ef4c58dfe7075
Author: zhengcanrui <zhengcanrui@cvte.com>
Date:   Mon Aug 8 14:41:54 2016 +0800

    [modify] [what] commit的备注信息 
```                 
其中0771a0c107dbf4c96806d22bbc6ef4c58dfe7075就是我们的commit id                
注意：当执行完 cherry-pick 以后，将会 生成一个新的提交；这个新的提交的哈希值和原来的不同，但标识名 一样；(commit id会变)                   

**2、实践**

首先切换到你要添加commit的分支，如：你要将A分支上面的commit添加到B分支上面，我们可以要先切换到B分支上面。
（注意：cherry-pick是一个本地的操作，假如你pull代码之后有人在A分支上有了新的commit，
需要你先pull代码在进行cherry-pick，原因及其错误提示请见最后）。

`git checkout B`                                
将0771a0c107dbf4c96806d22bbc6ef4c58dfe7075这个commit（提交）合并到B分支上面。
正常情况下，可以给出全部的commit id，也可以只给出前面的一段，只要你提交中没有这一段重复的就好，剩下的部分git会帮你填充。                      
`git cherry-pick 0771a0c107dbf4c`#将上面的commit id为0771a0c107dbf4c96806d22bbc6ef4c58dfe7075的提交添加到B分支上面                     

参看文档                    
- [git cherry-pick合并某个commit](https://www.cnblogs.com/0201zcr/p/5752771.html)
- [三年 Git 使用心得 & 常见问题整理](https://juejin.im/post/6844904191203213326)


#### commit优化
type代表某次提交的类型，比如是修复一个bug还是增加一个新的feature。所有的type类型如下：                    
- feat： 新增feature
- fix: 修复bug
- docs: 仅仅修改了文档，比如README, CHANGELOG, CONTRIBUTE等等
- style: 仅仅修改了空格、格式缩进、都好等等，不改变代码逻辑
- refactor: 代码重构，没有加新功能或者修复bug
- perf: 优化相关，比如提升性能、体验
- test: 测试用例，包括单元测试、集成测试等
- chore: 改变构建流程、或者增加依赖库、工具等
- revert: 回滚到上一个版本


#### 放弃已经commit但是没有push的代码
- 如果已经用add 命令把文件加入stage了，就先需要从stage中撤销： `git reset HEAD <file>...`
- 放弃工作区和index的改动,HEAD指针仍然指向当前的commit： `git reset --hard HEADID` 

#### 文件暂存
- [Git 工具 - 储藏（Stashing）](https://git-scm.com/book/zh/v1/Git-工具-储藏（Stashing）)

#### 更改remote
`git remote set-url origin XXXXXXX`


#### git 命令终极文档
- [Git Community Book 中文版](http://gitbook.liuhui998.com/index.html)


#### 给已经存在的项目添加git
- [给已经存在的项目添加git](https://www.jianshu.com/p/609756f76771)


#### 强行同步远端
git本地即使有修改如何强制更新：

本地有修改和提交，如何强制用远程的库更新本地。我尝试过用git pull -f，总是提示 You have not concluded your merge. (MERGE_HEAD exists)。

我需要放弃本地的修改，用远程的库的内容就可以，应该如何做？傻傻地办法就是用心的目录重新clone一个，正确的做法是什么？

正确的做法应该是：

`git fetch --all`

`git reset --hard origin/master // 远程分支名称`

`git fetch`

只是下载远程的库的内容，不做任何的合并git reset 把HEAD指向刚刚下载的最新的版本

**其他办法**                        
`git fetch -p`


#### 强行对齐 - 本地推送到远端
`git push origin dev:master -f // 强行对齐开发分支到master`

`git checkout master  -->  git reset --hard origin/master // 拉去最新的master代码`  

- [GIT强行覆盖master分支详细讲解](https://blog.csdn.net/Yang_Hui_Liang/article/details/87883860)

#### 强行对齐 - 远端对齐到本地
`git pull <远程主机名> <远程分支名>:<本地分支名>`                          

举一个例子： `git pull --force origin master:master`


#### 删除某一次提交
`git  rebase -i  commit_id`  //commit_id为想要删除的某次提交的前一个提交记录 id

然后删除想要删除的记录信息，或者把记录信息前面的`pick` 修改成`drop`，根据提示进行信息保存。

然后进行git 强制提交（确保已经取出分支保护）

`git push --force`


#### github----向开源框架提交pr的过程
- [https://blog.csdn.net/vim_wj/article/details/78300239](https://blog.csdn.net/vim_wj/article/details/78300239)


#### GIT上fork的项目获取最新源代码
- [https://my.oschina.net/zimingforever/blog/352715](https://my.oschina.net/zimingforever/blog/352715)

#### git clean的用法
- [https://www.jianshu.com/p/0b05ef199749](https://www.jianshu.com/p/0b05ef199749)

`git clean -n`: 是一次clean的演习, 告诉你哪些文件会被删除. 记住他不会真正的删除文件, 只是一个提醒

`git clean -f`: 删除当前目录下所有没有track过的文件. 他不会删除.gitignore文件里面指定的文件夹和文件, 不管这些文件有没有被track过
                
`git clean -f <path>`: 删除指定路径下的没有被track过的文件
                       
`git clean -df`: 删除当前目录下没有被track过的文件和文件夹

`git clean -xf`: 删除当前目录下所有没有track过的文件. 不管他是否是.gitignore文件里面指定的文件夹和文件
