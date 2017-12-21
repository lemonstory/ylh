// pages/API/choice-address/choice-address.js
const app = getApp();
const Toast = require('../../../zanui-weapp/dist/toast/index');
var util = require('../../../utils/util.js')

Page(Object.assign({}, Toast, {

  /**
   * 页面的初始数据
   */
  data: {

    'constant': app.constant,

    icUnSelect: 'http://image.365zhiding.com/wxapp/20171121/dui2.png',
    icSelect: 'http://image.365zhiding.com/wxapp/20171121/dui.png',

    selectAddress: 0,
    selectAddressDetail: '',
    selectItemAddress: {}
  },


  /**
    * 生命周期函数--监听页面加载
    */
  onLoad: function () {

  },


  onLoad: function (options) {
    var that = this;
    console.log(options);
    var profileId = options.profileId;
    if (typeof (profileId) != "undefined") {
      that.setData({
        selectAddress: profileId,
      })
    }
    this.getUserAddress();
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
   *  获取用户的地址信息
   */
  getUserAddress: function () {
    var that = this;
    var url = this.data.constant.domain + '/distrbuter/member/address/list/1/100';
    wx.request({
      url: url,
      data: {},
      header: util.getRequestHeader(),
      success: function (res) {
        that.setData(res);
      },
      fail: function (res) {
        console.log(res);
        this.showZanToast(res.message);
      },
      complete: function (res) {
        console.log(res);
      },
    })
  },

  /**
   * 点击修改
   */
  handelAddressEdit: function (e) {
    var that = this;
    var idx = e.currentTarget.dataset.idx;
    var itemJsonStr = JSON.stringify(that.data.data.list[idx]);
    console.log(itemJsonStr);
    var url = "../add-address/add-address?itemJsonStr=" + itemJsonStr;
    wx.redirectTo({
      url: url
    })

  },

  /**
   * 处理点击选择
   */
  handelAddressSelect: function (e) {
    var that = this;
    var id = e.currentTarget.dataset.id;
    var detail = e.currentTarget.dataset.address;
    that.setData({
      selectAddress: id,
      selectAddressDetail: detail,
    })
  },

  /**
   * 点击完成
   *  给上个页面赋值当前选中的地址
   */
  back: function (e) {
    var that = this;
    if (that.data.selectAddress == 0) {
      this.showZanToast("请选择收货地址！");
    } else {
      var url = '/pages/API/address-message/address-message';
      var pages = getCurrentPages();
      var prevPage = pages[pages.length - 2];  //上一个页面
      prevPage.setData({
        profileId: that.data.selectAddress,
        'formData.receiverAddress': that.data.selectAddressDetail,
      })
      wx.navigateBack();
    }
  },

})
)