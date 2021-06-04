echo "----zip all materials----"

pwd_path=`pwd`

if [[ $1 == /* ]] ;then 
  zip_target=$1"_zip" 
else 
  zip_target=$pwd_path"/"$1"_zip" 
fi

echo "将 $1 目录下的所有文件 zip 到 $zip_target 中"

if [ ! -d $zip_target ]; then 
  mkdir -p $zip_target 
fi

function zip_file(){
  for file in `ls $1`
    do
      if [ -d $1"/"$file ]; then 
      cd $1
        zip $zip_target"/"$file $file/**/*
      cd $pwd_path
      fi
    done
}

zip_file $1