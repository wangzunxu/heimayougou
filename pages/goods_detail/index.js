import request from "../../utils/request.js"
// pages/goods_detail/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    detail: {},
    // 记录tab栏的当前索引
    current:0
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
      console.log(message)
      this.setData({
        detail: message
      })
    })
  },
  handleTab(e) {
    const {index} =e.currentTarget.dataset;
    this.setData({
      current:index
    })
  }
})