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
    'profile': '请添加您的收货地址',
    'profileId':0,

    //用户创建订单数据
    'formData': {
      'pid': 1,                       //产品id(number,required)
      'travelDate': '2017-11-05',     //出行时间(string,required)
      'linkMan': '张三',               //订单联系人（string,required）
      'linkTel': '18971122495',       //订单联系电话(string,required)
      'linkEmail': 'drk@163.com',     //联系人邮件(string,required)
      'isIncludeBaby': 1,             //是否包含婴儿(number,required)
      'isIncludeOld': 1,              //是否包含老人(number,required)
      'tourers': {                    //出行人信息(array,required)
        "subNum": {
          'child': 10,                //小孩数量
          'adult': 3,                 //成人数量
        },
        "list": [                     //出行人列表(array,required)
          {
            'tourerName': '游客姓名',  //出行人姓名
            'cardType': 1,            //证件类型 1身份证，2军官证，3护照，4港澳通行证，5台湾通行证，99其它
            'cardNumber': '证件号码',  //证件号码
            'title': 1,               //职业身份 1学龄前儿童，2在校学生，3在职人员，4自由职业者，5退休人员
            'gender': 1,              //性别 0未知，1男，2女
            'ageGroup': 2,            //年龄分组，2儿童，3成人
          },
        ],
      },
      'amount': 5000,                 //订单总额(单位分)(number,required)
      'orderBill': {                  //发票信息（array,required）
        'title': '发票抬头',           //发票抬头
        'type': 1,                    //发票类型,1个人,2企业
        'taxNum': 'aabbcc'            //税号
      },
      'receiverAddress': '高碑店',     //收货地址(string,required)
      'agentId': 1,                   //代理商ID(number,required)
      'tradeId': 1,                   //系统来源(number,required) 10 悦旅汇，20小程序
    },

    //线路名称（标题）
    'title': '',
    'day': 0,
    'night': 0,
    'difference':0,



    // items: [
    //   { name: 'per', value: '个人', checked: 'true' },
    //   { name: 'danwei', value: '单位' },
    // ],


  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    var that = this;

    //接收从上一个的传值
    //数据示例
    options.lineDetail = {

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
      'amount': 100000,

      //TODO:缺少费用明细里面的数据

      //出行人信息(array,required)
      'tourers': {
        "subNum": {
          //小孩数量
          'child': 10,
          //成人数量
          'adult': 3,
        },
      },

      //是否包含婴儿(number,required)
      'isIncludeBaby': 1,
      //是否包含老人(number,required)
      'isIncludeOld': 1,

      //TODO:快递费
    }


    if (typeof(options.lineDetail) != 'undefined') {

      // var lineDetail = JSON.parse(options.lineDetail);
      var lineDetail = options.lineDetail;
      //将接收的数据设置到本页面
      that.setData({

        title: lineDetail.title,
        day: lineDetail.day,
        night: lineDetail.night,
        difference: lineDetail.difference,
        'formData.travelDate': lineDetail.travelDate,
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
    console.log(that.data.formData);

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
    console.log("id = " + event.currentTarget.id);
    console.log('用户输入值为：', event.detail.value)
    console.log(that.data);
  },


  radioChange: function (e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value)
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

  bindItemTap: function (e) {
    console.log('tap ' + e.currentTarget.dataset.name)
  },

}));