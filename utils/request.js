export default {
  get: (url) => {
    wx.showLoading({
      title: '加载中…',
    })
    return new Promise((resolve, reject) => {
      wx.request({
        url,
        method: 'GET',
        dataType: 'json',
        responseType: 'text',
        success: function(res){
          resolve(res);
        },
        fail: function(res){
          reject(res);
        },
        complete: function(res) {
          wx.hideLoading();
        },
      })
    })
  }
}