// pages/API/start-order/start-order.js
const app = getApp();
const Toast = require('../../../zanui-weapp/dist/toast/index');
var util = require('../../../utils/util.js')
Page(Object.assign({}, Toast, {
     data: {
          isSelected: 0,
          constant: app.constant,
          //上一个页面的数据
          prevPageData: {},

          //日历
          canlenderMonthDataList: [1, 2],
          currentSelectedDay: '',
          currentSelectedDayIndex: '',
          currentSelectedWeekIndex: '',

          //当前选中的出行日期
          currentSelectedTravelDate: '',

          //默认选中第一个月
          currentSelectedMonthIndex: 0,
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


          that.calculateAmount();
          // }
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

     /**
      * 组织日历数据
      */
     getCanlenderMonthDataList: function () {

          var that = this;
          // var priceList = that.data.prevPageData.priceList;
          var canlenderMonthDataListTemp = [];

          // for (var i = 0; i < priceList.length; i++) {
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

                         // var priceListListItemDate = priceList[i].list[priceIndex].date;
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
          // }

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


}));