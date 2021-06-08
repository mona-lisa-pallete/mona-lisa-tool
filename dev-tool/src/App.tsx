import React, { useState, useEffect } from "react";
import "./App.css";
import { DevContainer } from "./DevContainer";
import { getJSON } from "./utils";

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
  const devData = useDevData();
  const [selectedDevData, selectDevData] = useState<any>(null);
  return (
    <div className="App w-full">
      <header className="p-4">
        <div className="text-xl">Da-Vinci 业务组件开发工具</div>
      </header>
      <div className="flex main-container">
        <div className="left-nav">
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
          <div className="content flex-1" key={selectedDevData}>
            <DevContainer selectedDevData={selectedDevData} />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
