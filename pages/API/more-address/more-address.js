// pages/moreaddress1/moreaddress1.js
const app = getApp();
Page({
     data: {
          'constant': app.constant,
           currentItem: 0,
     },
     onLoad: function () {
          this.getData();
     },
     //获取接口
     getData: function (number) {
          var that = this;
          var url = that.data.constant.domain + '/distrbuter/line/category/list/' + number;
          console.log("url = " + url);
          wx.request({
               url: url,
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
  // 选型卡的设置
     tagChooseCate:function (event) {
          var that = this
          var id = event.currentTarget.dataset.category_id;
          console.log(1111111111)
          console.log(id)
          //设置当前样式
          if (this.data.currentItem === event.currentTarget.dataset.category_id) {

          } else {
               var showMode = event.currentTarget.dataset.categoryid == 0;
               this.setData({
                    currentItem: id,
               })
          }
     },

     choseCountry:function (event) {
          var id = event.currentTarget.dataset.id;
          console.log(id);
          var ishot = event.currentTarget.dataset.ishot;
          console.log(ishot);
          var path = "/pages/API/common/common?id=" + id;
          console.log(path);
          wx.navigateTo({
               url: path
          })
     },

     bindLineDetail:function(event){
          var id = event.currentTarget.dataset.id;
          var path = "/pages/API/line-detail/line-detail?id=" + id;
          console.log(path);
          wx.navigateTo({
               url: path
          }) 
     }

})