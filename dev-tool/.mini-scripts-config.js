const MonacoWebpackPlugin = require("monaco-editor-webpack-plugin");
const genAppInfo = require('./scripts/genAppInfo')

module.exports = {
  paths: {
    srcDir: "src",
    appIndexJs: "main",
    appBuildDir: "dist",
    appHtml: "public/index.html",
    deployHtml: "public/deploy.html",
  },
  // 先构建配置端应用所需要的 externals 模块
  // 声明配置端的 externals 的依赖，依赖上面的 buildExternalsPipeline 配置
  webpackConfig: {
    output: {
      publicPath: "./",
    },
    externals: {
      react: "reactVendor.React",
      "react-dom": "reactVendor.ReactDOM",
      "@davinci/core": "davinciCore",
      antd: "antd",
      axios: "axios",
      "@tarojs/components": "taroVendor.components",
      "@tarojs/taro": "taroVendor.taro",
      "@tarojs/runtime": "taroVendor.runtime",
    },

    plugins: [
      new MonacoWebpackPlugin({
        // available options are documented at https://github.com/Microsoft/monaco-editor-webpack-plugin#options
        languages: ["json", "javascript", "typescript"],
      }),
    ],
  },
  preRun: () => {
    genAppInfo()
  }
};