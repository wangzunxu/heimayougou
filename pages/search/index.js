import request from "../../utils/request.js";
// pages/search/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isShow:'',
    recommend:[],
    loading:false,
    // 上次输入的值
    lastValue:''
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
    this.getRecommend();
   
  },
  //请求搜索建议
  getRecommend() {
    // 必须保证发请求之前没有别的请求（loading为false），发请求的时候将状态改为true，请求成功以后状态改为flase，
    // 并设置在有请求发出的时候，不允许再发出请求
    if(this.data.loading==false) {
      this.setData({
        loading:true,
        // 记录当前输入框的值
        lastValue:this.data.isShow
      })
    request({
      url: "/goods/qsearch",
      data: {
        query: this.data.isShow
      }
    }).then(res => {
      const { message } = res.data;
      this.setData({
        recommend: message,
        loading:false
      })
      // 判断最新值和当前值是否相等
      if(this.data.isShow !== this.data.lastValue) {
        this.getRecommend();
      }
    })
    }
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