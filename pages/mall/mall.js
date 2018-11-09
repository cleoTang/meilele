// pages/mall/mall.js
import ajax from '../../utils/request.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isShow: true,
    likeProduct: [],
    page: 1,
    count: 10
  },
  // loadMore() {
  //   console.log("xx");
  // },
  toDetail(e) {
   // console.log(e.currentTarget)
    const data = e.currentTarget.dataset.item;
    wx.navigateTo({
      url: `/pages/detail/detail?id=${data.id}&count=${data.last_month_sold_count}&title=${data.new_goods_name}&price=${data.show_price}&img=${data.goods_thumb}`,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    ajax.get(`https://m.meilele.com/dubbo_api/mll/articleAd/getLikeProducts?userTags=f1304*g0404*k6803*s0601*c0101*m0501*f1701*s0203*c0203*m0303*k0603*f1403&pagSize=30&cid=ukzjo40xmi5_1405332&`)
      .then(resp => {
        this.setData({
          likeProduct: this.data.likeProduct.concat(resp.data.result)
        })
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