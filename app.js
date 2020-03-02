//app.js
import request from "./utils/request.js"
App({
  onLaunch: function () {
    // 指定基准路径
    request.defualts.baseURL = "https://api-hmugo-web.itheima.net/api/public/v1"
  }
})