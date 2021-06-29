const chalk = require("chalk");
const chokidar = require("chokidar");
const path = require("path");
const fse = require("fs-extra");
const webpack = require("webpack");
const express = require("express");
const prettier = require("prettier");
const cors = require("cors");
// const WebpackDevServer = require("webpack-dev-server");

// const handler = require("serve-handler");
// const http = require("http");

const {
  devServerPort
} = require("./config");
const webpackConfig = require("./webpack.config");
const createDevServerConfig = require("./webpackDevServer.config");

const {
  PORT = devServerPort, HOST = "0.0.0.0"
} = process.env;
const srcFolder = path.join(__dirname, "../packages");
const watchSourceDir = srcFolder;

const makeWorkingDir = () => {
  // fse.mkdirp(path.join(__dirname, '../dist'))
  fse.mkdirp(srcFolder);
  // fse.writeFile(path.join(srcFolder, "./index.ts"), '// 用于防止 src 文件夹为空时，启动服务错误');
};

makeWorkingDir();

const startDevServer = () => {
  const compiler = webpack(webpackConfig());

  compiler.watch({}, (err, stats) => {
    if (stats.hasErrors()) {
      const compileStats = stats.toJson()
      console.log(compileStats.errors);
      fse.writeFileSync(path.join(__dirname, '.compile.log'),
        prettier.format(JSON.stringify(compileStats.errors), {
          parser: "json",
        }), {
          encoding: 'utf-8'
        })
    }
    // Stats Object
    // ...
  });

  const app = express();

  app.use(cors());

  app.use(express.static(".bundles"));

  const server = app.listen(PORT, () => {
    console.log(`Running at http://localhost:${PORT}`);
  });

  return () => {
    server.close();
  };
};

let close = startDevServer();

/**
 * 监听文件变化的服务，为了新应用添加时可以动态重启 devServer
 * 1. 忽略初始化的监听广播
 * 2. 忽略所有 tsx 文件的添加
 */
chokidar
  .watch(watchSourceDir, {
    ignoreInitial: true,
    // 忽略 tsx 文件的添加
    ignored: "*.tsx",
  })
  .on("add", (path) => {
    console.log(`检测到新添加应用，重启 devServer`);
    close();
    close = startDevServer();

    // 清除所有监听的事件，否则将内存泄漏
    process.removeAllListeners();
  });