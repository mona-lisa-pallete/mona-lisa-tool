pwd=$PWD

# 压缩文件
# . ./scripts/zip-comp.sh ./src

# 组件工作目录
work_dir=$pwd/src_zip

element_ref=$1

# 组件 id，如果传入，则通过 PUT 更新组件
comp_id=$2

target_zip="$work_dir/$element_ref.zip"

method=POST

api=http://portalhome.uae.shensz.local/davinciapi/api/1/platform/component

request_info=发布新组件

if [ ! -f $target_zip ]; then
  echo "不已存在组件: $target_zip"
  exit 1
fi

if [ $2 != "" ]; then
  method=PUT
  api=$api/$comp_id
  request_info=更新组件
fi

echo $request_info

echo "API: $api"

echo "上传的文件: $target_zip"

curl --location --request $method $api \
--header 'Cookie: portal_access_token=zjy; portal_access_token.sig=wuDNxbW5HBcinqFXGxPdFSxpyyMclvIXFj1M9wAoeUU' \
--form "data=@\"$target_zip\""
