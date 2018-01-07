// pages/visa/visa-detail/visa-detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  showDetail:false,
  showLongTime:false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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
//明细弹出框
handleTapCancle: function () {
       var that = this;
       that.setData({
            showDetail: false,
            showLongTime:false
       });
  },
  handleTapDetail: function () {
       var that = this;
       that.setData({
            showDetail: !that.data.showDetail
       });
  },
  handleTapLongTime:function(){
   var that = this;
       that.setData({
            showLongTime: !that.data.showLongTime
       });  
  }
})