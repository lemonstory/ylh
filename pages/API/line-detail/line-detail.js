// pages/API/addressdetail/addressdetail.js
const app = getApp();
const Toast = require('../../../zanui-weapp/dist/toast/index');
var util = require('../../../utils/util.js')

Page(Object.assign({}, Toast, {

  data: {
    constant: app.constant,

    //轮播图
    inputContent: {},
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,

    //电话弹窗
    isShowPhoneDialog: false,

    //优惠弹窗
    isShowActivityDetail: false,

    //出发日期
    startDatePriceListFormat: [],

    //已选择的出发日期
    selectedTravelDate: '',

    //评论分页
    id: '',
    pageIndex: 1,
    pageSize: app.constant.pageSize,
    isShowCommendList: '',
    commendList: [],

    //是否还有更多数据
    'isNoMore': false,
    //是否正在加载中
    'isLoading': false,
  },

  onLoad: function (options) {

    console.log(options);
    //接收页面参数
    var id = options.id;
    this.getLineDetailData(id);
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

    var that = this;
    if (that.data.isShowCommendList) {

      if (!that.data.isNoMore) {
        this.setData({
          'isLoading': true,
        });

        var nextPageIndex = that.data.pageIndex + 1;
        setTimeout(() => {
          that.getCommendListData(that.data.id, that.data.pageIndex, that.data.pageSize)
        }, 500);

      } else {
        that.setData({
          'isLoading': false,
        });
      }
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  /**
   * 咨询-点击
   */
  handleTapPhone: function () {

    var that = this;
    that.setData({
      isShowPhoneDialog: true,
    });

    console.log(that.data.isShowPhoneDialog);
  },

  /**
   * 咨询-取消
   */
  handleTapCancelPhoneDialog: function () {

    var that = this;
    that.setData({
      isShowPhoneDialog: false,
    });
  },

  /**
   * 咨询-确认
   */
  handleTapConfirmPhoneDialog: function () {

    var that = this;
    that.setData({
      isShowPhoneDialog: false,
    });

    wx.makePhoneCall({
      phoneNumber: '400-189-0876',
    })
  },

  /**
   * 优惠-点击
   */
  handleTapActivity: function () {

    var that = this;
    that.setData({
      isShowActivityDetail: !that.data.isShowActivityDetail
    });
  },

  /**
   * 优惠弹窗-关闭
   */
  handleTapActivityDetailCancel: function () {
    var that = this;
    that.setData({
      isShowActivityDetail: false,
      show: "0"
    });
  },

  /**
   * 领队-点击
   */
  handleTapLeaderIntroduce: function (event) {

    var id = event.currentTarget.dataset.id;
    var path = "/pages/API/leader-introduce/leader-introduce?id=" + id;
    console.log("path = " + path);
    wx.navigateTo({
      url: path
    })
  },

  /**
   * 评论更多-点击
   */
  handleTapCommendMore: function (event) {

    console.log(event);
    var that = this;
    var id = event.currentTarget.dataset.id;
    that.getCommendListData(that.data.id, that.data.pageIndex, that.data.pageSize)
    that.setData({
      isShowCommendList: true
    })
  },

  //获取线路详情数据
  getLineDetailData: function (id) {
    var that = this;
    var url = that.data.constant.domain + '/distrbuter/line/detail/' + id;
    console.log("url = " + url);
    wx.request({
      url: url,
      data: {},
      header: {
        'content-type': 'application/json', // 默认值
      },
      success: function (res) {
        if (res.statusCode == 200) {

          console.log(res.data);
          that.setData(res.data);
          that.setDataCallBack();

        } else {

          var message = JSON.stringify(res.data)
          that.showZanToast(message);
        }
      }
    })
  },

  //获取评论数据
  getCommendListData: function (id, pageIndex, pageSize) {

    var that = this;
    var url = `${that.data.constant.domain}/distrbuter/line/commend/list/${id}/${pageIndex}/${pageSize}`
    console.log("url = " + url);
    wx.request({
      url: url,
      data: {},
      header: {
        'content-type': 'application/json', // 默认值
      },
      success: function (res) {
        if (res.statusCode == 200) {

          if (res.data.list.length > 0) {

            var commendListTemp = [];
            if (typeof (that.data.commendList) != "undefined" && that.data.commendList.length > 0) {
              commendListTemp = that.data.commendList;
            }
            Array.prototype.push.apply(commendListTemp, res.data.list);
            that.setData({
              pageIndex: res.data.pageIndex,
              totalPage: res.data.totalPage,
              commendList: commendListTemp,
            })
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
  },



  /**
   * 处理出发日期下面的数据
   */
  setDataCallBack: function () {

    var that = this;
    var startDatePriceListTemp = [];
    if (that.data.priceList.length > 0) {
      for (var i = 0; i < that.data.priceList.length; i++)

        if (that.data.priceList[i].list.length > 0) {
          for (var j = 0; j < that.data.priceList[i].list.length; j++) {

            var DatePriceListItemTemp = {};
            DatePriceListItemTemp = that.data.priceList[i].list[j];
            DatePriceListItemTemp.monthIndex = i;
            startDatePriceListTemp.push(that.data.priceList[i].list[j])
          }
        }
    }

    var startDatePriceListFormatTemp = [];
    if (startDatePriceListTemp.length > 0) {

      for (var i = 0; i < startDatePriceListTemp.length; i++) {
        var item = startDatePriceListTemp[i];
        var itemDateArr = item.date.split("-");
        var itemDateFormatStr = itemDateArr[1] + "月" + itemDateArr[2] + "日";
        var itemDateFormat = {};

        itemDateFormat.date = item.date;
        itemDateFormat.dateStr = itemDateFormatStr;
        itemDateFormat.min = item.min;
        itemDateFormat.monthIndex = item.monthIndex;
        startDatePriceListFormatTemp.push(itemDateFormat);
      }
    }

    var commendListTemp = [];
    commendListTemp.push(that.data.comment);
    that.setData({
      startDatePriceListFormat: startDatePriceListFormatTemp,
      commendList: commendListTemp
    })

    console.log("🚀 🚀 🚀 ")
    console.log(that.data.startDatePriceListFormat);

  },

  /**
   * 出发日期-点击
   */
  handleTapChooseDate: function (e) {

    //选中的出行日期
    var currentSelectedTravelDate = e.currentTarget.dataset.date;
    //选中的出行日期所在的月份索引值
    var currentSelectedMonthIndex = e.currentTarget.dataset.month_index;
    var path = "/pages/API/start-order/start-order?currentSelectedTravelDate=" + currentSelectedTravelDate + "&currentSelectedMonthIndex=" + currentSelectedMonthIndex;
    console.log(path);

    var that = this;
    var dataIdx = e.currentTarget.dataset.data_idx;

    //设置当前样式
    if (this.data.currentItem != dataIdx) {

      var showMode = e.currentTarget.dataset.dataIdx == 0;
      this.setData({
        currentItem: dataIdx,
        selectedTravelDate: e.currentTarget.dataset.date
      })
    }

    wx.navigateTo({
      url: path
    })

  },

}));

