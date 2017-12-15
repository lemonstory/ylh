// pages/API/visa-find/visa-find.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sendmsg: "sendmsg",
    getmsg: "获取验证码",
  },
  sendmessg: function (e) {
    if (timer == 1) {
      timer = 0
      var that = this
      var time = 60
      that.setData({
        sendmsg: "sendmsgafter",
      })
      var inter = setInterval(function () {
        that.setData({
          getmsg: time + "s后重新发送",
        })
        time--
        if (time < 0) {
          timer = 1
          clearInterval(inter)
          that.setData({
            sendmsg: "sendmsg",
            getmsg: "获取短信验证码",
          })
        }
      }, 1000)
    }
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
  
  }
})