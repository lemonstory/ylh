// pages/API/address-detail2/address-detail2.js
const app = getApp();
Page({
  data: {
       cityFilterTitle: "北京市",
       addressList: [{ id: "0", title: "北京", money: "1230" },
       { id: "1", title: "上海", money: "1230" },
       { id: "2", title: "天津", money: "1230" },
       { id: "3", title: "河北", money: "1230" },
       { id: "4", title: "陕西", money: "1230" },
       { id: "5", title: "河南", money: "1230" },
       { id: "6", title: "黑龙江", money: "1230" },
       { id: "7", title: "安徽", money: "1230" },
       { id: "8", title: "山东", money: "1230" },
       ],
       show: "0",
       select: "0",
    text1: "1. 本产品组合支持全国出发",
    text2: "2. 因日本领事馆的特殊要求，不同的领区，其签证费用会有差异，部分地区需要加价，其中广州领区需增补500元、重庆领区需增补300元、青岛领区需增补400元，另下单后依据资料情况有可能收取保证金。同时暂时无法为福建省及居住在东北三省的用户提供签证服务",
    text3: "3. 日本酒店无需再另付小费。",
    text4: "4. 本产品组合原则上需提前35天预定。",
    paytext1: "费用包含：",
    paytext2: "1. 本产品组合支持全国出发。",
    paytext3: "2. 因日本领事馆的特殊要求，不同的领区，其签证费用会有差异，部分地区需要加价，其中广州领区需增补500元、重庆领区需增补300元、青岛领区需增补400元，另下单后依据资料情况有可能收取保证金。同时暂时无法为福建省及居住在东北三省的用户提供签证服务。",
    paytext4: "费用不含：",
    paytext5: "1.日本酒店无需再另付小费。",
    paytext6: "2.本产品组合原则上需提前35天预定。",
    
    dataList: [{id:"0",data: "10月26日",money:"1000"},
         { id: "1",data: "10月27日", money: "1000" },
         { id: "2",data: "10月28日", money: "1000" },
         { id: "3",data: "10月29日", money: "1000" },
         { id: "4",data: "10月30日", money: "1000" }]
   },
 
  onLoad(e) {
    console.log(e.title)
    this.setData({
      list: [
        { url: "http://image.365zhiding.com/wxapp/20171114/banner.png", title: "【亲子主题】4日双飞，赶海踏浪，扬帆出海，极地海洋世界，玩海零距离", text1: "日本温泉美食嘉年华 7日深度旅行", text2: "产品编号:1870", price: "19999" }],
    })
  },
  leaderintroduce: function () {
    wx.navigateTo({
      url: "../leader-introduce/leader-introduce"
    })
  },
  change: function () {
       var that = this;
       that.setData({
            select: !that.data.select
       });
  },
  cancel: function () {
       var that = this;
       that.setData({
            select: "0",
            show: "0"
       });
  },
  choiceAddress: function () {
       var that = this;
       that.setData({
            show: !that.data.show
       });
  },

  tagChoose: function (e) {
       var that = this
       var id = e.currentTarget.dataset.id;

       console.log(id)
       //设置当前样式
       if (this.data.currentItem === e.currentTarget.dataset.id) {
            return true;
       } else {
            var showMode = e.currentTarget.dataset.id == 0;
            this.setData({
                 currentItem: id,
                 cityFilterTitle: this.data.addressList[e.currentTarget.dataset.id].title,
            })
       }
  },


  tagChooseData: function (e) {
       var that = this
       var id = e.currentTarget.dataset.id;

       console.log(id)
       //设置当前样式
       if (this.data.currentItem === e.currentTarget.dataset.id) {
            return true;
       } else {
            var showMode = e.currentTarget.dataset.id == 0;
            this.setData({
                 currentItem: id,
                 FilterData: this.data.dataList[e.currentTarget.dataset.id].data,
                })
       }
  },



})