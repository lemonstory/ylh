// pages/API/my-money/my-money.js

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

    lastMonth:1,
    // 获得佣金信息的传参
    postData: {
      "distributerId": 1,
    }

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    //  TODO 获取代理商id
    var id = util.getDistributerId();
    that.setData({
      'postData.distributerId':id
    })
    that.getCommissionInfo();
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
   * 获得当前的年份
   */
  getCurrentYes:function(){
    var today = new Date();//获得当前日期
    var year = today.getFullYear();//获得年份
    return year;
    var month = today.getMonth() + 1;//此方法获得的月份是从0---11，所以要加1才是当前月份
  },

  /**
   * 获得上个月的月份
   */
  getLastMonth:function(){
    var today = new Date();//获得当前日期
    var month = today.getMonth() ;//此方法获得的月份是从0---11，所以要加1才是当前月份
    var lastMonth;
    if(month ==0){
      lastMonth = 12;
    }else{
      lastMonth = month;
    }
    return lastMonth;
  },

  /**
   * 获取代理商结算佣金信息
   */
  getCommissionInfo: function () {
    var that = this;
    var url = that.data.constant.distributerDomain + "/commissionDetails/calculateAmount"
    wx.request({
      url: url,
      data: that.data.postData,
      header: util.postRequestHeader(),
      method:'POST',
      success:function(res){
        that.setData(res.data);
      },
      fail:function(res){
        console.log("请求失败！");
      },
      complete:function(res){
        console.log(res);
      }
      
    })
  },
})