// pages/API/address-message/address-message.js
const app = getApp();
const Toast = require('../../../zanui-weapp/dist/toast/index');
var util = require('../../../utils/util.js')
var chinaArea = require('../../../utils/china-area.js')
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

    // 收货地址显示信息
    'defaultReceiverAddress': '请添加您的收货地址',
    'profileId': 0,
    // 收货地址信息
    'receiverAddress': {},

    //用户创建订单数据
    'formData': {
      'pid': 0,                       //产品id(number,required)
      'travelDate': '',               //出行时间(string,required)
      'linkMan': '',                  //订单联系人（string,required）
      'linkTel': '',                  //订单联系电话(string,required)
      'linkEmail': '',                //联系人邮件(string,required)
      'isIncludeBaby': 0,             //是否包含婴儿(number,required)
      'suitId': 0,                    //套餐id(number,required)
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
          // {
          //   'id': 0,               //游客id
          //   'name': '',            //出行人姓名
          //   "mobile": '',          //电话
          //   'cardType': 0,         //证件类型 1身份证，2军官证，3护照，4港澳通行证，5台湾通行证，99其它
          //   'cardNumber': '',      //证件号码
          //   'title': 0,            //职业身份 1学龄前儿童，2在校学生，3在职人员，4自由职业者，5退休人员
          //   'gender': 0,           //性别 0未知，1男，2女
          //   'ageGroup': 0,         //年龄分组，2儿童，3成人，4老人
          // }
        ],
      },
      'amount': 0,                    //订单总额(单位分)(number,required)
      'orderBill': {                  //发票信息 如果没有，则为空（array,required）
        // 'title': '',                  //发票抬头
        // 'type': 0,                    //发票类型,1个人,2企业
        // 'taxNum': ''                  //税号
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

      var lineDetail = JSON.parse(options.lineDetail);
      //将接收的数据设置到本页面
      that.setData({

        title: lineDetail.title,
        day: util.isEmptyStr(lineDetail.day) ? 0 : lineDetail.day,
        night: util.isEmptyStr(lineDetail.night) ? 0 : lineDetail.night,

        'formData.pid': lineDetail.pid,
        'formData.travelDate': lineDetail.travelDate,
        'formData.isIncludeBaby': lineDetail.isAllowBabySelected,
        'formData.childprice': lineDetail.childprice,
        'formData.adultprice': lineDetail.adultprice,
        'formData.oldprice': lineDetail.oldprice,
        'formData.postage': lineDetail.postage,
        'formData.difference': lineDetail.difference,
        'formData.isAddedDifference': lineDetail.isAddedDifference,

        'formData.suitId': lineDetail.suitId,

        'formData.amount': lineDetail.amount,
        'formData.tourers.subNum.child': lineDetail.tourers.subNum.child,
        'formData.tourers.subNum.adult': lineDetail.tourers.subNum.adult,
        'formData.tourers.subNum.old': lineDetail.tourers.subNum.old,

        'formData.distributerId': util.getDistributerId(),
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

    //选择地址处理
    if (!util.isEmptyObject(that.data.receiverAddress)) {
      that.setData({
        passengerIdStr: passengerIdStrTemp,
        'formData.receiverAddress': that.data.receiverAddress.street,
        'formData.receiverName': that.data.receiverAddress.name,
        'formData.receiverTel': that.data.receiverAddress.mobile,

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

    //发票选中 金额增加发票费用
    if (that.data.isSelected) {

      that.setData({
        'formData.amount': that.data.formData.amount + that.data.formData.postage
      })
    } else {
      that.setData({
        'formData.amount': that.data.formData.amount - that.data.formData.postage,
        'formData.orderBill': {}
      })
    }
  },

  /**
  * 检查用户输入
  */



  checkInput: function () {

    var that = this;
    var childSubNum = that.data.formData.tourers.subNum.child;
    var adultSubNum = that.data.formData.tourers.subNum.adult;
    var oldSubNum = that.data.formData.tourers.subNum.old;


    console.log("🚀 🚀 🚀");
    console.log(that.data.formData)
    console.log(that.data.formData.tourers);

    if (that.data.formData.tourers.list.length != childSubNum + adultSubNum + oldSubNum) {

      that.showZanToast("请选择出行人");
      return false;
    }


    if (that.data.formData.linkMan.length <= 0) {

      that.showZanToast("请填写姓名");
      return false;
    }

    if (util.isEmptyStr(that.data.formData.linkTel)) {

      that.showZanToast("请输入联系电话");
      return false;

    } else if (!util.isMobile(that.data.formData.linkTel)) {

      that.showZanToast("联系人手机号不正确");
      return false;
    }

    if (that.data.formData.orderBill.type == 2) {

      if (util.isEmptyStr(that.data.formData.orderBill.title)) {

        that.showZanToast("请输入发票抬头");
        return false;
      }
            
      if (util.isEmptyStr(that.data.formData.orderBill.taxNum)) {

        that.showZanToast("请输入发票税号");
        return false;
      } else {

        if (!util.isTax(that.data.formData.orderBill.taxNum)) {

          that.showZanToast("发票税号输入不正确");
          return false;
        }
      }
    }

    if (that.data.isSelected && that.data.formData.receiverAddress.length <= 0) {

      that.showZanToast("请添加您的发票地址");
      return false;
    }

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

      //如果没有单房差
      if (!that.data.formData.isAddedDifference) {
        that.setData({
          'formData.difference': 0
        });
      }

      //如果没有发票
      if (!that.data.isSelected) {
        that.setData({
          'formData.postage': 0
        });
      }

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
  },

}));