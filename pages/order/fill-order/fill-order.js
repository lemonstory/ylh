// pages/API/address-message/address-message.js
const app = getApp();
const Toast = require('../../../zanui-weapp/dist/toast/index');
var util = require('../../../utils/util.js')
Page(Object.assign({}, Toast, {
  data: {
    'constant': app.constant,

    //  开具发票是否为选中状态
    isSelected: 0,
    isUnSelect: 'http://image.365zhiding.com/wxapp/20171210/unselect.png',
    isSelect: 'http://image.365zhiding.com/wxapp/20171210/select.png',
    'actionSheetHidden': true,

    //已选择的出行人信息
    'checkedPassengerList': [],
    'passengerIdStr': '',

    // 选择的地址信息
    'defaultReceiverAddress': '请添加您的收货地址',
    'profileId': 0,

    //用户创建订单数据
    'formData': {
      'pid': 0,                       //产品id(number,required)
      'travelDate': '',               //出行时间(string,required)
      'linkMan': '',                  //订单联系人（string,required）
      'linkTel': '',                  //订单联系电话(string,required)
      'linkEmail': '',                //联系人邮件(string,required)
      'isIncludeBaby': 0,             //是否包含婴儿(number,required)
      'childprice': 0,                  //儿童费用
      'adultprice': 0,                  //成人费用
      'oldprice': 0,                    //老人价
      'postage': 0,                     //快递费用 
      'difference': 0,                  //单房差  

      'tourers': {                    //出行人信息(array,required)
        "subNum": {
          'child': 0,                 //小孩数量
          'adult': 0,                 //成人数量
          'old': 0,                   //老人数量
        },
        "list": [                     //出行人列表(array,required)
          {
            'id': '',                 //游客id
            'name': '',               //出行人姓名
            'cardType': 0,            //证件类型 1身份证，2军官证，3护照，4港澳通行证，5台湾通行证，99其它
            'cardNumber': '',         //证件号码
            'gender': 0,              //性别 0未知，1男，2女
            'ageGroup': 0,            //年龄分组，2儿童，3成人
          },
        ],
      },
      'amount': 0,                    //订单总额(单位分)(number,required)
      'orderBill': {                  //发票信息 如果没有，则为空（array,required）
        'title': '',                  //发票抬头
        'type': 0,                    //发票类型,1个人,2企业
        'taxNum': ''                  //税号
      },
      'receiverAddress': '',          //收货地址(string,required)
      'receiverName': '',             //收货人名称(string,required)
      'receiverTel': '',              //收货人电话
      'distributerId': '',            //代理商ID(number,required)
      'tradeId': app.constant.tradeId,//系统来源(number,required) 10 悦旅汇，20小程序
    },

    //线路名称（标题）
    'title': '',                     //标题
    'day': 0,                        //行程-几天
    'night': 0,                      //行程-几晚



  },

  onLoad: function (options) {

    var that = this;
    if (typeof (options.lineDetail) != 'undefined') {

      console.log("😀 😀 😀");
      console.log(options.lineDetail);

      var lineDetail = JSON.parse(options.lineDetail);
      // var lineDetail = options.lineDetail;
      //将接收的数据设置到本页面
      that.setData({

        title: lineDetail.title,
        day: lineDetail.day,
        night: lineDetail.night,

        'formData.pid': lineDetail.pid,
        'formData.travelDate': lineDetail.travelDate,
        //TODO
        'formData.isIncludeBaby': lineDetail.isAllowBabySelected,
        'formData.childprice': lineDetail.childprice,
        'formData.adultprice': lineDetail.adultprice,
        'formData.oldprice': lineDetail.oldprice,
        'formData.postage': lineDetail.postage,
        'formData.difference': lineDetail.difference,
        'formData.isAddedDifference': lineDetail.isAddedDifference,


        'formData.amount': lineDetail.amount,
        'formData.tourers.subNum.child': lineDetail.tourers.subNum.child,
        'formData.tourers.subNum.adult': lineDetail.tourers.subNum.adult,
        'formData.tourers.subNum.old': lineDetail.tourers.subNum.old,

        'formDatadistributerId': util.getDistributerId(),
      })
    }

    console.log(that.data.formData);
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

    var that = this;

    //选择出行人处理
    if (that.data.checkedPassengerList.length > 0) {
      var passengerIdArrTemp = [];
      var passengerIdStrTemp = '';
      var checkedPassengerListTemp = that.data.checkedPassengerList;

      for (var i = 0; i < checkedPassengerListTemp.length; i++) {
        passengerIdArrTemp.push(checkedPassengerListTemp[i].id);
      }
      passengerIdStrTemp = passengerIdArrTemp.join(',')
      that.setData({
        passengerIdStr: passengerIdStrTemp,
        'formData.tourers.list': checkedPassengerListTemp,

      })
    } else {
      that.setData({
        'passengerIdStr': ''
      })
    }
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

    // console.log(event);
    // console.log("🚀 🚀 🚀");
    var that = this;
    // var formDataTemp = that.data.formData;
    // formDataTemp[event.currentTarget.id] = event.detail.value;
    that.setData({
      [event.currentTarget.id]: event.detail.value
    })
    // console.log("id = " + event.currentTarget.id);
    // console.log('用户输入值为：', event.detail.value)
    // console.log(that.data);
  },


  actionSheetTap: function (e) {
    this.setData({
      actionSheetHidden: !this.data.actionSheetHidden
    })
  },

  actionSheetChange: function (e) {
    this.setData({
      actionSheetHidden: !this.data.actionSheetHidden
    })
  },

  // 开具发票 - 选择 状态
  handleTapSelectType: function () {
    var that = this;
    that.setData({
      isSelected: !this.data.isSelected,
    })
  },

  /**
 * 检查用户输入
 */
  checkInput: function () {

    var that = this;
    if (that.data.formData.linkMan.length <= 0) {

      that.showZanToast("请填写姓名");
      return false;
    }

    if (!util.isMobile(that.data.formData.linkTel)) {

      that.showZanToast("请输入联系电话");
      return false;
    }

    if (that.data.formData.tourers.list.length < that.data.formData.tourers.subNum.child + that.data.formData.tourers.subNum.adult) {

      that.showZanToast("请选择出行人");
      return false;
    }
    if (that.data.formData.receiverAddress.length <= 0) {

      that.showZanToast("请添加您的收货地址");
      return false;
    }

    if (that.data.formData.linkEmail.length > 0 && !util.isEmail(that.data.formData.linkEmail)) {

      that.showZanToast("请检查输入的电子邮箱地址");
      return false;
    }
    return true;
  },

  /**
 * 
 * 下一步
 */
  handleTapNextStep: function () {

    var that = this;
    if (that.checkInput()) {

      var url = '/pages/order/pay-confirm/pay-confirm';
      console.log("url = " + url);
      wx.navigateTo({
        url: url,
        success: function (res) { },
        fail: function (res) {
          that.showZanToast("页面跳转错误");
        },
        complete: function (res) { },
      })
    }
  }
}));