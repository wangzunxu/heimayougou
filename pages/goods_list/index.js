import request from "../../utils/request.js";
// pages/goods_list/index.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    keyword: '',
    list: [],
    hasMore: true,
    loading:true
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
    // 如果没有更多就不用再请求了
    if(this.data.hasMore==false){
      return;
    }
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
        const list = message.goods.map(v => {
          v.goods_price = Number(v.goods_price).toFixed(2);
          return v;
        })
        this.setData({
          list: [...this.data.list, ...list],
          // 上一次请求的页面加载完毕时关闭加载状态
          loading:false
        })
        // 判断是否是最后一页
        if (this.data.list.length >= message.total) {
          this.setData({
            hasMore:false
          })
        }
      })
    }, 2000)
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
    if(this.data.loading==false) {
      this.setData({
        // 每次请求之前初始化loading
        loading:true,
        pagenum: this.data.pagenum + 1
      })
      this.getGoods();
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})