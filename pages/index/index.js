import request from "../../utils/request.js"
Page({
data: {
  // 轮播图数据
  banners:[
  ]
},
onLoad() {
  // 请求轮播图接口
request({
  url:"/home/swiperdata"
}).then(res=>{
  console.log(res)
  this.setData({
    banners:res.data.message
  })
})
}
})
