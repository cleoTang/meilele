// pages/search/search.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hotSearch: ["沙发", "简约沙发", "欧式风", "木质", "田园风格", "木椅", "牛皮沙发", "不规则吊灯"],
    timeSearch: wx.getStorageSync('timeSearch') || [],
    value:'',
    inputdata:'',
  },
  clearList(){
    this.setData({
      timeSearch: []
    });
    wx.removeStorageSync('timeSearch');
    wx:wx.showToast({
      title: '历史记录已清空',
      icon: '',
      image: '',
      duration: 1000,
      mask: true,
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  searchBtn(){
    const info = this.data.inputdata;
    wx: wx.switchTab({
      url: '/pages/mall/mall',
      success:  (res) => { 
        const dataItem = this.data.timeSearch;
        const item = dataItem.filter(item => item !== info);
        item.push(info);
        this.setData({
          timeSearch: item,
          value: ''
        })
        wx.setStorageSync('timeSearch', this.data.timeSearch);
      },
      fail: function (res) { },
      complete: function (res) { },
    })
    // const dataItem=this.data.timeSearch;
    // const item=dataItem.filter(item => item !== info);
    // item.push(info);
    // this.setData({
    //   timeSearch: item,
    //   value: ''
    // })
    // wx.setStorageSync('timeSearch', this.data.timeSearch);
  },
  bindKeyInput(e){
    const info=e.detail.value;
    this.setData({
      inputdata:info
    })
  },
  tomallBtn(){
    wx:wx.switchTab({
      url: '/pages/mall/mall',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
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
    this.setData({
      timeSearch: wx.getStorageSync('timeSearch'),
    })
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