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

    'constant': app.constant,
       selectPay:0,
       selectDuds:0,
       selectAir:0,
       // 选中的航班
       selectPlaneTicket:{},

       orderId:0,
       orderDetail:{}
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var orderSn = options.orderId;
    console.log(orderSn);
    if (typeof (orderSn) != "undefined") {
      that.setData({
        orderId: orderSn
      })
    }
    if (that.data.orderId >0){
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
  getOrderDetail:function(){
    var that = this;
    var url = that.data.constant.domain + "/distrbuter/member/order/detail/" + that.data.orderId;
    wx.request({
      url: url,
      data:{},
      header: util.getRequestHeader(),
      success:function(res){
        var order = res.data;
        that.setData({
          orderDetail: order
        });
        console.log(that.data.orderDetail);

      },
      fail:function(res){
        console.log("出错了!");
      },
      complete:function(res){
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



bindDudschange:function(e){
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



bindAirMessage:function(e){
     var that = this;


     // 
     that.setData({
          selectAir: !that.data.selectAir,
     });
},
bindAircancel: function () {
     var that = this;
     that.setData({
          selectAir: 0,
     });
},


})