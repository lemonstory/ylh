// pages/API/hotel-require/hotel-require.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hotelOptions:["国际连锁", "常规15Km", "市区10Km","市中心5Km","无要求"],
    starOptions: ["连锁快捷酒店", "三星", "四星","五星"],
    houseOptions:["标准双人间", "单间", "套房"],
    currentHotelOptionIndex: 0,
    currentHouseOptionIndex: 0,
    starFilterTitle: "三星级",
    isShowView: false
  },
  back: function () {
    wx.navigateBack();
  },
/**
   * 生命周期函数--监听页面加载
   */
  chooseItem: function (e) {
    this.setData({
      isShowOptionsView: false,
    })
    var id = this.data.currentFilterId;
    this.setData({
      currentHotelOptionIndex: e.currentTarget.dataset.id,
    })
  },
  chooseItemStar: function (e) {
    this.setData({
      isShowView: false,
    })
    var id = this.data.currentFilterId;
    this.setData({
      currentStarOptionIndex: e.currentTarget.dataset.id,
      starFilterTitle: this.data.starOptions[e.currentTarget.dataset.id],})
  },

  chooseItemHouse: function (e) {
    this.setData({
      isShowViewHouse:false,
    })
    var id = this.data.currentFilterId;
    this.setData({
      currentHouseOptionIndex: e.currentTarget.dataset.id,})
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
  onChangeShowHouse: function () {
    var that = this;
    that.setData({
      isShowViewHouse: (!this.data.isShowViewHouse),
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