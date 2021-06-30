import React, { useState, useEffect } from "react";
import { DvProvider } from '@gr-davinci/core';
import "./App.css";
import AppInfoComp from "./components/Version";
import { DevContainer } from "./DevContainer";
import { getJSON } from "./utils";
import qs from 'querystring';

declare global {
  interface Window {
    taroVendor: any;
    OnLuanched: any;
  }
}

if (window.taroVendor.applyPolyfills) {
  window.taroVendor.applyPolyfills().then(function() {
    window.taroVendor.defineCustomElements(window);
  });
}

const useDevData = (): null | any[] => {
  const [devData, setDevData] = useState<any>(null);
  useEffect(() => {
    getJSON("__dev_tool__").then((data) => {
      setDevData(data);
    });
    return () => {};
  }, []);
  return devData;
};

window.OnLuanched();

function App() {
  let selected = '';
  if (window.location.search) {
    const { select } = qs.parse(window.location.search.substr(1));
    selected = select as string;
  }
  const devData = useDevData();
  const [selectedDevData, selectDevData] = useState<any>(selected);
  return (
    <div className="App w-full">
      <header className="p-4 bg-white shadow-md relative z-10 flex items-center">
        <div className="text-xl text-left">Da-Vinci 业务组件开发工具</div>
        <span className="flex-1"></span>
        <AppInfoComp />
      </header>
      <div
        className="flex main-container"
        style={{
          height: "calc(100vh - 70px)",
          // paddingBottom: "360",
        }}
      >
        <div className="left-nav bg-white shadow-sm">
          {devData && (
            <div className="dev-items">
              {devData.map((devMetaData, idx) => {
                const isActive = devMetaData === selectedDevData;
                return (
                  <div
                    className={`item p-2 hover:bg-gray-100${
                      isActive ? " bg-gray-200" : ""
                    }`}
                    key={idx}
                    onClick={() => {
                      window.history.pushState({}, '', window.location.origin + '/?select=' + devMetaData);
                      selectDevData(devMetaData);
                    }}
                  >
                    {devMetaData}
                  </div>
                );
              })}
            </div>
          )}
        </div>
        {selectedDevData && (
          <div className="content flex-1">
            <DvProvider><DevContainer selectedDevData={selectedDevData} /></DvProvider>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
