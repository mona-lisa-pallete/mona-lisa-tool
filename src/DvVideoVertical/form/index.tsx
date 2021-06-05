import React from "react";
import DvVideoFormBase from "../../DvVideo/form"; 

interface DvVideoVerticalFormProps {
  initialValues: any;
  onChange: (allValues: any) => void;
  platformCtx: any;
}

const DvVideoVerticalForm: React.FC<DvVideoVerticalFormProps> = (props) => {
  return (
    <DvVideoFormBase {...props} type='vertical'/>
  );
};

export default DvVideoVerticalForm;
