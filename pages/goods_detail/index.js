import request from "../../utils/request.js"
// pages/goods_detail/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    detail: {},
    // 记录tab栏的当前索引
    current:0,
    // 需要做图片预览的数组
    picUrls:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    request({
      url: "/goods/detail",
      data: {
        goods_id: options.id
      }
    }).then(res => {
      const {
        message
      } = res.data;
      // console.log(message)
      // 获取图片链接，给预览图片接口使用
      const picUrls = message.pics.map(v=>{
        return v.pics_big;
      })
      this.setData({
        detail: message,
        picUrls
      })
    })
  },
  handleTab() {
    const {index} =e.currentTarget.dataset;
    this.setData({
      current:index
    })
  },
  // 预览图片
  handlePreview(e) {
    const {currenturl} =e.currentTarget.dataset;
    wx.previewImage({
      current: currenturl, // 当前显示图片的http链接
      urls: this.data.picUrls // 需要预览的图片http链接列表
    })
  }
})