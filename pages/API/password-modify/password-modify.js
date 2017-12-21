// pages/API/password-modify/password-modify.js
var util = require('../../../utils/util.js');
const Toast = require('../../../zanui-weapp/dist/toast/index');
var util = require('../../../utils/util.js');
Page(Object.assign({}, Toast, {
     data: {
          oldPasswdInputType: "password",
          oldPasswdIconUrl: "../image/pass.png",
          isShowOldPasswd: false,
          newPasswdInputType: "password",
          newPasswdIconUrl: "../image/pass.png",
          isShowNewPasswd: false,
          oldPasswdValue: '',
          newPasswdValue: '',
          "formData": {
               'passWord': '',
               'oldPassword': '',
               'againPassWord': '',
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

     //获取接口
     // getData: function () {
     //      var that = this;
     //      // var url = "https://qa-distributor.yuelvhui.com/distributerAccount/updatePassword";
     //      console.log("url = " + url);
     //      wx.request({
     //           url: url,
     //           data: {},
     //           method:'POST',
     //           header: util.getRequestHeader(),
     //           success: function (res) {
     //                console.log("### success ###");
     //                console.log(res.data);
     //                that.setData(res.data);

     //           },
     //           fail: function (res) {
     //                console.log("### fail ###");
     //                console.log(res);
     //           },

     //      })
     // },

     /**
             * 获取input输入的值
             */
     bindInputValueChange: function (event) {
          // var that = this;
          // console.log(that.data.formData);
          // var id = event.currentTarget.dataset.id;
          // if (id == "oldPasswd") {
          //      that.setData({
          //           oldPasswdValue: event.detail.value,
          //           delButton: true
          //      });
          // } else if (id == "newPasswd") {
          //      that.setData({
          //           newPasswdValue: event.detail.value,
          //           delButton1: true
          //      });
          // }

          var that = this;
          var formDataTemp = that.data.formData;
          formDataTemp[event.currentTarget.id] = event.detail.value;
          that.setData({
               formData: formDataTemp
          })
     },

     // 清除input输入框
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

     /**
   * 检查用户输入
   */
     checkInput: function () {

          var that = this;
          if (that.data.formData.passWord.length <= 0) {

               that.showZanToast("请填写姓名");
               return false;
          }

          // if (!util.isMobile(that.data.formData.linkTel)) {

          //      that.showZanToast("请输入联系电话");
          //      return false;
          // }
     }


}))