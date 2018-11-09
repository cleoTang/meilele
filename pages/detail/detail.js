// pages/detail/detail.js
import ajax from '../../utils/request.js';

const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
      proInfo:{}
  },
  addtocart(e){
    const item = e.currentTarget.dataset.item;
    console.log(e.currentTarget.dataset.item);
    app.addToCart(item);
    wx.showToast({
      title: '成功加入购物车',
      icon: '',
      image: '',
      duration: 2000,
      mask: true,
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  addTo(){
    wx.switchTab({
      url: '/pages/cart/cart'
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   // console.log(options)
    this.setData({
      proInfo: options
    })
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