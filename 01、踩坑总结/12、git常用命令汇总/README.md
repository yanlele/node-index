# git 常用命令汇总

- 提交代码到远程分之     
    git init        
    git status      
    git add .       
    git commit -m '描述'          
    git remote add origin Git地址             
    git pull            
    git push -u origin master           
    git push -u -f origin master                
    
- 查看分支      
    git branch      
    git branch -r
    
    git checkout -b v1.0 origin/master      //在master分支基础之上生成一个名为v1.0的一个分支      
    git push origin HEAD -u     //把分支推送到远程
    
    