import request from "../../utils/request.js";
// pages/goods_list/index.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    keyword: '',
    list: [],
    hasMore: true
  },

  /**
   * 生命周期函数--监听页面加载
   * options是url 的参数对象，只有onLoad才可以拿到
   */
  onLoad: function(options) {
    const {
      keyword
    } = options;
    this.setData({
      keyword
    })
    this.getGoods();
  },
  // 封装请求数据的方法
  getGoods() {
    setTimeout(v => {
      // 请求商品列表
      request({
        url: "/goods/search",
        data: {
          query: this.data.keyword,
          pagenum: this.data.pagenum,
          pagesize: 10
        }

      }).then(res => {
        const {
          message
        } = res.data;
        //修改goods_price的精确位数
        message.goods.map(v => {
          v.goods_price = Number(v.goods_price).toFixed(2);
          return v;
        })
        this.setData({
          list: [...this.data.list,...message.goods]
        })
      })
    }, 1000)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    this.setData({
      pagenum:this.data.pagenum+1
    })
    this.getGoods();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})