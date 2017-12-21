// pages/API/start-order/start-order.js
const app = getApp();
const Toast = require('../../../zanui-weapp/dist/toast/index');
var util = require('../../../utils/util.js')
Page(Object.assign({}, Toast, {

  data: {
    isSelected: 0,
    constant: app.constant,
    isUnSelect: 'http://image.365zhiding.com/wxapp/20171210/unselect.png',
    isSelect: 'http://image.365zhiding.com/wxapp/20171210/select.png',
    actionSheetHidden: true,
    //上一个页面的数据
    prevPageData: {},

    //日历
    canlenderMonthDataList: [],

    currentSelectedDay: '',
    currentSelectedDayIndex: '',
    currentSelectedWeekIndex: '',

    //当前选中的出行日期
    currentSelectedTravelDate: '',

    //默认选中第一个月
    currentSelectedMonthIndex: 0,


    //套餐数据
    currentSuitList: [],
    //默认选中的套餐索引
    currentSuitSelectedIndex: 0,

    //用户已选择及设置的线路数据
    userSelectedLineDetail: {

      //产品id
      'pid': 0,
      //出行时间
      'travelDate': '',
      //线路名称
      'title': '',
      //线路持续天数
      'day': 0,
      //线路持续夜数
      'night': 0,

      //预付单房差
      //选择日期 -> suitList->difference
      'difference': 0,

      //订单总额(单位分)
      'amount': 0,

      //TODO:缺少费用明细里面的数据

      //出行人信息(array,required)
      'tourers': {
        "subNum": {
          //小孩数量
          'child': 0,
          //成人数量
          'adult': 0,
          //老人数量
          'old': 0,
        },
      },

      //是否【已选择】包含婴儿(number,required)
      'isAllowBabySelected': 0,
      "adultprice": 0,                  //成人费用
      "childprice": 0,                  //儿童费用
      "oldprice": 0,                    //老人费用
      "postage": 0,                     //快递费用   
      "isAddedDifference": false        //是否增加单房差
    }
  },

  /**
   * 接收页面传两个值
   * currentSelectedTravelDate:选中的出行日期
   * currentSelectedMonthIndex:选中的出行日期所在的月份索引值
   */
  onLoad: function (options) {

    // 页面初始化 options为页面跳转所带来的参数
    var that = this;

    var currentSelectedTravelDateTemp = options.currentSelectedTravelDate
    var currentSelectedMonthIndexTemp = options.currentSelectedMonthIndex

    //将上一页的数据在显示在当前页面
    var pages = getCurrentPages();
    var currPage = pages[pages.length - 1];   //当前页面
    var prevPage = pages[pages.length - 2];  //上一个页面

    if (typeof (prevPage.data) != "undefined" && typeof (currentSelectedTravelDateTemp) != "undefined" && typeof (currentSelectedMonthIndexTemp) != "undefined") {

      //设置选中的出行日期 及 上一页数据
      that.setData({
        prevPageData: prevPage.data,
        currentSelectedTravelDate: currentSelectedTravelDateTemp,
        currentSelectedMonthIndex: currentSelectedMonthIndexTemp,
      })

      //处理日历数据
      that.getCanlenderMonthDataList();

      //根据出行日期定位周索引和日索引
      var currentSelectedTravelDateTempArr = currentSelectedTravelDateTemp.split("-");
      var currentSelectedTravelMonthTemp = currentSelectedTravelDateTempArr[1];
      var currentSelectedTravelDayTemp = currentSelectedTravelDateTempArr[2];
      var canlenderMonthDataListItem = that.data.canlenderMonthDataList[currentSelectedMonthIndexTemp];

      for (var weekIndex = 0; weekIndex < canlenderMonthDataListItem.canlenderData.weeks.length; weekIndex++) {

        var week = canlenderMonthDataListItem.canlenderData.weeks[weekIndex]
        if (that.data.currentSuitList.length == 0) {
          for (var dayIndex = 0; dayIndex < week.length; dayIndex++) {
            if (week[dayIndex].month == currentSelectedTravelMonthTemp && week[dayIndex].date == currentSelectedTravelDayTemp) {
              that.setCurrentSelectedCanlenderData(week[dayIndex].date, dayIndex, weekIndex)
              break;
            }
          }
        }
      }

      //测试使用
      if (that.data.currentSuitList.length == 0) {
        that.showZanToast("没有套餐数据");
      }
      that.calculateAmount();
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
   * 明细-显示/隐藏
   */
  actionSheetChange: function (e) {
    this.setData({
      actionSheetHidden: !this.data.actionSheetHidden
    })
  },

  /**
   * 组织日历数据
   */
  getCanlenderMonthDataList: function () {

    var that = this;
    var priceList = that.data.prevPageData.priceList;
    var canlenderMonthDataListTemp = [];

    for (var i = 0; i < priceList.length; i++) {

      var canlenderMonthDataItem = {};
      var monthArr = priceList[i].month.split("-");
      var year = monthArr[0];
      var month = monthArr[1];

      canlenderMonthDataItem.month = year;
      canlenderMonthDataItem.month = month;
      canlenderMonthDataItem.min = priceList[i].min;
      var canlenderDataTemp = util.getCanlenderData(year, month);

      for (var weekIndex = 0; weekIndex < canlenderDataTemp.weeks.length; weekIndex++) {

        for (var dayIndex = 0; dayIndex < canlenderDataTemp.weeks[weekIndex].length; dayIndex++) {

          var dayObj = canlenderDataTemp.weeks[weekIndex][dayIndex];
          var canlenderDay = dayObj.date;
          var canlenderMonth = dayObj.month;

          for (var priceIndex = 0; priceIndex < priceList[i].list.length; priceIndex++) {

            var priceListListItemDate = priceList[i].list[priceIndex].date;
            var priceListListItemDateArr = priceListListItemDate.split("-");
            var priceListListItemDateYear = priceListListItemDateArr[0];
            var priceListListItemDateMonth = priceListListItemDateArr[1];
            var priceListListItemDateDay = priceListListItemDateArr[2];

            if (year == priceListListItemDateYear && month == priceListListItemDateMonth && canlenderDay == priceListListItemDateDay) {

              canlenderDataTemp.weeks[weekIndex][dayIndex].suitList = priceList[i].list[priceIndex].suitList;
              break;

            } else {
              canlenderDataTemp.weeks[weekIndex][dayIndex].suitList = [];
            }
          }
        }
      }
      canlenderMonthDataItem.canlenderData = canlenderDataTemp;
      canlenderMonthDataListTemp.push(canlenderMonthDataItem);
    }

    that.setData({
      canlenderMonthDataList: canlenderMonthDataListTemp
    })
  },

  /**
   * 日期-点击
   */
  handleTapCanlenderDay: function (e) {

    var that = this;
    var day = e.currentTarget.dataset.date;
    var dayIndex = e.currentTarget.dataset.day_index;
    var weekIndex = e.currentTarget.dataset.week_index;
    that.setCurrentSelectedCanlenderData(day, dayIndex, weekIndex)
    that.calculateAmount();
  },

  /**
   * 设置当前选中的日历数据
   */
  setCurrentSelectedCanlenderData: function (day, dayIndex, weekIndex) {

    var that = this;
    console.log("🦃 🦃 🦃");
    console.log("weekIndex = " + weekIndex + ", dayIndex = " + dayIndex);

    var currentMonthIndex = that.data.currentSelectedMonthIndex
    var currentCanlenderMonthData = that.data.canlenderMonthDataList[currentMonthIndex];

    // console.log("😀 😀 😀 😀");
    // console.log(currentCanlenderMonthData);
    // console.log("weekIndex = " + weekIndex + ", dayIndex = " + dayIndex);
    if (currentCanlenderMonthData.canlenderData.weeks[weekIndex][dayIndex].suitList.length > 0) {

      that.setData({
        currentSelectedDay: day,
        currentSelectedDayIndex: dayIndex,
        currentSelectedWeekIndex: weekIndex,
        currentSuitList: currentCanlenderMonthData.canlenderData.weeks[weekIndex][dayIndex].suitList,

        //已选中套餐索引重置
        currentSuitSelectedIndex: 0,
      })
    }
    // console.log(that.data.currentSuitList);
  },
  /**
  * 套餐-选中
  */
  handleSelectSuitItem: function (e) {
    var that = this;
    var idx = e.currentTarget.dataset.idx;
    that.setData({
      currentSuitSelectedIndex: idx,
    })
    that.calculateAmount();
  },

  /**
  * 月份-标题切换
  */
  handleTapMonthHeader: function (e) {
    var that = this;
    var monthIndex = e.currentTarget.dataset.month_index;
    that.setData({
      currentSelectedMonthIndex: monthIndex,
    })
  },

  //TODO:小程序里面无法使用eval将a.b.c 转为属性变量,所以用个挫的办法来解决
  // 计数器-减法运算开始
  handleTapReduce: function (event) {
    console.log("🍪 🍪 🍪 ️ ️️");
    var that = this;
    var id = event.currentTarget.id;
    var formDataTemp = that.data.userSelectedLineDetail;
    switch (id) {

      case 'adult':
        if (formDataTemp.tourers.subNum.adult >= 1) {
          formDataTemp.tourers.subNum.adult = formDataTemp.tourers.subNum.adult - 1;
          that.setData({
            userSelectedLineDetail: formDataTemp
          })
        }
        break;

      case 'child':
        if (formDataTemp.tourers.subNum.child >= 1) {
          formDataTemp.tourers.subNum.child = formDataTemp.tourers.subNum.child - 1;
          that.setData({
            userSelectedLineDetail: formDataTemp
          })
        }
        break;

      case 'old':
        if (formDataTemp.tourers.subNum.old >= 1) {
          formDataTemp.tourers.subNum.old = formDataTemp.tourers.subNum.old - 1;
          that.setData({
            userSelectedLineDetail: formDataTemp
          })
        }
        break;
    }
    //计算价格
    that.calculateAmount();
  },

  //计数器-加法运算开始
  handleTapIncrease: function (event) {
    console.log("✈️ ️ ️️ ✈️ ️ ️️ ✈️ ️ ️️");
    var that = this;
    var id = event.currentTarget.id;
    var formDataTemp = that.data.userSelectedLineDetail;
    switch (id) {
      case 'adult':
        formDataTemp.tourers.subNum.adult = formDataTemp.tourers.subNum.adult + 1;
        that.setData({
          userSelectedLineDetail: formDataTemp
        })
        break;

      case 'child':
        formDataTemp.tourers.subNum.child = formDataTemp.tourers.subNum.child + 1;
        that.setData({
          userSelectedLineDetail: formDataTemp
        })
        break;

      case 'old':
        formDataTemp.tourers.subNum.old = formDataTemp.tourers.subNum.old + 1;
        that.setData({
          userSelectedLineDetail: formDataTemp
        })
        break;
    }

    //计算价格
    that.calculateAmount();
  },
  /**
  * 重置出行人数量(暂保留)
  */
  reSetTourersSubNum: function () {
    var that = this;
    that.setData({
      'userSelectedLineDetail.tourers.subNum.adult': 0,
      'userSelectedLineDetail.tourers.subNum.child': 0,
      'userSelectedLineDetail.tourers.subNum.old': 0
    });
  },

  // 婴儿 - 选择 状态
  handleTapSelectType: function () {

    var that = this;
    that.setData({

      isSelected: !that.data.isSelected,
      'userSelectedLineDetail.isAllowBabySelected': !that.data.isSelected + 0,
   
    })
  },

  /**
   * 计算总价格
   */
  calculateAmount: function () {

    var that = this;
    var subNumTemp = that.data.userSelectedLineDetail.tourers.subNum;

    var adultAmount = subNumTemp.adult * that.data.currentSuitList[that.data.currentSuitSelectedIndex].adultprice;
    var childAmount = subNumTemp.child * that.data.currentSuitList[that.data.currentSuitSelectedIndex].childprice;
    var oldAmount = subNumTemp.old * that.data.currentSuitList[that.data.currentSuitSelectedIndex].oldprice;
    var postage = that.data.currentSuitList[that.data.currentSuitSelectedIndex].postage;
    var difference = 0;

    //总人数 % 2 == 1时，总价里面增加单房差，反之不增加
    if ((subNumTemp.child + subNumTemp.adult + subNumTemp.old) % 2 == 1) {

      difference = that.data.currentSuitList[that.data.currentSuitSelectedIndex].difference;
      that.setData({
        'userSelectedLineDetail.isAddedDifference': true,
      })
    } else {
      that.setData({
        'userSelectedLineDetail.isAddedDifference': false,
      })
    }
    var amount = adultAmount + childAmount + oldAmount + difference;
    if (amount > 0) {
      amount = amount + postage;
    }


    that.setData({
      'userSelectedLineDetail.amount': amount,
    })

    console.log("adultAmount = " + adultAmount + ", childAmount = " + childAmount + ", oldAmount = " + oldAmount + ", postage = " + postage);
    console.log("总计：" + amount);
  },


  /**
   * 检查用户输入
   */
  checkInput:function() {

    var that = this;
    var subNumChild = that.data.userSelectedLineDetail.tourers.subNum.child;
    var subNumAdult = that.data.userSelectedLineDetail.tourers.subNum.adult;
    var subNumOld = that.data.userSelectedLineDetail.tourers.subNum.old;

    if (subNumChild == 0 && subNumAdult == 0 && subNumOld == 0){

      that.showZanToast("请设置出行人数量");
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
    if(that.checkInput()) {

      //计算总价格
      that.calculateAmount();
      that.setData({

        'userSelectedLineDetail.pid': that.data.prevPageData.id,
        'userSelectedLineDetail.travelDate': that.data.currentSelectedTravelDate,
        'userSelectedLineDetail.title': that.data.prevPageData.title,
        'userSelectedLineDetail.day': that.data.prevPageData.day,
        'userSelectedLineDetail.night': that.data.prevPageData.night,

        'userSelectedLineDetail.difference': that.data.currentSuitList[that.data.currentSuitSelectedIndex].difference,
        'userSelectedLineDetail.adultprice': that.data.currentSuitList[that.data.currentSuitSelectedIndex].adultprice,
        'userSelectedLineDetail.childprice': that.data.currentSuitList[that.data.currentSuitSelectedIndex].childprice,
        'userSelectedLineDetail.oldprice': that.data.currentSuitList[that.data.currentSuitSelectedIndex].oldprice,
        'userSelectedLineDetail.postage': that.data.currentSuitList[that.data.currentSuitSelectedIndex].postage,
      })

      var lineDetail = JSON.stringify(that.data.userSelectedLineDetail);
      var url = '/pages/order/fill-order/fill-order?lineDetail=' + lineDetail;
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