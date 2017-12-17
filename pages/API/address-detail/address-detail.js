// pages/API/addressdetail/addressdetail.js
const app = getApp();
Page({
  cityFilterTitle: "北京市",
  data: {
    'constant': app.constant,
    isShowView: false,
    inputContent: {},
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    select: 0,
    show: 0,
    showCall: false,

    //出发日期
    startDatePriceListFormat:[]


  },

  onReady: function () {
    this.getData();
  },


  onLoad: function (options) {
    console.log(options);
    //接收页面参数
    var id = options.id;
    this.getData(id);
  },

  leaderIntroduce: function (event) {
    var id = event.currentTarget.dataset.id;
    console.log(id)
    var path = "/pages/API/leader-introduce/leader-introduce?id=" + id;
    wx.navigateTo({
      url: path
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

  //获取接口
  getData: function (id) {
    var that = this;
    var url = that.data.constant.domain + '/distrbuter/line/detail/' + id;
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
        that.setDataCallBack();
      }
    })
  },

  /**
   * 处理出发日期下面的数据
   */
  setDataCallBack:function() {

    var that = this;
    var startDatePriceListTemp = [];
    if (that.data.priceList.length > 0) {
      for (var i = 0; i < that.data.priceList.length; i++)

        if (that.data.priceList[i].list.length > 0) {
          for (var j = 0; j < that.data.priceList[i].list.length; j++) {
            startDatePriceListTemp.push(that.data.priceList[i].list[j])
          }    
        }
    }

    var startDatePriceListFormatTemp = [];
    if (startDatePriceListTemp.length > 0) {
      
      for (var i = 0; i < startDatePriceListTemp.length; i++) {

        var item = startDatePriceListTemp[i];
        console.log(item);
        var itemDateArr = item.date.split("-");
        var itemDateFormatStr = itemDateArr[1] + "月" + itemDateArr[2] + "日";
        var itemDateFormat = {};

        itemDateFormat.date = item.date;
        itemDateFormat.dateStr = itemDateFormatStr;
        itemDateFormat.min = item.min;
        startDatePriceListFormatTemp.push(itemDateFormat);
      }
    }

    console.log("😀😀😀")
    console.log(startDatePriceListFormatTemp);

    that.setData({
      startDatePriceListFormat: startDatePriceListFormatTemp
    })
  },

  blindCellPhone: function () {
    var that = this;
    console.log(999999999)
    that.setData({
      showView: (!that.data.showView)
    })
  },

  cancel1: function () {
    var that = this;
    that.setData({
      showView: false
    })
  },

  callPhone: function () {
    wx.makePhoneCall({
      phoneNumber: '400-189-0876',
    })
    var that = this;
    that.setData({
      showView: false
    })
  },

  bindBlur: function (e) {
    inputContent[e.currentTarget.id] = e.detail.value
  },

  changeIndicatorDots: function (e) {
    this.setData({
      indicatorDots: !this.data.indicatorDots
    })
  },
  changeAutoplay: function (e) {
    this.setData({
      autoplay: !this.data.autoplay
    })
  },

  //处理点击推荐线路事件
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


  tagChooseData: function (e) {
    var path = "/pages/API/start-order/start-order";
    wx.navigateTo({
      url: path
    })
    var that = this;
    var dataIdx = e.currentTarget.dataset.data_idx;
    //设置当前样式
    if (this.data.currentItem === dataIdx) {

    } else {
      var showMode = e.currentTarget.dataset.dataIdx == 0;
      this.setData({
        currentItem: dataIdx,
        FilterData: e.currentTarget.dataset.date
      })
    }
  },

  onChangeShowState: function () {
    var that = this;
    that.setData({
      isShowView: !this.data.isShowOptionsView,
    })
  },

})

