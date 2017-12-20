// pages/API/tell/tell.js
//获取应用实例
const app = getApp();
const Toast = require('../../../zanui-weapp/dist/toast/index');
var util = require('../../../utils/util.js')
var guid;

/**
 * 
 */
Page(Object.assign({}, Toast, {

  data: {

    constant: app.constant,

    //手机号
    mobile: '',
    msgCode: '',

    timer: '',
    vcodeHintStr: "获取验证码",
    isGetVcodeEnable: true,
    seed: 60,

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    // this.getVcode("18600024911");
    // this.checkVcode("18600024911", "1234");

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


  /**
   * 获取验证码-点击
   */
  handTapGetVcode: function () {

    var that = this;
    if (that.data.isGetVcodeEnable) {
      that.getVcode(that.data.mobile);
    }
  },

  /**
   * 绑定-点击
   */
  handleTapBind: function () {

    var that = this;
    that.checkVcode(that.data.mobile, that.data.msgCode);

  },

  /**
   * 获取手机验证码-倒计时
   */
  setCountDownHint: function () {

    var that = this;
    var seedTemp = that.data.seed;
    seedTemp--
    if (seedTemp < 1) {
      that.setData({
        isGetVcodeEnable: true,
        seed: 60,
        vcodeHintStr: '获取验证码'
      })
      clearInterval(that.data.timer);
    } else {

      that.setData({
        seed: seedTemp,
        isGetVcodeEnable: false,
        vcodeHintStr: seedTemp + "秒后继续获取",
      })
    }
    // console.log("🐢 --- " + seedTemp);
  },

  /**
   * 获取手机验证码
   */
  getVcode: function (mobile) {

    console.log("🦃 🦃 🦃 getVcode 🦃 🦃 🦃");
    var that = this;

    wx.getStorage({
      key: that.data.constant.userAccessDataKey,
      success: function (res) {

        console.log("🦃 🦃 🦃 getStorage 🦃 🦃 🦃");
        console.log(res.data)
        guid = res.data.guid;
        console.log("guid = " + guid);

        if (guid.length > 0) {
          var url = that.data.constant.domain + '/weixin/sendcode';
          console.log("url = " + url);

          if (util.isMobile(mobile)) {

            var tempTimer = setInterval(that.setCountDownHint, 1000)
            that.setData({
              timer: tempTimer
            });

            wx.request({

              url: url,
              header: {
                'content-type': 'application/json', // 默认值
              },

              data: {
                guid: guid,
                mobile: mobile
              },

              success: function (res) {

              },

              fail: function (res) {
                console.warn(res);
              },

              complete: function (res) { },
            })


          } else {
            that.showZanToast("请检查输入的手机号");
          }
        } else {
          that.showZanToast("guid 不能为空");
        }
      },
      fail: function (res) {
        console.warn(res);
      }
    })
  },

  /**
   * 校验验证码
   */
  checkVcode: function (mobile, msgCode) {

    console.log("😀 😀 😀 checkVcode 😀 😀 😀");
    var that = this;
    if (guid.length > 0) {

      if (util.isMobile(mobile)) {
        var url = that.data.constant.domain + '/weixin/phonecode';
        wx.request({
          url: url,
          header: {
            'content-type': 'application/json', // 默认值
          },

          data: {
            guid: guid,
            mobile: mobile,
            msgcode: msgCode
          },

          success: function (res) {
            //覆盖本地用户数据
            if(res.statusCode == 200) {
              wx.setStorage({
                key: that.data.constant.userAccessDataKey,
                data: res.data,
                fail: function (res) {
                  console.warn(res);
                }
              });
            }else{
              console.warn(res.data);
            }
            //TODO:跳转对对应页面
          },

          fail: function (res) {
            console.warn(res);
          },

          complete: function (res) { },
        })
      } else {
        that.showZanToast("请检查输入的手机号");
      }
    } else {
      console.log("guid为空");
      that.showZanToast("guid为空");
    }
  },

  /**
  * 获取input输入的值
  */
  bindInputValueChange: function (event) {

    var that = this;
    that.setData({
      [event.currentTarget.id]: event.detail.value
    })
  },


}));