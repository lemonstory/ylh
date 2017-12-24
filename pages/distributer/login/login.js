// pages/API/my/my.js
const app = getApp();
const Toast = require('../../../zanui-weapp/dist/toast/index');
var util = require('../../../utils/util.js')

Page(Object.assign({}, Toast, {

  data: {
    constant: app.constant,

    formData: {
      name: '',
      password: '',
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
  * 获取input输入的值
  */
  bindInputValueChange: function (event) {

    var that = this;
    that.setData({
      [event.currentTarget.id]: event.detail.value
    })
  },

  /**
 * 检查输入
 */
  checkInput: function () {

    var that = this;
    if (util.isEmptyStr(that.data.formData.name)) {

      that.showZanToast("请输入账号");
      return false;

    } else if (util.isEmptyStr(that.data.formData.password)) {

      that.showZanToast("请输入密码");
      return false;
    }

    return true;
  },


  /**
  * 登录
  */
  handleTapLoginBtn: function (event) {

    var that = this;
    if (that.checkInput()) {

      var url = that.data.constant.distributerDomain + '/distributerAccount/distributerLogin';
      wx.request({

        url: url,
        data: that.data.formData,
        method: 'POST',
        header: util.postRequestHeader(true),

        success: function (res) {

          if (res.statusCode == 200) {

            if(res.data.code == "OK") {

              console.log("🍺 🍺 🍺 [成功] 代理商登录")
              that.handleSaveDistributerInfo(res.data);
              wx.switchTab({
                url: '/pages/line/index/index'
              })
            }else{
              that.showZanToast("账号(或)密码输入错误");
            }
          } else {

            console.error(res);
            console.error(res.data);
            that.showZanToast(res.data.message);
          }
        },

        fail: function (res) {
          console.error(res)
        },

        complete: function (res) { }
      })
    }
  },

  /**
   * 代理商信息-保存
   */
  handleSaveDistributerInfo: function (data) {

    console.log(data);

    var that = this;
    wx.setStorage({
      key: that.data.constant.distributerAccessDataKey,
      data: data,
      success: function (res) {

        //重置全局distributerId,distributerAccessData
        app.constant.distributerAccessData = {};
        util.setDistributerId(data.dShop.distributerId);

      },
      fail: function (res) {

        console.error('[失败] 代理商信息保存');
        console.error(res);
      },
    })

  }



}));