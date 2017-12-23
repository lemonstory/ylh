// pages/API/pay- confirm/pay- confirm.js
const app = getApp();
const Toast = require('../../../zanui-weapp/dist/toast/index');
var util = require('../../../utils/util.js')

Page(Object.assign({}, Toast, {

  /**
   * 页面的初始数据
   */
  data: {

    'constant': app.constant,
    actionSheetHidden: true,

    //上一个页面的数据
    prevPageData: {},

    //收银台提交的数据
    prepayPostData: {
      "prepayBody": {
        "mchId": 0,
        "orderNo": "",
        "orderFee": "",
        "feeType": "",
        "productId": "",
        "body": "",
        "spbillCreateIp": "",
        "expireTime": '',
        "notifyUrl": "",
        "userId": "",
        "sign": ""
      },
      "tradeType": app.constant.paymentTradeType,
      "sysSource": app.constant.paymentSysSource,
      "openId": ''
    },
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    var that = this;
    var pages = getCurrentPages();
    var currPage = pages[pages.length - 1];   //当前页面
    var prevPage = pages[pages.length - 2];  //上一个页面

    var prevPageDataTemp = prevPage.data;
    that.setData({
      prevPageData: prevPageDataTemp,
      'prepayPostData.openId': util.getWxOpenId()
    })

    console.log("🚀 🚀 🚀")
    console.log(that.data.prepayPostData);

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

  },

  actionSheetTap: function (e) {
    this.setData({
      actionSheetHidden: !this.data.actionSheetHidden
    })
  },
  actionSheetChange: function (e) {
    this.setData({
      actionSheetHidden: !this.data.actionSheetHidden
    })
  },
  bindItemTap: function (e) {
    console.log('tap ' + e.currentTarget.dataset.name)
  },

  /**
  * 
  * 下一步
  */
  handleTapPayment: function () {

    console.log("💥 💥 💥 handleTapPayment")
    var that = this;
    wx.showLoading({
      title: '加载中',
    })

    //用户创建线路订单接口
    var url = that.data.constant.domain + '/distrbuter/member/order/';
    var formDataTemp = that.data.prevPageData.formData;
    
    wx.request({
      url: url,
      data: formDataTemp,
      method: 'POST',
      header: util.getRequestHeader(),

      success: function (res) {

        console.log("🍺 🍺 🍺 [成功] 用户创建线路订单接口")
        console.log(res);
        that.setData({
          'prepayPostData.prepayBody': res.data.payParameter,
        })

        //调用收银台接口
        console.log("调用收银台接口");
        console.log(that.data)

        var url = that.data.constant.payDomain + '/prepay';
        wx.request({
          url: url,
          data: that.data.prepayPostData,
          method: 'POST',
          header: util.getRequestHeader(),

          success: function (res) {

            console.log("🍺 🍺 🍺 [成功] 调用收银台接口")
            console.log(res);

            //调用微信支付
            if (!util.isEmptyObject(res.data.getwayBody)) {
              wx.requestPayment({
                'timeStamp': res.data.getwayBody.timeStamp,
                'nonceStr': res.data.getwayBody.nonceStr,
                'package': res.data.getwayBody.package,
                'signType': res.data.getwayBody.signType,
                'paySign': res.data.getwayBody.paySign,
                'success': function (res) {

                  console.log("🍺 🍺 🍺 [成功] 调用微信支付")
                  wx.hideLoading();
                  var url = '/pages/order/pay-sucess/pay-sucess';
                  wx.navigateTo({
                    url: url,
                  })
                },

                'fail': function (res) {

                  console.error(res);
                  var res = JSON.stringify(res);
                  that.showZanToast(res);
                }
              })

            } else {
              that.showZanToast("getwayBody 为空");
              console.error("收银台接口返回数据错误：getwayBody 为空");
            }
          },

          fail: function (res) {

            console.error(res);
            //测试
            var res = JSON.stringify(res);
            that.showZanToast(res);
          },

          complete: function (res) {}
        })
      },

      fail: function (res) {

        console.error(res);
        //测试
        var res = JSON.stringify(res);
        that.showZanToast(res);
      },

      complete: function (res) { }
    });
  }
}));