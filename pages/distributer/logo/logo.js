// pages/distributer/logo/logo.js
const app = getApp();
const Toast = require('../../../zanui-weapp/dist/toast/index');
var util = require('../../../utils/util.js')

Page(Object.assign({}, Toast, {

  data: {
    constant: app.constant,
    logoUrl: '',
    distributerId:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    var that = this;

    if (!util.isEmptyStr(options.logoUrl) && !util.isEmptyStr(options.distributerId)) {

      that.setData({
        logoUrl: options.logoUrl,
        distributerId: options.distributerId
      })
    } else {
      console.error("options.logoUrl 及 options.distributerId 不能为空")
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
   * 选择图片
   */
  bindTapChooseImage: function () {

    var that = this;
    wx.chooseImage({
      success: function (res) {
        var tempFilePaths = res.tempFilePaths

        wx.showLoading({
          title: '正在上传...',
        })
        wx.uploadFile({
          url: app.constant.distributerDomain+'/distributerShop/updateShopLogoByPrimaryKey',
          filePath: tempFilePaths[0],
          name: 'file',
          formData: {
            'distributerId': that.data.distributerId
          },
          success: function (res) {

            console.log("🍺 🍺 🍺 图片上传成功")
            console.log(res);


            wx.showToast({
              title: '成功',
              icon: 'success',
              duration: 1000
            })

            that.setData({
              logoUrl: tempFilePaths[0]
            })

            //TODO:得到上传成功后的图片地址
            var data = res.data
            //do something
          }
        })
      }
    })

  }




}))