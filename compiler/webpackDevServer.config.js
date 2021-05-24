const { runtimePath, bundlesPath } = require("./config");

const paths = {
  appPublic: runtimePath,
  publicUrlOrPath: runtimePath,
};

const host = process.env.HOST || "0.0.0.0";

module.exports = () => {
  return {
    compress: true,
    clientLogLevel: "trace",
    contentBase: [runtimePath, bundlesPath],
    writeToDisk: true,
    // contentBasePublicPath: paths.publicUrlOrPath,
    // watchContentBase: false,
    // transportMode: 'ws',
    // injectClient: false,
    // sockHost,
    // sockPath,
    // sockPort,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
      "Access-Control-Allow-Headers":
        "X-Requested-With, content-type, Authorization",
    },
    // publicPath: paths.publicUrlOrPath.slice(0, -1),
    quiet: true,
    // watchOptions: {
    //   ignored: ignoredFiles(paths.appSrc),
    // },
    host,
    // overlay: false,
    // historyApiFallback: false,
    // hot: false,
    // historyApiFallback: {
    //   disableDotRule: true,
    //   // index: paths.publicUrlOrPath,
    // },
    // after(app) {
    //   // console.log('after');
    // }
    // public: allowedHost,
    // proxy,
  };
};
