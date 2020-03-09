// pages/cart/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address:{},
    goods: [],
    allPrice:0
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
    this.handleAllPrice();
  },
  handleCalc(e) {
    const {index,number} = e.currentTarget.dataset;
    console.log(number)
    this.data.goods[index].number+=number;

    // 如果数量为零，则删除该商品
    if(this.data.goods[index].number===0) {
      //弹出
      wx.showModal({
        title: '提示',
        content: '是否删除该商品',
        success:(res)=> {
          if (res.confirm) {
            // console.log(this.data.goods)
            this.data.goods.splice(index,1)
            // 删除就刷新
            this.setData({
              goods: this.data.goods
            })
          }
        }
      })
    }
    // 调用setData刷新页面
    // 用户点击 + 或者 - 号就按顺序执行了，而wx:showModal中的success
    // 是在点击确认后才执行的，所以先执行的下面后执行上面的success
    this.setData({
      goods:this.data.goods
    })
  },
  handleAllPrice() {
    let price = 0;
    this.data.goods.forEach(v=>{
      price += v.goods_price*v.number;
    })
    this.setData({
      allPrice:price
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