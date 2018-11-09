// pages/cart/cart.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isShow: false,
    cartItem:[],
    totalMoney:0,
    checkoutNum:0,
    allcheck: false,
    changeAllCheck: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //console.log(app.allCheckout)
    const money = app.total();
    const num = app.totalNum();
    this.setData({
      cartItem:app.cart,
      totalMoney: money,
      allcheck: app.allCheckout,
      checkoutNum: num
    });
  },
  add(e){
    const id = e.currentTarget.dataset.id;
    app.add(id);
    const money = app.total();
    this.setData({
      cartItem: app.cart,
      totalMoney: money
    });
  },
  reduce(e){
    const id = e.currentTarget.dataset.id;
    app.reduce(id);
    const money = app.total();
    this.setData({
      cartItem: app.cart,
      totalMoney: money
    });
  },
  changecheck(e){
    const id = e.currentTarget.dataset.id;
    app.changecheck(id);
    const money = app.total();
    const num=app.totalNum();
    this.setData({
      cartItem: app.cart,
      totalMoney: money,
      checkoutNum: num,
      allcheck: app.allCheckout,
    });
  },
  allCheck(){
    app.allCheckbox()
  },
  all(){
    app.changeAllCheck();
    const money = app.total();
    const num = app.totalNum();
    this.setData({
      cartItem: app.cart,
      totalMoney: money,
      allcheck: app.allCheckout,
      checkoutNum: num
    });
  },
  // 删除
  delete(e) {
    wx:wx.showModal({
      title: '',
      content: '确认删除商品',
      showCancel: true,
      cancelText: '取消',
      cancelColor: '',
      confirmText: '确认',
      confirmColor: '',
      success: (res)=> {
        if (res.confirm) {
          const id = e.currentTarget.dataset.id;
          app.delete(id);
          const money = app.total();
          this.setData({
            cartItem: app.cart,
            totalMoney: money
          });
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      },
      fail: function(res) {},
      complete: function(res) {},
    })
   
  },
  tomall(){
    wx.switchTab({
      url: '/pages/mall/mall'
    })
  },
  addToBuy(){
    console.log("xxx");
    const logininfo = wx.getStorageSync('userinfo');
    if (logininfo){
      wx.navigateTo({
        url: '/pages/buy/buy',
      })
    }else{
      wx.showModal({
        title: '您还没有登录！',
        content: '点击确认登录',
        confirmColor: "red",
        success: function (res) {
          if (res.confirm) {
            wx.navigateTo({
              url: '/pages/login/login',
            })
          }
        }
      })
    }
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
    this.setData({
      cartItem: app.cart
    });
    app.setBadge();
    const money = app.total();
    const num = app.totalNum();
    this.setData({
      cartItem: app.cart,
      totalMoney: money,
      allcheck: app.allCheckout,
      checkoutNum: num,
    });
    this.all();
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