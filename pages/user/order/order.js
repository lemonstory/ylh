// pages/API/my-order/my-order.js
const app = getApp();
const Toast = require('../../../zanui-weapp/dist/toast/index');
var util = require('../../../utils/util.js');
Page(Object.assign({}, Toast, {
  data: {

    'constant': app.constant,
    winHeight: "",//窗口高度
    currentTab: 0, //预设当前项的值
    scrollLeft: 0, //tab标题的滚动条位置

    isLoadingData:true,

    selectCancleReson: 0,

    cancleReson: [
      {
        'reson': "双方协商一致退款"
      },
      {
        'reson': "拍错/不想去了/无法出行"
      },
      {
        'reson': "行程不成团/商家无法安排"
      },
      {
        'reson': "其它"
      }
    ],

    // 取消的post信息
    canclePostData: {
      'ordersn': '',
      'reason': ''
    },
    // 当前选中的订单
    selectOrder: '',

    // 订单类型
    orderType: [
      {
        "type": 1,
        "name": '线路'
      },
      {
        "type": 8,
        "name": '签证'
      }
    ],
    // 普通线路
    commonOrder: [],
    // 签证
    visaOrder: [],

    pageSize: 100,
    commonPageIndex: 1,
    commonPageCount: 1,

    visaPageIndex: 1,
    visaPageCount: 1,

    //收银台提交的数据
    prepayPostData: {
      "prepayBody": {
        "mchId": 0,
        "orderNo": "",
        "orderFee": "",
        "feeType": "",
        "productId": "",
        "body": "",
        "spbillCreateIp": "",
        "expireTime": '',
        "notifyUrl": "",
        "userId": "",
        "sign": ""
      },
      "tradeType": app.constant.paymentTradeType,
      "sysSource": app.constant.paymentSysSource,
      "openId": ''
    },


  },


  onLoad: function () {
    var that = this;
    //  高度自适应
    wx.getSystemInfo({
      success: function (res) {
        var clientHeight = res.windowHeight,
          clientWidth = res.windowWidth,
          rpxR = 750 / clientWidth;
        var calc = clientHeight * rpxR - 180;
        console.log(calc)
        that.setData({
          winHeight: calc
        });
      }
    });
    // 获得订单数据
    wx.showNavigationBarLoading();
    that.getCommonData();
    that.getVisaData();
  },

  /**
   *  获得普通线路订单
   */
  getCommonData: function () {
    var that = this;
    if (that.data.commonPageIndex <= that.data.commonPageCount) {
      var url = that.data.constant.domain + "/distrbuter/member/order/list/1/" + that.data.commonPageIndex + "/" + that.data.pageSize;
      wx.request({
        url: url,
        data: {},
        header: util.getRequestHeader(),
        success: function (res) {
          if (res.data.orderList.length > 0) {

            var index = that.data.commonPageIndex + 1;
            var pageCount = res.data.totalPage;
            var moreData = that.data.commonOrder;
            Array.prototype.push.apply(moreData, res.data.orderList)
            // 添加数据
            that.setData({
              commonPageIndex: index,
              commonPageCount: pageCount,
              commonOrder: moreData
            })
          }
        },
        fail: function (res) {
          console.log(res);
          that.showZanToast(res.message);
        },
        complete: function (res) {
          console.log(res);
          wx.hideNavigationBarLoading();
          that.setData({
            isLoadingData: false,
          })
        }
      })
    }

  },

  /**
   * 获得签证订单
   */
  getVisaData: function () {
    // var that = this;
    // var url = that.data.constant.domain +"签证订单" +that.data.visaPageIndex +"/"+that.data. pageSize;
    // wx.request({
    //   url: url,
    //   data: {},
    //   header: {
    //     'content-type': 'application/json', // 默认值
    //   },
    //   success: function (res) {
    //       // TODO 处理订单数据
    //   },
    //   fail: function (res) {
    //     console.log(res);
    //     that.showZanToast(res.message);
    //   },
    //   complete: function (res) {
    //     console.log(res);
    //   }
    // })
  },



  // 滚动切换标签样式
  switchTab: function (e) {
    var that = this;
    var selectTab = e.target.dataset.current;
    var selectType = that.data.orderType[selectTab].type;
    taht.setData({
      currentTab: selectTab,
      selectOrderType: selectType
    });

    that.checkCor();
  },


  // 点击标题切换当前页时改变样式
  swichNav: function (e) {
    var that = this;
    var selectTab = e.target.dataset.current;
    var selectType = that.data.orderType[selectTab].type;
    if (this.data.currentTab == selectTab) {
      return false;
    } else {
      that.setData({
        currentTab: selectTab,
        selectOrderType: selectType
      })
    }
  },

  //   判断当前滚动超过一屏时，设置tab标题滚动条。
  checkCor: function () {
    if (this.data.currentTab > 1) {
      this.setData({
        scrollLeft: 500
      })
    } else {
      this.setData({
        scrollLeft: 0
      })
    }
  },

  /**
   *   选择取消原因
   */
  handleSelectReson: function (e) {
    var that = this;
    var index = e.currentTarget.dataset.index;
    console.log(index)
    var selectReson = that.data.cancleReson[index].reson;
    console.log(selectReson);
    var postData = that.data.canclePostData;
    postData.ordersn = that.data.selectOrder;
    postData.reason = selectReson;
    console.log(postData);
    that.setData({
      selectCancleReson: index,
      canclePostData: postData
    })
    console.log(that.data.canclePostData);

  },

  /**
   * 取消隐藏
   */
  dialogCancel: function () {
    var that = this;
    that.setData({
      showView: false,
    })
  },

  /**
   * 取消确认
   */
  dialogSure: function () {
    var that = this;
    var url = that.data.constant.domain + "/distrbuter/member/order/cancel";
    wx.request({
      url: url,
      data: that.data.canclePostData,
      header: util.getRequestHeader(),
      method: 'POST',
      success: function (res) {
        // 请求成功后  

        that.showZanToast("已提交取消申请！");
      },
      fail: function (res) {
        that.showZanToast("请求出错了!");
      },
      complete: function (res) {
        that.dialogCancel();
        console.log(res)
      }
    })
  },

  /**
   * 查看订单详情
   */
  toOrderDetail: function (e) {
    var that = this;
    var statusId = e.currentTarget.dataset.statusid;
    console.log(statusId);
    var selectOrderSn = e.currentTarget.dataset.ordersn;
    if (statusId == 101) {   //去支付
      that.getPayInfo(selectOrderSn);
    } else {    // 去详情页
      var url = "/pages/order/detail/detail?orderSn=" + selectOrderSn;
      console.log(url);
      wx.redirectTo({
        url: url,
      })
    }
  },

  /**
   * item点击事件
   */
  handleItemClick: function (e) {
    var that = this;
    var selectOrderSn = e.currentTarget.dataset.ordersn;
    console.log(selectOrderSn);
    var url = "/pages/order/detail/detail?orderSn=" + selectOrderSn;
    console.log(url);
    wx.redirectTo({
      url: url,
    })
  },

  onChangeShowState: function (e) {
    var that = this;
    var selectOrderSn = e.currentTarget.dataset.ordersn;
    that.setData({
      showView: (!that.data.showView),
      selectOrder: selectOrderSn
    })
  },

  /**
   * 获得收银台支付信息
   */
  getPayInfo: function (orderSn) {
    var that = this;
    // 获得openId
    that.setData({
      'prepayPostData.openId': util.getWxOpenId()
    });
    var url = that.data.constant.domain + "/distrbuter/member/order/getPaymentCode/" + orderSn;
    wx.request({
      url: url,
      data: {},
      header: util.getRequestHeader(),
      success: function (res) {
        console.log("请求成功！----");
        that.setData({
          'prepayPostData.prepayBody': res.data,
        })
        console.log(that.data.prepayPostData);
        // 数据请求成功之后，去支付
        that.orderPay(orderSn);
      },
      fail: function (res) {
        console.log("请求失败!----");
      },
      complete: function (res) {
        console.log(res);
      }
    })
  },



  /***
   *  订单支付
   */
  orderPay: function (orderSn) {
    var that = this;
    var url = that.data.constant.payDomain + '/prepay';
    wx.request({
      url: url,
      data: that.data.prepayPostData,
      method: 'POST',
      header: util.getRequestHeader(),
      success: function (res) {
        console.log("🍺 🍺 🍺 [成功] 调用收银台接口")
        console.log(res);
        //调用微信支付
        if (!util.isEmptyObject(res.data.getwayBody)) {
          wx.requestPayment({
            'timeStamp': res.data.getwayBody.timeStamp,
            'nonceStr': res.data.getwayBody.nonceStr,
            'package': res.data.getwayBody.package,
            'signType': res.data.getwayBody.signType,
            'paySign': res.data.getwayBody.paySign,
            'success': function (res) {

              console.log("🍺 🍺 🍺 [成功] 调用微信支付")
              // 支付成功，修改当前订单状态

              wx.hideLoading();
              var url = '/pages/order/pay-sucess/pay-sucess?orderSn=' + orderSn;
              wx.navigateTo({
                url: url,
              })
            },

            'fail': function (res) {
              wx.hideLoading();
              console.error(res);
              var res = JSON.stringify(res);
              // that.showZanToast(res);
            }
          })

        } else {
          that.showZanToast("getwayBody 为空");
          console.error("收银台接口返回数据错误：getwayBody 为空");
        }
      },

      fail: function (res) {

        console.error(res);
        //测试
        var res = JSON.stringify(res);
        that.showZanToast(res);
      },

      complete: function (res) { }
    })
  },

  /**
   * 上传资料
   */
  bindTapPossport: function (e) {
    var orderSn = e.currentTarget.dataset.ordersn;
    var url = "/pages/member/possport-list/possport-list?orderSn=" + orderSn;
    wx.redirectTo({
      url: url,
    })
  },


  footerTap: app.footerTap
}))


