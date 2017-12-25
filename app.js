//app.js
var constant = require('constant.js');
var util = require('./utils/util.js');
var guid = '';

App({

  onLaunch: function (options) {

    console.log("🚀 App->onLaunch options ↓");
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

      console.log("🚚 🚚 🚚 [代理商ID] getParamDistributerId = " + getParamDistributerId + ", localDistributerId = " + localDistributerId);
      console.log(typeof (distributerId));
      if (!util.isEmptyStr(distributerId)) {


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

                console.log("🏃 🏃 🏃");
                console.log(res);
                console.log(constant);
                var url = constant.constant.domain + "/weixin/get_session";
                console.log("url = " + url);
                if (res.code) {
                  //发起网络请求
                  wx.request({
                    url: url,
                    data: {
                      code: res.code,
                      distributerId: distributerId
                    },

                    header: {
                      'content-type': 'application/json' // 默认值
                    },

                    success: function (res) {

                      guid = res.data.guid;
                      // 本地存储用户信息
                      wx.setStorage({
                        key: constant.constant.userAccessDataKey,
                        data: res.data,
                        success: function (res) {

                          //重置userAccessData值
                          console.log("[重置] 本地存储 userAccessData ")
                          constant.constant.userAccessData = {};
                        },
                        fail: function (res) {
                          console.warn(res);
                        }
                      });

                      //代理商信息存储
                      if (!util.isEmptyStr(res.data.distributerId)) {
                        util.setDistributerId(res.data.distributerId);
                      } else {

                        console.error("res.data.distributerId = " + res.data.distributerId);
                      }

                      // 获取用户信息
                      wx.getSetting({
                        success: res => {

                          console.log(res.authSetting);
                          if (res.authSetting['scope.userInfo']) {
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
                                console.log("失败 调用")
                                console.warn(res);
                              },
                              complete() {
                                console.log("完成 调用")
                              }
                            })

                          }
                        }
                      })
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
                //代理商信息存储
                util.setDistributerId(distributerId);
              },
              complete: function (res) { }
            });

          },

          complete: function () { }
        });
      
      } else {

        //跳转到订单查询
        wx: wx.redirectTo({
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