// pages/API/search-detail/search-detail.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
  'constant': app.constant
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
    this.getData();
  },

getData: function (keyword) {
       var that = this;
       var url = that.data.constant.domain + '/distrbuter/search/getAreaGoods/'+keyword;
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
  
  }
})