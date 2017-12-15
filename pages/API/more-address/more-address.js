// pages/moreaddress1/moreaddress1.js
const app = getApp();
Page({
  data: {
    currentItem: 1,
    'constant': app.constant,
  },

  onLoad(e) {
    console.log(e.title)
    this.setData({
     //  list: [
     //    { id: "0", name: "热门目的地" },
     //    { id: "1", name: "亚洲" },
     //    { id: "2", name: "非洲" },
     //    { id: "3", name: "大洋洲" },
     //    { id: "4", name: "欧洲" },
     //    { id: "5", name: "亲子" },
     //    { id: "6", name: "极光" },
     //    { id: "7", name: "秋日" },
     //    { id: "8", name: "蜜月" },
     //    { id: "9", name: "大洋洲" },
     //  ],

//       imglist: [
//         { imgurl: "http://image.365zhiding.com/wxapp/20171114/add.png" },
//         { imgurl: "http://image.365zhiding.com/wxapp/20171114/add.png" },
//         { imgurl: "http://image.365zhiding.com/wxapp/20171114/add.png" },
//         { imgurl: "http://image.365zhiding.com/wxapp/20171114/add.png" },
//         { imgurl: "http://image.365zhiding.com/wxapp/20171114/add.png" },
//         { imgurl: "http://image.365zhiding.com/wxapp/20171114/add.png" },
//         { imgurl: "http://image.365zhiding.com/wxapp/20171114/add.png" },
//         { imgurl: "http://image.365zhiding.com/wxapp/20171114/add.png" }
//       ],
//       countrylist: [
//         { name: "加拿大" },
//         { name: "美国" },
//         { name: "墨西哥" },
//         { name: "古巴" },
//         { name: "日本" },
//         { name: "全部" }

//       ],
//       imglist1: [
//         { imgurl: "http://image.365zhiding.com/wxapp/20171114/add.png" },
//         { imgurl: "http://image.365zhiding.com/wxapp/20171114/add.png" }
//       ],
//       tuijianlist: [
//         { imgurl: "http://image.365zhiding.com/wxapp/20171114/add.png", text: "【父母主题】丽江、大理慢生活6日游" },
//         { imgurl: "http://image.365zhiding.com/wxapp/20171114/add.png", text: "【父母主题】丽江、大理慢生活6日游" },
//         { imgurl: "http://image.365zhiding.com/wxapp/20171114/add.png", text: "【父母主题】丽江、大理慢生活6日游" }
//       ],

    })
  },

  // 选型卡的设置
  tagChoose: function (e) {
    var that = this
    var id = e.currentTarget.dataset.id;
    console.log(11111111111111)
    console.log(id)
    //设置当前样式
    if (this.data.currentItem === e.currentTarget.dataset.id) {
      return true;
    } else {
      var showMode = e.currentTarget.dataset.id == 1;
      this.setData({
        currentItem: id,
      })
    }
  },
  chosecountry:function(){
    wx.navigateTo({
      url:"../common/common"
    })
  },
  bindLineDetail:function(event){
       var id = event.currentTarget.dataset.id;
       console.log(11111111111111)
       console.log(id)
       var path = "/pages/API/address-detail/address-detail?id=" + id;
       console.log(path)
       wx.navigateTo({
            url: path
       })
  },

  onReady: function () {
       this.getData();
  },
  //获取接口
  getData: function (number) {
       var that = this;
       var url = that.data.constant.domain + '/distrbuter/line/category/list/'+number;
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
})