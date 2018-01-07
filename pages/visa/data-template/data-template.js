// pages/visa/data-template/data-template.js
Page({
     data: {
          showSendMesssage: false,
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

     // getData: function () {
     //      var that = this;
     //      var url = 'https://aip.baidubce.com/rest/2.0/ocr/v1/idcard?access_token=';
     //      console.log("url = " + url);
     //      wx.request({
     //           url: url,
     //           data: {},
     //           'method': 'POST',
     //           'Content-Type': 'application/x-www-form-urlencoded',
     //           'image': 'true',
     //           success: function (res) {
     //                console.log("### sucess ###");
     //                console.log(res.data);
     //                that.setData(res.data);
     //           },
     //           fail: function (res) {
     //                console.log("### fail ###");
     //                console.log(res);
     //           },
     //           complete: function (res) {
     //                console.log("### complete ###");
     //                console.log(res);
     //           },
     //      })
     // },
     /**
      * 用户点击右上角分享
      */
     onShareAppMessage: function () {

     },
     handleTapSendToEmail: function () {
          var that = this;

          that.setData({
               showSendMesssage: true,
          })
     },
     handleTapCancle: function () {
          var that = this;
          that.setData({
               showSendMesssage: false,
          })
     },

})