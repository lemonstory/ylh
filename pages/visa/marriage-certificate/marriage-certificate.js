// pages/visa/marriage-certificate/marriage-certificate.js
const app = getApp();
const Toast = require('../../../zanui-weapp/dist/toast/index');
var util = require('../../../utils/util.js');
var constant = require('../../../constant.js')
Page({
  /**
   * 页面的初始数据
   */
  data: {
    imageSrc: '',
    certificateObjInfo:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var imageface = options.imageface;
    var certificateInfo = JSON.parse(options.certificateInfo);
    console.log(imageface)
    console.log(certificateInfo)
    var certificateObjInfo = that.data.certificateObjInfo;
    // 姓名、性别出现的次数
    var stemp = 0;
    for (var i = 0; i < certificateInfo.length-1; i++) {
      // 去除空格
      var str = certificateInfo[i].word.replace(/\s+/g, "");
      if (str == '姓名') {
        if (certificateInfo[i + 2].word == '性别') {
          if (certificateInfo[i + 4].word == '国籍') {
            if (certificateInfo[i + 6].word == '出生日期') {
              stemp++;
            }
          }
        }
      }
      if (str == '持证人') {
        if (constant.constant.marriageCertificateField.indexOf(certificateInfo[i + 1].word) == -1) {
          certificateObjInfo.holder = certificateInfo[i + 1].word
        }
      }
      if (str == '登记日期') {
        if (constant.constant.marriageCertificateField.indexOf(certificateInfo[i + 1].word) == -1) {
          certificateObjInfo.registrationDate = certificateInfo[i + 1].word
        }
      }
      if (str == '结婚证字号') {
        if (constant.constant.marriageCertificateField.indexOf(certificateInfo[i + 1].word) == -1) {
          certificateObjInfo.number = certificateInfo[i + 1].word
        }
      }
      if (str == '备注') {
        if (certificateInfo[i + 1].word == '姓名') {
          if (constant.constant.marriageCertificateField.indexOf(certificateInfo[i + 2].word) == -1) {
            certificateObjInfo.name1 = certificateInfo[i + 2].word
          }
        } 
      }
      if (stemp == 1) {
        if (str == '性别') {
          if (constant.constant.marriageCertificateField.indexOf(certificateInfo[i + 1].word) == -1) {
            certificateObjInfo.sex1 = certificateInfo[i + 1].word
          }
        }
        if (str == '国籍') {
          if (constant.constant.marriageCertificateField.indexOf(certificateInfo[i + 1].word) == -1) {
            certificateObjInfo.nationality1 = certificateInfo[i + 1].word
          }
        }
        if (str == '出生日期') {
          if (constant.constant.marriageCertificateField.indexOf(certificateInfo[i + 1].word) == -1) {
            certificateObjInfo.birthday1 = certificateInfo[i + 1].word
          }
        }
        if (str == '身份证件号') {
          if (constant.constant.marriageCertificateField.indexOf(certificateInfo[i + 1].word) == -1) {
            certificateObjInfo.IDCard1 = certificateInfo[i + 1].word
          }
        }
      } 
      if (stemp == 2) {
        if (str == '姓名') {
          if (constant.constant.marriageCertificateField.indexOf(certificateInfo[i + 1].word) == -1) {
            certificateObjInfo.name2 = certificateInfo[i + 1].word
          }
        }
        if (str == '性别') {
          if (constant.constant.marriageCertificateField.indexOf(certificateInfo[i + 1].word) == -1) {
            certificateObjInfo.sex2 = certificateInfo[i + 1].word
          }
        }
        if (str == '国籍') {
          if (constant.constant.marriageCertificateField.indexOf(certificateInfo[i + 1].word) == -1) {
            certificateObjInfo.nationality2 = certificateInfo[i + 1].word
          }
        }
        if (str == '出生日期') {
          if (constant.constant.marriageCertificateField.indexOf(certificateInfo[i + 1].word) == -1) {
            certificateObjInfo.birthday2 = certificateInfo[i + 1].word
          }
        }
        if (str == '身份证件号') {
          if (constant.constant.marriageCertificateField.indexOf(certificateInfo[i + 1].word) == -1) {
            certificateObjInfo.IDCard2 = certificateInfo[i + 1].word
          }
        }
      } 
    }
    if (!util.isEmptyStr(imageface)) {
      that.setData({
        imageSrc: imageface,
        certificateInfo: certificateObjInfo
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