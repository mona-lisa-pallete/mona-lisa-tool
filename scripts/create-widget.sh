pwd=$PWD

# 模板目录
tmpl_dir=$pwd/tmpl/widget

# 组件工作目录
work_dir=$pwd/packages/widgets

echo "工作目录：$work_dir"

element_ref=$1

# 目标目录
target_dir=$work_dir/$element_ref

if [ -d $target_dir ]; then
  echo "已存在组件: $element_ref , 请换个名字再试试"
  exit 1
fi

function checkParm(){
    if [ ! -n "$element_ref" ];then
        echo "请输入 elementRef"
        exit 1
    fi
}
 
checkParm

mkdir -p $target_dir

echo $target_dir

cp -R $tmpl_dir/* $target_dir

read_dir() {
    for file in `ls -a $1`
    do
        if [ -d $1"/"$file ]
        then
            if [[ $file != '.' && $file != '..' ]]
            then
                read_dir $1"/"$file
            fi
        else
            echo "文件：$1\"/\"$file"
            # 替换内容
            sed -i '' "s/\$__ELEMENT_REF__/$element_ref/g" $1"/"$file
        fi
    done
}

read_dir $target_dir