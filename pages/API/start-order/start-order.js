// pages/API/start-order/start-order.js
Page({
     data: {
          taocanList: [{ name: '套餐名称' },
          { name: '套餐名称' },
          { name: '套餐名称' },
          { name: '套餐名称' },
          { name: '套餐名称' }
          ],
          canlender: {
               'month': new Date().getMonth() + 1,
               'date': new Date().getDate(),
               "day": new Date().getDay(),
               'year': new Date().getFullYear(),
               "weeks": [],
               "price": 2039
          },
          currentTapDate: '',
     },
     onLoad: function (options) {
          // 页面初始化 options为页面跳转所带来的参数
          var canlender = [];
          var _date = new Date()
          var year = _date.getFullYear()  //年
          var month = _date.getMonth() + 1  //月
          var date = _date.getDate()  //日
          console.info(year + "-" + month + "-" + date)
          var day = _date.getDay()
          var firstDay = new Date(year, month - 1, 1).getDay();
          console.warn('first day of this month :' + firstDay)
          var lastMonthDays = [];
          for (var i = firstDay; i > 0; i--) {
               console.warn(new Date(year, month, -i).getDate())
               lastMonthDays.push({
                    'date': new Date(year, month, -i).getDate() + '',
                    'month': month - 1
               })
          }
     
        var currentMonthDys = [];
          for (var i = 1; i <= new Date(year, month, 0).getDate(); i++) {
               currentMonthDys.push({
                    'date': i + "",
                    'month': month,
               })
          }
          var nextMonthDays = []
          var endDay = new Date(year, month, 0).getDay();
          console.log('end day:' + endDay)
          for (var i = 1; i < 7 - endDay; i++) {
               nextMonthDays.push({
                    'date': i + '',
                    'month': month + 1
               })
          }
          canlender = canlender.concat(lastMonthDays, currentMonthDys, nextMonthDays)
          var weeks = []
          for (var i = 0; i < canlender.length; i++) {
               if (i % 7 == 0) {
                    weeks[parseInt(i / 7)] = new Array(7);
               }
               weeks[parseInt(i / 7)][i % 7] = canlender[i]
          }
          console.info(weeks)
          this.setData({
               "canlender.weeks": weeks,
               "currentTapDate": date
          })
     },
     choice: function (e) {
          var cur = e.target.dataset.current;
          console.log(cur)
     },
     onReady: function () {
          // 页面渲染完成
     },
     onShow: function () {
          // 页面显示
     },
     onHide: function () {
          // 页面隐藏
     },
     onUnload: function () {
          // 页面关闭
     },
     tap: function (e) {
          console.info(e)
     },
     userInfo: function () {
          wx.redirectTo({
               url: '../address-message/address-message',
          })
     },
     choiceDate: function (e) {
          var that = this
          // var id = e.currentTarget.dataset.id;
          console.log(e.currentTarget.dataset.date)

          that.setData({
               'currentTapDate': e.currentTarget.dataset.date,
          })
          console.log(that.data);
     },

})