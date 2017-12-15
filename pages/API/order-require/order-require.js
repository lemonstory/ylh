Page({
     data: {
          delButton: false,
          delButton1: false,
          oldManNum: 1,
          childNum: 1,
          dateText: '请选择出发城市',
          array: ['美国', '中国', '巴西', '日本'],
          items: [
               { name: 'inner', value: '境内', checked: 'true' },
               { name: 'out', value: '境外' },
          ]
     },
     radioChange: function (e) {
          console.log('radio发生change事件，携带value值为：', e.detail.value)
     },
     bindDateChange: function (e) {
          var id = e.currentTarget.dataset.id;
          if (id == "goDate") {
               this.setData({
                    goDate: e.detail.value
               })
          } else if (id == "backDate") {
               this.setData({
                    backDate: e.detail.value
               })
          }
     },

     bindPickerChange: function (e) {
          console.log('picker发送选择改变，携带值为', e.detail.value)
          this.setData({
               index: e.detail.value
          })
     },
     choiceCity: function () {
          wx.navigateTo({
               url: '../switchcity/switchcity',
          })
     },



     /**
      * 生命周期函数--监听页面加载
      */
     onLoad: function (options) {
     },
     bindKeyInput: function (e) {
          var id = e.currentTarget.dataset.id;
          if (id == "name") {
               this.setData({
                    userInputName: e.detail.value,
                    delButton: true
               });
          } else if (id == "tell") {
               this.setData({
                    userInputTell: e.detail.value,
                    delButton1: true
               });
          }
          else if (id == "email") {
               this.setData({
                    userInputEmail: e.detail.value,
                    delButton2: true
               });
          }
          else if (id == "weixin") {
               this.setData({
                    userInputWeixin: e.detail.value,
                    delButton3: true
               });
          }
          else if (id == "day") {
               this.setData({
                    userInputDay: e.detail.value,
                    delButton4: true
               });
          }
          else if (id == "goCity") {
               this.setData({
                    userInputGoCity: e.detail.value,
                    delButton5: true
               });
          }
          else if (id == "toCity") {
               this.setData({
                    userInputToCity: e.detail.value,
                    delButton6: true
               });
          }
     },

     clearInput: function (e) {
          var id = e.currentTarget.dataset.id;
          if (id == "nameClear") {
               this.setData({
                    userInputName: '',
                    delButton: false
               });
          } else if (id == "tellClear") {
               this.setData({
                    userInputTell: '',
                    delButton1: false
               });
          }
          else if (id == "emailClear") {
               this.setData({
                    userInputEmail: '',
                    delButton2: false
               });
          }
          else if (id == "weixinClear") {
               this.setData({
                    userInputWeixin: '',
                    delButton3: false
               });
          }
          else if (id == "dayClear") {
               this.setData({
                    userInputDay: '',
                    delButton4: false
               });
          }
          else if (id == "goCityClear") {
               this.setData({
                    userInputGoCity: '',
                    delButton5: false
               });
          }
          else if (id == "toCityClear") {
               this.setData({
                    userInputToCity: '',
                    delButton6: false
               });
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

     // 加减运算开始
     bindMinus: function (e) {
          var id = e.currentTarget.dataset.id;
          if (id == "oldMan") {
               var num = this.data.oldManNum;
               if (num >= 1) {
                    num--;
               }
               var minusStatus = num < 1 ? 'disabled' : 'normal';
               this.setData({
                    oldManNum: num,
                    minusStatus: minusStatus
               });
          } else if (id == "child") {
               var num = this.data.childNum;
               if (num >= 1) {
                    num--;
               }
               var minusStatus = num < 1 ? 'disabled' : 'normal';
               this.setData({
                    childNum: num,
                    minusStatus: minusStatus
               });
          }
     },
     bindPlus: function (e) {
          var id = e.currentTarget.dataset.id;
          if (id == "oldMan") {
               var num = this.data.oldManNum;
               num++;
               this.setData({
                    oldManNum: num,
               });
          } else if (id == "child") {
               var num = this.data.childNum;
               num++;
               this.setData({
                    childNum: num,
               });
          }
     },

})


