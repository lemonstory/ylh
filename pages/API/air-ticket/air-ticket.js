// pages/API/air-ticket/air-ticket.js
Page({
  data: {
    depotOptions: ["经济舱", "公务舱", "头等舱"],
    flatOptions:["直飞","转机","无要求"],
    currentDepotOptionIndex:0,
    currentFlatOptionIndex: 0,
    isShowView:false
},
  back: function () {
  wx.navigateBack();
  },
chooseItem: function (e) {
    this.setData({
      isShowOptionsView: false,
    })
    var id = this.data.currentFilterId;
    this.setData({
      currentDepotOptionIndex: e.currentTarget.dataset.id,
    })
  },
  chooseItemFlat: function (e) {
  this.setData({
    isShowView: false,
  })
  var id = this.data.currentFilterId;
  this.setData({
    currentFlatOptionIndex: e.currentTarget.dataset.id,
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
  onChangeShow: function () {
   var that = this;
    that.setData({
      isShowView: (!this.data.isShowView),
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