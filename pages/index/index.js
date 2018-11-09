// pages/index/index.js
import ajax from '../../utils/request.js';
const  sliderWidth = 129;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrls: [
      'http://image.meilele.com/images/201811/1541009055488190848.jpg',
      ' //image.meilele.com/images/201807/1532903012106398754.jpg',
      ' //image.meilele.com/images/201807/1531355842159166807.jpg'
    ],
    indicatorDots: false,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    tabs: ["客厅", "卧室", "餐厅", "书房"],
    activeIndex: 1,
    sliderOffset: 0,
    sliderLeft: 0,
    locationCity: '',
    navImages: [
      {
        id: 1,
        url: '//image.meilele.com/images/201810/1540418590759694634.png',
        title: '体验馆'
      }, {
        id: 2,
        url: ' //image.meilele.com/images/201810/1540418603681693201.png',
        title: '排行榜'
      }, {
        id: 3,
        url: ' //image.meilele.com/images/201810/1540418617292849946.png',
        title: '每日特卖'
      }, {
        id: 4,
        url: ' //image.meilele.com/images/201810/1540418629210816735.png',
        title: '阅木'
      }, {
        id: 5,
        url: ' //image.meilele.com/images/201810/1540947801083737717.png',
        title: '实木家具'
      }, {
        id: 6,
        url: ' //image.meilele.com/images/201810/1540947815995979851.png',
        title: '沙发'
      }, {
        id: 7,
        url: ' //image.meilele.com/images/201810/1540947827655854013.png',
        title: '床'
      }, {
        id: 8,
        url: ' //image.meilele.com/images/201810/1540947840030466116.png',
        title: '床垫'
      }
    ],
    sliderImg: [
      {
        id: 1,
        imgUrl: '//image.meilele.com/images/201809/1536912115719113885.jpg'
      }, {
        id: 2,
        imgUrl: '//image.meilele.com/images/201810/1539196861502778750.jpg'
      }, {
        id: 3,
        imgUrl: '//image.meilele.com/images/201809/1536912115666865777.jpg'
      }, {
        id: 4,
        imgUrl: '//image.meilele.com/images/201809/1536912115366088106.jpg'
      }, {
        id: 5,
        imgUrl: '//image.meilele.com/images/201809/1536912115514487712.jpg'
      }, {
        id: 6,
        imgUrl: '//image.meilele.com/images/201809/1536912115663043405.jpg'
      }, {
        id: 7,
        imgUrl: '//image.meilele.com/images/201810/1539759666784518458.jpg'
      },
    ],
    likeProduct: [],

    maxtime: "",
    countDownDay: 0,
    countDownHour: 0,
    countDownMinute: 0,
    countDownSecond: 0,

  },
  toSearch(){
    wx.navigateTo({
      url: '/pages/search/search',
    })
  },
  toDetail(e) {
    // console.log(e.currentTarget)
    const data = e.currentTarget.dataset.item;
    wx.navigateTo({
      url: `/pages/detail/detail?id=${data.id}&count=${data.last_month_sold_count}&title=${data.new_goods_name}&price=${data.show_price}&img=${data.goods_thumb}`,
    })
  },
  loadMore(){
    console.log("xx");
  },
  onGetLocation() {
    wx.getLocation({
      success: (res) => {
        wx.request({
          url: `https://apis.map.qq.com/ws/geocoder/v1/?location=${res.latitude},${res.longitude}&key=6YHBZ-5YCCX-4UE4T-75NMR-TU76V-2NBKN&get_poi=1`,
          success: (resp) => {
            this.setData({
              locationCity: resp.data.result.address_component.city
            })
          },
          fail: function (res) { },
          complete: function (res) { },
        })
      },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  tomallclick(){
   wx:wx.switchTab({
     url: '/pages/mall/mall',
     success: function(res) {},
     fail: function(res) {},
     complete: function(res) {},
   })
  },
  onready(){
    var totalSecond = Date.parse(new Date()) / 1000+10000 - Date.parse(new Date()) / 1000;

    var interval = setInterval(function () {
      // 秒数
      var second = totalSecond;

      // 天数位
      var day = Math.floor(second / 3600 / 24);
      var dayStr = day.toString();
      if (dayStr.length == 1) dayStr = '0' + dayStr;

      // 小时位
      var hr = Math.floor((second - day * 3600 * 24) / 3600);
      var hrStr = hr.toString();
      if (hrStr.length == 1) hrStr = '0' + hrStr;

      // 分钟位
      var min = Math.floor((second - day * 3600 * 24 - hr * 3600) / 60);
      var minStr = min.toString();
      if (minStr.length == 1) minStr = '0' + minStr;
      // 秒位
      var sec = second - day * 3600 * 24 - hr * 3600 - min * 60;
      var secStr = sec.toString();
      if (secStr.length == 1) secStr = '0' + secStr;
      this.setData({
        countDownDay: dayStr,
        countDownHour: hrStr,
        countDownMinute: minStr,
        countDownSecond: secStr,
      });
      totalSecond--;
      if (totalSecond < 0) {
        clearInterval(interval);
        wx.showToast({
          title: '活动已结束',
        });
        this.setData({
          countDownDay: '00',
          countDownHour: '00',
          countDownMinute: '00',
          countDownSecond: '00',
        });
      }
    }.bind(this), 1000);
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.onready();
    this.onGetLocation();
    ajax.get('https://m.meilele.com/dubbo_api/mll/articleAd/getLikeProducts?userTags=f1304*g0404*k6803*s0601*c0101*m0501*f1701*s0203*c0203*m0303*k0603*f1403&pagSize=10&cid=ukzjo40xmi5_1405332')
    .then(resp => {
      this.setData({
        likeProduct: resp.data.result
      })
    })
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          sliderLeft: (res.windowWidth / that.data.tabs.length - sliderWidth) / 2,
          sliderOffset: res.windowWidth / that.data.tabs.length * that.data.activeIndex
        });
      }
    });
  },
  tabClick: function (e) {
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id
    });
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
    this.onready();
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