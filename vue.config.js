//对vue进行配置
module.exports = {
  publicPath:'./',
  outputDir:'dist',
  assetsDir:'static',
  devServer: {
       //overlay：对eslint进行配置
    //    overlay:{
    //        //warnings：关闭出现错误时全屏得蒙层
    //        warnings: false,
    //        //errors： 关闭蒙层上的错误
    //        errors: false,
    //    },
       //proxy是解决跨域的问题，配置代理跨域请求
       //在本地请求是localhost:8080端口，请求别的不一样的网站端口肯定会产生跨域
       proxy: {
          "/api":{
            //target中配置的是我们要请求的接口网络地址，因为这里我们要请求的是聚合数据的网路接口数据，所以配置聚合数据
            //的网路地址即可
              target: "http://v.juhe.cn/",
            //changeOrigin表示我们是否开启跨域，true代表开启跨域
              changeOrigin: true,
            //ws代表我们是否需要开启websockets
              ws: true,
            //secure代表是否开启https的检查，false代表关闭https的检查
              secure: false,
            //pathRewrite代表我们重写网路地址路径
              pathRewrite:{
                //"^/api":"" 代表在本地localhost:8080端口后面加上一个api这样的一个字段，那么你api后面该有什么参数，就是什么参数
                "^/api":""
              }
          }
       }
    },
    //lintOnSave: 关闭eslint检查
    lintOnSave: false
}