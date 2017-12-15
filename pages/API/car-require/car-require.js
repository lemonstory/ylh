// pages/API/car-require/car-require.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    depotOptions: ["司导分开", "司兼导"],
    currentDepotOptionIndex: 0,
    num: 1,
    minusStatus: 'disabled'
  },
  back: function () {
    wx.navigateBack();
  },
  next: function () {
    wx.redirectTo({
      url: "../food-require/food-require",
    })
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
  // 加减运算开始
  bindMinus: function () {
    var num = this.data.num;
   if (num >= 1) {
      num--;
    }
    var minusStatus = num < 1 ? 'disabled' : 'normal';
    this.setData({
      num: num,
      minusStatus: minusStatus
    });
   },
  bindPlus: function () {
    var num = this.data.num;
    num++;
  var minusStatus = num < 1 ? 'disabled' : 'normal';
  this.setData({
      num: num,
      minusStatus: minusStatus
    });
},
// 加减运算结束








// 加减运算结束


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