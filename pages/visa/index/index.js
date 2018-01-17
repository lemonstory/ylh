const app = getApp();
const Toast = require('../../../zanui-weapp/dist/toast/index');
var util = require('../../../utils/util.js');
//测试
Page(Object.assign({}, Toast, {
     data: {
          constant: app.constant,
          inputContent: {},
          indicatorDots: true,
          autoplay: true,
          interval: 5000,
          duration: 1000,
     },
     onReady: function () {

     },
     onLoad: function (options) {
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
          var that = this;
          that.getData();
     },

     /**
       * 停止下拉刷新动画
       */
     stopPullDownRefresh: function () {
          wx.stopPullDownRefresh({
               complete: function (res) {
               }
          });
     },


     /**
      * 页面上拉触底事件的处理函数
      */
     onReachBottom: function () {
          if (!this.data.isNoMore) {
               this.setData({
                    'isLoading': true,
                    'pageIndex': this.data.pageIndex + 1,
               });
               setTimeout(() => {
                    this.getDataMore(this.data.pageIndex, this.data.Pagesize);
               }, 500);
          } else {
               this.setData({
                    'isLoading': false,
               });
          }
     },
     //  * 用户点击右上角分享
     //  */
     onShareAppMessage: function () {},
//获取接口
getData:function () {
          var that = this;
          var url = that.data.constant.domain + '/distrbuter/index';
          console.log("url = " + url);
          wx.request({
               url: url,
               data: {},
               header: util.getRequestHeader(),
               success: function (res) {
                    console.log("### success ###");
                    console.log(res.data);
                    that.setData(res.data);
               },
               fail: function (res) {
                    console.log("### fail ###");
                    console.log(res);
               },
               complete: function (res) {
                    console.log("### complete ###");
                    console.log(res);
               },
          })
     },
 changeIndicatorDots: function (e) {
          this.setData({
               indicatorDots: !this.data.indicatorDots
          })
     },
     changeAutoplay: function (e) {
          this.setData({
               autoplay: !this.data.autoplay
          })
     },

     // 处理banner图点击事件
     handleBanner: function (event) {
          var that = this;
          var src = event.currentTarget.dataset.src;
          that.navigateToUrl(src);
     },
   /**
       * 跳转url
       */
     navigateToUrl: function (url) {
           var path
          if (!util.isEmptyStr(url)) {

               if (util.isHttpUrl(url)) {
                    path = "/pages/web-view/web-view?src=" + url;
               } else {
                    path = url;
               }
               wx.navigateTo({
                    url: path
               })

          } else {
             console.warn("url为空")
               //测试 
             that.showZanToast("url为空");
          }
          },

    bindHandleTapVisaList: function(event) {
          var id = event.currentTarget.dataset.id;
          console.log(id);
          var path = "/pages/visa/visa-list/visa-list?id=" + id;
          wx.navigateTo({
               url: path
          })
     },

bindHandleMoreMessage:function(){
    var path = "/pages/visa/category/category";
     wx.navigateTo({
          url: path
     }) 
}
}))
