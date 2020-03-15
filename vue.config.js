module.exports = {
  configureWebpack:{ 
    resolve:{
      //配置别名
      alias:{
        //'@':'src' --已是被默认配置过的
        'assets':'@/assets',
        'common':'@/common',
        'components':'@/components',
        'network':'@/network'
      }
    }
  }
}