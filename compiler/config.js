const path = require('path');


module.exports = {
  // assertsPath: path.join(process.cwd(), 'dist'),
  runtimePath: path.join(process.cwd(), '.runtime'),
  bundlesPath: path.join(process.cwd(), '.bundles'),
  previewPath: path.join(process.cwd(), '.preview'),
  devServerPort: 20110,
}
