// pages/API/add-person-message/add-person-message.js
const app = getApp();
const Toast = require('../../../zanui-weapp/dist/toast/index');
var util = require('../../../utils/util.js')
Page(Object.assign({}, Toast, {

  data: {
    'constant': app.constant,
    'name': '',
    'title': 0,
    'mobile': '',
    'cardType': 0,
    'cardNumber': '',
    'ageGroup': 0,
    'gender': -1,

    'id': 0,
    'newId': 0,
    'cardTitle': '',
    'passengerTitle': '',

    //显示底部弹窗
    'isShowCardTypeBottomPopup': false,
    'isShowTitleBottomPopup': false,

    //是否是修改
    'isUpdate': false,


    //[重要]出行人的性别,和其他地方不一致 0：女， 1：男
    passengerGender: [{
      id: '1',
      title: '男'
    }, {
      id: '0',
      title: '女'
    }],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    var that = this;
    var itemJsonStr = options.itemJsonStr;
    console.log("🦃 🦃 🦃")
    console.log("itemJsonStr = " + itemJsonStr);

    if (typeof (itemJsonStr) != "undefined") {

      //修改页面标题
      wx.setNavigationBarTitle({
        title: "修改出行人",
        fail: function (res) {
          console.log(res)
          hat.showZanToast("修改页面标题错误");
        },
      });

      var item = JSON.parse(itemJsonStr);
      that.setData({
        'isUpdate': true,
        'id': item.id,
        'name': item.name,
        'title': item.title,
        'mobile': item.mobile,
        'cardType': item.cardType,
        'cardNumber': item.cardNumber,
        'ageGroup': item.ageGroup,
        'gender': item.gender,


        'cardTitle': util.getTitleWithId(app.constant.passengerCardType, item.cardType),
        'passengerTitle': util.getTitleWithId(app.constant.passengerTitle, item.title)
      })

      console.log(that.data);
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

  toggleCardTypeBottomPopup() {
    this.setData({
      isShowCardTypeBottomPopup: !this.data.isShowCardTypeBottomPopup
    });
  },

  toggleTitleBottomPopup() {
    this.setData({
      isShowTitleBottomPopup: !this.data.isShowTitleBottomPopup
    });
  },

  /**
   * 
   */
  handleSeletedCardType: function (event) {

    console.log(event);
    var id = event.currentTarget.dataset.id;
    var title = event.currentTarget.dataset.title;

    this.setData({
      'isShowCardTypeBottomPopup': !this.data.isShowCardTypeBottomPopup,
      'cardType': id,
      'cardTitle': title
    });
  },

  /**
   * 职业身份选择
   */

  handleSeletedTitle: function (event) {

    console.log(event);
    var id = event.currentTarget.dataset.id;
    var title = event.currentTarget.dataset.title;

    this.setData({
      'isShowTitleBottomPopup': !this.data.isShowTitleBottomPopup,
      'title': id,
      'passengerTitle': title
    });
  },

  /**
   * 性别选择
   */
  ageGroupRadioChange: function (event) {

    this.setData({
      ageGroup: event.detail.value
    })
  },

  /**
   * 年龄分组(儿童,成人)选择
   */
  genderRadioChange: function (event) {

    this.setData({
      gender: event.detail.value
    })
  },

  /**
   * 姓名输入处理
   */
  bindNameKeyInput: function (event) {
    this.setData({
      name: event.detail.value
    })
  },

  /**
  * 姓名输入处理
  */
  bindNameKeyInput: function (event) {
    this.setData({
      name: event.detail.value
    })
  },

  /**
  * 姓名输入处理
  */
  bindMobileKeyInput: function (event) {
    this.setData({
      mobile: event.detail.value
    })
  },

  /**
   * 证件号码输入
   */
  bindCardNumberInput: function (event) {
    this.setData({
      cardNumber: event.detail.value
    })
  },

  checkInput: function () {

    var that = this;
    if (that.data.name.length <= 0) {

      that.showZanToast("请填写中文名称");
      return false;
    }

    if (that.data.name.length > 10) {

      that.showZanToast("中文名称最多10个汉字");
      return false;
    }

    if (parseInt(that.data.title) <= 0) {

      that.showZanToast("请选择职业身份");
      return false;
    }

    if (parseInt(that.data.cardType) <= 0) {

      that.showZanToast("请选择证件类型");
      return false;
    }

    if (that.data.cardNumber.length <= 0) {

      that.showZanToast("请选择证件号码");
      return false;
    }

    if (parseInt(that.data.gender) < 0) {

      that.showZanToast("请选择性别");
      return false;
    }

    if (parseInt(that.data.ageGroup) <= 0) {

      that.showZanToast("请选择年龄分组(成人, 儿童)");
      return false;
    }

    if (1 == that.data.cardType && !util.isValidID(that.data.cardNumber)) {

      that.showZanToast("请检查输入的身份证号");
      return false;
    }

    if (!util.isMobile(that.data.mobile) && !util.isTelephone(that.data.mobile)) {

      that.showZanToast("请输入联系电话");
      return false;
    }



    return true;
  },

  /**
   * 完成处理
   */
  handleSaveTap: function (event) {

    var that = this;
    if (that.checkInput()) {

      wx.showLoading({
        title: '加载中',
      })

      //添加出行人接口
      var url = that.data.constant.domain + '/distrbuter/member/passenger';

      //修改出行人接口
      if (that.data.isUpdate) {
        url = url + "/update";
      }

      wx.request({
        url: url,
        data: {
          //数据urlencode方式编码，变量间用&连接，再post
          'id': that.data.id,
          'name': that.data.name,
          'title': that.data.title,
          'mobile': that.data.mobile,
          'cardType': that.data.cardType,
          'cardNumber': that.data.cardNumber,
          'ageGroup': that.data.ageGroup,
          'gender': that.data.gender,
        },
        method: 'POST',
        header: util.getRequestHeader(),

        success: function (res) {
          var id = res.data.id
          that.setData({
            'newId': id
          })
        },

        fail: function (res) {
          //测试
          var res = JSON.stringify(res);
          that.showZanToast(res);
        },

        complete: function (res) {
          wx.hideLoading();
          wx.redirectTo({
            url: '/pages/order/choice-passenger/choice-passenger',
          })
        }
      });
    }
  },
}));