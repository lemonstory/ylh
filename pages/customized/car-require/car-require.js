// pages/API/car-require/car-require.js
const app = getApp();
const Toast = require('../../../zanui-weapp/dist/toast/index');
var util = require('../../../utils/util.js')
Page(Object.assign({}, Toast, {

  /**
   * 页面的初始数据
   */
  data: {

    'constant': app.constant,

    currentCarsSites: '',

    currentCarsTypeId: '',
    currentCarsTypeTitle: '',

    currentAppointValue: '',

    isShowCarsTypeView: false,
  },

  /**
     * 生命周期函数--监听页面加载
     */
  onLoad: function (options) {
    // 生命周期函数--监听页面加载

    var that = this;
    //将上一页的数据在显示在当前页面
    var pages = getCurrentPages();
    var currPage = pages[pages.length - 1];   //当前页面
    var prevPage = pages[pages.length - 3];  //上上一个页面

    var prevPageFormDataTemp = prevPage.data.formData;

    var defaultCarsSites = prevPageFormDataTemp.cars.sites;

    var defaultCarsTypeId = prevPageFormDataTemp.cars.type;
    var defaultCarsTypeTitle = util.getTitleWithId(app.constant.carsType, defaultCarsTypeId)

    var defaultAppointValue = prevPageFormDataTemp.cars.appoint;


    that.setData({

      currentCarsSites: defaultCarsSites,

      currentCarsTypeId: defaultCarsTypeId,
      currentCarsTypeTitle: defaultCarsTypeTitle,

      currentAppointValue: defaultAppointValue
    });
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

  },

  /**
  * 车辆要求-类型(1司导分离,2司兼导)
  */
  handleChooseHotelType: function (e) {

    var that = this;
    var id = e.currentTarget.dataset.id;
    var title = e.currentTarget.dataset.title;
    that.setData({
      isShowCarsTypeView: false,
      currentCarsTypeId: id,
      currentCarsTypeTitle: title,
    })

    var pages = getCurrentPages();
    var currPage = pages[pages.length - 1];   //当前页面
    var prevPage = pages[pages.length - 2];  //上一个页面

    var prevPageFormDataTemp = prevPage.data.formData;
    prevPageFormDataTemp.cars.type = id;
    prevPage.setData({
      formData: prevPageFormDataTemp
    })
  },

onChangeCarsTypeViewShow: function () {
    var that = this;
    that.setData({
      isShowCarsTypeView: !this.data.isShowCarsTypeView,
    })
  },

  // 计数器-减法运算开始
  handleTapReduce: function (event) {

    console.log("🍪 🍪 🍪 ️ ️️");
    var that = this;
    var id = event.currentTarget.id;

    var pages = getCurrentPages();
    var currPage = pages[pages.length - 1];   //当前页面
    var prevPage = pages[pages.length - 2];  //上一个页面

    var prevPageFormDataTemp = prevPage.data.formData;

    if (prevPageFormDataTemp.cars.sites >= 1) {
      prevPageFormDataTemp.cars.sites = prevPageFormDataTemp.cars.sites - 1;
      that.setData({
        formData: prevPageFormDataTemp,
        currentCarsSites: prevPageFormDataTemp.cars.sites
      })
    }
    // console.log(that.data.formData);
  },

  //计数器-加法运算开始
  handleTapIncrease: function (event) {
    console.log("✈️ ️ ️️ ✈️ ️ ️️ ✈️ ️ ️️");
    var that = this;
    var id = event.currentTarget.id;

    var pages = getCurrentPages();
    var currPage = pages[pages.length - 1];   //当前页面
    var prevPage = pages[pages.length - 2];  //上一个页面
    
    var prevPageFormDataTemp = prevPage.data.formData;

    prevPageFormDataTemp.cars.sites = prevPageFormDataTemp.cars.sites + 1;
    that.setData({
      formData: prevPageFormDataTemp,
      currentCarsSites: prevPageFormDataTemp.cars.sites
    })
    console.log(that.data.formData);
  },

  /**
  * 指定车型
  */
  handleAppointInput: function (event) {

    var value = event.detail.value;

    var pages = getCurrentPages();
    var currPage = pages[pages.length - 1];   //当前页面
    var prevPage = pages[pages.length - 2];  //上一个页面

    var prevPageFormDataTemp = prevPage.data.formData;
    prevPageFormDataTemp.cars.appoint = value;
    prevPage.setData({
      formData: prevPageFormDataTemp
    })

    console.log(prevPage.data.formData);
  },

  /**
   * 上一步
   */
  handleTapPreStep: function () {
    var that = this;
    var url = '/pages/customized/hotel-require/hotel-require';
    wx.redirectTo({
      url: url,
      success: function (res) { },
      fail: function (res) {
        that.showZanToast("页面跳转错误");
      },
      complete: function (res) { },
    })
  },

  /**
   * 
   * 下一步
   */
  handleTapNextStep: function () {

    var that = this;
    var url = '/pages/customized/food-require/food-require';
    wx.redirectTo({
      url: url,
      success: function (res) { },
      fail: function (res) {
        that.showZanToast("页面跳转错误");
      },
      complete: function (res) { },
    })
  }

}));