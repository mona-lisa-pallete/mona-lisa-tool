import { getUploadPolicy } from '@/utils';
import { PlusOutlined } from '@ant-design/icons';
import { Upload } from 'antd';
import { UploadChangeParam, UploadFile } from 'antd/lib/upload/interface';
import React, { useState } from 'react';
import { UploadToolProps } from './types';

const DIR_PATH = 'kbase/davinciprovider/assets';

const ossPath = 'https://static-zy-com.oss-cn-hangzhou.aliyuncs.com/';

const getFileName = (fileName: string, uid: string) => {
  return `${uid}${/(\..+)$/.exec(fileName)![0]}`;
};

const UploadTool: React.FC<UploadToolProps> = (props) => {
  const { value, onChange } = props;
  const [policy, setPolicy] = useState<any>({});

  const getData = (file: UploadFile<any>) => {
    return {
      ...policy,
      key: `${DIR_PATH}/${getFileName(file.name, file.uid)}`,
    };
  };
  const handleBeforeUpload = async () => {
    const res = await getUploadPolicy({
      dirPath: DIR_PATH,
    });

    if (res.code !== 0) {
      return Promise.reject();
    }

    setPolicy(res.data);

    return Promise.resolve();
  };

  const handleChange = ({ file }: UploadChangeParam<UploadFile<any>>) => {
    // const files = fileList.map((e) => {
    //   return {
    //     ...e,
    //     url:
    //       e.status === 'done'
    //         ? `https://static.guorou.net/${DIR_PATH}/${getFileName(e.name, e.uid)}`
    //         : '',
    //   };
    // });
    if (file.status === 'done') {
      if (file && onChange) {
        onChange(`https://static.guorou.net/${DIR_PATH}/${getFileName(file.name, file.uid)}`);
      }
    }
  };

  return (
    <Upload.Dragger
      onChange={handleChange}
      action={ossPath}
      data={getData}
      showUploadList={false}
      beforeUpload={handleBeforeUpload}
    >
      {!value && (
        <>
          <PlusOutlined />
          添加图片
        </>
      )}
      {value && (
        <img
          style={{
            margin: '0 auto',
            display: 'block',
            maxWidth: '288px',
          }}
          src={value}
        />
      )}
    </Upload.Dragger>
  );
};
export default UploadTool;
