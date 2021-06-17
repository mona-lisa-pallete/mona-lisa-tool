pwd=$PWD

# 清除工作区中原有的 zip
rm -rf $target_zip

# 组件工作目录
work_dir=$pwd/src_zip

# 压缩文件
. ./scripts/zip-comp.sh ./src

element_ref=$1

# 组件 id，如果传入，则通过 PUT 更新组件
comp_id=$2

target_zip="$work_dir/$element_ref.zip"

method=POST

api=https://portal.guorou.net/davinciapi/api/1/platform/component
# api=http://localhost:5400/davinciapi/api/1/platform/component
# api=http://portalhome.uae.shensz.local/davinciapi/api/1/platform/component

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
--header 'Cookie: portal_access_token=b0773763-5995-46aa-b1f6-44b3a9460b87; portal_access_token.sig=HhCwfG5jDpDUocmApxFioQLt7UzA8u6rAlUuoUwnww8' \
--form "data=@\"$target_zip\""

# --header 'Cookie: portal_access_token=zjy; portal_access_token.sig=wuDNxbW5HBcinqFXGxPdFSxpyyMclvIXFj1M9wAoeUU' \