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

    //目的地名称
    title: '',

    //是否还有更多数据
    'isNoMore': false,
    //是否正在加载中
    'isLoading': false,
    //是否重新加载
    'isReload': false
  },

  onLoad: function (options) {

    var that = this;
    var areaIdTemp = that.data.areaId;
    var categoryTemp = that.data.category;
    var pageIndexTemp = that.data.pageIndex;
    var attrIdTemp = that.data.attrId;
    var titleTemp = that.data.title;
    

    if (!util.isEmptyStr(options.areaId)) {
      areaIdTemp = options.areaId;
    }

    if (!util.isEmptyStr(options.category)) {
      categoryTemp = options.category;
    }

    if (!util.isEmptyStr(options.pageIndex)) {
      pageIndexTemp = options.pageIndex;
    }

    if (!util.isEmptyStr(options.attrId)) {
      attrIdTemp = options.attrId;
    }

    if (!util.isEmptyStr(options.name)) {
      titleTemp = options.name;
      wx.setNavigationBarTitle({
        title: titleTemp,
      });
    }

    

    that.setData({

      areaId: areaIdTemp,
      category: categoryTemp,
      pageIndex: pageIndexTemp,
      attrId: attrIdTemp,
      title: titleTemp
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
      isReload: true
    })
    var nextPageIndex = 1;
    that.getData(that.data.areaId, that.data.category, that.data.attrId, nextPageIndex, that.data.pageSize);
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

    var that = this;
    if (!that.data.isNoMore) {
      this.setData({
        'isLoading': true,
});

      var nextPageIndex = that.data.pageIndex + 1;

      setTimeout(() => {
        that.getData(that.data.areaId, that.data.category, that.data.attrId, nextPageIndex, that.data.pageSize);
      }, 500);

    } else {

      that.setData({
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
  getData: function (areaId, category, attrId, pageIndex, pageSize) {

    // console.log("🚀 🚀 🚀")
    var that = this;
    var path = `${that.data.constant.domain}/distrbuter/line/list/${areaId}/${category}/${attrId}/${pageIndex}/${pageSize}`
    console.log(path);
    if (!that.data.isNoMore) {

      // wx.showLoading({
      //   title: '加载中',
      // })

      wx.request({
        url: path,
        data: {},
        header: util.getRequestHeader(),
        success: function (res) {

          if (res.statusCode == 200) {

            wx.hideLoading();
            var lineListLen = res.data.lineList.length;

            if (lineListLen > 0) {

              // 加入数据
              var lineListTemp = [];

              if (!that.data.isReload) {
                if (typeof (that.data.lineList) != "undefined" && that.data.lineList.length > 0) {
                  lineListTemp = that.data.lineList;
                }
              }
              Array.prototype.push.apply(lineListTemp, res.data.lineList);

              that.setData({
                title: res.data.title,
                pageIndex: res.data.pageIndex,
                pageCount: res.data.totalPage,
                lineList: lineListTemp,
              })

              that.setDataCallBack();

              if (pageIndex >= res.data.totalPage) {

                that.setData({
                  'isNoMore': true,
                })
              }
            } else {

              that.setData({
                'isNoMore': true,
              });

            }
          } else {

            var message = JSON.stringify(res.data)
            that.showZanToast(message);
          }
        },

        fail: function (res) { },
        complete: function (res) {

          if (that.data.isLoading) {
            wx.stopPullDownRefresh()
          }

          that.setData({
            'isLoading': false,
          });
        }
      })
    }
  },

  /** 获取数据成功回调*/
  setDataCallBack: function () {

    var that = this;
    var title = that.data.title;
    wx.setNavigationBarTitle({
      title: title,
    });
  },

  //处理点击推荐线路事件
  handleTapLineDetail: function (event) {
    var id = event.currentTarget.dataset.id;
    var path = "/pages/line/line-detail/line-detail?id=" + id;
    wx.navigateTo({
      url: path
    })
  },
}));