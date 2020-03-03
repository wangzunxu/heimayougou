// pages/category/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    current:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  handleClick(e) {
    const {index} = e.currentTarget.dataset;
    this.setData({
      current : index
    })
  }
})