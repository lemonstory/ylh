// pages/API/my/my.js
const app = getApp();
const Toast = require('../../../zanui-weapp/dist/toast/index');
var util = require('../../../utils/util.js')


Page(Object.assign({}, Toast, {
data: {
    'constant': app.constant,
    buttonDisabled: false,
    modalHidden: true,
    show: false,
    isDistributer: false,
    isOwnDistributerId: false
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
    that.setData({
      isDistributer: util.isDistributer()
    })

    //用户为非代理商
    if (!that.data.isDistributer) {
      that.setData({
        isOwnDistributerId: util.isOwnDistributerId()
      })

      //用户没有代理商id
      if (!that.data.isOwnDistributerId) {
        wx: wx.redirectTo({
          url: '../personal-order/personal-order',
          success: function (res) { },
          fail: function (res) { },
          complete: function (res) { },
        })
      } else {

        //用户有代理商Id但未注册
        wx: wx.redirectTo({
          url: '../empower/empower',
          success: function (res) { },
          fail: function (res) { },
          complete: function (res) { },
        })
      }
    }
    console.log(that.data);
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

    return {
      title: 'AA自定义转发标题',
      path: '/pages/API/my/my?distributerId=123',
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
  },

  toast: function () {
    this.setData({
      modalHidden: !this.data.modalHidden
    })
  },

  modalBindaconfirm: function () {
    wx.navigateTo({
      url: '../next-management/next-management'
    })
  },


  onChangeShowState: function () {
    var that = this;
    that.setData({
      showView: (!that.data.showView)
    })
  },

  cancel: function () {
    var that = this;
    that.setData({
      showView: false
    })
  },

  callPhone: function () {
    wx.makePhoneCall({
      phoneNumber: '400-189-0876',
    })
    var that = this;
    that.setData({
      showView: false
    })
  },

}))