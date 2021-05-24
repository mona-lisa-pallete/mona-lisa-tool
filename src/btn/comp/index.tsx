import React from "react";

const FormButton = ({ onClick, children }) => {
  return <button onClick={onClick}>{children}</button>;
};

export default FormButton;
