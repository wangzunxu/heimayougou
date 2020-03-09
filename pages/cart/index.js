// pages/cart/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address:{},
    goods: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 获取本地地址
    let address =  wx.getStorageSync("address")
    this.setData({
      address: address || {} 
    })
  },
  onShow(){
    //onLoad和data只会执行一次
    this.setData({
      goods:wx.getStorageSync("goods") || []
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