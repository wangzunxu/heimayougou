import request from "../../utils/request.js"
Page({
data: {
  // 轮播图数据
  banners:[],
  menus:[],
  floors:[]
},
onLoad() {
  // 请求轮播图接口
request({
  url:"/home/swiperdata"
}).then(res=>{
  // console.log(res)
  this.setData({
    banners:res.data.message
  })
}),
// 请求中间导航接口
request({
  url:"/home/catitems"
}).then(res=>{
  // 分类按钮有跳转功能，其他没有
  const {message} = res.data 
const newData = message.map((v,i)=>{
  if(i===0) {
    v.url = "/pages/category/index"
  }
  return v;
})
this.setData({
  menus:newData
})
})
// 请求楼层数据
request({
  url:"/home/floordata"
}).then(res=>{
  // console.log(res)
  const {message} = res.data
  this.setData({
    floors:message
  })
})
}
})
