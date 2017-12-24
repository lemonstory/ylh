
// pages/member/passport.js
const app = getApp();
const Toast = require('../../../zanui-weapp/dist/toast/index');
var util = require('../../../utils/util.js')
Page(Object.assign({}, Toast, {

  data: {

    constant: app.constant,
    orderDetail: {},

    orderSn: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    var that = this;
    if (!util.isEmptyStr(options.orderSn)) {

      that.setData({
        orderSn: options.orderSn
      });
    } else {

      console.error("orderSn 不能为空")

    }
    that.getOrderDetail();
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

        //计算进度
        that.calculateprogress();

      },
      fail: function (res) {
        console.log("出错了!");
      },
      complete: function (res) { }
    })
  },

  //计算进度
  //只有0% 和 100% 两种情况
  calculateprogress: function () {

    var that = this;
    var orderDetail = that.data.orderDetail;
    var orderDetailTourersListTemp = orderDetail.tourers.list;
    for (var i = 0; i < orderDetailTourersListTemp.length; i++) {

      var id = orderDetail.tourers.list[i].id;
      var isUploadPossport = false;

      for (var j = 0; j < orderDetail.tourers.possportList.length; j++) {

        if (id == orderDetail.tourers.possportList[j].linkManId) {
          isUploadPossport = true;
          break;
        }
      }
      orderDetailTourersListTemp[i]['isUploadPossport'] = isUploadPossport;
    }

    that.setData({
      'orderDetail.tourers.list': orderDetailTourersListTemp
    })

    console.log(that.data.orderDetail.tourers.list)
  },


  /**
   * 上传资料-点击
   */
  handleTapUploadPossport: function(e) {

    var that = this;
    var linkManId = e.currentTarget.dataset.link_man_id;
    var tourersListIndex = e.currentTarget.dataset.tourers_list_index;
    var possportItem;
    
    //测试
    // linkManId = 2;

    for (var i = 0; i < that.data.orderDetail.tourers.possportList.length; i++) {
      if (linkManId == that.data.orderDetail.tourers.possportList[i].linkManId) {
        possportItem = that.data.orderDetail.tourers.possportList[i];
        break;
      }
    }

    var url = '/pages/member/fill-possport/fill-possport?linkManId=' + linkManId;
    if (!util.isEmptyObject(possportItem)) {
      url = url + '&possportItem=' + JSON.stringify(possportItem);
    }

    wx.navigateTo({
      url: url,
    })
  }

}));