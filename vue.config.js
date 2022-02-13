module.exports = {
  css: {
    loaderOptions: {
      // !向预处理器 Loader 传递选项 参考网址 https://cli.vuejs.org/zh/guide/css.html#css-modules
      // !可以让scss文件使用全局中的变量,这样只需要把全局变量单个文件进行修改就好
      // 默认情况下 `sass` 选项会同时对 `sass` 和 `scss` 语法同时生效
      // 因为 `scss` 语法在内部也是由 sass-loader 处理的
      // 但是在配置 `prependData` 选项的时候
      // `scss` 语法会要求语句结尾必须有分号，`sass` 则要求必须没有分号
      // 注意：在 sass-loader v8 中，这个选项名是 "prependData"
      // 在这种情况下，我们可以使用 `scss` 选项，对 `scss` 语法进行单独配置
      scss: {
        prependData: '@import "~@/style/index.scss";'
      }
    }
  }
}
