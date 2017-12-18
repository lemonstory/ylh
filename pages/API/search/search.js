// pages/API/search/search.js
const app = getApp();
const Toast = require('../../../zanui-weapp/dist/toast/index');
var util = require('../../../utils/util.js')

Page(Object.assign({}, Toast, {
  data: {
    constant: app.constant,
    centent_Show: true,
    searchValue: '',

    hotAreaList: {},
    areaGoods: {},

    isShowHotAreaList: true,
    keyword: '',
    
    //搜索输入框获取焦点
    keywordInputFocus:true
  },


  onLoad: function (options) {

    var that = this;
    that.getSearchHotAreaList();
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
   * 获取搜索页默认推荐数据
   */
  getSearchHotAreaList: function (e) {

    var that = this;
    var url = that.data.constant.domain + '/distrbuter/search/getHotAreaList/0';
    console.log("url = " + url);

    wx.request({
      url: url,
      data: {},
      header: {
        'content-type': 'application/json', // 默认值
      },
      success: function (res) {
        that.setData({
          hotAreaList: res.data
        });
      },
      fail: function (res) {
        console.log(res);
      },
      complete: function (res) {
        console.log(res);
      },
    })
  },

  /**
   * 关键字搜索
   */
  getSearchWithKeyWord: function (e) {

    var that = this;
    var url = that.data.constant.domain + '/distrbuter/search/getAreaGoods/' + that.data.keyword;
    console.log("url = " + url);

    wx.request({
      url: url,
      data: {},
      header: {
        'content-type': 'application/json', // 默认值
      },
      success: function (res) {
        that.setData({
          areaGoods: res.data
        });
      },
      fail: function (res) {
        console.log(res);
      },
      complete: function (res) {
        that.setData({
          isShowHotAreaList: false
        });
      },
    })
  },

  /**
   * 线路热搜目的地-点击
   */
  handleTapHotAreaLineLiseItem: function (e) {
    var that = this;
    that.handleTapLineListMore(e)
  },

  /**
   * 签证热搜目的地-点击
   */
  handleTapHotAreaVisaListItem: function (e) {
    var that = this;
    that.handleTapVisaListMore(e)
  },

  /**
  * 获取input输入的值
  */
  bindInputValueChange: function (event) {

    console.log(event);
    console.log("🚀 🚀 🚀");
    var that = this;

    that.setData({
      [event.currentTarget.id]: event.detail.value
    })
    console.log("id = " + event.currentTarget.id);
    console.log('用户输入值为：', event.detail.value)
    console.log(that.data);
  },


  /**
   * 点击搜索结果-线路-更多
   */
  handleTapLineListMore: function (e) {

    var that = this;
    var areaId = e.currentTarget.dataset.area_id;
    var category = 0;
    var pageIndex = 1;
    var pageSize = app.constant.pageSize;
    var path = "/pages/API/common/common?areaId=" + areaId + "&category=" + category + "&pageIndex=" + pageIndex + "&pageSize=" + pageSize;
    console.log(path);
    wx.navigateTo({
      url: path
    })
  },

  /**
 * 点击搜索结果-线路-每一条
 */
  handleTapLineListItem: function (e) {

    var that = this;
    var id = e.currentTarget.dataset.area_id;
    var path = "/pages/API/address-detail/address-detail?id=" + id;
    wx.navigateTo({
      url: path
    })
  },

  /**
 * 点击搜索结果-签证-更多
 */
  handleTapVisaListMore: function (e) {

    var that = this;
    that.showZanToast("数据未提供");
  },

  /**
   * 点击搜索结果-线路-每一条
   */
  handleTapVisaListItem: function (e) {

    var that = this;
    that.showZanToast("数据未提供");
  },



  back: function () {
    wx.navigateBack({
    })
  },

}));