// pages/API/password-modify/password-modify.js
var util = require('../../../utils/util.js');
const app = getApp();
const Toast = require('../../../zanui-weapp/dist/toast/index');

Page(Object.assign({}, Toast, {
  data: {
   'constant': app.constant,
    oldPasswdInputType: "password",
    oldPasswdIconUrl: "http://image.365zhiding.com/wxapp/20171221/pass.png",
    isShowOldPasswd: false,
    newPasswdInputType: "password",
    newPasswdIconUrl: "http://image.365zhiding.com/wxapp/20171221/pass.png",
    isShowNewPasswd: false,
    againPassword:'',

// 接口 post数据
    formData: {    
      'name': 'D10004',
      'password': '',
      'oldPassword': '666666',
    }
},
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
   * 获取用户的名
   */
  getUserName: function () {

  },


  /**
   * 修改密码
   */
  changePassword: function () {
    var that = this;
    // var url = "https://qa-distributor.yuelvhui.com/distributerShop/findShopByPrimaryKey?distributerId=1"
    var url = that.data.constant.distributer + "/distributerAccount/updatePassword";

    if (!util.isEmptyStr(that.data.formData.password) && !util.isEmptyStr(that.data.formData.oldPassword) && !util.isEmptyStr(that.data.againPassword) ){
        if (that.data.againPassword == that.data.formData.password){     // 若密码确认一致
          wx.request({
            url: url,
            data: that.data.formData,
            header: util.postRequestHeader(),
            method: 'POST',
            success: function (res) {
              that.showZanToast(res.message);
              that.onPasswordUpdate();
              // 密码修改成功，执行下一步事件
            },
            fail: function (res) {
              console.log("出错了！");
              that.showZanToast(res.message);
            },
            complete: function (res) {
              console.log(res);

            }
          })
        }else{     // 密码不一致
          that.showZanToast("请确认密码是否一致");
        }
      }else{
        that.showZanToast("请完善修改信息！");
      }

  },

  /**
   *  密码修改成功后事件
   */
  onPasswordUpdate:function () {
    // TODO 

  },

  /**
   * 监听输入框事件
   */
  bindInputValueChange:function (event) {
    var that = this;
    var formDataTemp = that.data.formData;
    formDataTemp[event.currentTarget.dataset.id] = event.detail.value;
    that.setData({
      formData: formDataTemp
    })
    console.log(that.data.formData);
  },

/**
 * 确认密码是否一致
 */
handlePassworderIsFit:function(e){
  var that  = this;
  var password = e.detail.value;
  console.log(password);
  that.setData({
    againPassword:password,
  })
},

/**
 * 清空输入框
 */
  handleTapClearInput: function (event) {
    var id = event.currentTarget.dataset.id;
    if (id == "oldPasswdClear") {
      this.setData({
        oldPasswdValue: "",
        delButton: false
      });
    } else if (id == "newPasswdClear") {
      this.setData({
        newPasswdValue: "",
        delButton1: false
      });
    }
  },

/**
 * 控制原始密码的显示状态
 */
  changeOldPassType() {
    this.data.isShowOldPasswd = !this.data.isShowOldPasswd;
    console.log(this.data.isShowOldPasswd);
    if (this.data.isShowOldPasswd) {
      console.log(1111)
      this.setData({
        oldPasswdInputType: "text",
        oldPasswdIconUrl: "http://image.365zhiding.com/wxapp/20171221/passcan.png",
      })
    } else {
      console.log(2222);
      this.setData({
        oldPasswdInputType: "password",
        oldPasswdIconUrl: "http://image.365zhiding.com/wxapp/20171221/pass.png"
      })
    }
  },

/**
 *  控制新密码的显示状态
 */
  changeNewPassType() {
    this.data.isShowNewPasswd = !this.data.isShowNewPasswd;
    if (this.data.isShowNewPasswd) {
      console.log(1111)
      this.setData({
        newPasswdInputType: "text",
        newPasswdIconUrl: "http://image.365zhiding.com/wxapp/20171221/passcan.png",
      })
    } else {
      console.log(2222);
      this.setData({
        newPasswdInputType: "password",
        newPasswdIconUrl: "http://image.365zhiding.com/wxapp/20171221/pass.png"
      })
    }
  },



}))