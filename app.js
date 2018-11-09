App({

  /**
   * 当小程序初始化完成时，会触发 onLaunch（全局只触发一次）
   */
  onLaunch: function () {
    this.setBadge();
    wx.login({
      success: res => {
        wx.request({
          url: this.globalData.wx_url_1 + res.code + this.globalData.wx_url_2,
          success: res => {
            this.globalData.openid = res.data.openid;
          }
        })
      }
    });
  },
  globalData: {
    openid: 0,
    wx_url_1: 'https://api.weixin.qq.com/sns/jscode2session?appid=wx7b773f3764fe432d&secret=88e2705211b70aec18f52a51d8fb2451&js_code=',
    wx_url_2: '&grant_type=authorization_code'
  },
  cart: wx.getStorageSync('cart') || [],
  allCheckout: false,
  addToCart(item){
    const isInCart = this.cart.some(cartitem => cartitem.id === item.id);
    if(isInCart) {
      this.cart.map(datainfo =>{
        if (datainfo.id==item.id){
          datainfo.count++;
        }
        return datainfo;
      })
    }else {
      this.cart.push({
        ...item,
        count: 1,
        checked: true
      })
    }
    wx.setStorageSync('cart', this.cart);
    this.setBadge();
  },
  //加
  add(id){
    //console.log(id);
    this.cart.map(item =>{
      if(item.id==id){
        item.count ++;
      }
      wx.setStorageSync('cart', this.cart);
      this.setBadge();
      return item;
    })
  },
  reduce(id){
    this.cart.map(item => {
      if (item.id == id) {
        if(item.count ==1){
          item.count=1;
        }else{
          item.count--;
        }
      }
      wx.setStorageSync('cart', this.cart);
      this.setBadge();
      return item;
    })
  },
  //勾选
  changecheck(id) {
    this.cart.map(item => {
      if (item.id == id) {
        item.checked =! item.checked;
      }
      wx.setStorageSync('cart', this.cart);
      this.setBadge();
      this.total();
      this.all();
      console.log(this.allCheckout)
      return item;
    })
  },
  // 全选
  changeAllCheck() {
    this.allCheckout = !this.allCheckout;
    if (this.allCheckout){
      this.cart.map( item => {
        item.checked=true;
        wx.setStorageSync('cart', this.cart);
        this.totalNum();
        this.total();
        return item;
      });
    }else{
      this.cart.map(item => {
        item.checked = false;
        wx.setStorageSync('cart', this.cart);
        return item;
      })
    }
  },
  //总数量
  totalNum() {
    const number = this.cart.reduce((result, item) => {
      if (item.checked) {
        result += 1
      }
      return result;
    }, 0)
    return number;
  },
  //全选
  all(){
    const num=this.totalNum();
    const len=this.cart.length;
    //console.log(num,len)
    if (num == len){
      this.allCheckout=true;
    }else{
      this.allCheckout = false;
    }
  },
 
  //总计
  total() {
    const aa = this.cart.reduce((result, item) => {
      if (item.checked) {
        result += item.price * item.count
      }
      return result;
    }, 0)
    return aa;
  },
  // 删除
  delete(id) {
    this.cart=this.cart.filter(item => item.id != id);
    wx.setStorageSync('cart', this.cart);
    this.setBadge();
    this.total();
  },
  setBadge() {
    const total = this.cart.reduce((result, item) => {
      result += item.count;
      return result;
    }, 0)
    wx.setTabBarBadge({
      index: 2,
      text: `${total}`
    })
  },
  /**
   * 当小程序启动，或从后台进入前台显示，会触发 onShow
   */
  onShow: function (options) {
    
  },

  /**
   * 当小程序从前台进入后台，会触发 onHide
   */
  onHide: function () {
    
  },

  /**
   * 当小程序发生脚本错误，或者 api 调用失败时，会触发 onError 并带上错误信息
   */
  onError: function (msg) {
    
  }
})
