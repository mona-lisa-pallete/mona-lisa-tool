const path = require("path");
const glob = require("glob");
const fse = require("fs-extra");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { bundlesPath } = require("./config");

/**
 * 路径
 */
const paths = {
  htmlTemplate: path.join(__dirname, "../.runtime/index.html"),
  sourcePath: path.resolve(__dirname, "../src"),
  nodeModulePath: path.resolve(__dirname, "../node_modules")
};

const makeHtmlEntry = filePath => {
  return new HtmlWebpackPlugin({
    template: paths.htmlTemplate,
    chunks: [filePath],
    minify: false,
    filename: `${filePath}/index.html`
  });
};

module.exports = () => {
  const htmlEntriesPlugins = [];
  const entries = glob.sync("./src/**/index.tsx").reduce((acc, _path) => {
    const pathArr = _path.split("/");

    // 准备目录路径
    const dirPath = path.dirname(_path);
    const metaPath = path.resolve(dirPath, "meta.json");

    // 读取 meta
    const metadata = require(metaPath);
    // console.log(metadata);

    // 这里取业务组件的 meta 的 elementRef 或者业务组件的表单的 formRef 作为编译的入口
    const entryKey = metadata.elementRef || metadata.formRef;

    // 将 meta 复制到 bundle 中
    fse.copy(metaPath, path.join(bundlesPath, `${entryKey}.json`));

    // 设置 entryKey 的 key
    acc[entryKey] = path.join(process.cwd(), _path);

    // 生成多个 html 入口
    htmlEntriesPlugins.push(makeHtmlEntry(entryKey));
    return acc;
  }, {});
  return {
    entry: entries,
    cache: true,
    output: {
      path: bundlesPath,
      publicPath: "/",
      filename: "[name].js",
      library: "[name]",
      libraryTarget: "umd",
      libraryExport: "default"
      // library: "DavinciUI",
    },
    mode: "development",
    // mode: "production",
    // 由于是预览模式，所以不需要优化打包内容
    optimization: {
      minimize: false,
      runtimeChunk: false,
      removeAvailableModules: false,
      removeEmptyChunks: false,
      splitChunks: false
    },
    externals: {
      // react: "React",
      // "react-dom": "ReactDOM",
      antd: "antd",
      yup: "yup",
      "react-dom": "reactVendor.ReactDOM",
      react: "reactVendor.React",
      // lib
      "@deer-ui/core": "HYC_3_PARTY.DeerUI",
      "@hyc/platform-ui": "HYCPC",
      "@hyc/platform-exp": "HYCEXP",
      "@hyc/platform-common-api": "HYCCAPI",
      sortablejs: "HYC_3_PARTY.Sortablejs",
      "@ant-design/pro-table": "HYC_3_PARTY.AntdProTable",
      "@ant-design/pro-form": "HYC_3_PARTY.AntdProForm",
      "formik-antd": "HYC_3_PARTY.FormikAntd",
      formik: "HYC_3_PARTY.Formik",
      // icons
      "@ant-design/icons": "HYCLICONS.AntdIcons",
      "react-icons/ri": "HYCLICONS.ReactIconRI",
      "react-icons/bi": "HYCLICONS.ReactIconBI",
      "react-icons/fi": "HYCLICONS.ReactIconFI",
      "@tarojs/components": "taroVendor.components",
      "@tarojs/taro": "taroVendor.taro",
      "@tarojs/runtime": "taroVendor.runtime"
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          include: [paths.sourcePath],
          use: {
            loader: "ts-loader",
            options: {
              transpileOnly: true,
              onlyCompileBundledFiles: true
            }
          }
        }
      ]
    },
    resolve: {
      modules: [paths.nodeModulePath],
      extensions: [".ts", ".tsx", ".js", ".json", ".jsx", ".css"],
      alias: {
        "@": path.resolve("src")
      }
    },
    // performance: {
    //   hints: "warning",
    //   maxEntrypointSize: 400000,
    //   assetFilter(assetFilename) {
    //     return assetFilename.endsWith(".css") || assetFilename.endsWith(".js");
    //   },
    // },
    // devtool: "cheap-source-map",
    // context: paths.sourcePath,
    target: "web",
    stats: "errors-only",
    node: {
      module: "empty",
      dgram: "empty",
      dns: "mock",
      fs: "empty",
      http2: "empty",
      net: "empty",
      tls: "empty",
      child_process: "empty"
    },
    plugins: [
      // ...htmlEntriesPlugins,
    ]
  };
};
