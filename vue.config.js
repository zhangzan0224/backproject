module.exports = {
  pages: {
    index: {
      // 入口
      entry: 'src/main.js'
    }
  },
  devServer: {
    proxy: {
      '/': {
        target: process.env.VUE_APP_BASE_URL, // 源路径 代表访问的/index的时候实际上为访问的是http://v.juhe.cn/toutiao/index
        ws: true, // 用于支持websocket
        changeOrigin: true // 用于控制请求头中的host值
      }
    }
  }
}
