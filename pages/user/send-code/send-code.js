// pages/API/tell/tell.js
//获取应用实例
const app = getApp();
const Toast = require('../../../zanui-weapp/dist/toast/index');
var util = require('../../../utils/util.js')

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

    var that = this;
    util.getUserAccessData();
    var userAccessData = util.getUserAccessData();
    var guid = userAccessData.guid;
    if (util.isEmptyStr(guid)) {

      //再次获取guid
      var distributerId = utils.getDistributerId();
      wx.checkSession({
        success: function () {
          //session 未过期，并且在本生命周期一直有效
        },

        fail: function () {

          console.log("🚀 🚀 🚀 -- fail");
          //登录态过期
          //重新登录
          wx.login({

            success: function (res) {

              var url = constant.constant.domain + "/weixin/get_session";
              console.log("url = " + url);
              if (res.code) {
                //发起网络请求
                wx.request({
                  header: util.getRequestHeader(),
                  url: url,
                  data: {
                    code: res.code,
                    distributerId: distributerId
                  },
                  success: function (res) {

                    guid = res.data.guid;
                    // 本地存储用户信息
                    wx.setStorage({
                      key: constant.constant.userAccessDataKey,
                      data: res.data,
                      fail: function (res) {
                        console.warn(res);
                      }
                    });

                    //代理商信息存储
                    if (!util.isEmptyStr(res.data.distributerId)) {
                      util.setDistributerId(res.data.distributerId);
                    } else {
                      console.warn("res.data.distributerId = " + res.data.distributerId);
                    }
                  },

                  fail: function (res) {
                    console.warn(res);
                  },
                  complete: function (res) { }
                })
              } else {
                console.log('获取用户登录态失败！' + res.errMsg)
              }
            },

            fail: function (res) {
              console.warn(res);
            },

            complete: function (res) { }
          });
        }
      })
    }
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
        vcodeHintStr: seedTemp + "秒后重新获取",
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

    console.log("🦃 🦃 🦃 getStorage 🦃 🦃 🦃");
    var userAccessData = util.getUserAccessData();
    var guid = userAccessData.guid;
    console.log(userAccessData);
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
          header: util.getRequestHeader(),
          data: {
            guid: guid,
            mobile: mobile
          },

          success: function (res) {
            if (res.statusCode != 200) {
              console.warn(res);
            }
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

  /**
   * 校验验证码
   */
  checkVcode: function (mobile, msgCode) {

    var that = this;
    var userAccessData = util.getUserAccessData();
    var guid = userAccessData.guid;

    if (guid.length > 0) {

      if (!util.isMobile(mobile)) {

        that.showZanToast("请检查输入的手机号");

      } else if (util.isEmptyStr(msgCode)) {

        that.showZanToast("请输入验证码");

      } else {

        var url = that.data.constant.domain + '/weixin/phonecode';
        wx.request({
          url: url,
          header: util.getRequestHeader(),

          data: {
            guid: guid,
            mobile: mobile,
            msgcode: msgCode
          },

          success: function (res) {
            //覆盖本地用户数据
            if (res.statusCode == 200) {
              wx.setStorage({
                key: that.data.constant.userAccessDataKey,
                data: res.data,
                fail: function (res) {
                  console.warn(res);
                }
              });

              //跳转对对应页面
              wx.navigateBack();

            } else if (res.statusCode == 500 && res.data.code == 32009001) {

              that.showZanToast(res.data.message);
              console.warn(res.data);

            } else {

              console.warn(res.data);
              that.showZanToast(res.data.message);
            }
          },

          fail: function (res) {
            console.warn(res);
            that.showZanToast(JSON.stringify(res.data));
          },

          complete: function (res) { },
        })
      }

    } else {
      console.error("guid为空 guid在App onLaunch 处获得");
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