// pages/API/clear-log/clear-log.js

const app = getApp();
const Toast = require('../../../zanui-weapp/dist/toast/index');
var util = require('../../../utils/util.js')
var chinaArea = require('../../../utils/china-area.js')
Page({

  data: {

    'constant': app.constant,

    // post请求参数
    postData: {
      "distributerId": 1,
      "transferStatusId": 2
    },
    // 当前展开的月份index
    openId:0,
    // 展开后显示的结算日期
    showDate:'',

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    // 代理商id

    that.getCommissionLog();
  }, 
  
  /**
   *  点击展示更多处理
   */
  onChangeShowState: function (e) {
    var that = this;
    var id = e.currentTarget.dataset.id;
    if(that.data.openId == id){
      id = 0;
    }
    that.setData({
      openId:id
    })
    that.formatShowDate();
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
   * 获得结算日志
   */
  getCommissionLog: function () {
    var that = this;
    var url = that.data.constant.distributerDomain + "/settlementLog/querySettlementLogByJoin";
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
        console.log("请求数据失败！");
      },
      complete:function(res){
        console.log(res);
      }
    })
  },

  /**
   * 计算结算日期
   */
  formatShowDate:function(){
    var that = this;
    var longTime = 0 ;
    for (var i = 0; i < that.data.dList.length; i++){
      if (that.data.openId == that.data.dList[i].settlementId){
        longTime = that.data.dList[i].transferEndTime;
      }
    }
    console.log(longTime);
    if(longTime != 0){
      var date = new Date(longTime);
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      var day = date.getDate();
      var showTime = year+"-"+month+"-"+day;
      console.log(showTime);
      that.setData({
        showDate: showTime
      })
    }
  },

})