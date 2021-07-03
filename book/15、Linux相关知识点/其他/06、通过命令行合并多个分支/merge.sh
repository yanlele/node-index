#!/bin/bash
#----------------------------------------------------------
# author : jiangcw
# email : lonelyangel.jcw@gmail.com
# date : 2019-03-08
#
# param :
#       git repo : the address of git repositroy,use ssh protocol
#                  eg. git://github.com:l-angel/demo.git
#       source branch : the branch need to merged.
# 	dest branch : the branch need to merge to.
#       git tag : if not empty the tag is will be marked.
#       del remote branch flag : true delete, other is not
# return : 0 success
#          1 failure
#          101 merge exist confict
#	   102 git tag error
#          103 dont find soure branch from remote
#	   104 some error when push to remote repo
#	   105 git clone error
#----------------------------------------------------------
# functions
function clear_workspace(){
    rm -rf $1
    echo "Clear workspace "$1" Completed."
    return 0
}

#Begin
repo=$1
branch_source=$2
branch_dest=$3
git_tag=$4
del=$5

ts=$(date +%s)
workspace="/tmp/ci/"$ts"/"

if [ ! -f "$workspace" ];then
    mkdir -p $workspace
fi

chmod -R u+rwx $workspace
echo "Repository : "$repo
echo "Workspace : "$workspace
echo "Source Branch : "$branch_source
echo "Dest Branch : "$branch_dest
echo "Delete Source Branch : "$del
echo "Git Tag : "$git_tag


proj=${repo##*/}
proj=$workspace${proj:0:${#proj}-4}


if git clone $repo $proj
then
	echo "Git clone to workspace success." >&1
else
	echo "Git clone to workspace "$proj" Failure." >&2
	exit 105
fi

cur_date=`date +%Y%m%d`

echo "Current date : " $cur_date
echo "Project path : " $proj

cd $proj

cur_branch=$(git branch -a | grep \*| awk '{print $2}')

# if current branch equals dest branch. we dont need checkout a new branch
if [ $cur_branch != $branch_dest ];then
	git checkout -b $branch_dest origin/$branch_dest >&1
fi

for line in $(git branch --remote | grep $branch_source);
do
	echo "Branch : "$line
	t_b=${line##*/}
	if [ $t_b == $branch_source ];then
		echo "Find source branch : "$t_b" from remote branchs."
		tips=$(git merge origin/$t_b| grep conflict)
		if [ ${#tips} -gt 0 ];then
			git merge --abort
			clear_workspace $workspace
			echo "Git auto merge exits conflicts. Merge canceled. Merge from "$t_b" to "$branch_dest >&2
            echo $tips >&2
			exit 101
		fi
		# mark tag
		if [ -n $git_tag ];then
			tag_tip=$(git tag $git_tag)
			if [ ${#tag_tip} -lt 0 ];then
				echo "Tag error : "$tag_tip >&2
				clear_workspace $workspace
				exit 102
			fi
		fi
		# del remote branch
		if [[ $del = "true" ]];then
			push_msg=$(git push origin :$t_b 2>&1)
			push_tip=$(echo $push_msg| grep not)
			if [ ${#push_tip} -gt 0 ];then
			    echo "some errs occurs when del remote branch" >&2
			    echo $push_msg >&2
			    exit 104
			fi
            echo "Delete remote branch "$t_b" success. That is merged."
		fi
		push_msg=$(git push origin HEAD:$branch_dest --tags 2>&1)
		push_tip=$(echo $push_msg| grep not)
		if [ ${#push_tip} -gt 0 ];then
			echo "Some errors occurs when push to remote repo." >&2
			echo $push_msg >&2
			exit 104
		fi

        ## clear workspace
        clear_workspace $workspace
        echo "Git auto merge completed."
        echo "Cheers......Dancing......Happy......"
        exit 0
	fi
done

echo "Not find source branch from remote repo." >&2
exit 103
