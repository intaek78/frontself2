module.exports ={
  devServer: {
    proxy: {
      '/': {
          "target": 'https://couponfollow.com/',
          "changeOrigin": true,
          "secure": false,
          "pathRewrite": { '^/': '' },
          "logLevel": 'debug'
      }
    }
  }
}