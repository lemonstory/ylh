// pages/API/public-active/public-active.js
const app = getApp();
const Toast = require('../../../zanui-weapp/dist/toast/index');
var util = require('../../../utils/util.js')
Page(Object.assign({}, Toast, {
  data: {

    'constant': app.constant,

    //邀请函类型(1邀请函客人自备,2邀请函我司提供
    currentActivityInvitationTypeId: '',
    currentActivityInvitationTypeTitle: '',

    currentActivityTitle: '',

    isShowActivityInvitationTypeView: false,
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

    var defaultActivityValue = prevPageFormDataTemp.activity.title;

    var defaultActivityInvitationTypeId = prevPageFormDataTemp.activity.InvitationType;
    var defaultActivityInvitationTypeTitle = util.getTitleWithId(app.constant.activityInvitationType, defaultActivityInvitationTypeId)

    that.setData({

      currentActivityTitle: defaultActivityValue,

      currentActivityInvitationTypeId: defaultActivityInvitationTypeId,
      currentActivityInvitationTypeTitle: defaultActivityInvitationTypeTitle,
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

  onActivityInvitationTypeViewShow: function () {
    var that = this;
    that.setData({
      isShowActivityInvitationTypeView: (!this.data.isShowActivityInvitationTypeView),
    })
  },

  /**
   * 活动名称
   */
  handleActivityTitleInput: function (event) {

    var value = event.detail.value;

    var pages = getCurrentPages();
    var currPage = pages[pages.length - 1];   //当前页面
    var prevPage = pages[pages.length - 2];  //上一个页面

    var prevPageFormDataTemp = prevPage.data.formData;
    prevPageFormDataTemp.activity.title = value;
    prevPage.setData({
      formData: prevPageFormDataTemp
    })

    console.log(prevPage.data.formData);
  },

  /**
  * 邀请函类型(1邀请函客人自备,2邀请函我司提供
  */
  handleChooseActivityInvitationType: function (e) {

    var that = this;
    var id = e.currentTarget.dataset.id;
    var title = e.currentTarget.dataset.title;
    that.setData({
      isShowActivityInvitationTypeView: false,
      currentActivityInvitationTypeId: id,
      currentActivityInvitationTypeTitle: title,
    })

    var pages = getCurrentPages();
    var currPage = pages[pages.length - 1];   //当前页面
    var prevPage = pages[pages.length - 2];  //上一个页面

    var prevPageFormDataTemp = prevPage.data.formData;
    prevPageFormDataTemp.activity.InvitationType = id;
    prevPage.setData({
      formData: prevPageFormDataTemp
    })

    // console.log(prevPage.data.formData);
  },

  /**
   * 上一步
   */
  handleTapPreStep: function () {
    var that = this;
    var url = '../food-require/food-require';
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
    var url = '../visa-require/visa-require';
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