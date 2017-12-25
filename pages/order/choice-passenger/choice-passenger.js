// pages/API/choice-person/choice-person.js
const app = getApp();
const Toast = require('../../../zanui-weapp/dist/toast/index');
var util = require('../../../utils/util.js')
Page(Object.assign({}, Toast, {
  data: {
    'constant': app.constant,
    'passengerIdArr': [],
    'passengerIdStr': '',
    'checkedIds': [],
  },

  /**
     * 生命周期函数--监听页面加载
     */
  onLoad: function () {


  },

  onLoad: function (options) {

    var that = this;
    var passengerIdStr = options.passengerIdStr;
    if (typeof (passengerIdStr) != "undefined") {
      var passengerIdArrTemp = passengerIdStr.split(",")
      that.setData({
        'passengerIdStr': passengerIdStr,
        'checkedIds': passengerIdArrTemp
      })
    }
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

    var that = this;
    that.getData();
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

  },



  bindCheckbox: function (e) {

    //拿到下标值，以在items作遍历指示用
    var index = parseInt(e.currentTarget.dataset.index);
    //原始的icon状态
    var url = this.data.items[index].url;
    var items = this.data.items;
    if (url == "http://image.365zhiding.com/wxapp/20171121/dui2.png") {
      //未选中时
      items[index].url = "http://image.365zhiding.com/wxapp/20171121/dui.png";
    } else {
      items[index].url = "http://image.365zhiding.com/wxapp/20171121/dui2.png";
    }

    // 写回经点击修改后的数组
    this.setData({
      items: items
    });
    // 遍历拿到已经勾选的值
    var checkedValues = [];
    for (var i = 0; i < items.length; i++) {
      if (items[i].url == "http://image.365zhiding.com/wxapp/20171121/dui.png") {
        checkedValues.push(items[i].value);
      }
    }
    // 写回data，供提交到网络
    this.setData({
      checkedValues: checkedValues
    });
  },

  /**
   * 获取数据
   */
  getData: function () {
    var that = this;
    var url = that.data.constant.domain + '/distrbuter/member/passenger/list/1/100';
    console.log("url = " + url);
    wx.request({
      url: url,
      data: {},
      header: util.getRequestHeader(),
      success: function (res) {
        that.setData(res);
        that.setDataCallBack();
      },
      fail: function (res) {
        console.log(res);
        this.showZanToast('出错了');
      },
      complete: function (res) {
        console.log(res);
      },

    })
  },

  /**
   * 获取数据后回调处理 - 设置默认选中项
   */
  setDataCallBack: function () {

    var that = this;
    //接收上个页面传过来的旅客ID以逗号(,)分隔的字符串
    var passengerIdStr = that.data.passengerIdStr;
    var passengerIdArr = [];

    if (typeof (passengerIdStr) !== 'undefined') {
      passengerIdArr = passengerIdStr.split(",")
    }
    var tempData = that.data.data;

    if (passengerIdArr.length > 0) {

      //修改list item数据增加checked字段
      for (var i = 0; i < tempData.list.length; i++) {

        var id = tempData.list[i].id + "";
        var idIndex = passengerIdArr.indexOf(id);
        if (idIndex != -1) {
          tempData.list[i].checked = true;
        } else {
          tempData.list[i].checked = false;
        }
      }
    } else {

      //修改list item数据增加checked=false字段
      for (var i = 0; i < tempData.list.length; i++) {
        tempData.list[i].checked = false;
      }
    }

    that.setData({
      'data': tempData
    })
  },

  checkboxChange: function (e) {

    var that = this;
    //console.log('checkbox发生change事件，携带value值为：', e.detail.value)
    that.setData({
      'checkedIds': e.detail.value
    })
  },

  /**
   * 完成按钮
   */
  handleTapComplete: function () {

    var that = this;
    //将已选择的旅客信息传输到 填写信息页
    var checkedPassengerListStr = {};
    var checkedPassengerList = [];
    var tempData = that.data.data;

    if (that.data.checkedIds.length > 0) {

      //修改list item数据增加checked字段
      for (var i = 0; i < tempData.list.length; i++) {

        var id = tempData.list[i].id + "";
        var idIndex = that.data.checkedIds.indexOf(id);
        if (idIndex != -1) {
          checkedPassengerList.push(tempData.list[i]);
        }
      }
    
    } else {

      this.showZanToast('一个出行人都没有选哦');
    }

    var url = '/pages/order/fill-order/fill-order';
    var pages = getCurrentPages();
    var currPage = pages[pages.length - 1];   //当前页面
    var prevPage = pages[pages.length - 2];  //上一个页面

    var adultSum = 0;
    var childSum = 0;
    var oldSum = 0;

    for (var i = 0; i < checkedPassengerList.length; i++) {

      switch (checkedPassengerList[i].ageType) {

        case 2:
          childSum = childSum + 1;
          break;

        case 3:
          adultSum = adultSum + 1;
          break;

        case 4:
          oldSum = oldSum + 1;
          break;
      }
    }

    var message = "";
    if (adultSum != prevPage.data.formData.tourers.subNum.adult) {

      message = "请选择" + prevPage.data.formData.tourers.subNum.adult + "个成人";
      this.showZanToast(message);

    } else if (childSum != prevPage.data.formData.tourers.subNum.child) {

      message = "请选择" + prevPage.data.formData.tourers.subNum.child + "个儿童";
      this.showZanToast(message);

    } else if (oldSum != prevPage.data.formData.tourers.subNum.old) {

      message = "请选择" + prevPage.data.formData.tourers.subNum.old + "个老人";
      this.showZanToast(message);

    } else {

      //直接调用上一个页面的setData()方法，把数据存到上一个页面中去
      prevPage.setData({
        checkedPassengerList: checkedPassengerList
      })
      wx.navigateBack();
    }
  },

  handleTapEdit: function (event) {

    var that = this;
    var idx = event.currentTarget.dataset.idx;
    var itemJsonStr = JSON.stringify(that.data.data.list[idx]);
    console.log(itemJsonStr);
    var url = "/pages/order/add-passenger/add-passenger?itemJsonStr=" + itemJsonStr;
    wx.redirectTo({
      url: url,
    })
  }

}));