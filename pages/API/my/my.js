// pages/API/my/my.js
Page({

     /**
      * 页面的初始数据
      */
     data: {
          buttonDisabled: false,
          modalHidden: true,
          show: false
     },



     /**
      * 生命周期函数--监听页面加载
      */
     onLoad: function (options) {

     },

     toast: function () {
          this.setData({
               modalHidden: !this.data.modalHidden
          })
     },
     modalBindaconfirm: function () {
          wx.navigateTo({
               url: '../next-management/next-management'
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

     }
})