import request from "../../utils/request.js"
// pages/goods_detail/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    detail: {},
    // 记录tab栏的当前索引
    current: 0,
    // 需要做图片预览的数组
    picUrls: []
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
      // console.log(message)
      // 获取图片链接，给预览图片接口使用
      const picUrls = message.pics.map(v => {
        return v.pics_big;
      })
      this.setData({
        detail: message,
        picUrls
      })
    })
  },
  handleTab(e) {
    const {
      index
    } = e.currentTarget.dataset;
    this.setData({
      current: index
    })
  },
  // 预览图片
  handlePreview(e) {
    const {
      currenturl
    } = e.currentTarget.dataset;
    wx.previewImage({
      current: currenturl, // 当前显示图片的http链接
      urls: this.data.picUrls // 需要预览的图片http链接列表
    })
  },
  //购物车页面是tabBar页面
  handleToCart() {
    wx.switchTab({
      url: '/pages/cart/index',
    })
  },
  //把商品存入本地
  handleAddCart() {
    // 每次加入商品前先判断本地有没有数据，没有则判断为空
    var goods = wx.getStorageSync('goods') || [];
    // 添加当前商品到购物车之前，先判断该商品已经存在。若存在则数量加1，不存在则添加
    // some循环数组，return返回的结果只要有一个是true就是true，否则是false
    const exist = goods.some(v=>{
      // 通过id判断当前商品是否已存在
      if (v.goods_id === this.data.detail.goods_id) {
        v.number += 1;
        wx.showToast({
          title: '该商品已存在，数量加1',
          icon: 'success',
          duration: 2000
        })
        
      }
      return v.goods_id === this.data.detail.goods_id;
    })
      if(!exist) {
        goods.unshift({
          goods_id: this.data.detail.goods_id,
          goods_name: this.data.detail.goods_name,
          goods_price: this.data.detail.goods_price,
          goods_small_logo: this.data.detail.goods_small_logo,
          number: 1
        })
      }
    // 把当前的商品保存到本地的数组中
    

    // 保存到本地
    wx.setStorageSync("goods", goods)
  }
})