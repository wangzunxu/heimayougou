/**
 * 封装一个异步请求工具库
 * 基于wx.requset实现部分axios的功能
 * axios返回一个promise
 * axios基准路径 axios.defualts.baseURL
 * axios.onError = () =>{}
 */
// 主函数
// 参数 | 类型 | 默认值
// config | obj | {}
 const request = (config = {})=>{
  //  改造传入的url
  // 如果传入的url不以http开头则加上基准路径，如果以http开头，则不进行改造
  if(config.url.search(/^http/)=== -1 ) {
    config.url = request.defualts.baseURL + config.url
  }
  //  resolve是.then里的函数，请求成功时执行
  //  reject是.catch里的函数，请求失败时执行
   return new Promise((resolve,reject)=>{
     wx.request({
       ...config,
       //成功请求执行函数
       success(res) {
         resolve(res)
       },
       //失败请求执行函数
       fail(res) {
         reject(res)
       },
       //成功或失败执行函数
       complete(res) {
         request.errors(res)
       }
     })
   })
 }
 /**
  * 基准路径
  * 给request添加一个属性
  */
request.defualts = {
    baseURL:"http://157.122.54.189:9095"
  }
  /**
   * 给request添加一个方法
   */
  request.errors = () =>{}
  request.onError = (callback) =>{
    // 判断callback是一个函数，然后放进errors
    if(typeof callback === "function") {
      request.errors = callback
    }
  }
//  暴露
export default request