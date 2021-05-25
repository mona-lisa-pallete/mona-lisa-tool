import React from 'react';

interface UploadContentProps {
  value: string;
  onChange: (val: string) => void;
}
const UploadContent: React.FC<UploadContentProps> = (props) => {
  const { value } = props;
  return <img src={value} />;
};
export default UploadContent;
