// pages/API/my-money-no/my-money-no.js
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

    orderOptions: [
      {
        "type":0,
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

      // 未结算佣金
    unSettlementAmount:0,

    orderFilterTitle: "订单类型",

    currentOrderOptionIndex: 0,
    currentTab: 0,

    // 请求post数据
    postData: {
      "distributerId": 1,
      "isTransferSuccess": 0,
      "orderType":0
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      var that = this;
      // 获得代理商的id

      var unPay = options.unSettlementAmount;
      if (typeof (unPay) != "undefined") {
        that.setData({
          unSettlementAmount: unPay,
        })
      }

      that.getNoPaymentCommission();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },


  /**
   *  分类删选
   */
  chooseItem: function (e) {
    var that = this;
    that.setData({
      isShowOptionsView: false,
    })
    var index = e.currentTarget.dataset.id;
    var filterTitle = that.data.orderOptions[index].name;
    var orderType = that.data.orderOptions[index].type;
    var formData = that.data.postData;
    formData.orderType = orderType;
    that.setData({
      currentOrderOptionIndex: index,
      orderFilterTitle: filterTitle,
      postData: formData
    })
    that.getNoPaymentCommission();
  },


/**
 * 顶部切换处理
 */
  handleSwichNav: function (e) {
    var that = this;
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  },
  onChangeShowState: function () {
    var that = this;
    that.setData({
      isShowOptionsView: !this.data.isShowOptionsView,
    })
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
   * 获得代理商的所有未结算的佣金
   */
  getNoPaymentCommission: function () {
    var that = this;
    var url = that.data.constant.distributerDomain +"/commissionDetails/queryCommissionDetailsByJoin";
    wx.request({
      url: url,
      data:that.data.postData,
      header: util.postRequestHeader(),
      method:'POST',
      success:function(res){
        console.log("请求数据成功！");
        that.setData(res.data);
      },
      fail:function(res){
        console.log("请求数据失败！")
      },
      complete:function(res){
        console.log(res);
      }
    })
     }
})