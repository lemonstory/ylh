// pages/API/my-order/my-order.js
const app = getApp();
const Toast = require('../../../zanui-weapp/dist/toast/index');
Page(Object.assign({}, Toast, {
  data: {

    'constant': app.constant,
    winHeight: "",//窗口高度
    currentTab: 0, //预设当前项的值
    scrollLeft: 0, //tab标题的滚动条位置

    // 订单类型
    orderType: [
      {
        "type": 1,
        "name": '普通路线'
      },
      {
        "type": 100,
        "name": '定制路线'
      },
      {
        "type": 8,
        "name": '签证'
      }
    ],
    // 当前选中的订单类型
    selectOrderType: 1,

    // 普通线路
    commonOrder: [],
    // 定制线路
    customOrder: [],
    // 签证
    visaOrder: [],

    pageSize: 20,
    commonPageIndex: 1,
    commonPageCount: 1,

    customPageIndex: 1,
    customPageCount: 1,

    visaPageIndex: 1,
    visaPageCount: 1,


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
    that.getCommonData();
    that.getCustomData();
    that.getVisaData();
  },

  /**
   *  获得普通线路订单
   */
  getCommonData: function () {
    var that = this;
    if (that.data.commonPageIndex <= that.data.commonPageCount) {
      var url = that.data.constant.domain + "/distrbuter/member/order/list/1/ " + that.data.commonPageIndex + "/ " + that.data.pageSize;
      wx.request({
        url: url,
        data: {},
        header: {
          'content-type': 'application/json', // 默认值
        },
        success: function (res) {
          if (res.data.orderList.length > 0) {
            var index = that.data.commonPageIndex++;
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
        }
      })
    }

  },


  /**
   * 获得定制线路订单
   */
  getCustomData: function () {
    var that = this;
    var url = that.data.constant.domain + "/distrbuter/member/order/list/100/ " + that.data.customPageIndex + "/" + that.data.pageSize;
    wx.request({
      url: url,
      data: {},
      header: {
        'content-type': 'application/json', // 默认值
      },
      success: function (res) {
        if (res.data.orderList.length > 0) {
          var index = that.data.customPageIndex++;
          var pageCount = res.data.totalPage;
          var moreData = that.data.customOrder;
          Array.prototype.push.apply(moreData, res.data.orderList)
          // 添加数据
          that.setData({
            customPageIndex: index,
            customPageCount: pageCount,
            customOrder: moreData
          })
        }
      },
      fail: function (res) {
        console.log(res);
        that.showZanToast(res.message);
      },
      complete: function (res) {
        console.log(res);
      }
    })
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

  cancel:function(){
       var that = this;
       that.setData({
            showView: false,
       })
  },

  onChangeShowState: function () {
       var that = this;
       that.setData({
            showView: (!that.data.showView)
       })
  },


  footerTap: app.footerTap
}))


