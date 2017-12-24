const app = getApp();
const Toast = require('../../../zanui-weapp/dist/toast/index');
var util = require('../../../utils/util.js')

Page(Object.assign({}, Toast, {

  data: {
    constant: app.constant,

    // 接口 post数据
    formData: {
      distributerId: '',
      shopName: ''
    }
  },

  /**
  * 生命周期函数--监听页面加载
  */
  onLoad: function (options) {

    var that = this;
    var distributerAccessData = util.getDistributerAccessData();
    that.setData({
      'formData.distributerId': distributerAccessData.dShop.distributerId,
      'formData.shopName': distributerAccessData.dShop.shopName,
    })
  },

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
  * 获取用户的名
  */
  getUserName: function () {

  },

  /**
  * 修改店铺名称
  */
  changeStoreName: function () {

    var that = this;
    console.log(that.data);
    var url = that.data.constant.distributerDomain + "/distributerShop/updateShopNameByPrimaryKey";
    if (!util.isEmptyStr(that.data.formData.shopName)) {
      wx.request({
        url: url,
        data: that.data.formData,
        header: util.postRequestHeader(true),
        method: 'POST',
        success: function (res) {

          if (res.data.code == "OK") {

            that.showZanToast("修改成功!")
            wx.navigateBack({
              delta:1
            })
          }
        },
        fail: function (res) {
          console.log("出错了！");
          that.showZanToast(res.message);
        },
        complete: function (res) {
          console.log(res);
        }
      })
    } else {

      console.log("hahahahaha");
      that.showZanToast("请输入新的店铺名!");
    }
  },

  /**
  * 清空输入框
  */
  handleTapClearInput: function () {
    var that = this;
    that.setData({
      formData: '',
    })
  },

  /**
  * 获取input输入的值
  */
  bindInputValueChange: function (event) {

    var that = this;
    that.setData({
      [event.currentTarget.id]: event.detail.value
    })

    console.log(that.data);
  },

}))