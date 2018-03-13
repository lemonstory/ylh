// pages/API/food-require/food-require.js
const app = getApp();
const Toast = require('../../../zanui-weapp/dist/toast/index');
var util = require('../../../utils/util.js')

Page(Object.assign({}, Toast, {

  /**
   * 页面的初始数据
   */
  data: {
    constant: app.constant,

    currentFoodCourses: '',
    currentFoodSoups: '',
    currentFoodCharacteristic: '',
    currentAppointValue: '',
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    var that = this;
    //将上一页的数据在显示在当前页面
    var pages = getCurrentPages();
    var currPage = pages[pages.length - 1];   //当前页面
    var prevPage = pages[pages.length - 3];  //上上一个页面

    var prevPageFormDataTemp = prevPage.data.formData;

    var defaultFoodCourses = prevPageFormDataTemp.food.courses;
    var defaultFoodSoups = prevPageFormDataTemp.food.soups;
    var defaultFoodCharacteristic = prevPageFormDataTemp.food.characteristic;
    var defaultFoodAppoint = prevPageFormDataTemp.food.appoint;

    that.setData({
      currentFoodCourses: defaultFoodCourses,
      currentFoodSoups: defaultFoodSoups,
      currentFoodCharacteristic: defaultFoodCharacteristic,
      currentAppointValue: defaultFoodAppoint,
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

    var that = this;
    return {
      title: that.data.title,
      path: 'pages/customized/index/index?distributerId=' + that.data.constant.distributerId,
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
  },

  // 计数器-减法运算开始
  handleTapReduce: function (event) {

    console.log("🍪 🍪 🍪 ️ ️️");
    var that = this;
    var id = event.currentTarget.id;

    var pages = getCurrentPages();
    var currPage = pages[pages.length - 1];   //当前页面
    var prevPage = pages[pages.length - 3];  //上一个页面

    var prevPageFormDataTemp = prevPage.data.formData;

    switch (id) {

      case 'courses':
        if (prevPageFormDataTemp.food.courses >= 1) {
          prevPageFormDataTemp.food.courses = prevPageFormDataTemp.food.courses - 1;
          that.setData({
            formData: prevPageFormDataTemp,
            currentFoodCourses: prevPageFormDataTemp.food.courses
          })
        }
        break;

      case 'soups':
        if (prevPageFormDataTemp.food.soups >= 1) {
          prevPageFormDataTemp.food.soups = prevPageFormDataTemp.food.soups - 1;
          that.setData({
            formData: prevPageFormDataTemp,
            currentFoodSoups: prevPageFormDataTemp.food.soups
          })
        }

      case 'characteristic':
        if (prevPageFormDataTemp.food.characteristic >= 1) {
          prevPageFormDataTemp.food.characteristic = prevPageFormDataTemp.food.characteristic - 1;
          that.setData({
            formData: prevPageFormDataTemp,
            currentCarsSites: prevPageFormDataTemp.food.characteristic
          })
        }
        break;
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
    var prevPage = pages[pages.length - 3];  //上一个页面

    var prevPageFormDataTemp = prevPage.data.formData;

    switch (id) {
      case 'courses':
        prevPageFormDataTemp.food.courses = prevPageFormDataTemp.food.courses + 1;
        that.setData({
          formData: prevPageFormDataTemp,
          currentFoodCourses: prevPageFormDataTemp.food.courses
        })
        break;

      case 'soups':
        prevPageFormDataTemp.food.soups = prevPageFormDataTemp.food.soups + 1;
        that.setData({
          formData: prevPageFormDataTemp,
          currentFoodSoups: prevPageFormDataTemp.food.soups
        })
        break;

      case 'characteristic':
        prevPageFormDataTemp.food.characteristic = prevPageFormDataTemp.food.characteristic + 1;
        that.setData({
          formData: prevPageFormDataTemp,
          currentFoodCharacteristic: prevPageFormDataTemp.food.characteristic
        })
        break;
    }
    console.log(that.data.formData);
  },

  /**
  * 指定车型
  */
  handleAppointInput: function (event) {

    var value = event.detail.value;

    var pages = getCurrentPages();
    var currPage = pages[pages.length - 1];   //当前页面
    var prevPage = pages[pages.length - 3];  //上一个页面

    var prevPageFormDataTemp = prevPage.data.formData;
    prevPageFormDataTemp.food.appoint = value;
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
    var url = '/pages/customized/car-require/car-require';
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
    var url = '/pages/customized/public-active/public-active';
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