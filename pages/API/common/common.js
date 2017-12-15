// pages/API/common/common.js
const app = getApp();
Page({
     data: {
          'constant': app.constant,
     },
     onReady: function () {
          this.getData();
     },
    
     //获取接口
     getData: function () {
          var that = this;
          wx.request({
               url: that.data.constant.domain + '/distrbuter/index',
               data: {},
               header: {
                    'content-type': 'application/json', // 默认值
               },
               success: function (res) {
                    console.log(res.data);
                    that.setData(res.data);
               }
          })
     },
  choiceadd: function () {
          wx.navigateTo({
               url: "../API/address-detail1/address-detail1"
          })
     },
     intervalChange: function (e) {
          this.setData({
               interval: e.detail.value
          })
     },
     durationChange: function (e) {
          this.setData({
               duration: e.detail.value
          })
     },

     // 处理banner图点击事件
     handleBanner: function (event) {
          var bannerId = event.currentTarget.dataset.id;
          var bannerUrl = "" + bannerId;
          wx.navigateTo({
               url: bannerUrl
          })
     },

})