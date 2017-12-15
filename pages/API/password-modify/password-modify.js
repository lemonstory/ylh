// pages/API/password-modify/password-modify.js
Page({
  data: {
    oldPasswdInputType: "password",
    oldPasswdIconUrl: "../image/pass.png",
    isShowOldPasswd: false,
    newPasswdInputType: "password",
    newPasswdIconUrl: "../image/pass.png",
    isShowNewPasswd: false,
    oldPasswdValue: '',
    newPasswdValue: ''
},

  bindKeyInput: function (e) {
    var id = e.currentTarget.dataset.id;
    if (id == "oldPasswd") {
      this.setData({
        oldPasswdValue: e.detail.value,
        delButton: true
      });
    } else if (id == "newPasswd") {
      this.setData({
        newPasswdValue: e.detail.value,
        delButton1: true
      });
    }
  },

clearInput: function (e) {
    var id = e.currentTarget.dataset.id;
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
changeOldPassType() {
    this.data.isShowOldPasswd = !this.data.isShowOldPasswd;
    console.log(this.data.isShowOldPasswd);
    if (this.data.isShowOldPasswd) {
      console.log(1111)
      this.setData({
        oldPasswdInputType: "text",
        oldPasswdIconUrl: "../image/passcan.png",
      })
    } else {
      console.log(2222);
      this.setData({
        oldPasswdInputType: "password",
        oldPasswdIconUrl: "../image/pass.png"
      })
    }
  },
  changeNewPassType() {
    this.data.isShowNewPasswd = !this.data.isShowNewPasswd;
    if (this.data.isShowNewPasswd) {
      console.log(1111)
      this.setData({
        newPasswdInputType: "text",
        newPasswdIconUrl: "../image/passcan.png",
      })
    } else {
      console.log(2222);
      this.setData({
        newPasswdInputType: "password",
        newPasswdIconUrl: "../image/pass.png"
      })
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

  }
})