// pages/cart/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 获取本地地址
    if(!this.data.address.name) {
      this.data.address = {};
    }
    let address =  wx.getStorageSync("address")
    this.setData({
      address 
    })
  },

/**
 * 获取收货地址
 */
  handleGetAddress () {
    wx.chooseAddress({
      success:res => {
        // console.log(res)
        this.setData({
          address:{
            name:res.userName,
            tel:res.telNumber,
            detail:res.cityName+res.countyName+res.detailInfo
          }
        });
        // 保存信息到本地
        wx.setStorageSync("address",this.data.address)
      }
    }) 
  }
})