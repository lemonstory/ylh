//app.js
var constant = require('constant.js');
var util = require('./utils/util.js');
var guid = '';

App({

  onLaunch: function (options) {

  },

  onShow: function (options) {

    console.log("🚀 App->onShow options ↓");
    console.log(options);

    var that = this;
    //代理商处理
    //场景 - 公众号自定义菜单
    //跳转代理商登录页
    //TODO: 检查代理商登录状态
    if ((options.scene == 1035 || options.query.isDistributer == 1) && !util.isDistributerLogin()) {

      wx: wx.redirectTo({
        url: '/pages/distributer/login/login',
        success: function (res) { },
        fail: function (res) {
          console.warn(res);
        },
        complete: function (res) { },
      })

    } else {

      //非代理商处理
      //get取得代理商Id
      var getParamDistributerId = options.query.distributerId;
      //本地读取代理商Id
      var localDistributerId = util.getDistributerId();

      var distributerId = '';


      if (!util.isEmptyStr(localDistributerId)) {

        distributerId = localDistributerId;

      } else if (!util.isEmptyStr(getParamDistributerId)) {

        distributerId = getParamDistributerId;
      }

      console.log("🚚  🚚 [代理商ID] getParamDistributerId = " + getParamDistributerId + ", localDistributerId = " + localDistributerId);
      console.log("🚚  [代理商ID] distributerId = " + distributerId);
      console.log(util.getUserAccessData());

      if (!util.isEmptyStr(distributerId)) {

        if (util.isEmptyObject(util.getUserAccessData())) {

          wx.checkSession({
            success: function () {
              //session 未过期，并且在本生命周期一直有效
            },

            fail: function () {

              console.log("🚀 🚀 🚀 -- [app.js]微信登录态过期,重新登录");
              //登录态过期
              //重新登录
              wx.login({
                success: function (ckRes) {
                  var url = constant.constant.domain + "/weixin/get_session";
                  console.log("url = " + url);
                  if (ckRes.code) {
                    //发起网络请求
                    wx.request({
                      url: url,
                      data: {
                        code: ckRes.code,
                        distributerId: distributerId
                      },

                      header: {
                        'content-type': 'application/json' // 默认值
                      },

                      success: function (gsRes) {

                        if (gsRes.statusCode == 200) {

                          guid = gsRes.data.guid;
                          // 本地存储用户信息
                          wx.setStorage({
                            key: constant.constant.userAccessDataKey,
                            data: gsRes.data,
                            success: function (stRes) {

                              //重置userAccessData值
                              constant.constant.userAccessData = {};
                            },
                            fail: function (stRes) {
                              console.error(stRes);
                            }
                          });

                          //代理商信息存储
                          if (!util.isEmptyStr(gsRes.data.distributerId)) {
                            util.setDistributerId(gsRes.data.distributerId);
                          } else {
                            console.error("代理商信息返回错误(不能为空) gsRes.data.distributerId = " + gsRes.data.distributerId);
                          }

                          // 获取用户信息
                          wx.getSetting({
                            success: gsRes => {

                              console.log(gsRes.authSetting);
                              if (gsRes.authSetting['scope.userInfo']) {
                                // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
                                that.getWxUserInfo();
                              } else {
                                // 未授权
                                console.log("💥 未授权");
                                //TODO:这里在模拟器上不稳定
                                wx.authorize({
                                  scope: 'scope.userInfo',
                                  success() {
                                    //获取微信用户信息
                                    that.getWxUserInfo();
                                  },
                                  fail() {
                                    console.error('获取用户信息失败 ')
                                    console.error(gsRes);
                                  },
                                  complete() {}
                                })
                              }
                            }
                          })
                        } else {
                          console.error(gsRes);
                        }
                      },

                      fail: function (gsRes) {

                        console.error('/weixin/get_session 调用失败'); 
                        console.error(gsRes); 
                      },
                      complete: function (gsRes) { }
                    })
                  } else {
                    console.log('获取用户登录态失败！' + ckRes.errMsg)
                  }
                },

                fail: function (ckRes) {

                  console.error(ckRes);
                  //代理商信息存储
                  util.setDistributerId(distributerId);
                },
                complete: function (ckRes) { }
              });

            },
            complete: function () { }
          });
        }
      } else {

        //跳转到订单查询
        wx: wx.reLaunch({
          url: '/pages/user/visitor/visitor',
          success: function (res) { },
          fail: function (res) {
            console.warn(res);
          },
          complete: function (res) { },
        })
      }
    }
  },

  /**
   * 获取微信用户信息
   */
  getWxUserInfo: function () {

    wx.getUserInfo({
      withCredentials: true,
      lang: 'zh_CN',
      success: res => {

        // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
        // 所以此处加入 callback 以防止这种情况
        if (this.userInfoReadyCallback) {
          this.userInfoReadyCallback(res)
        }
      },

      fail: res => {
        console.warn(res);
      },

      complete: res => {

      }
    })
  },

  /**
 * 用户信息获取成功后回调
 */
  userInfoReadyCallback: function (res) {

    console.log("💥 用户信息获取成功后回调");
    var url = constant.constant.domain + "/weixin/userinfo";
    //发起网络请求
    wx.request({

      url: url,
      method: 'POST',
      header: {
        'content-type': 'application/json' // 默认值
      },

      data: {
        guid: guid,
        userInfo: res.userInfo,
        encryptedData: res.encryptedData,
        iv: res.iv,
        errMsg: res.errMsg
      },

      success: function (res) {

        console.log("第二步：小程序获取用户信息->解析用户信息并存储 成功");
        if (res.statusCode == 200) {
          //TODO 暂不处理
        }
        console.log(res);

      },

      fail: function (res) {
        console.error(res);
      },

      complete: function (res) { }
    });
  },

  // globalData: {
  //   // userInfo:null,

  // },

  constant: constant.constant,
})