// pages/visa/visa-list/visa-list.js
const app = getApp();
Page({
     data: {
          show: 0,
          addressList: [{ id: "0", title: "北京" },
          { id: "1", title: "上海" },
          { id: "2", title: "天津" },
          { id: "3", title: "河北" },
          { id: "4", title: "陕西" },
          { id: "5", title: "河南" },
          { id: "6", title: "黑龙江" },
          { id: "7", title: "安徽" },
          { id: "8", title: "山东" },
          ],
          cityFilterTitle: "北京",
          currentItem: 0,
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


     handleTapCancle: function () {
          var that = this;
          that.setData({
               show: "0"
          });
     },
     handleTapChoiceAddress: function () {
          var that = this;
          that.setData({
               show: !that.data.show
          });
     },
     handleTapChoiceItem: function (e) {
          var that = this
          var id = e.currentTarget.dataset.id;
          console.log(id)
          //设置当前样式
          if (this.data.currentItem === e.currentTarget.dataset.id) {
               return true;
          } else {
               var showMode = e.currentTarget.dataset.id == 0;
               this.setData({
                    currentItem: id,
                    cityFilterTitle: this.data.addressList[e.currentTarget.dataset.id].title,
               })
          }
     },

})




