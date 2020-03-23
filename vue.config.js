const path = require('path')

function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  publicPath: './',
  lintOnSave: process.env.NODE_ENV !== 'production',
  devServer: {
    port: 4000
  },
  configureWebpack: {
    resolve: {
      extensions: ['.js', '.vue', '.json'],
      alias: {
        api: resolve('src/api'),
        assets: resolve('src/assets'),
        util: resolve('src/assets/js/util/index.js'),
        views: resolve('src/views'),
        mixins: resolve('src/mixins'),
        't-amap': resolve('src/t-map/index.js'),
        't-ui': resolve('src/t-ui'),
        components: resolve('src/components')
      }
    },
    externals: {
      AMap: 'AMap'
    }
  }
}
