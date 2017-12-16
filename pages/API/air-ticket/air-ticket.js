// pages/API/air-ticket/air-ticket.js
const app = getApp();
const Toast = require('../../../zanui-weapp/dist/toast/index');
var util = require('../../../utils/util.js')
Page(Object.assign({}, Toast, {
  data: {

    'constant': app.constant,
    currentPlaneTicketShippingSpaceId: '',
    currentPlaneTicketShippingSpaceTitle: '',

    currentPlaneTicketTypeId: '',
    currentPlaneTicketTypeTypeTitle: '',

    isShowPlaneTicketTypeView: false,
    isShowPlaneTicketShippingSpacesView: false,
  },

  /**
     * 生命周期函数--监听页面加载
     */
  onLoad: function (options) {
    // 生命周期函数--监听页面加载

    var that = this;

    //设置仓位,机型要求默认数据
    // var defaultPlaneTicketShippingSpace = app.constant.planeTicketShippingSpace[0];
    // var defaultPlaneTicketType = app.constant.planeTicketType[0];

    // that.setData({
    //   currentPlaneTicketShippingSpaceId: defaultPlaneTicketShippingSpace.id,
    //   currentPlaneTicketShippingSpaceTitle: defaultPlaneTicketShippingSpace.title,

    //   currentPlaneTicketTypeId: defaultPlaneTicketType.id,
    //   currentPlaneTicketTypeTypeTitle: defaultPlaneTicketType.title,
    // });

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
   * 选择仓位(1经济舱，2公务舱，3头等舱)
   */
  handleChoosePlaneTicketShippingSpace: function (e) {

    var that = this;
    var id = e.currentTarget.dataset.id;
    var title = e.currentTarget.dataset.title;
    that.setData({
      isShowPlaneTicketShippingSpacesView: false,
      currentPlaneTicketShippingSpaceId: id,
      currentPlaneTicketShippingSpaceTitle: title,
    })

    var pages = getCurrentPages();
    var currPage = pages[pages.length - 1];   //当前页面
    var prevPage = pages[pages.length - 2];  //上一个页面

    var prevPageFormDataTemp = prevPage.data.formData;
    prevPageFormDataTemp.planeTicket.ShippingSpace = id;
    prevPage.setData({
      formData: prevPageFormDataTemp
    })

    // console.log(prevPage.data.formData);
  },

  /**
   * 选择机型(1直达，2转机，99无要求)
   */
  handleChoosePlaneTicketType: function (e) {

    var that = this;
    var id = e.currentTarget.dataset.id;
    var title = e.currentTarget.dataset.title;
    console.log(e.currentTarget.dataset);
    that.setData({
      isShowPlaneTicketTypeView: false,
      currentPlaneTicketTypeId: id,
      currentPlaneTicketTypeTypeTitle: title,
    })

    var pages = getCurrentPages();
    var currPage = pages[pages.length - 1];   //当前页面
    var prevPage = pages[pages.length - 2];  //上一个页面

    var prevPageFormDataTemp = prevPage.data.formData;
    prevPageFormDataTemp.planeTicket.type = id;
    prevPage.setData({
      formData: prevPageFormDataTemp
    })

    // console.log(prevPage.data.formData);
  },

  onChangePlaneTicketShippingSpacesViewShow: function () {
    var that = this;
    that.setData({
      isShowPlaneTicketShippingSpacesView: !this.data.isShowPlaneTicketShippingSpacesView,
    })
  },

  onChangePlaneTicketTypeViewShow: function () {
    var that = this;
    that.setData({
      isShowPlaneTicketTypeView: (!this.data.isShowPlaneTicketTypeView),
    })
  },

  /**
   * 指定航空公司
   */
  handleAppointInput: function (event) {

    var value = event.detail.value;

    var pages = getCurrentPages();
    var currPage = pages[pages.length - 1];   //当前页面
    var prevPage = pages[pages.length - 2];  //上一个页面

    var prevPageFormDataTemp = prevPage.data.formData;
    prevPageFormDataTemp.planeTicket.appoint = value;
    prevPage.setData({
      formData: prevPageFormDataTemp
    })

    console.log(prevPage.data.formData);
  },


  /**
   * 检查用户输入
   */
  checkInput: function () {

    var that = this;
    if (parseInt(that.data.currentPlaneTicketShippingSpaceId) <= 0 || isNaN(parseInt(that.data.currentPlaneTicketShippingSpaceId))) {
      that.showZanToast("请选择机票仓位要求");
      return false;
    }

    if (parseInt(that.data.currentPlaneTicketTypeId) <= 0 || isNaN(parseInt(that.data.currentPlaneTicketTypeId))) {

      that.showZanToast("请选择机票机型要求");
      return false;
    }

    console.log(parseInt(that.data.currentPlaneTicketShippingSpaceId));
    console.log(parseInt(that.data.currentPlaneTicketTypeId));

    return true;

  },


  /**
   * 上一步
   */
  handleTapPreStep: function () {
    wx.navigateBack();
  },


  /**
   * 
   * 下一步
   */
  handleTapNextStep: function () {
    
    var that = this;
    var url = '../hotel-require/hotel-require';
    wx: wx.redirectTo({
      url: url,
      success: function (res) { },
      fail: function (res) {
        that.showZanToast("页面跳转错误");
      },
      complete: function (res) { },
    })

  }



}));