// import { DavinciFormComp } from "@/accessSpec/form.spec";
import React from "react";

const BtnForm = ({ onChange, children }) => {
  return (
    <div>
      <div>标题</div>
      <input
        onChange={(e) => {
          onChange?.(e.target.value);
        }}
      />
    </div>
  );
};

export default BtnForm;
