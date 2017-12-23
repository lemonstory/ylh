// pages/API/pay-sucess/pay-sucess.js
const app = getApp();
const Toast = require('../../../zanui-weapp/dist/toast/index');
var util = require('../../../utils/util.js')

Page(Object.assign({}, Toast, {

  /**
   * 页面的初始数据
   */
  data: {

    constant: app.constant,
    orderSn: ''

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    var that = this;
    if (!util.isEmptyStr(options.orderSn)) {

      that.setData({
        orderSn: options.orderSn
      })

    } else {
      console.error("options.orderSn 不能为空");
    }
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

  /**
   * 查看订单详情
   */
  bindTapOrderDetail: function () {

    wx.redirectTo({
      url: '/pages/order/detail/detail?orderSn=' + that.data.orderSn,
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },

  /**
   * 上传旅客资料
   */
  bindTapFillPossport: function () {
    wx.redirectTo({
      url: '/pages/member/possport-list/possport-list?orderSn=' + that.data.orderSn,
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },

}));