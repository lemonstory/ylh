// pages/API/order-sou/order-sou.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [{ order: "130803", type: "待支付", text: "泰国旅游签-北京领区（仅受理护照签发...）", name: "谭玉" },
    { order: "130803", type: "已审核", text: "泰国旅游签-北京领区（仅受理护照签发...）", name: "谭玉" },
    ],
    choose: false,
    
    orderFilterTitle: "全部订单",
    timeFilterTitle: "按时间筛选",
    productFilterTitle: "按产品筛选",

    lastFilterId: '',
    currentFilterId: '',

    orderOptions: ["全部订单", "未结算订单", "已结算订单"],
    timeOptions: ["本周", "本月", "本季度", "2017年", "2016年", "2015年"],
    productOptions: ["线路", "定制", "签证"],

    currentOrderOptionIndex: 0,
    currentTimeOptionIndex: 0,
    currentProductOptionIndex: 0,
   
    isShowOptionsView:false,
    isShowORotate:false,
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
  chooseItem: function (e) {
    this.setData({
      isShowOptionsView: false,
      isShowRotate: false,
      isShowRotate1: false,
      isShowRotate2: false
    })
    var id = this.data.currentFilterId;
    if (id == "orderFilter") {
      this.setData({
        currentOrderOptionIndex: e.currentTarget.dataset.id,
        orderFilterTitle: this.data.orderOptions[e.currentTarget.dataset.id],
      })
    } else if (id == "timeFilter") {
      this.setData({
        currentTimeOptionIndex: e.currentTarget.dataset.id,
        timeFilterTitle: this.data.timeOptions[e.currentTarget.dataset.id],
      })
    } else if (id == "productFilter") {
      this.setData({
        currentProductOptionIndex: e.currentTarget.dataset.id,
        productFilterTitle: this.data.productOptions[e.currentTarget.dataset.id],
      })
    }
  },
  /**
     * 生命周期函数--监听页面显示
     */
  onShow: function () {
  },
  onChangeShowState: function (e) {
    var id = e.currentTarget.dataset.id;
    this.setData({
      currentFilterId:id,
      lastFilterId: this.data.currentFilterId,
    })
   
   if (this.data.lastFilterId == id) {
      this.setData({
        isShowOptionsView: !this.data.isShowOptionsView,
    })
    } else {
      this.setData({
        isShowOptionsView: true,
      })
        
        }

    if (id == "orderFilter") {
      this.setData({
       options: this.data.orderOptions,
       isShowRotate: (!this.data.isShowRotate)
        })
    } else if (id == "timeFilter") {
      this.setData({
        options: this.data.timeOptions,
        isShowRotate1: (!this.data.isShowRotate1)
})
    } else if (id == "productFilter") {
      this.setData({
        options: this.data.productOptions,
        isShowRotate2: (!this.data.isShowRotate2)
      })
    }
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

  clearInput: function () {
       this.setData({
            userInput: '',

       });
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