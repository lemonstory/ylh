// pages/API/visa-require/visa-require.js
Page({
  data: {
    visaOptions: ["因公", "因私"],
    currentVisaOptionIndex: 0,
    visaFilterTitle: "无要求",

  },
  back: function () {
    wx.redirectTo({
      url: "../public-active/public-active",
    })
  },
 
  chooseItem: function (e) {
    this.setData({
      isShowOptionsView: false,
    })
    var id = this.data.currentFilterId;
    this.setData({
      currentVisaOptionIndex: e.currentTarget.dataset.id,
      visaFilterTitle: this.data.visaOptions[e.currentTarget.dataset.id],

    })
  },
  /**
     * 生命周期函数--监听页面加载
     */
  onLoad: function (options) {
    // 生命周期函数--监听页面加载
  }
  , onChangeShowState: function () {
    var that = this;
    that.setData({
      isShowOptionsView: !this.data.isShowOptionsView,
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