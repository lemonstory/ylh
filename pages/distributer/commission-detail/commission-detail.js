// pages/API/divide-order-detail/divide-order-detail.js

const app = getApp();
const Toast = require('../../../zanui-weapp/dist/toast/index');
var util = require('../../../utils/util.js')
var chinaArea = require('../../../utils/china-area.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {

    'constant': app.constant,

    // 请求post数据
    postData: {
      "distributerId": 1,
      "isTransferSuccess": 0,
      "orderType": 0,
      "settlementYear": 0,
      "settlementMonth": 0
    },

    orderOptions: [
      {
        "type": 0,
        "name": "全部"
      },
      {
        "type": 1,
        "name": "线路"
      },
      {
        "type": 8,
        "name": "签证"
      }],

    orderFilterTitle: "订单类型",
    currentOrderOptionIndex: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
  // 获得代理商id

    // 获得目标年，月
    var itemYear = options.year;
    var itemMonth = options.month;
    console.log(itemYear);
    console.log(itemMonth);
    if (typeof (itemYear) != 'undefined' && typeof (itemMonth) != 'undefined'){
      var formData = that.data.postData;
      formData.settlementYear = itemYear;
      formData.settlementMonth = itemMonth;
      that.setData({
        postData: formData
      })
    }
    // 获得目标年月的订单
    that.getNoPaymentCommission();
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
 * 点击删选处理
 */
  chooseItem: function (e) {
    var that = this;
    that.setData({
      isShowOptionsView: false,
    })

    var index = e.currentTarget.dataset.id;
    var itemOrderType = that.data.orderOptions[index].type;
    var itemTypeName = that.data.orderOptions[index].name;
    var formData =that.data.postData;
    formData.orderType = itemOrderType;
    that.setData({
      currentOrderOptionIndex: index,
      orderFilterTitle: itemTypeName,
      postData:formData
    })
    that.getNoPaymentCommission();
  },

  /**
 * 显示或隐藏选择栏
 */
  onChangeShowState: function () {
    var that = this;
    that.setData({
      isShowOptionsView: !this.data.isShowOptionsView,
    })
  },

  /**
 * 获得代理商的所有未结算的佣金
 */
  getNoPaymentCommission: function () {
    var that = this;
    var url = that.data.constant.distributerDomain + "/commissionDetails/queryCommissionDetailsByJoin";
    wx.request({
      url: url,
      data: that.data.postData,
      header: util.postRequestHeader(),
      method: 'POST',
      success: function (res) {
        console.log("请求数据成功！");
        that.setData(res.data);
      },
      fail: function (res) {
        console.log("请求数据失败！")
      },
      complete: function (res) {
        console.log(res);
      }
    })
  }



})