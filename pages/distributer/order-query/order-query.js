// pages/API/order-sou/order-sou.js

const app = getApp();
const Toast = require('../../../zanui-weapp/dist/toast/index');
var util = require('../../../utils/util.js')
var chinaArea = require('../../../utils/china-area.js')
Page({

  data: {

    'constant': app.constant,

    orderFilterTitle: "全部订单",
    timeFilterTitle: "按时间筛选",
    productFilterTitle: "按产品筛选",

    // 佣金日志post参数
    logPostData: {
      "distributerId": 1,
    },

    // 订单查询post参数
    orderPostData: {
      "distributerId": 1,
    },

    // 筛选前的订单集合
    originalOrderList: [],
    // 筛选之后的订单集合
    orderList: [],

    // 结算状态
    payOptions: [
      {
        "id": 2,
        "name": '全部订单'
      },
      {
        "id": 0,
        "name": '未结算订单'
      },
      {
        "id": 1,
        "name": '已结算订单'
      }
    ],

    // 分佣时间
    timeOption: [
      {
        "id": '1',
        "name": '本月'
      },
      {
        "id": '2',
        "name": '本季度'
      },
      {
        "id": '3',
        "name": '本年'
      },
      {
        "id": '4',
        "name": '去年'
      },
      {
        "id": '5',
        "name": '前年'
      },
      {
        "id": '6',
        "name": '全部'
      },
    ],

    // 订单类型
    orderOptions: [
      {
        "id": 0,
        "name": '全部'
      },
      {
        "id": 1,
        "name": '线路'
      },
      {
        "id": 8,
        "name": '签证'
      }
    ],

    selectOptions: [],

    // 搜索筛选框显示控制
    filterIndex: '',

    // 搜索关键字
    keyword: '',
    selectPayOption: 2,
    selectTimeOption: 6,
    selectOrderOption: 0,

    showFilterView: false,
  },
  /**
 * 生命周期函数--监听页面加载
 */
  onLoad: function (options) {
    var that = this;
    // 代理商id
    var id = util.getDistributerId();
    that.setData({
      'logPostData.distributerId': id,
      'orderPostData.distributerId':id
    });
    that.creatTimeOptions();
    that.getAllLog();
    that.getAllOrder();
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
   *  筛选框的条件点击
   */
  chooseItem: function (e) {
    var that = this;
    var id = e.currentTarget.dataset.id;
    if (that.data.filterIndex == 1) {
      var title = that.data.payOptions[id].name;
      var selectPayStatus = that.data.payOptions[id].id;

      that.setData({
        selectPayOption: selectPayStatus,
        orderFilterTitle: title,
        showFilterView: false
      });

    } else if (that.data.filterIndex == 2) {
      var title = that.data.timeOption[id].name;
      var selectTimeStatus = that.data.timeOption[id].id;

      that.setData({
        selectTimeOption: selectTimeStatus,
        timeFilterTitle: title,
        showFilterView: false
      });

    } else if (that.data.filterIndex == 3) {
      var title = that.data.orderOptions[id].name;
      var selectOrderType = that.data.orderOptions[id].id;

      that.setData({
        selectOrderOption: selectOrderType,
        productFilterTitle: title,
        showFilterView: false
      });
    }
    that.handleFitOrder();
  },


  /**
 * 关键字清空
 */
  clearInput: function (e) {
    var that = this;
    that.setData({
      keyword: '',
    });
    that.handleFitOrder();
  },

  /**
   * 监听关键字的输入
   */
  handleKeyword: function (e) {
    var that = this;
    var word = e.detail.value;
    console.log(word);
    that.setData({
      keyword: word
    })
    that.handleFitOrder();

  },

  /**
   * 筛选框的显示控制
   */
  onChangeShowState: function (e) {
    var that = this;
    var fiterId = e.currentTarget.id;
    var op;
    if (fiterId == 1) {
      op = that.data.payOptions;
    } else if (fiterId == 2) {
      op = that.data.timeOption;
    } else if (fiterId == 3) {
      op = that.data.orderOptions;
    }
    console.log(fiterId);
    that.setData({
      filterIndex: fiterId,
      showFilterView: true,
      selectOptions: op
    })
  },

  /**
   * 获得所有分佣日志
   */
  getAllLog: function () {
    var that = this;
    var url = that.data.constant.distributerDomain + "/settlementLog/querySettlementLogByJoin";
    console.log
    wx.request({
      url: url,
      data: that.data.logPostData,
      header: util.getRequestHeader(true),
      method: 'POST',
      success: function (res) {
        console.log("请求数据成功！");
        that.setData(res.data);

      },
      fail: function (res) {
        console.log("请求数据失败！");
      },
      complete: function (res) {
        console.log(res);
      }
    })
  },

  /**
   * 获得所有分佣订单
   */
  getAllOrder: function () {
    var that = this;
    var url = that.data.constant.distributerDomain + "/commissionDetails/queryCommissionDetailsByJoin";
    wx.request({
      url: url,
      data: that.data.orderPostData,
      header: util.getRequestHeader(true),
      method: 'POST',
      success: function (res) {
        console.log("请求数据成功！");
        // 处理订单分佣状态
        that.handleOrderCommissionStatus(res);
        // that.setData(res.data);
      },
      fail: function (res) {
        console.log("请求数据失败！")
      },
      complete: function (res) {
        console.log(res);
      }
    })
  },

  /**
   * 处理订单分佣状态(commissionStatus)
   * 
   * 0，未审核（0）
   * 1，已审核待转账（1,0）
   * 2，转账中（1,1）
   * 3，转账完成（1,2）
   */
  handleOrderCommissionStatus: function (res) {
    var that = this;
    var originalData = res.data.dtoList;
    console.log("------------------------原始数据");
    console.log(originalData);
    if (that.data.dList.length > 0) {     // 如果分佣日志有数据
      for (var j = 0; j < originalData.length; j++) {
        var commissionStatus;
        for (var i = 0; i < that.data.dList.length; i++) {
          if (originalData[j].settlementYear == that.data.dList[i].settlementYear && originalData[j].settlementMonth == that.data.dList[i].settlementMonth) {
            var auditStatus = that.data.dList[i].auditStatusId;
            var transferStatus = that.data.dList[i].transferStatusId;
            if (auditStatus == 0) {                     // 审核状态判断
              commissionStatus = '未审核';
            } else if (auditStatus == 1) {
              if (transferStatus == 0) {
                commissionStatus = '已审核待转账';
              } else if (transferStatus == 1) {
                commissionStatus = '转账中';
              } else if (transferStatus == 2) {
                commissionStatus = '转账完成';
              }
            }
            break;
          }
        }
        originalData[j]['commissionStatus'] = commissionStatus;
      }
      that.setData({
        originalOrderList: originalData
      });
      console.log("------------------------规范数据");
      console.log(that.data.originalOrderList);
      that.handleFitOrder();
    }
  },

  /**
   *  处理条件筛选
   */
  handleFitOrder: function () {
    var that = this;
    var itemOrders = [];
    Array.prototype.push.apply(itemOrders, that.data.originalOrderList)
    console.log("筛选前------------------------------------------");
    console.log(itemOrders);
    // 结算状态筛选
    if (that.data.selectPayOption == 1) {     // 剔除未结算(0)
      var orders = [];
      for (var i = 0; i < itemOrders.length; i++) {
        var item = itemOrders[i]
        if (that.isPay(item)) {
          orders.push(item)
        }
      }
      itemOrders = orders;
    } else if (that.data.selectPayOption == 0) {         //剔除已结算(1) 
      var orders = [];
      for (var i = 0; i < itemOrders.length; i++) {
        var item = itemOrders[i]
        if (!that.isPay(item)) {
          orders.push(item)
        }
      }
      itemOrders = orders;
    }
    // 订单类型的筛选
    if (that.data.selectOrderOption == 1) {          //剔除签证(8)
      var orders = [];
      for (var i = 0; i < itemOrders.length; i++) {
        var item = itemOrders[i]
        if (that.orderTypeIsline(item)) {
          orders.push(item)
        }
      }
      itemOrders = orders;

    } else if (that.data.selectOrderOption == 8) {      // 剔除线路(1)
      var orders = [];
      for (var i = 0; i < itemOrders.length; i++) {
        var item = itemOrders[i]
        if (!that.orderTypeIsline(item)) {
          orders.push(item)
        }
      }
      itemOrders = orders;
    }
    // 时间的筛选
    if (that.data.selectTimeOption == 1) {                // 剔除时间小于本月
      var orders = [];
      for (var i = 0; i < itemOrders.length; i++) {
        var item = itemOrders[i]
        if (that.isCurrentMonth(item)) {
          orders.push(item)
        }
      }
      itemOrders = orders;
    } else if (that.data.selectTimeOption == 2) {      // 剔除时间小于本季度
      var orders = [];
      for (var i = 0; i < itemOrders.length; i++) {
        var item = itemOrders[i]
        if (that.isCurrentQuarter(item)) {
          orders.push(item)
        }
      }
      itemOrders = orders;
    } else if (that.data.selectTimeOption == 3) {     // 选出今年的
      var orders = [];
      for (var i = 0; i < itemOrders.length; i++) {
        var item = itemOrders[i]
        if (that.isIitemYear(item, 0)) {
          orders.push(item)
        }
      }
      itemOrders = orders;
    } else if (that.data.selectTimeOption == 4) {           // 选出去年的
      var orders = [];
      for (var i = 0; i < itemOrders.length; i++) {
        var item = itemOrders[i]
        if (that.isIitemYear(item, 1)) {
          orders.push(item)
        }
      }
      itemOrders = orders;
    } else if (that.data.selectTimeOption == 5) {         // 选出前年的
      var orders = [];
      for (var i = 0; i < itemOrders.length; i++) {
        var item = itemOrders[i]
        if (that.isIitemYear(item, 2)) {
          orders.push(item)
        }
      }
      itemOrders = orders;
    }
    // 关键字的筛选(如果关键字不为空)
    if (!util.isEmptyStr(that.data.keyword)) {
      var orders = [];
      for (var i = 0; i < itemOrders.length; i++) {
        if (that.isContainKeyword(itemOrders[i].order.productName)) {  //不含关键字剔除
          var item = itemOrders[i];
          orders.push(item);
        }
      }
      itemOrders = orders;
    }

    // 筛选完成后，赋值
    that.setData({
      orderList: itemOrders
    })
    console.log("筛选之后------------------------------------");
    console.log(itemOrders);
    console.log(that.data.orderList);
  },



  /**
   * 是否包含关键字
   */
  isContainKeyword: function (itemStr) {
    var that = this;
    var str = itemStr;
    if (str.indexOf(that.data.keyword) > -1) {
      return true;
    }
    return false;
  },

  /**
   * 是否是已结算
   */
  isPay: function (commission) {
    var that = this;
    var item = commission;
    return item.isTransferSuccess;
  },

  /**
   * 是否是线路
   */
  orderTypeIsline(commission) {
    var item = commission;
    if (item.order.orderType == 1) {
      return true;
    }
    return false;
  },

  /**
   * 是否是本月的
   */
  isCurrentMonth: function (commission) {
    var that = this;
    var month = that.getItemMonth(0);
    var year = that.getItemYear(0);
    if (commission.settlementYear == year && commission.settlementMonth == month) {
      return true;
    }
    return false;
  },

  /**
   * 是否是本季度的
   */
  isCurrentQuarter: function (commission) {
    var that = this;
    var firstMonth = that.getCurrentQuarterFirstMonth();
    var year = that.getItemYear(0);
    if (commission.settlementYear == year && commission.settlementMonth >= firstMonth) {
      return true;
    }
    return false;
  },

  /**
   * 是否是某一年的
   */
  isIitemYear: function (commission, delayNumber) {
    var that = this;
    var year = that.getItemYear(delayNumber);
    if (commission.settlementYear == year) {
      return true;
    }
    return false;
  },


  /**
   * 获得指定年
   */
  getItemYear(delayNumber) {
    var date = new Date();
    var itemYear;
    itemYear = date.getFullYear() - delayNumber;
    return itemYear;
  },

  /**
   * 获得该季度的第一个月份
   */
  getCurrentQuarterFirstMonth() {
    var date = new Date();
    var firstMonth;
    var currentMonth = date.getMonth() + 1;
    var quarterNumber = Math.ceil(currentMonth / 3);
    firstMonth = 3 * (quarterNumber - 1) + 1;
    console.log(firstMonth);
    return firstMonth;
  },

  /**
   * 获得指定月
   */
  getItemMonth(delayNumber) {
    var date = new Date();
    var itemMoth;
    itemMoth = date.getMonth() + 1 - delayNumber;
    return itemMoth;
  },

  /**
   * 生成按时间筛选的name
   */
  creatTimeOptions:function(){
      var that = this;
      var options = that.data.timeOption;
      for(var i=0; i<3 ;i++){
        var year = that.getItemYear(i)+'年';
        options[i+2].name = year;
      }
      that.setData({
        timeOption:options
      })
      console.log(that.data.timeOption);
  }


})