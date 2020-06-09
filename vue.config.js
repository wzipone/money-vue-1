const path = require('path')
// import path from 'path'

module.exports = {
  lintOnSave: false,
  chainWebpack: config => {
    // 首先确定 icon 所在的目录(__dirname就是当前目录，在这里就是根目录)
    const dir = path.resolve(__dirname, 'src/assets/icons')
    // config 是vue把webpack的config封装了暴露给我们的对象

    // config.module.rules.delete("svg") //重点:删除默认配置中处理svg,
    //const svgRule = config.module.rule('svg')
    //svgRule.uses.clear()

    config.module
      .rule('svg-sprite-loader') // rule名
      .test(/\.svg$/) // 写到这里相当于整个目录的svg都要使用这个规则，下面需要限定目录
      .include
      .add(dir) // 处理svg目录
      .end()
      .use('svg-sprite-loader') // 需要使用哪些loader
      .loader('svg-sprite-loader')
      .options({ // 不需要导出文件
        extract: false
      })
      .end()
      .use('svgo-loader')
      .loader('svgo-loader')
      .tap(
        options => ({...options,plugins:[{removeAttrs:{attrs:'fill'}}]})
      )
      .end()

    // 配置插件
    config.plugin('svg-sprite')
      .use(require('svg-sprite-loader/plugin'), [{plainSprite: true}])

    // 其他的svg loader 排除icons 目录
    config.module.rule('svg').exclude.add(dir)

  },
  configureWebpack: () => ({
    // resolve: {
    //   alias: require('./alias.config').webpack
    // }
    // module: {
    //   rules: [{
    //     test: /\.svg$/,
    //     use: [{
    //       loader: "svg-sprite-loader",
    //       options: {
    //         symbolId: 'icon-[name]'
    //       }
    //     }]
    //   }]
    // }
  })
}
