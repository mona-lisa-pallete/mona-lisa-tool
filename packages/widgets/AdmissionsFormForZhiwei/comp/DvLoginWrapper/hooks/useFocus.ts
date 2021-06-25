import React, { useRef } from "react";

const useFocus = () => {
  const htmlElRef = useRef<any>();
  const setFocus = () => {
    htmlElRef.current?.focus();
  };

  return [htmlElRef, setFocus];
};
export default useFocus;
