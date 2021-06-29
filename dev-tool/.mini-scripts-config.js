const MonacoWebpackPlugin = require("monaco-editor-webpack-plugin");
const path = require("path");
const genAppInfo = require("./scripts/genAppInfo");

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
    // context: __dirname,
    externals: {
      react: "reactVendor.React",
      "react-dom": "reactVendor.ReactDOM",
      antd: "antd",
      axios: "axios",
      "@tarojs/components": "taroVendor.components",
      "@tarojs/taro": "taroVendor.taro",
      "@tarojs/runtime": "taroVendor.runtime",
      "@gr-davinci/core": "davinciCore",
    },
    module: {
      // rules: [{
      //   test: /\.less$/,
      //   use: [{
      //       loader: "style-loader", // 把css添加到dom
      //     },
      //     {
      //       loader: "css-loader", // 加载css
      //     },
      //     {
      //       loader: "postcss-loader",
      //       options: {
      //         plugins: [
      //           require("postcss-pxtorem")({
      //             rootValue: 46.875,
      //             propList: ["*"],
      //             exclude: /form/i,
      //             selectorBlackList: [
      //               "dv-action-item",
      //               /.dv-form/,
      //               /.ant-form/,
      //             ],
      //           }),
      //         ],
      //       },
      //     },
      //     // {
      //     //   loader: "less-loader", // 加载less   less 转 css
      //     //   options: {
      //     //     include: path.join(__dirname, './src'),
      //     //   }
      //     // },
      //   ],
      // }, ],
    },
    plugins: [
      new MonacoWebpackPlugin({
        // available options are documented at https://github.com/Microsoft/monaco-editor-webpack-plugin#options
        languages: ["json", "javascript", "typescript"],
      }),
    ],
  },
  preRun: () => {
    genAppInfo();
  },
};