import { useState, useCallback } from "react";

export default function useLocal<T>(
  key: string,
  initData: T
): [T, (d: T) => void] {
  const localData = window.localStorage.getItem(key);
  const [data, _setData] = useState(
    localData ? JSON.parse(localData) : initData
  );
  const setData = useCallback((data) => {
    window.localStorage.setItem(key, JSON.stringify(data));
    _setData(data);
  }, []);
  return [data, setData];
}
