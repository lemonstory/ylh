// pages/API/address-message/address-message.js
const app = getApp();
const Toast = require('../../../zanui-weapp/dist/toast/index');
var util = require('../../../utils/util.js')
Page(Object.assign({}, Toast, {
  data: {
    'constant': app.constant,

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
      'isIncludeOld': 0,              //是否包含老人(number,required)
      'tourers': {                    //出行人信息(array,required)
        "subNum": {
          'child': 0,                 //小孩数量
          'adult': 0,                 //成人数量
        },
        "list": [                     //出行人列表(array,required)
          {
            'name': '',               //出行人姓名
            'cardType': 0,            //证件类型 1身份证，2军官证，3护照，4港澳通行证，5台湾通行证，99其它
            'cardNumber': '',         //证件号码
            'title': 0,               //职业身份 1学龄前儿童，2在校学生，3在职人员，4自由职业者，5退休人员
            'gender': 0,              //性别 0未知，1男，2女
            'ageGroup': 0,            //年龄分组，2儿童，3成人
          },
        ],
      },
      'amount': 0,                    //订单总额(单位分)(number,required)
      'orderBill': {                  //发票信息（array,required）
        'title': '',                  //发票抬头
        'type': 0,                    //发票类型,1个人,2企业
        'taxNum': ''                  //税号
      },
      'receiverAddress': '',          //收货地址(string,required)
      'agentId': app.constant.agentId,//代理商ID(number,required)
      'tradeId': app.constant.tradeId,//系统来源(number,required) 10 悦旅汇，20小程序
    },

    //线路名称（标题）
    'title': '',                     //标题
    'day': 0,                        //行程-几天
    'night': 0,                      //行程-几晚
    'difference': 0,                 //单房差
    "adultprice":0,                  //成人费用
    "childprice":0,                  //儿童费用
    "postage":0                      //快递费用                       
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    var that = this;

    //接收从上一个的传值
    //数据示例
    options.lineDetail = {

      //产品id
      'pid': 1,
      //出行时间
      'travelDate': '2017-11-05',
      //线路名称
      'title': '4日双飞，赶海踏浪，扬帆出海，极地海洋世界，玩海零距离',
      //线路持续天数
      'day': 4,
      //线路持续夜数
      'night': 3,

      //预付单房差
      //选择日期 -> suitList->difference
      'difference': 75000,

      //订单总额(单位分)
      'amount': 650000,

      //TODO:缺少费用明细里面的数据

      //出行人信息(array,required)
      'tourers': {
        "subNum": {
          //小孩数量
          'child': 1,
          //成人数量
          'adult': 1,
        },
      },

      //是否包含婴儿(number,required)
      'isIncludeBaby': 1,
      //是否包含老人(number,required)
      'isIncludeOld': 1,

      "adultprice": 200,                  //成人费用
      "childprice": 100,                  //儿童费用
      "postage": 20                      //快递费用   
    }


    if (typeof (options.lineDetail) != 'undefined') {

      // var lineDetail = JSON.parse(options.lineDetail);
      var lineDetail = options.lineDetail;
      //将接收的数据设置到本页面
      that.setData({

        title: lineDetail.title,
        day: lineDetail.day,
        night: lineDetail.night,
        difference: lineDetail.difference,
        adultprice: lineDetail.adultprice,
        childprice: lineDetail.childprice,
        postage: lineDetail.postage,
        'formData.travelDate': lineDetail.travelDate,
        'formData.amount': lineDetail.amount,
        'formData.tourers.subNum.child': lineDetail.tourers.subNum.child,
        'formData.tourers.subNum.adult': lineDetail.tourers.subNum.adult,
        'formData.tourers.isIncludeBaby': lineDetail.isIncludeBaby,
        'formData.tourers.isIncludeOld': lineDetail.isIncludeOld,
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

  /**
 * 检查用户输入
 */
  checkInput: function () {

    var that = this;
    // if (that.data.formData.linkMan.length <= 0) {

    //   that.showZanToast("请填写姓名");
    //   return false;
    // }

    // if (!util.isMobile(that.data.formData.linkTel)) {

    //   that.showZanToast("请输入联系电话");
    //   return false;
    // }

    // if (that.data.formData.tourers.list.length < that.data.formData.tourers.subNum.child + that.data.formData.tourers.subNum.adult) {

    //   that.showZanToast("请选择出行人");
    //   return false;
    // }
    // if (that.data.formData.receiverAddress.length <= 0) {

    //   that.showZanToast("请添加您的收货地址");
    //   return false;
    // }

    // if (that.data.formData.linkEmail.length > 0 && !util.isEmail(that.data.formData.linkEmail)) {

    //   that.showZanToast("请检查输入的电子邮箱地址");
    //   return false;
    // }
    return true;
  },

  /**
 * 
 * 下一步
 */
  handleTapNextStep: function () {

    var that = this;
    if (that.checkInput()) {

      var url = '../pay-confirm/pay-confirm';
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