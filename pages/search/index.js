import request from "../../utils/request.js";
// pages/search/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isShow:'',
    recommend:[]
  },
  handleInput(e) {
    console.log(e)
    const {value} = e.detail;
    this.setData({
      isShow:value
    })
    // 如果value有值则发起请求
    if(!value) return;
    // 请求搜索建议
    request({
      url:"/goods/qsearch",
      data:{
        query:value
      }
    }).then(res=>{
      const {message} =res.data;
      this.setData({
        recommend:message
      })
    })
  },
  handleClick() {
    this.setData({
      isShow:''
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})