import React, { useEffect, useState } from "react";
import { getJSON } from "../utils";

interface AppInfo {
  version: string;
  appVersion: string;
  buildTime: string;
}

const useAppInfo = () => {
  const [appInfo, setAppInfo] = useState<AppInfo | null>(null);
  useEffect(() => {
    getJSON("__app_info__", "http://localhost:33222").then((json) => {
      setAppInfo(json as AppInfo);
    });
  }, []);
  return appInfo;
};

const AppInfoComp = () => {
  const appInfo = useAppInfo();
  return (
    <div className="app-info bg-white">
      {appInfo && (
        <>
          <div className="item px-4 py-2">版本：{appInfo.version}</div>
        </>
      )}
    </div>
  );
};

export default AppInfoComp;
