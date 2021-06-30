pwd=$PWD

# 引入参数解析器
. $pwd/scripts/parse-params.sh

# 清除工作区中原有的 zip
# rm -rf $target_zip

zip_target=packages/widgets

# 组件工作目录
work_dir="$pwd/$zip_target"_zip

# 压缩文件
. ./scripts/zip-comp.sh $zip_target

target_zip="$work_dir/$COMP.zip"

method=POST


if [ $ENV == "dev" ]; then
  api=http://portalhome.uae.shensz.local/davinciapi/api/1/platform/component
elif [ $ENV == "local" ]; then
  api=http://localhost:5400/davinciapi/api/1/platform/component
elif [ $ENV == "prod" ]; then
  api=http://localhost:5400/davinciapi/api/1/platform/component
else
  api=https://portal.guorou.net/davinciapi/api/1/platform/component
fi

request_info=发布新组件

if [ ! -f $target_zip ]; then
  echo "不已存在组件: $target_zip \n"
  exit 1
fi

if [ $ID != "" ]; then
  method=PUT
  api=$api/$ID
  request_info=更新组件
fi

echo "$request_info \n"

echo "API: $api \n"

echo "上传的文件: $target_zip \n"

curl --location --request $method $api \
--header 'Cookie: portal_access_token=b0773763-5995-46aa-b1f6-44b3a9460b87; portal_access_token.sig=HhCwfG5jDpDUocmApxFioQLt7UzA8u6rAlUuoUwnww8' \
--form "data=@\"$target_zip\""

# --header 'Cookie: portal_access_token=zjy; portal_access_token.sig=wuDNxbW5HBcinqFXGxPdFSxpyyMclvIXFj1M9wAoeUU' \