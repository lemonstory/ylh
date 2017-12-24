// pages/address/address.js
const app = getApp();
const Toast = require('../../../zanui-weapp/dist/toast/index');
var util = require('../../../utils/util.js')

Page(Object.assign({}, Toast, {

  data: {

    constant: app.constant,
    inputContent: {},
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    pageIndex: 1,
    pageCount: 1,
    Pagesize: 20,
    //是否还有更多数据
    'isNoMore': false,
    //是否正在加载中
    'isLoading': false,
  },


  onLoad: function (options) {

    //用户为非代理商 且 用户没有代理商id
    // if (!util.isDistributer() && !util.isOwnDistributerId()) {

    //   wx: wx.redirectTo({
    //     url: '/pages/user/visitor/visitor',
    //     success: function (res) { },
    //     fail: function (res) { },
    //     complete: function (res) { },
    //   })
    // } else {

      this.getData();
    // }
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
  * 停止下拉刷新动画
  */
  stopPullDownRefresh: function () {
    wx.stopPullDownRefresh({
      complete: function (res) {
      }
    });
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if (!this.data.isNoMore) {
      this.setData({
        'isLoading': true,
        'pageIndex': this.data.pageIndex + 1,
      });
      setTimeout(() => {
        this.getDataMore(this.data.pageIndex, this.data.Pagesize);
      }, 500);
    } else {
      this.setData({
        'isLoading': false,
      });
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },


  //获取接口
  getData: function () {
    var that = this;
    wx.request({
      url: that.data.constant.domain + '/distrbuter/line/index',
      data: {},
      header: util.getRequestHeader(),
      success: function (res) {
        console.log(res.data);
        that.setData(res.data);
      }
    })
  },

  //处理banner图点击事件
  handleBanner: function (event) {

    var that = this;
    var path = ''
    var src = event.currentTarget.dataset.src;
    that.navigateToUrl(src);
  },

  /**
   * 跳转url
   */
  navigateToUrl: function (url) {

    var path
    if (!util.isEmptyStr(url)) {

      if (util.isHttpUrl(url)) {
        path = "/pages/web-view/web-view?src=" + url;
      } else {
        path = url;
      }

      wx.navigateTo({
        url: path
      })

    } else {

      console.warn("url为空")
      //测试
      that.showZanToast("url为空");
    }

  },

  handleAd: function (event) {

    var that = this;
    var path = ''
    var src = event.currentTarget.dataset.src;
    that.navigateToUrl(src);
  },

  handleTapAreaListItem: function (event) {

    var that = this;
    var path = ''
    var src = event.currentTarget.dataset.src;
    that.navigateToUrl(src);

  },

  bindAddressDetail: function (event) {
    var id = event.currentTarget.dataset.id;
    console.log(id);
    var path = "/pages/line/line-detail/line-detail?id=" + id;
    wx.navigateTo({
      url: path
    })
  },

  bindMoreaddress: function () {
    var path = "/pages/line/category/category"
    wx.navigateTo({
      url: path
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

  bindBlur: function (e) {
    inputContent[e.currentTarget.id] = e.detail.value
  },

  getDataMore: function (pageIndex, Pagesize) {
    var that = this;
    var url = that.data.constant.domain + '/distrbuter/line/recommendlist/' + pageIndex + "/" + Pagesize;
    console.log(url);
    if (!that.data.isNoMore) {
      wx.request({
        url: url,
        data: {},
        header: util.getRequestHeader(),
        success: function (res) {
          wx.hideLoading();
          var lineListlen = res.data.lineList.length;
          if (lineListlen > 0) {
            // 加入数据
            var lineListTemp = that.data.lineList;
            Array.prototype.push.apply(lineListTemp, res.data.lineList);
            var pageCount;
            that.setData({
              pageIndex: res.data.pageIndex,
              pageCount: res.data.totalPage,
              lineList: lineListTemp,
            })
            if (pageIndex == pageCount) {
              that.setData({
                'isNoMore': true,
                'isLoading': false
              })
            }
          }
          else {
            that.setData({
              'isNoMore': true,
              'isLoading': false,
            });
          }
        }
      })
    }
  },

  bindSearch: function () {
    var path = "/pages/search/search/search"
    wx.navigateTo({
      url: path
    })
  },
  /**
  * 获取数据成功回调
  */
  setDataCallBack: function () {

  },

}));