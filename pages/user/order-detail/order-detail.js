// pages/API/my-order-detail/my-order-detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    messagelist:[{titel:"目的地",content:"北京市"},
      { titel: "成人数", content: "1人" }, 
      { titel: "儿童数", content: "1人" }, 
      { titel: "出行天数", content: "3天" },
      { titel: "出发日期", content: "2017-10-27" },
      { titel: "返回日期", content: "2017-10-27" },
      { titel: "出发城市", content: "上海市" },
      { titel: "抵达城市", content: "北京市" },
      { titel: "特色景点", content: "天安门，故宫，恭王府，颐和园，鸟巢" }
    ],
    asklist: [{ titel: "机票要求", content: "头等舱／直飞" },
      { titel: "酒店要求", content: "国际连锁／五星／标准双人间" },
      { titel: "车辆要求", content: "国际连锁／五星／标准双人间" },
      { titel: "餐食要求", content: "4菜1汤或当地同等标准／2次特色餐／全聚德烤鸭" },
      { titel: "公务活动", content: "环球悦旅会公司年会／邀请函客人自备" },
      { titel: "签证要求", content: "因公／商签" },
  ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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
  
  }
})