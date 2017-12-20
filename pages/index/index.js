//index.js
//获取应用实例
const app = getApp();
const Toast = require('../../zanui-weapp/dist/toast/index');
var util = require('../../utils/util.js')

//测试


Page(Object.assign({}, Toast, {
  data: {
    constant: app.constant,
    inputContent: {},
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
  },

  onReady: function () {

  },

  onLoad: function (options) {

    this.getData();
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


  //获取接口
  getData: function () {

    var that = this;
    var url = that.data.constant.domain + '/distrbuter/index';
    console.log("url = " + url);

    wx.request({
      url: url,
      data: {},
      header: {
        'content-type': 'application/json', // 默认值
      },
      success: function (res) {
        console.log("### success ###");
        console.log(res.data);
        that.setData(res.data);
      },
      fail: function (res) {
        console.log("### fail ###");
        console.log(res);
      },
      complete: function (res) {
        console.log("### complete ###");
        console.log(res);
      },
    })
  },

  changeIndicatorDots: function (e) {
    this.setData({
      indicatorDots: !this.data.indicatorDots
    })
  },
  changeAutoplay: function (e) {
    this.setData({
      autoplay: !this.data.autoplay
    })
  },

  //处理点击推荐线路事件
  bindAddressDetail: function (event) {
    var id = event.currentTarget.dataset.id;
    console.log("🌲 🌲 🌲");
    console.log(event);
    console.log(event.currentTarget.dataset);
    var path = "/pages/API/line-detail/line-detail?id=" + id;
    wx.navigateTo({
      url: path
    })
  },
  intervalChange: function (e) {
    this.setData({
      interval: e.detail.value
    })
  },
  durationChange: function (e) {
    this.setData({
      duration: e.detail.value
    })
  },

  // 处理banner图点击事件
  handleBanner: function (event) {
    var src = event.currentTarget.dataset.src;
    console.log(src)
    var path = "/pages/web-view/web-view?src=" + src;
    wx.navigateTo({
      url: path
    })
  },

  //处理用户搜索事件
  bindSearch: function () {
    var path = "/pages/API/search/search";
    wx.navigateTo({
      url: path
    })

  },

  //处理热门签证点击
  handleTapVisaItem: function (event) {

    var that = this;
    that.showZanToast("数据未提供");
  },

  //处理人签证-更多
  handleTapVisaListMore: function (event) {

    var that = this;
    that.showZanToast("数据未提供");
  },

}));
