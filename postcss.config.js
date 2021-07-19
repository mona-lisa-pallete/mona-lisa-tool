module.exports = {
  plugins: {
    'postcss-import': {},
    'autoprefixer': {
      // browsers: 'last 10 versions'
    },
    // 'postcss-pxtorem': {
    //   rootValue: 46.875,
    //   propList: ["*"],
    //   // unitPrecision: 5,
    //   // propWhiteList: [],
    //   selectorBlackList: [
    //     "dv-action-item",
    //     /.dv-form/,
    //     /.ant-form/,
    //   ],
    // },
    'cssnano': {},
    // 'postcss-sprites': {}
  }
}