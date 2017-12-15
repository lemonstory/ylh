// pages/API/my-money-no/my-money-no.js
Page({

     /**
      * 页面的初始数据
      */
     data: {
          orderOptions: ["线路", "定制", "签证"],
          orderFilterTitle: "订单类型",
          currentOrderOptionIndex: 0,
          currentTab:0
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
     chooseItem: function (e) {
          this.setData({
               isShowOptionsView: false,
          })
          var id = this.data.currentFilterId;
          this.setData({
               currentOrderOptionIndex: e.currentTarget.dataset.id,
               orderFilterTitle: this.data.orderOptions[e.currentTarget.dataset.id],
          })
     },

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

     }
})