// pages/API/address-message/address-message.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

    //已选择的出行人信息
    'checkedPassengerList': [],
    'passengerIdStr': '',

    items: [
      { name: 'per', value: '个人', checked: 'true' },
      { name: 'danwei', value: '单位' },
    ],
    actionSheetHidden: true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
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

    var that = this;

    //选择出行人处理
    if (that.data.checkedPassengerList.length > 0) {
      var passengerIdArrTemp = [];
      var passengerIdStrTemp = '';
      var checkedPassengerListTemp = that.data.checkedPassengerList;
      for (var i = 0; i < checkedPassengerListTemp.length; i++) {
        passengerIdArrTemp.push(checkedPassengerListTemp[i].id);
      }
      passengerIdStrTemp = passengerIdArrTemp.join(',')
      that.setData({
        'passengerIdStr': passengerIdStrTemp
      })
    } else {
      that.setData({
        'passengerIdStr': ''
      })
    }
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

  radioChange: function (e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value)
  },

  actionSheetTap: function (e) {
    this.setData({
      actionSheetHidden: !this.data.actionSheetHidden
    })
  },

  actionSheetChange: function (e) {
    this.setData({
      actionSheetHidden: !this.data.actionSheetHidden
    })
  },

  bindItemTap: function (e) {
    console.log('tap ' + e.currentTarget.dataset.name)
  },

})