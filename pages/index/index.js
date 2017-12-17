//index.js
//获取应用实例
const app = getApp();
Page({
  data: {
    'constant': app.constant,
    inputContent: {},
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
  },
  onReady: function () {
    this.getData();
  },
  onLoad() {

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

  // bindBlur: function (e) {
  //      inputContent[e.currentTarget.id] = e.detail.value
  // },
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
    var path = "/pages/API/address-detail/address-detail?id=" + id;
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


  //      wx.getLocation({
  //       type: 'wgs84',
  //      success: (res) => {
  //           var latitude = res.latitude // 经度
  //           var longitude = res.longitude // 纬度
  //      }
  // })


  //处理用户搜索事件
  bindSearch: function () {
    var path = "/pages/API/search/search";
    wx.navigateTo({
      url: path
    })

  }
})
