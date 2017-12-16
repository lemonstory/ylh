// pages/API/air-ticket/air-ticket.js
const app = getApp();
const Toast = require('../../../zanui-weapp/dist/toast/index');
var util = require('../../../utils/util.js')
Page(Object.assign({}, Toast, {
  data: {

    'constant': app.constant,

    //酒店类型（1国际连锁，2常规15km，3市区..
    currentHotelTypeId: '',
    currentHotelTypeTitle: '',

    //酒店星级（1三星，2四星，3五星）
    currentHotelStarsId: '',
    currentHotelStarsTitle: '',

    //酒店客房标准(1标准双人间，2单间，3套房)
    currentHotelRoomStandardId: '',
    currentHotelRoomStandardTitle: '',

    //指定酒店
    currentAppointValue: '',

    isShowHotelTypeView: false,
    isShowHotelStarsView: false,
    isShowHotelRoomStandardView: false,
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
    var prevPage = pages[pages.length - 2];  //上一个页面

    var prevPageFormDataTemp = prevPage.data.formData;

    var defaultHotelTypeId = prevPageFormDataTemp.hotel.type;
    var defaultHotelTypeTitle = util.getTitleWithId(app.constant.hotelType, defaultHotelTypeId)

    var defaultHotelStarsId = prevPageFormDataTemp.hotel.stars;
    var defaultHotelStarsTitle = util.getTitleWithId(app.constant.hotelStars, defaultHotelStarsId)


    var defaultHotelRoomStandardId = prevPageFormDataTemp.hotel.roomStandard;
    var defaultHotelRoomStandardTitle = util.getTitleWithId(app.constant.hotelRoomStandard, defaultHotelRoomStandardId)

    var defaultAppointValue = prevPageFormDataTemp.hotel.appoint;


    that.setData({
      currentHotelTypeId: defaultHotelTypeId,
      currentHotelTypeTitle: defaultHotelTypeTitle,

      currentHotelStarsId: defaultHotelStarsId,
      currentHotelStarsTitle: defaultHotelStarsTitle,

      currentHotelRoomStandardId: defaultHotelRoomStandardId,
      currentHotelRoomStandardTitle: defaultHotelRoomStandardTitle,

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
   * 选择酒店类型（1国际连锁，2常规15km，3市区..
   */
  handleChooseHotelType: function (e) {

    var that = this;
    var id = e.currentTarget.dataset.id;
    var title = e.currentTarget.dataset.title;
    that.setData({
      isShowHotelTypeView: false,
      currentHotelTypeId: id,
      currentHotelTypeTitle: title,
    })

    var pages = getCurrentPages();
    var currPage = pages[pages.length - 1];   //当前页面
    var prevPage = pages[pages.length - 2];  //上一个页面

    var prevPageFormDataTemp = prevPage.data.formData;
    prevPageFormDataTemp.hotel.type = id;
    prevPage.setData({
      formData: prevPageFormDataTemp
    })
  },


  /**
   * 选择酒店星级（1三星，2四星，3五星）
   */
  handleChooseHotelStars: function (e) {

    var that = this;
    var id = e.currentTarget.dataset.id;
    var title = e.currentTarget.dataset.title;
    that.setData({
      isShowHotelStarsView: false,
      currentHotelStarsId: id,
      currentHotelStarsTitle: title,
    })

    var pages = getCurrentPages();
    var currPage = pages[pages.length - 1];   //当前页面
    var prevPage = pages[pages.length - 2];  //上一个页面

    var prevPageFormDataTemp = prevPage.data.formData;
    prevPageFormDataTemp.hotel.stars = id;
    prevPage.setData({
      formData: prevPageFormDataTemp
    })
  },

  /**
  * 酒店客房标准(1标准双人间，2单间，3套房)
  */
  handleChooseHotelRoomStandard: function (e) {

    var that = this;
    var id = e.currentTarget.dataset.id;
    var title = e.currentTarget.dataset.title;
    that.setData({
      isShowHotelRoomStandardView: false,
      currentHotelRoomStandardId: id,
      currentHotelRoomStandardTitle: title,
    })

    var pages = getCurrentPages();
    var currPage = pages[pages.length - 1];   //当前页面
    var prevPage = pages[pages.length - 2];  //上一个页面

    var prevPageFormDataTemp = prevPage.data.formData;
    prevPageFormDataTemp.hotel.roomStandard = id;
    prevPage.setData({
      formData: prevPageFormDataTemp
    })
  },

  onChangeHotelTypeViewShow: function () {
    var that = this;
    that.setData({
      isShowHotelTypeView: !this.data.isShowHotelTypeView,
    })
  },

  onChangeHotelStarsViewShow: function () {
    var that = this;
    that.setData({
      isShowHotelStarsView: !this.data.isShowHotelStarsView,
    })
  },

  onChangeHotelRoomStandardViewShow: function () {
    var that = this;
    that.setData({
      isShowHotelRoomStandardView: (!this.data.isShowHotelRoomStandardView),
    })
  },

  /**
   * 指定酒店
   */
  handleAppointInput: function (event) {

    var value = event.detail.value;

    var pages = getCurrentPages();
    var currPage = pages[pages.length - 1];   //当前页面
    var prevPage = pages[pages.length - 2];  //上一个页面

    var prevPageFormDataTemp = prevPage.data.formData;
    prevPageFormDataTemp.hotel.appoint = value;
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
    var url = '../air-ticket/air-ticket';
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
    var url = '../car-require/car-require';
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