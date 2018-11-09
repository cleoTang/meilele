// pages/mine/mine.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userimg:"",
    username:"12",
    ishowModule: false
  },
  bindGetUserInfo(e) {
   
  },
  toLoginBtn(){
    wx:wx.navigateTo({
      url: '/pages/login/login',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  toLoginBtn12(){
    this.setData({
      ishowModule: true
    })
  },
  cancelBtn(){
    this.setData({
      ishowModule: false
    })
  },
  logoutBtn(){
    wx.removeStorageSync('userinfo');
    this.setData({
      userimg: "",
      username: "",
      ishowModule: false
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const info=wx.getStorageSync('userinfo');
    if (info){
      this.setData({
        userimg: info.avatarUrl,
        username: info.nickName,
      })
    }
    // console.log(this.data.userimg)
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
    const info = wx.getStorageSync('userinfo');
    if (info) {
      this.setData({
        userimg: info.avatarUrl,
        username: info.nickName,
      })
    }
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