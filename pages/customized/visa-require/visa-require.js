// pages/API/public-active/public-active.js
const app = getApp();
const Toast = require('../../../zanui-weapp/dist/toast/index');
var util = require('../../../utils/util.js')
Page(Object.assign({}, Toast, {
  data: {

    'constant': app.constant,

    //签证原因(1因公，2因私)
    currentVisaReasonId: '',
    currentVisaReasonTitle: '',

    //签证类型(1个人旅游签,2ADS团队旅游签,3商签)
    currentVisaTypeId: '',
    currentVisaTypeTitle: '',

    isShowVisaReasonView: false,
    isShowVisaTypeView: false,
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

    var defaultVisaReasonId = prevPageFormDataTemp.visa.reason;
    var defaultVisaReasonTitle = util.getTitleWithId(app.constant.visaReason, defaultVisaReasonId)


    var defaultVisaTypeId = prevPageFormDataTemp.visa.type;
    var defaultVisaTypeTitle = util.getTitleWithId(app.constant.visaType, defaultVisaTypeId)

    that.setData({

      currentVisaReasonId: defaultVisaReasonId,
      currentVisaReasonTitle: defaultVisaReasonTitle,

      currentVisaTypeId: defaultVisaTypeId,
      currentVisaTypeTitle: defaultVisaReasonTitle,
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

  onChangeVisaReasonViewShow: function () {
    var that = this;
    that.setData({
      isShowVisaReasonView: (!this.data.isShowVisaReasonView),
    })
  },

  onChangeVisaTypeViewShow: function () {
    var that = this;
    that.setData({
      isShowVisaTypeView: (!this.data.isShowVisaTypeView),
    })
  },

  /**
  * 签证原因(1因公，2因私)
  */
  handleChooseVisaReasonOptions: function (e) {

    var that = this;
    var id = e.currentTarget.dataset.id;
    var title = e.currentTarget.dataset.title;
    that.setData({
      isShowVisaReasonView: false,
      currentVisaReasonId: id,
      currentVisaReasonTitle: title,
    })

    var pages = getCurrentPages();
    var currPage = pages[pages.length - 1];   //当前页面
    var prevPage = pages[pages.length - 3];  //上一个页面

    var prevPageFormDataTemp = prevPage.data.formData;
    prevPageFormDataTemp.visa.reason = id;
    prevPage.setData({
      formData: prevPageFormDataTemp
    })

    // console.log(prevPage.data.formData);
  },

  /**
  * 签证类型(1个人旅游签,2ADS团队旅游签,3商签)
  */
  handleChooseVisaTypeOptions: function (e) {

    var that = this;
    var id = e.currentTarget.dataset.id;
    var title = e.currentTarget.dataset.title;
    that.setData({
      isShowVisaTypeView: false,
      currentVisaTypeId: id,
      currentVisaTypeTitle: title,
    })

    var pages = getCurrentPages();
    var currPage = pages[pages.length - 1];   //当前页面
    var prevPage = pages[pages.length - 3];  //上一个页面

    var prevPageFormDataTemp = prevPage.data.formData;
    prevPageFormDataTemp.visa.type = id;
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
    var url = '/pages/customized/public-active/public-active';
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
   * 提交
   */
  handleTapSubmitStep: function () {

    var that = this;
    wx.showLoading({
      title: '加载中',
    })

    var pages = getCurrentPages();
    var currPage = pages[pages.length - 1];   //当前页面
    var prevPage = pages[pages.length - 3];  //上一个页面
    var prevPageFormDataTemp = prevPage.data.formData;
    //用户创建定制需求接口
    var url = that.data.constant.domain + '/distrbuter/customized';
    wx.request({
      url: url,
      data:prevPageFormDataTemp,
      method: 'POST',
      header: util.postRequestHeader(),

      success: function (res) {
        
        
        //orderId 订单id(number,required)
        //ordersn 订单号 (string,required)
        //tourGroup 团号(string,required)
        console.log("🍺 🍺 🍺")
        console.log(res);

        wx.showToast({
          title: '成功',
          icon: 'success',
          duration: 1000,
        })

        setTimeout(function () {
          wx.redirectTo({
            url: '/pages/user/visitor/visitor',
          })
        }, 1000);
      },

      fail: function (res) {
        //测试
        var res = JSON.stringify(res);
        that.showZanToast(res);
      },

      complete: function (res) {}
    });
  }
}));