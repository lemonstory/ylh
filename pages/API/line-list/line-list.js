// pages/API/common/common.js
const app = getApp();
const Toast = require('../../../zanui-weapp/dist/toast/index');
var util = require('../../../utils/util.js')

Page(Object.assign({}, Toast, {
  data: {
    constant: app.constant,

    //调用接口需要的参数
    areaId: 0,
    category: 1,
    pageIndex: 1,
    pageSize: app.constant.pageSize,
    attrId: 0,


    //是否还有更多数据
    'isNoMore': false,
    //是否正在加载中
    'isLoading': false
  },


  onLoad: function (options) {

    var that = this;
    var areaIdTemp = that.data.areaId;
    var categoryTemp = that.data.category;
    var pageIndexTemp = that.data.pageIndex;
    var attrIdTemp = that.data.attrId;

    if (typeof (options.areaId) != "undefined") {
      areaIdTemp = options.areaId;
    }

    if (typeof (options.category) != "undefined") {
      categoryTemp = options.category;
    }

    if (typeof (options.pageIndex) != "undefined") {
      pageIndexTemp = options.pageIndex;
    }

    if (typeof (options.attrId) != "undefined") {
      areaIdTemp = options.attrId;
    }

    that.setData({

      areaId: areaIdTemp,
      category: categoryTemp,
      pageIndex: pageIndexTemp,
      attrId: attrIdTemp,
    });

    that.getData(that.data.areaId, that.data.category, that.data.attrId, that.data.pageIndex, that.data.pageSize);
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

    var that = this;
    that.setData({
      pageIndex: 1
    })
    that.getData(that.data.areaId, that.data.category, that.data.attrId, that.data.pageIndex, that.data.pageSize);
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
        that.getData(that.data.areaId, that.data.category, that.data.attrId, that.data.pageIndex, that.data.pageSize);
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

  onReady: function () {

  },

  //获取接口
  getData: function (areaId, category, attrId, pageIndex, pageSize) {

    var that = this;
    var path = `${that.data.constant.domain}/distrbuter/line/list/${areaId}/${category}/${attrId}/${pageIndex}/${pageSize}`
    console.log(path);
    if (!that.data.isNoMore) {
      wx.request({
        url: path,
        data: {},
        header: {
          'content-type': 'application/json', // 默认值
        },
        success: function (res) {
          if (res.statusCode == 200) {
            wx.hideLoading();
            var lineListlen = res.data.lineList.length;
            console.log(lineListlen);
            if (lineListlen > 0) {
              // 加入数据
              var lineListTemp = res.data.lineList;
              console.log(lineListTemp);
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
          } else {
            console.log(res);
            var message = JSON.stringify(res.data)
            that.showZanToast(message);
          }
        },
        fail:function(res) {},
        complete:function(res) {}
      })
    }
  },

  /** 获取数据成功回调*/
  setDataCallBack: function () {

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
    var bannerId = event.currentTarget.dataset.id;
    var bannerUrl = "" + bannerId;
    wx.navigateTo({
      url: bannerUrl
    })
  },
}));