// pages/component/adddetailtop/adddetailtop.js
Component({
  properties: {
    // 这里定义了innerText属性，属性值可以在组件使用时指定
    innerText: {
      type: String,
      value: 'default value',
    }
  },
  data: {
      text1: "1. 本产品组合支持全国出发",
      text2: "2. 因日本领事馆的特殊要求，不同的领区，其签证费用会有差异，部分地区需要加价，其中广州领区需增补500元、重庆领区需增补300元、青岛领区需增补400元，另下单后依据资料情况有可能收取保证金。同时暂时无法为福建省及居住在东北三省的用户提供签证服务",
      text3: "3. 日本酒店无需再另付小费。",
      text4: "4. 本产品组合原则上需提前35天预定。",
      paytext1: "费用包含：",
      paytext2: "1. 本产品组合支持全国出发。",
      paytext3: "2. 因日本领事馆的特殊要求，不同的领区，其签证费用会有差异，部分地区需要加价，其中广州领区需增补500元、重庆领区需增补300元、青岛领区需增补400元，另下单后依据资料情况有可能收取保证金。同时暂时无法为福建省及居住在东北三省的用户提供签证服务。",
      paytext4: "费用不含：",
      paytext5: "1.日本酒店无需再另付小费。",
      paytext6: "2.本产品组合原则上需提前35天预定"
    
  },
  onLoad(e) {
    console.log(e.title)
    this.setData({
      
    })
  },
  methods: {
    // 这里是一个自定义方法
    customMethod: function () { },
       startOrder: function () {
         wx.navigateTo({
              url: '../../API/start-order/start-order',
              success: function (res) { },
              fail: function (res) { },
              complete: function (res) { },
         })
    }
  },

})





