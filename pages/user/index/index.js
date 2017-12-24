// pages/API/my/my.js
const app = getApp();
const Toast = require('../../../zanui-weapp/dist/toast/index');
var util = require('../../../utils/util.js')


Page(Object.assign({}, Toast, {

  data: {
    constant: app.constant,
    buttonDisabled: false,
    modalHidden: true,
    show: false,
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    var that = this;

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

    var that = this;

    //用户为非代理商
    if (!util.isDistributer()) {

      //用户没有代理商id
      if (!util.isOwnDistributerId()) {
        wx: wx.redirectTo({
          url: '/pages/user/visitor/visitor',
          success: function (res) { },
          fail: function (res) { },
          complete: function (res) { },
        })
      } else {

        //用户有代理商Id但未注册
        console.log(that.data);
        if (!util.isOwnAccessToken()) {
          wx: wx.redirectTo({
            url: '/pages/user/wx-mobile/wx-mobile',
            success: function (res) { },
            fail: function (res) { },
            complete: function (res) { },
          })
        }
      }
    }
    console.log(that.data);
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

    //TODO:测试使用
    return util.defaultShareData();
  },

  toast: function () {
    this.setData({
      modalHidden: !this.data.modalHidden
    })
  },

  modalBindaconfirm: function () {
    wx.navigateTo({
      url: '/pages/distributer/subordinate/subordinate'
    })
  },


  onChangeShowState: function () {
    var that = this;
    that.setData({
      showView: (!that.data.showView)
    })
  },

  cancel: function () {
    var that = this;
    that.setData({
      showView: false
    })
  },

  callPhone: function () {
    wx.makePhoneCall({
      phoneNumber: '400-189-0876',
    })
    var that = this;
    that.setData({
      showView: false
    })
  },

  goMyOrder:function(e){
    wx.navigateTo({
      url: '/pages/user/order/order'
    })
  },

  /**
   * 代理商-退出登录
   */
  bindDistributerLogout:function(e) {

    var that = this;
    try {
      wx.removeStorageSync(that.data.constant.distributerAccessDataKey)
      wx.redirectTo({
        url: '/pages/distributer/login/login',
      })
    } catch (e) {
      // Do something when catch error
      console.error(e);
    }
  },

  /**
   * 我的订单
   */
  bindUserOrder:function(e) {

    console.log("aaaa");
    wx.navigateTo({
      url: '/pages/user/order/order',
    })

  }
}))