// pages/API/empower/empower.js
const app = getApp();
const Toast = require('../../../zanui-weapp/dist/toast/index');
var util = require('../../../utils/util.js')
var guid = '';
/**
 * 
 */
Page(Object.assign({}, Toast, {

  /**
  * 页面的初始数据
  */
  data: {
    constant: app.constant,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    util.getUserAccessData();

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

    return util.defaultShareData();
  },

  /**
   * 获取微信上的用户手机号
   */
  getPhoneNumber: function (e) {

    console.log("开始执行：getPhoneNumber")
    console.log(e.detail.errMsg)
    console.log(e.detail.iv)
    console.log(e.detail.encryptedData)

    var that = this;
    //用户允许
    if (typeof (e.detail.iv) != 'undefined' && typeof (e.detail.encryptedData) != 'undefined') {

      var url = that.data.constant.domain + "/weixin/phone";
      var userAccessData = util.getUserAccessData();
      var guid = userAccessData.guid;
      if (typeof (guid) != "undefined" && guid.length > 0) {
        //发起网络请求
        wx.request({

          url: url,
          method: 'POST',
          header: util.postRequestHeader(),

          data: {
            guid: guid,
            encryptedData: e.detail.encryptedData,
            iv: e.detail.iv,
            errMsg: e.detail.errMsg
          },

          success: function (res) {

            if (res.statusCode == 200) {
              //覆盖本地存储的用户数据
              wx.setStorage({
                key: that.data.constant.userAccessDataKey,
                data: res.data,
              })

              wx.showToast({
                title: '成功',
                icon: 'success',
                duration: 2000
              })


              //当用未注册时点击-我的 tab
              console.log("当用未注册时点击-我的 tab")
              wx.switchTab({
                url: '/pages/user/index/index'
              })

            } else {
              
              console.warn(res);
              //跳转到绑定手机号页面
              wx.redirectTo({
                url: '/pages/user/send-code/send-code',
              })
            }
          },

          fail: function (res) {
            console.warn(res);
          },

          complete: function (res) { }
        });
      } else {
        that.showZanToast("guid为空");
      }
    } else {

      //用户拒绝
      wx: wx.redirectTo({
        url: '/pages/user/send-code/send-code',
        success: function (res) { },
        fail: function (res) {
          console.warn(res)
        },
        complete: function (res) { },
      })
    }
  }

}));