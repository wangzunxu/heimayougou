// pages/category/index.js
import request from "../../utils/request.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    current:0,
    menuList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    request({
      url:"/categories"
    }).then(res=>{
      console.log(res)
      this.setData({
        menuList:res.data.message
      })
    })
  },
  handleClick(e) {
    const {index} = e.currentTarget.dataset;
    this.setData({
      current : index
    })
  }
})