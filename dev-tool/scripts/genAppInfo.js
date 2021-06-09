const fs = require("fs");
const path = require("path");
const prettier = require("prettier");
const day = require("dayjs");

/**
 * 获取应用的信息
 */
const genAppInfo = ({
  packagePath = path.join(__dirname, "../package.json"),
  fileSavePath = path.join(__dirname, '../public', '__app_info__.json')
} = {}) => {
  // 获取应用版本
  const appVersion = require(packagePath)
    .version;
  const buildTime = day().format('YYYY-MM-DD HH:mm:ss');
  const appInfo = {
    _offline: false,
    appVersion: appVersion,
    buildTime,
    version: `${appVersion}+${buildTime}`
  }
  fs.writeFileSync(
    fileSavePath,
    prettier.format(JSON.stringify(appInfo), {
      parser: "json",
    })
  );
  return appInfo;
};

module.exports = genAppInfo;