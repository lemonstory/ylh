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
    returnUrl: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    var that = this;
    if (!util.isEmptyStr(options.returnUrl)) {

      that.setData({
        returnUrl: options.returnUrl
      })
    }

    util.getUserAccessData();
    var userAccessData = util.getUserAccessData();
    var guid = userAccessData.guid;
    if (util.isEmptyStr(guid)) {

      //再次获取guid
      var distributerId = util.getDistributerId();
      wx.checkSession({
        success: function () {
          //session 未过期，并且在本生命周期一直有效
        },

        fail: function () {

          console.log("🚀 🚀 🚀 -- 微信登录态过期,重新登录");
          //登录态过期
          //重新登录
          wx.login({

            success: function (res) {

              var url = that.data.constant.domain + "/weixin/get_session";
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
                      key: that.data.constant.userAccessDataKey,
                      data: res.data,
                      success: function (res) {

                        //重置userAccessData值
                        console.log("[重置] 本地存储 userAccessData ")
                        app.constant.userAccessData = {};
                        util.getUserAccessData();
                      },
                      fail: function (res) {
                        console.error(res);
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
                    console.error(res);
                  },
                  complete: function (res) { }
                })
              } else {
                console.log('获取用户登录态失败！' + res.errMsg)
              }
            },

            fail: function (res) {
              console.error(res);
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
      var data = {
        guid: guid,
        encryptedData: e.detail.encryptedData,
        iv: e.detail.iv,
        errMsg: e.detail.errMsg
      };

      if (!util.isEmptyStr(guid)) {
        //发起网络请求
        wx.request({
          url: url,
          method: 'POST',
          header: util.getRequestHeader(),
          data: data,
          success: function (res) {

            if (res.statusCode == 200) {
              //覆盖本地存储的用户数据
              wx.setStorage({
                key: that.data.constant.userAccessDataKey,
                data: res.data,
                success: function (res) {

                  console.log("[重置] 本地存储 userAccessData ")
                  app.constant.userAccessData = {};
                  util.getUserAccessData();

                  wx.showToast({
                    title: '成功',
                    icon: 'success',
                    duration: 2000
                  })

                  if (!util.isEmptyStr(that.data.returnUrl)) {

                    var url = decodeURIComponent(that.data.returnUrl);
                    wx.redirectTo({
                      url: url,
                    })

                  } else {
                    wx.switchTab({
                      url: '/pages/user/index/index',
                    })
                  }
                },
                fail: function (res) {
                  console.error(res)
                }
              })

            } else {



              console.error("url = " + url);
              console.error(res);
              that.showZanToast(res.data);

              //跳转到绑定手机号页面
              // wx.redirectTo({
              //   url: '/pages/user/send-code/send-code?returnUrl=' + that.data.returnUrl,
              // })
              
            }
          },

          fail: function (res) {
            console.error(res);
          },

          complete: function (res) { }
        });

      } else {
        that.showZanToast("guid为空");
      }

    } else {

      //用户拒绝
      wx: wx.redirectTo({
        url: '/pages/user/send-code/send-code?returnUrl=' + that.data.returnUrl,
        success: function (res) { },
        fail: function (res) {
          console.error(res);
        },
        complete: function (res) { },
      })
    }
  }

}));