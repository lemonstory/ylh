// pages/visa/marital-status/marital-status.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
       isSelected: 0,
       isUnSelect: 'http://image.365zhiding.com/wxapp/20171210/unselect.png',
       isSelect: 'http://image.365zhiding.com/wxapp/20171210/select.png',
       marrystatus:'1',
       imageNum:true
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
  
  },
 
// 处理婚姻状态选择
  handleMarrySelect: function (e) {
       var that = this;
       var marrystatus = that.data.marrystatus;
       var type = e.currentTarget.dataset.type;
       console.log(type)
       that.setData({
          marrystatus:type
         })
       console.log(marrystatus)
     },
/**
 * 进行照片选择
 */
  bindTapChooseImage: function () {
    var that = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        var tempFilePaths = res.tempFilePaths;
        that.setData({
          imageNum: false,
          imageUrl: tempFilePaths[0]
        })
      }
    })
  },
  /**
   * 点击确认跳转显示详情
   */
  bindToShowInfo: function () {
    var path = "/pages/visa/passport_direction/passport_direction?imageMarry=" + this.data.imageUrl;
    wx.navigateTo({
      url: path,
    })
  }
})