// pages/API/search/search.js
const app = getApp();
Page({
     data: {
          'constant': app.constant
     },
     onLoad: function (options) {

     },
     back: function () {
          wx.navigateBack({
          })
     },

     /**
      * 生命周期函数--监听页面初次渲染完成
      */
     onReady: function () {
          this.getData();
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
getData:function () {
          var that = this;
          var url = that.data.constant.domain + '/distrbuter/search/getHotAreaList';
          console.log("url = " + url);
          wx.request({
               url: url,
               data: {},
               header: {
                    'content-type': 'application/json',
               },
               success: function (res) {
                    console.log(res.data);
                    that.setData(res.data);
               }
          })
     },

bindSearchAdDetail:function(event){
     var id = event.currentTarget.dataset.id;
     var path = "/pages/API/search-detail/search-detail?id="+id;
     wx.navigateTo({
          url: path
     })
}
})