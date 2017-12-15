// pages/address/address.js
const app = getApp();
var inputContent = {};
Page({
     data: {
          'constant': app.constant,
          inputContent: {},
          indicatorDots: true,
          autoplay: true,
          interval: 5000,
          duration: 1000,
     },
     bindBlur: function (e) {
          inputContent[e.currentTarget.id] = e.detail.value
     },
     onLoad(e) {
          console.log(e.title)

     },
     onReady: function () {
          this.getData();
     },
     changeIndicatorDots: function (e) {
          this.setData({
               indicatorDots: !this.data.indicatorDots
          })
     },
     choiceadd: function () {
          wx.navigateTo({
               url: "../address-detail2/address-detail2"
          })
     },
     changeAutoplay: function (e) {
          this.setData({
               autoplay: !this.data.autoplay
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
     onReachBottom: function () {
          setTimeout(() => {
               this.setData({
                    isHideLoadMore: true,
                    recommends: [
                         {
                              imageurl: '../image/firsticon.png'
                         },
                    ],
               })
          }, 1000)
     },
     //获取接口
     getData: function () {
          var that = this;
          wx.request({
               url: that.data.constant.domain + '/distrbuter/line/index',
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

     // 处理banner图点击事件
     handleBanner: function (event) {
          var src = event.currentTarget.dataset.src;
          var path = "/pages/web-view/web-view?src=" + src;
          wx.navigateTo({
               url: path
          })
     },
     handleAd:function(event){
          var src = event.currentTarget.dataset.src;
          console.log(src);
          var path = "/pages/web-view/web-view?src=" + src;
          wx.navigateTo({
               url: path
          })
     },

     bindAddressDetail: function (event) {
          var id = event.currentTarget.dataset.id;
          console.log(444444444444444444)
          console.log(id);
          var path = "/pages/API/address-detail/address-detail?id=" + id;
          wx.navigateTo({
               url: path
          })
     },

     bindMoreaddress:function(){
     var path = "/pages/API/more-address/more-address"
     wx.navigateTo({
          url: path
     })
     },

onShow: function (e) {
          wx.getSystemInfo({
               success: (res) => {
                    this.setData({
                         windowHeight: res.windowHeight,
                         windowWidth: res.windowWidth
                    })
               }
          })
     },


     choiceCountry: function () {
          wx.navigateTo({
               url: '../common/common',
               success: function (res) { },
               fail: function (res) { },
               complete: function (res) { },
          })
     },


     onPullDownRefresh: function () {
          wx.showToast({
               title: '加载中...',
               icon: 'loading'
          });
     },

})



