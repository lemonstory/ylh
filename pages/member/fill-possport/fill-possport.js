// pages/member/passport.js
const app = getApp();
const Toast = require('../../../zanui-weapp/dist/toast/index');
var util = require('../../../utils/util.js')
var chinaAreaUtil = require('../../../utils/china-area.js')

/**
 * 
 */
Page(Object.assign({}, Toast, {

  data: {

    constant: app.constant,
    currentTapId: '',
    possportItem: {},

    formData: {

      //暂时固定传2
      "type": 2,              //护照归属类型，1会员本人的护照，2会员的常旅客护照(number,required)
      "linkManId": 0,         //常旅客id(number,required)

      //TODO:picUrl本期先不增加 2017-12-22
      "picUrl": '',           //护照照片地址(string,reuqired)

      "chineseName": '',      //中文名(string,required)
      "chineseSurname": '',   //中文姓氏(string,required)
      "englishName": '',      //英文名(string,required)
      "englishSurname": '',   //英文姓氏(string,required)
      "gender": '',           //性别(1男,2女)(string,required)
      "birthday": '',         //生日(string,required)
      "countryId": '',         //国籍(number,required)
      "cardType": '',          //证件类型(number,reuqired)1身份证，2军官证，3护照，4港澳通行证，5台湾通行证，99其它
      "cardNumber": '',       //证件号码(打*)(string,required),
      "issueAreaId": '',       //签发地id(number,required),
      "issueEndTime": '',     //签证有效期(string,required)

      "telphoneCode": '+86',  //国际电话区号

      "mobile": '',           //手机号码(string,required)
      "address": '',          //现居住地(string,required)
    },

    cardName: '',
    genderName: '',
    issueAreaName: '',
    areasArr: [],

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    var that = this;
    if (!util.isEmptyStr(options.linkManId)) {

      that.setData({
        'formData.linkManId': options.linkManId,
      })
    } else {
      console.error("linkManId不能为空")
    }

    //修改资料
    if (!util.isEmptyStr(options.possportItem)) {

      console.log("😀 😀 😀")
      console.log(options.possportItem);
      var possportItem = JSON.parse(options.possportItem);
      console.log(possportItem);

      that.setData({

        'formData.linkManId': possportItem.linkManId,
        'formData.chineseName': possportItem.chineseName,
        'formData.chineseSurname': possportItem.chineseSurname,
        'formData.englishName': possportItem.englishName,
        'formData.englishSurname': possportItem.englishSurname,
        'formData.gender': possportItem.gender,
        'formData.birthday': possportItem.birthday,
        'formData.countryId': possportItem.countryId,
        'formData.cardType': possportItem.cardType,
        'formData.cardNumber': possportItem.cardNumber,
        'formData.issueAreaId': possportItem.issueAreaId,
        'formData.issueEndTime': possportItem.issueEndTime,
        'formData.telphoneCode': possportItem.telphoneCode,
        'formData.mobile': possportItem.mobile,
        'formData.address': possportItem.address,

        cardName: util.getTitleWithId(app.constant.passengerCardType, possportItem.cardType),
        genderName: util.getTitleWithId(app.constant.gender, possportItem.gender),
        issueAreaName: chinaAreaUtil.getAreaName(possportItem.issueAreaId),
      })
    }

    that.setData({
      //获取所以的省
      areasArr: chinaAreaUtil.getItemAreas(37)
    })
  
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
  * 获取input输入的值
  */
  bindInputValueChange: function (event) {

    var that = this;
    that.setData({
      [event.currentTarget.id]: event.detail.value
    })
  },

  /**
   * 自动保存输入值
   */
  autoSaveInputValue: function (event) {

  },

  /**
  * 国家区号-选择
  */
  choiceInternationalCode: function (event) {

    var that = this;
    wx.navigateTo({
      url: '/pages/common/international-code/international-code',
    })
  },

  /**
   * 护照签发地-选择
   */
  bindAreaPickerChange: function (e) {

    var that = this;
    console.log(e);
    console.log('picker发送选择改变，携带值为', e.detail.value)
    var index = e.detail.value;
    console.log("护照签发地")
    console.log(that.data.areasArr[index])

    that.setData({
      'formData.issueAreaId': that.data.areasArr[index].id,
      issueAreaName: that.data.areasArr[index].name
    })
  },

  /**
   * 性别-选择
   */
  bindGenderPickerChange: function (e) {

    var that = this;
    var index = e.detail.value
    var obj = that.data.constant.gender[index];
    that.setData({
      'formData.gender': obj.id,
      genderName: obj.title,
    })
  },

  /**
   * 证件类型-选择
   */
  bindCardTypePickerChange: function (e) {

    var that = this;
    var index = e.detail.value
    var obj = that.data.constant.passengerCardType[index];
    that.setData({
      'formData.cardType': obj.id,
      cardName: obj.title,
    })
  },

  /**
   * 检查输入
   */
  checkInput: function () {

    var that = this;
    if (util.isEmptyStr(that.data.formData.chineseSurname)) {

      that.showZanToast("请填写 中文 姓");
      return false;

    } else if (util.isEmptyStr(that.data.formData.chineseName)) {

      that.showZanToast("请填写 中文 名");
      return false;

    } else if (util.isEmptyStr(that.data.formData.englishSurname)) {

      that.showZanToast("请填写 英文/拼音 姓");
      return false;

    } else if (util.isEmptyStr(that.data.formData.englishName)) {

      that.showZanToast("请填写 英文/拼音 名");
      return false;

    } else if (util.isEmptyStr(that.data.formData.gender)) {

      that.showZanToast("请选择 性别");
      return false;

    } else if (util.isEmptyStr(that.data.formData.birthday)) {

      that.showZanToast("请选择 出生日期");
      return false;

    } else if (util.isEmptyStr(that.data.formData.countryId)) {

      that.showZanToast("请填写国籍");
      return false;

    } else if (util.isEmptyStr(that.data.formData.cardType)) {

      that.showZanToast("请选择 证件类型");
      return false;

    } else if (util.isEmptyStr(that.data.formData.cardNumber)) {

      that.showZanToast("请填写 护照号");
      return false;

    } else if (util.isEmptyStr(that.data.formData.issueAreaId)) {

      that.showZanToast("请选择 护照签发地");
      return false;

    } else if (util.isEmptyStr(that.data.formData.issueEndTime)) {

      that.showZanToast("请选择 护照有效期");
      return false;

    } else if (!util.isMobile(that.data.formData.mobile)) {

      console.log(that.data.formData.mobile);
      that.showZanToast("请检查填写的 手机号码");
      return false;

    } else if (util.isEmptyStr(that.data.formData.mobile)) {

      that.showZanToast("请填写 您的现居住地");
      return false;
    }

    return true;
  },


  /**
  * 保存
  */
  handleTapSaveBtn: function (event) {

    var that = this;
    if (that.checkInput()) {

      var url = that.data.constant.domain + '/distrbuter/member/passport';

      //mobile=telphoneCode_mobile
      //that.data.formData.mobile = that.data.formData.telphoneCode + "_" + that.data.formData.mobile
      wx.request({

        url: url,
        data: that.data.formData,
        method: 'POST',
        header: util.getRequestHeader(),

        success: function (res) {

          if (res.statusCode == 200) {

            console.log("🍺 🍺 🍺 [成功] 增加会员常旅客护照接口")
            let pages = getCurrentPages();//当前页面
            let prevPage = pages[pages.length - 2];//上一页面
            prevPage.setData({
              isReLoad: true
            });

            wx.navigateBack({
              delta: 1,
            });

          } else {

            console.error(res);
            that.showZanToast(res.data.message);
          }
        },

        fail: function (res) {
          console.error(res)
        },

        complete: function (res) {
        }
      })
    }
  },


}));