// pages/API/common/common.js
const app = getApp();
Page({
     data: {
          'constant': app.constant,
          cateId: 1,
          cateType: 1,
          pageIndex: 1,
          Pagesize: 20,
          //是否还有更多数据
          'isNoMore': false,
          //是否正在加载中
          'isLoading': false
     },

     onReady: function () {
          this.getData();
     },

     onPullDownRefresh: function () {
          this.getData(this.data.cateId, this.data.cateType, this.data.pageIndex, this.data.pageSize);
     },

     //获取接口
     getData: function (cateId, cateType, pageIndex, pageSize) {
          var that = this;
          var path = that.data.constant.domain +'/distrbuter/line/list/1/2/3/20'
          console.log(path);
          if (!that.data.isNoMore) {
               wx.request({
                    url: path,
                    data: {},
                    header: {
                         'content-type': 'application/json', // 默认值
                    },
                    success: function (res) {
                         wx.hideLoading();
                         var lineListlen = res.data.lineList.length;
                         console.log(lineListlen);
                         if (lineListlen > 0) {
                              // 加入数据
                              var lineListTemp = res.data.lineList;
                              console.log(lineListTemp);
                              Array.prototype.push.apply(lineListTemp, res.data.lineList);
                              var pageCount;
                              that.setData({
                                   pageIndex: res.data.pageIndex,
                                   pageCount: res.data.totalPage,
                                   lineList: lineListTemp,
                              })
                              if (pageIndex == pageCount) {
                                   that.setData({
                                        'isNoMore': true,
                                        'isLoading': false
                                   })
                              }
                         }
                         else {
                              that.setData({
                                   'isNoMore': true,
                                   'isLoading': false,
                              });
                         }
                    }
               })
          }

     },

/*** 停止下拉刷新动画*/
     stopPullDownRefresh: function () {
          wx.stopPullDownRefresh({
               complete: function (res) {
               }
          });
     },

     /** 获取数据成功回调*/
     setDataCallBack: function () {

     },
     onReachBottom: function () {
          if (!this.data.isNoMore) {
               this.setData({
                    'isLoading': true,
                    'pageIndex': this.data.pageIndex + 1,
               });
               setTimeout(() => {
                    this.getData(this.data.pageIndex, this.data.Pagesize);
               }, 500);
          } else {
               this.setData({
                    'isLoading': false,
               });
          }
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