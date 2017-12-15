// pages/API/add-person-message/add-person-message.js
const app = getApp();
const Toast = require('../../../zanui-weapp/dist/toast/index');
Page(Object.assign({}, Toast, {

  data: {
    'constant': app.constant,
    'name': '',
    'title': 0,
    'mobile': '',
    'cardType': 0,
    'cardNumber': '',
    'ageGroup': 0,
    'gender': 0,

    'newId':0
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


  handleSaveTap: function (event) {

    console.log("🚀 🚀 🚀")
    console.log("handleSaveTap Run");
    var that = this;
    var url = that.data.constant.domain + '/distrbuter/member/passenger';
    wx.request({
      url: url,
      data: {
        //数据urlencode方式编码，变量间用&连接，再post
        'name': that.data.name,
        'title': that.data.title,
        'mobile': that.data.mobile,
        'cardType': that.data.cardType,
        'cardNumber': that.data.cardNumber,
        'ageGroup': that.data.ageGroup,
        'gender': that.data.gender,
      },
      method: 'POST',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {

        console.log("### success ###");
        var id = res.data.id
        that.setData({
          'newId':id
        })
      },

      fail: function (res) {

        console.log("### fail ###");
        //测试
        var res = JSON.stringify(res);
        that.showZanToast(res);
      },

      complete: function (res) {

        console.log("### complete ###");
        console.log(res);
        wx.navigateBack();
      }
    });
  },
}));