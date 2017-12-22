// pages/member/passport.js
const app = getApp();
const Toast = require('../../../zanui-weapp/dist/toast/index');
var util = require('../../../utils/util.js')

/**
 * 
 */
Page(Object.assign({}, Toast, {

  data: {

    constant: app.constant,
    isShowBottomPopup:false,
    currentTapId:'',

    formData: {

      "type": 1, //护照归属类型，1会员本人的护照，2会员的常旅客护照(number,required)
      "linkManId": 1,//常旅客id(number,required)
      "picUrl": 'http://xxxx',//护照照片地址(string,reuqired)
      "chineseName": "司马懿",//中文名(string,required)
      "chineseSurname": "司马",//中文姓氏(string,required)
      "englishName": "Mike",//英文名(string,required)
      "englishSurname": "smis",//英文姓氏(string,required)
      "gender": 1,//性别(1男,2女)(string,required)
      "birthday": '1991-11-04',//生日(string,required)
      "countryId": 1,//国籍(number,required)
      "cardType": 1,//证件类型(number,reuqired)1身份证，2军官证，3护照，4港澳通行证，5台湾通行证，99其它
      "cardNumber": "5107**********8517",//证件号码(打*)(string,required),
      "issueAreaId": 1,//签发地id(number,required),
      "issueEndTime": "2017-10-12",//签证有效期(string,required)
      "mobile": '18971133569',//手机号码(string,required)
      "address": '北京槐房',//现居住地(string,required)
    },

    cardName:'',
    genderName:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    var that = this;
    if (!util.isEmptyStr(options.linkManId)) {

      that.setData({
        'formData.linkManId': options.linkManId
      })
    } else {
      console.error("linkManId不能为空")
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
   * 保存
   */
  handleTapSaveBtn: function (event) {

    var that = this;
    var url = that.data.constant.domain + '/distrbuter/member/passport';
    wx.request({

      url: url,
      data: that.data.formData,
      method: 'POST',
      header: util.postRequestHeader(),

      success: function (res) {

        if(res.statusCode == 200) {

          console.log("🍺 🍺 🍺 [成功] 增加会员常旅客护照接口")
          wx.navigateBack({
            delta: 1,
          });

        }else{

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
  },

  /**
   * 
   */
  handleSeletedPopupOption:function(event) {

    console.log(event);
    var id = event.currentTarget.dataset.id;
    var title = event.currentTarget.dataset.title;
    var targetIdKey = event.currentTarget.dataset.target_id_key;
    var targetTitleKey = event.currentTarget.dataset.target_title_key;

    this.setData({
      'isShowBottomPopup': !this.data.isShowBottomPopup,
      [targetIdKey]: id,
      [targetTitleKey]: title
    });

    console.log(this.data);

  },

  toggleBottomPopup:function(event) {

    var id = event.currentTarget.id;

    this.setData({

      currentTapId: id,
      isShowBottomPopup: !this.data.isShowBottomPopup
    });
  }

}));