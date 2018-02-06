// pages/API/order-detail/order-detail.js
const app = getApp();
const Toast = require('../../../zanui-weapp/dist/toast/index');
var areaUtil = require('../../../utils/china-area.js')
var util = require('../../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {

    constant: app.constant,
    selectPay: 0,
    selectDuds: 0,
    selectAir: 0,
    // 选中的航班
    selectPlaneTicket: {},

    orderSn: 0,
    orderDetail: {},
    // 出发的周数
    departWeek: '',
    // 到达的周数
    endWeek: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    var that = this;
    var orderSn = options.orderSn;
    console.log(orderSn);
    if (typeof (orderSn) != "undefined") {
      that.setData({
        orderSn: orderSn
      })
    }
    if (that.data.orderSn > 0) {
      that.getOrderDetail();
    }

    // var re = areaUtil.getItemAreas(194);
    // console.log(re);
    // var areas = areaUtil.getChildAreas();
    // console.log(areas);
    // var name = areaUtil.getAreaName(137);
    // console.log(name);
  },

  onChangeShowState: function () {
    var that = this;
    that.setData({
      showView: (!that.data.showView)
    })
  },


  cancel: function () {
    var that = this;
    that.setData({
      showView: false
    })
  },


  callPhone: function () {
    wx.makePhoneCall({
      phoneNumber: '400-189-0876',
    })
    var that = this;
    that.setData({
      showView: false
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

  /**
   * 获取订单详情
   */
  getOrderDetail: function () {
    var that = this;
    var url = that.data.constant.domain + "/distrbuter/member/order/detail/" + that.data.orderSn;
    wx.request({
      url: url,
      data: {},
      header: util.getRequestHeader(),
      success: function (res) {
        var order = res.data;
        that.setData({
          orderDetail: order
        });
        console.log(that.data.orderDetail);
        // 计算出发周，到达周
        var start = that.getWeek(res.data.travelDate);
        var end = that.getWeek(res.data.endDate);
        that.setData({
          departWeek: start,
          endWeek: end
        })

      },
      fail: function (res) {
        console.log("出错了!");
      },
      complete: function (res) {
        console.log(res);
      }
    })
  },

  bindPaychange: function () {
    var that = this;
    that.setData({
      selectPay: !that.data.selectPay
    });
  },
  bindPaycancel: function () {
    var that = this;
    that.setData({
      selectPay: 0,
    });
  },



  bindDudschange: function (e) {
    var that = this;

    // 
    that.setData({
      selectDuds: !that.data.selectDuds
    });
  },

  bindDudscancel: function () {
    var that = this;
    that.setData({
      selectDuds: 0,
    });
  },


  // 未做完
  bindAirMessage: function (e) {
    var that = this;
    var index = e.currentTarget.dataset.index;
    if (index == 0) {
      that.setData({
        selectAir: !that.data.selectAir,
      });
    }

  },
  bindAircancel: function () {
    var that = this;
    that.setData({
      selectAir: 0,
    });
  },


  /**
   * 获得星期数
   */
  getWeek: function (strtime) {
    var week = '';
    var date = new Date(strtime.replace('-', '/'));
    console.log(date);
    // var time  = Date.parse(date);
    // console.log(time);
    var myday = date.getDay()//注:0-6对应为星期日到星期六 
    switch (myday) {
      case 0: week = "周日"; break;
      case 1: week = "周一"; break;
      case 2: week = "周二"; break;
      case 3: week = "周三"; break;
      case 4: week = "周四"; break;
      case 5: week = "周五"; break;
      case 6: week = "周六"; break;
    }
    return week
  }


})


