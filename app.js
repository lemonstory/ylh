//app.js
var constant = require('constant.js');
var guid = '';
App({
  onLaunch: function () {

    var that = this;
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
                  //小程序code
                  code: res.code,
                  //TODO:小程序 代理商distributor
                  distributor: constant.constant.agentId
                },

                header: {
                  'content-type': 'application/json' // 默认值
                },

                success: function (res) {

                  console.log("🍺 🍺 🍺");
                  console.log(res.data)
                  
                  guid = res.data.guid;
                  // 本地存储用户信息
                  wx.setStorage({
                    key: constant.constant.userAccessDataKey,
                    data: res.data,
                    fail: function (res) {
                      console.warn(res);
                    }
                  });

                  // 获取用户信息
                  wx.getSetting({
                    success: res => {
                      if (res.authSetting['scope.userInfo']) {
                        // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
                        that.getWxUserInfo();
                      } else {
                        // 未授权
                        wx.authorize({
                          scope: 'scope.userInfo',
                          success() {

                            //获取微信用户信息
                            that.getWxUserInfo();
                          }
                        })

                      }
                    }
                  })
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

      },

      complete: function () {

        console.log("🚀 🚀 🚀 -- complete");

      }
    });




    // // 登录
    // wx.login({
    //   success: res => {
    //     // 发送 res.code 到后台换取 openId, sessionKey, unionId
    //   }
    // })


  },

  /**
   * 用户信息获取成功后回调
   */
  userInfoReadyCallback: function (res) {

    console.log("用户信息获取成功后回调执行");
    console.log(res);
    console.log("😀 guid = " + guid);


    var url = constant.constant.domain + "/weixin/userinfo";
    //发起网络请求
    wx.request({
      
      url: url,
      method:'POST',
      header: {
        'content-type': 'application/json' // 默认值
      },

      data: {
        guid: guid,
        userInfo: res.userInfo,
        encryptedData: res.encryptedData,
        iv:res.iv,
        errMsg: res.errMsg
      },

      success: function (res) {

        console.log("第二步：小程序获取用户信息->解析用户信息并存储 成功");
        if(res.statusCode == 200) {


        }
        console.log(res);

      },

      fail: function (res) {
        console.warn(res);
      },

      complete: function (res) {}
    });
  },

  /**
   * 获取微信用户信息
   */
  getWxUserInfo: function () {

    wx.getUserInfo({
      withCredentials: true,
      lang: 'zh_CN',
      success: res => {
        // 可以将 res 发送给后台解码出 unionId
        this.globalData.userInfo = res.userInfo

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


  globalData: {
    // userInfo:null,

  },
  constant: constant.constant,
})