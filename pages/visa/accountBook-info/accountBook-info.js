// pages/visa/accountBook-info/accountBook-info.js
const app = getApp();
const Toast = require('../../../zanui-weapp/dist/toast/index');
var util = require('../../../utils/util.js');
Page({
  /**
   * 页面的初始数据
   */
  data: {
    imageSrc: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    console.log('户口本')
    console.log(options);
    var imageface = options.imageface;
    var accountBookInfoStemp = JSON.parse(options.accountBookInfo);
    var accountBookInfo = accountBookInfoStemp[0]
    console.log(accountBookInfo)
    // 户口本信息Obj
    var accountBookObjInfo = {};
    for (var i = 1; i < accountBookInfo.length; i++) {
      if (i>=1 || i <=5) {
        if (accountBookInfo[i].length == 4) {
          if (i == 1) {
            if (!util.isEmptyStr(accountBookInfo[i][1].text)) {
              accountBookObjInfo.name = accountBookInfo[i][1].text[0]
            }
            if (!util.isEmptyStr(accountBookInfo[i][3].text)) {
              accountBookObjInfo.relation = accountBookInfo[i][3].text[0]
            }
          }
          if (i == 2) {
            if (!util.isEmptyStr(accountBookInfo[i][1].text)) {
              accountBookObjInfo.oldName = accountBookInfo[i][1].text[0]
            }
            if (!util.isEmptyStr(accountBookInfo[i][3].text)) {
              accountBookObjInfo.sex = accountBookInfo[i][3].text[0]
            }
          } 
          if (i == 3) {
            if (!util.isEmptyStr(accountBookInfo[i][1].text)) {
              accountBookObjInfo.birthPlace = accountBookInfo[i][1].text[0]
            }
            if (!util.isEmptyStr(accountBookInfo[i][3].text)) {
              accountBookObjInfo.ethnicGroup = accountBookInfo[i][3].text[0]
            }
          }
          if (i == 4) {
            if (!util.isEmptyStr(accountBookInfo[i][1].text)) {
              accountBookObjInfo.nativePlace = accountBookInfo[i][1].text[0]
            }
            if (!util.isEmptyStr(accountBookInfo[i][3].text)) {
              accountBookObjInfo.birthday = accountBookInfo[i][3].text[0]
            }
          }
          if (i == 5) {
            if (!util.isEmptyStr(accountBookInfo[i][1].text)) {
              accountBookObjInfo.address = accountBookInfo[i][1].text[0]
            }
            if (!util.isEmptyStr(accountBookInfo[i][3].text)) {
              accountBookObjInfo.religion = accountBookInfo[i][3].text[0]
            }
          } 
        }
      }
      if (i>=6 || i<=7) {
        if (accountBookInfo[i].length == 6) {
          if (i == 6) {
            if (!util.isEmptyStr(accountBookInfo[i][1].text)) {
              accountBookObjInfo.IDCard = accountBookInfo[i][1].text[0]
            }
            if (!util.isEmptyStr(accountBookInfo[i][3].text)) {
              accountBookObjInfo.height = accountBookInfo[i][3].text[0]
            }
            if (!util.isEmptyStr(accountBookInfo[i][5].text)) {
              accountBookObjInfo.bloodType = accountBookInfo[i][5].text[0]
            }
          }
          if (i == 7) {
            if (!util.isEmptyStr(accountBookInfo[i][1].text)) {
              accountBookObjInfo.education = accountBookInfo[i][1].text[0]
            }
            if (!util.isEmptyStr(accountBookInfo[i][3].text)) {
              accountBookObjInfo.marry = accountBookInfo[i][3].text[0]
            }
            if (!util.isEmptyStr(accountBookInfo[i][5].text)) {
              accountBookObjInfo.soldier = accountBookInfo[i][5].text[0]
            }
          }
        }
      }
      if (i==8) {
        if (accountBookInfo[i].length == 4) {
          if (!util.isEmptyStr(accountBookInfo[i][1].text)) {
            accountBookObjInfo.service = accountBookInfo[i][1].text[0]
          }
          if (!util.isEmptyStr(accountBookInfo[i][3].text)) {
            accountBookObjInfo.job = accountBookInfo[i][3].text[0]
          }
        }
      }

      if (i>=9 || i <=10) {
        if (accountBookInfo[i].length == 2) {
          if (i == 9) {
            if (!util.isEmptyStr(accountBookInfo[i][1].text)) {
              accountBookObjInfo.migrationTime = accountBookInfo[i][1].text[0]
            }
          }
          if (i == 10) {
            if (!util.isEmptyStr(accountBookInfo[i][1].text)) {
              accountBookObjInfo.migrationArea = accountBookInfo[i][1].text[0]
            }
          }
        }
      }
    }
    console.log(accountBookObjInfo)
    if (!util.isEmptyStr(imageface)) {
      that.setData({
        imageSrc: imageface,
        accountBookInfo: accountBookObjInfo
      })
    }
    // console.log(that.data.imageSrc);
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

  }
})