import React, { useRef } from "react";

const useFocus = () => {
  const htmlElRef = useRef<any>();
  const setFocus = () => {
    htmlElRef.current?.focus();
    if (htmlElRef.current?.tagName?.toLocaleLowerCase() !== 'input') {
      const input = htmlElRef.current.querySelector('input');
      input?.focus();
    }
  };

  return [htmlElRef, setFocus];
};
export default useFocus;
