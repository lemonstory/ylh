const app = getApp();
const Toast = require('../../../zanui-weapp/dist/toast/index');
var util = require('../../../utils/util.js')
Page(Object.assign({}, Toast, {
  data: {
    'constant': app.constant,

    //需要Post的数据项
    "formData": {
      'travelDate': '',                 //出行时间(string,required) 2017-11-05
      'linkMan': '',                    //订单联系人（string,required） 张三
      'linkTel': '',                    //订单联系电话(string,required) 18971122495
      'linkEmail': '',                  //联系人邮件(string,required) drk@163.com
      'weixin': '',                     //微信(string,required), wx1233
      'isInternational': 0,             //境内还是境外 1境内，2境外(number,required)
      'destination': '',                   //目的地(string,required), 湖北
      'tourers': {                      //出行人信息(array,required)
        "subNum": {
          'child': 0,                   //小孩数量
          'adult': 0,                   //成人数量
          'old': 0,                     //老人数量
        },
      },
      'day': '',                        //出行天数(number,required),
      'travelDate': '',                 //出发日期(string,required), 2017-12-01
      'endDate': '',                   //返回日期(string,required), 2017-12-15
      'fromCity': '',                   //出发城市(string,required), 武汉
      'toCity': '',                     //抵达城市(string,required),  武汉
      'characteristic': '',             //(string,required),黄鹤楼
      'distributerId': app.constant.distributerId,  //代理商ID(number,required),
      'tradeId': app.constant.tradeId,  //系统来源,10悦旅汇，20小程序(number,required),
      'planeTicket': {                  //机票要求
        'type': 0,                      //机型(1直达，2转机，99无要求)(number,required)
        'ShippingSpace': 0,             //仓位(1经济舱，2公务舱，3头等舱)(number,required),
        'appoint': '',                  //指定航空公司(string,required)
      },
      'hotel': {                        //酒店要求
        'type': 0,                      //酒店类型（1国际连锁，2常规15km，3市区10km，4市中心5km，99无要求）(number,required),
        'stars': 0,                     //星级（1三星，2四星，3五星）(number,required)
        'roomStandard': 0,              //客房标准(1标准双人间，2单间，3套房)(number,required),
        'appoint': '',                  //指定酒店(string,required)
      },
      'cars': {                         //车辆要求
        'sites': 0,                     //座位数量(number,required),
        'type': 0,                    //类型(1司导分离,2司兼导)(number,required)
        'appoint': '',                //指定车型(string,required),  
      },
      'food': {
        'courses': 0,                   //菜数量(number,required)
        'soups': 0,                     //汤数量(number,required),
        'characteristic': 0,            //特色餐次数(number,required),
        'appoint': '',                  //指定特色餐(string,required)
      },
      'activity': {
        'title': '',                    //活动名称(string,required)
        'InvitationType': 0,            //邀请函类型(1邀请函客人自备,2邀请函我司提供(number,required)
      },
      'visa': {
        'reason': 0,                    //签证原因(1因公，2因私)(number,required)
        'type': 0,                      //签证类型(1个人旅游签,2ADS团队旅游签,3商签)(number,required)
      }
    },

  },

  /**
 * 生命周期函数--监听页面加载
 */
  onLoad: function (options) {

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

    // console.log(event);
    // console.log("🚀 🚀 🚀");
    var that = this;
    var formDataTemp = that.data.formData;
    formDataTemp[event.currentTarget.id] = event.detail.value;
    that.setData({
      formData: formDataTemp
    })
    // console.log("id = " + event.currentTarget.id);
    // console.log('用户输入值为：', event.detail.value)
    console.log(that.data.formData);
  },

  //TODO:小程序里面无法使用eval将a.b.c 转为属性变量,所以用个挫的办法来解决
  // 计数器-减法运算开始
  handleTapReduce: function (event) {

    console.log("🍪 🍪 🍪 ️ ️️");
    var that = this;
    var id = event.currentTarget.id;
    var formDataTemp = that.data.formData;
    switch (id) {

      case 'adult':
        if (formDataTemp.tourers.subNum.adult >= 1) {
          formDataTemp.tourers.subNum.adult = formDataTemp.tourers.subNum.adult - 1;
          that.setData({
            formData: formDataTemp
          })
        }
        break;

      case 'child':
        if (formDataTemp.tourers.subNum.child >= 1) {
          formDataTemp.tourers.subNum.child = formDataTemp.tourers.subNum.child - 1;
          that.setData({
            formData: formDataTemp
          })
        }
        break;

      case 'old':
        if (formDataTemp.tourers.subNum.old >= 1) {
          formDataTemp.tourers.subNum.old = formDataTemp.tourers.subNum.old - 1;
          that.setData({
            formData: formDataTemp
          })
        }
        break;
    }
    // console.log(that.data.formData);
  },

  //计数器-加法运算开始
  handleTapIncrease: function (event) {

    console.log("✈️ ️ ️️ ✈️ ️ ️️ ✈️ ️ ️️");
    var that = this;
    var id = event.currentTarget.id;
    var formDataTemp = that.data.formData;
    switch (id) {

      case 'adult':
        formDataTemp.tourers.subNum.adult = formDataTemp.tourers.subNum.adult + 1;
        that.setData({
          formData: formDataTemp
        })
        break;

      case 'child':
        formDataTemp.tourers.subNum.child = formDataTemp.tourers.subNum.child + 1;
        that.setData({
          formData: formDataTemp
        })
        break;

      case 'old':
        formDataTemp.tourers.subNum.old = formDataTemp.tourers.subNum.old + 1;
        that.setData({
          formData: formDataTemp
        })
        break;
    }
    console.log(that.data.formData);
  },


  /**
   * 清除input输入框
   */
  handleTapClearInput: function (event) {

    // console.log(event);
    // console.log("😀 😀 😀");
    var that = this;
    var formDataTemp = that.data.formData;
    // console.log(event);
    // console.log(event.currentTarget.dataset.id);
    formDataTemp[event.currentTarget.dataset.id] = '';
    that.setData({
      formData: formDataTemp
    })
    // console.log("id = " + event.currentTarget.dataset.id);
    // console.log(that.data.formData);
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

    if (that.data.formData.linkMan.length > 10) {

      that.showZanToast("中文名称最多10个汉字");
      return false;
    }

    if (!util.isMobile(that.data.formData.linkTel) && !util.isTelephone(that.data.formData.linkTel)) {

      that.showZanToast("请输入联系电话");
      return false;
    }


    if (that.data.formData.destination.length <= 0) {

      that.showZanToast("请填写目的地");
      return false;
    }

    if (parseInt(that.data.formData.isInternational) <= 0) {

      that.showZanToast("请选择境内/境外");
      return false;
    }

    if (parseInt(that.data.formData.tourers.subNum.adult) <= 0) {

      that.showZanToast("请输入成人数");
      return false;
    }

    if (parseInt(that.data.formData.day) <= 0 || isNaN(parseInt(that.data.formData.day))) {

      that.showZanToast("请填写出行天数");
      return false;
    }

    if (that.data.formData.travelDate.length <= 0) {

      that.showZanToast("请填写出发日期");
      return false;
    }

    if (that.data.formData.endDate.length <= 0) {

      that.showZanToast("请填写返回日期");
      return false;
    }

    if (that.data.formData.fromCity.length <= 0) {

      that.showZanToast("请填写出发城市");
      return false;
    }

    return true;
  },

  /**
   * 用户点击下一步
   */
  handleTapNext: function() {

    var that = this;
    if (that.checkInput()) {
      wx:wx.navigateTo({
        url: '/pages/customized/air-ticket/air-ticket',
        success: function(res) {},
        fail: function(res) {
          that.showZanToast("页面跳转错误");
        },
        complete: function(res) {},
      })
    }
  }

}));