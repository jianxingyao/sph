const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave:false,
  devServer: {
    proxy: {
      '/api': {
        target: 'http://gmall-h5-api.atguigu.cn',
        // ws: true,
        // changeOrigin: true,
        // pathRewrite:{'^/api':''}
      },
      // 精简版
      // '/foo': {
      //   target: '<other_url>'
      // }
    }
  }
})
