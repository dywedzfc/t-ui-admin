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
        mixins: resolve('src/mixins'),
        components: resolve('src/components')
      }
    }
  }
}
