import request from "../../utils/request.js";
// pages/search/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputValue:'',
    recommend:[],
    loading:false,
    // 上次输入的值
    lastValue:'',
    // 历史记录
    history:[]
  },
  handleInput(e) {
    console.log(e)
    const {value} = e.detail;
    this.setData({
      inputValue:value
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
        lastValue:this.data.inputValue
      })
    request({
      url: "/goods/qsearch",
      data: {
        query: this.data.inputValue
      }
    }).then(res => {
      const { message } = res.data;
      this.setData({
        recommend: message,
        loading:false
      })
      // 判断最新值和当前值是否相等
      if(this.data.inputValue !== this.data.lastValue) {
        this.getRecommend();
      }
    })
    }
  },
  handleClick() {
    this.setData({
      inputValue:''
    })
  },
  handleEnter() {
    // 每次搜索前，先把本地数据拿出来
    let arr = wx.getStorageSync("history");
    // 如果本地没有这和个数组或arr不是个数组，让arr等于[]
    if(!Array.isArray(arr)) {
      arr=[]
    }
    arr.unshift(this.data.inputValue);
    // 数组去重 删除除第一个值以外的重复值
    arr = [...new Set(arr)]
    wx.setStorageSync('history', arr);
    // wx.naigatorTo保留当前页面并跳转到下一个页面
    // wx.redirectTo关闭当前页面并跳转到下一个页面 反回的时候不经过搜索页
    // wx.relaunchTo关闭所有页面并跳转到下一个页面
    wx.redirectTo({
      url: '/pages/goods_list/index?keyword='+this.data.inputValue
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let arr = wx.getStorageSync("history");
    if(!Array.isArray(arr)) {
      arr = []
    }
    this.setData({
      history:arr
    })
  },
  handleBlur() {
    this.setData({
      inputValue:''
    })
  },
  handleClear() {
    // 清空data
    this.setData({
      history:[]
    })
    // 清空本地数据
    wx.setStorageSync("history", [])
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