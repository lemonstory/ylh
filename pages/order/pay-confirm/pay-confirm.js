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
      prevPageData: prevPageDataTemp
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

    var that = this;
    wx.showLoading({
      title: '加载中',
    })

    //用户创建线路订单接口
    var url = that.data.constant.domain + '/distrbuter/member/order/';
    wx.request({
      url: url,
      data: that.data.prevPageData.formData,
      method: 'POST',
      header: util.postRequestHeader(),

      success: function (res) {

        wx.showToast({
          title: '成功',
          icon: 'success',
          duration: 2000
        })

        console.log("🍺 🍺 🍺")
        console.log(res);
      },

      fail: function (res) {
        //测试
        var res = JSON.stringify(res);
        that.showZanToast(res);
      },

      complete: function (res) {

        wx.hideLoading();
        var url = '/pages/order/pay-sucess/pay-sucess';
        wx.navigateTo({
          url: url,
          success: function (res) { },
          fail: function (res) {
            console.log(res);
            that.showZanToast("页面跳转错误");
          },
          complete: function (res) { },
        })
      }
    });
  }
}));