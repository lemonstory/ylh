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

    //是否为代理商
    isDistributer: false,
    distributerAccessData: {},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    var that = this;

    //当用户切换至{我的}是app.js里面的get_session还没有返回
    //如果userAccessData为空,则调用get_session
    var userAccessData = util.getUserAccessData();
    if (util.isEmptyObject(userAccessData)) {

      console.warn("userAccessData为空,调用get_session");
      wx.checkSession({
        success: function () {
          //session 未过期，并且在本生命周期一直有效
        },

        fail: function () {
          console.log("🚀 🚀 🚀 -- 微信登录态过期,重新登录");
          //登录态过期
          //重新登录
          wx.login({
            success: function (res) {
              var url = that.data.constant.domain + "/weixin/get_session";
              console.log("url = " + url);
              if (res.code) {
                //发起网络请求
                wx.request({
                  url: url,
                  data: {
                    code: res.code,
                    distributerId: distributerId
                  },

                  header: {
                    'content-type': 'application/json' // 默认值
                  },

                  success: function (res) {

                    guid = res.data.guid;
                    // 本地存储用户信息
                    wx.setStorage({
                      key: that.data.constant.userAccessDataKey,
                      data: res.data,
                      success: function (res) {

                        //重置userAccessData值
                        console.log("[重置] 本地存储 userAccessData ")
                        that.data.constant.userAccessData = {};
                      },
                      fail: function (res) {
                        console.warn(res);
                      }
                    });

                    //代理商信息存储
                    if (!util.isEmptyStr(res.data.distributerId)) {
                      util.setDistributerId(res.data.distributerId);
                    } else {

                      console.error("res.data.distributerId = " + res.data.distributerId);
                    }
                  },

                  fail: function (res) {
                    console.error(res);
                  },
                  complete: function (res) { }
                })
              } else {
                console.log('获取用户登录态失败！' + res.errMsg)
              }
            },

            fail: function (res) {

              console.error(res);
              //代理商信息存储
              util.setDistributerId(distributerId);
            },
            complete: function (res) { }
          });

        },

        complete: function () { }
      });

    }

    var isDistributer = util.isDistributer();
    var distributerAccessData = util.getDistributerAccessData();
    that.setData({
      isDistributer: isDistributer,
      distributerAccessData: distributerAccessData
    })

    //用户为非代理商
    if (!isDistributer) {

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
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

    var that = this;

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

  handleTapSubordinate: function () {
    wx.navigateTo({
      url: '/pages/distributer/subordinate/subordinate'
    })
  },

  handleTapCommission: function () {
    wx.navigateTo({
      url: '/pages/distributer/commission/commission'
    })
  },

  handleTapOrderQuery: function () {
    wx.navigateTo({
      url: '/pages/distributer/order-query/order-query'
    })
  },
  handleTapStoreSetting: function () {
    wx.navigateTo({
      url: '/pages/distributer/store-setting/store-setting'
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

  goMyOrder: function (e) {
    wx.navigateTo({
      url: '/pages/user/order/order'
    })
  },

  /**
   * 代理商-退出登录
   */
  bindDistributerLogout: function (e) {

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
  bindUserOrder: function (e) {

    console.log("aaaa");
    wx.navigateTo({
      url: '/pages/user/order/order',
    })

  }
}))