const app = getApp();
const Toast = require('../../../zanui-weapp/dist/toast/index');
var util = require('../../../utils/util.js');
Page({
     data: {
          isSelected: 0,
          isUnSelect: 'http://image.365zhiding.com/wxapp/20171210/unselect.png',
          isSelect: 'http://image.365zhiding.com/wxapp/20171210/select.png',
     },
     /**
      * * 生命周期函数--监听页面加载*/
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
     onShareAppMessage: function () { },
     handleTapSelectType: function () {
          var that = this;
          that.setData({
               isSelected: !this.data.isSelected,
          })
     },

     /**
      * 正面图片
      */
     bindTapChooseImage: function () {
          var that = this;
          wx.chooseImage({
               count: 1,
               success: function (res) {
                    var tempFilePaths = res.tempFilePaths;
                    console.log(tempFilePaths);
                    wx.navigateTo({
                         url: '/pages/visa/passport_direction/passport_direction?imageface=' + tempFilePaths,
                    })
               }
          }
          )
     },


/**
 * 反面图片
 */
     bindTapChoseImageBack:function(){
       var that = this;
       wx.chooseImage({
         count: 1,
         success: function (res) {
           var tempFilePaths = res.tempFilePaths;
           console.log(tempFilePaths);
           wx.navigateTo({
             url: '/pages/visa/passport_direction/passport_direction?imageback=' + tempFilePaths,
           })
         }
       }
       )
     }

})


