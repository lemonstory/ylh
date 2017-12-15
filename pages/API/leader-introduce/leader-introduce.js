// pages/API/leader-introduce/leader-introduce.js
const app = getApp();
Page({
data: {
  'constant': app.constant,
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
  onShareAppMessage: function () {
  
  },
  
  //获取接口
  getData: function (id) {
       var that = this;
       var url = that.data.constant.domain + '/distrbuter/line/leader/detail/' + id;
       console.log("url = " + url);
       wx.request({
            url: url,
            data: {},
            header: {
                 'content-type': 'application/json', // 默认值
            },
            success: function (res) {
                 console.log(res.data);
                 that.setData(res.data);
            }
       })
  },
})