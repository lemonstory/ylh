// pages/API/search/search.js
const app = getApp();
var searchValue = '';
Page({
     data: {
          'constant': app.constant,
           centent_Show: true,
           searchValue: '', 
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
      
     },

     /**
      * 生命周期函数--监听页面显示
      */
     onShow: function () {
      this.bindSearch();
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
     bindSearch: function (e) {
     var id = e.currentTarget.dataset.id;
     console.log(id)
     var that = this;
     var url = that.data.constant.domain + '/distrbuter/search/getHotAreaList/1';
     console.log(url);
     wx.request({
          url: url,
          data: {},
          header: {
               'content-type': 'application/json',
          },
          success: function (res) {
               if (res.data.length == 0) {
                    console.log(nonoono)
                    that.setData({
                         centent_Show: false,
                    });
               }
               that.setData({
                    
               });
          },
          fail: function (e) {
               wx.showToast({
                    title: '网络异常！',
                    duration: 2000
               });
          },
     });
} ,

searchValueInput: function (e) {
     var value = e.detail.value;
     this.setData({
          searchValue: value,
     });
     if (!value && this.data.lineList.length == 0) {
          this.setData({
               centent_Show: false,
          });
     }
},  
 


bindSearchAdDetail:function(event){
     var id = event.currentTarget.dataset.id;
     var path = "/pages/API/search-detail/search-detail?id="+id;
     wx.navigateTo({
          url: path
     })
}
})