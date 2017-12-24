// pages/API/next-management/next-management.js
const app = getApp();
const Toast = require('../../../zanui-weapp/dist/toast/index');
var util = require('../../../utils/util.js')
Page({
  data: {
    'constant': app.constant,
    // 请求post数据
    postData: {
      "distributerPid": 1,
    },

    //默认全部关闭
    currentSelectedIndex:'-1'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.getDistributerInfoData();
    showView: (options.showView == "true" ? true : false);
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


  // 调取代理商信息接口
  getDistributerInfoData: function () {
    var that = this;
    var url = that.data.constant.distributerDomain + "/distributerInfo/queryAllDistributerByJoin";
    wx.request({
      url: url,
      data: that.data.postData,
      header: util.getRequestHeader(),
      method: 'POST',
      success: function (res) {
        console.log("请求数据成功！");
        that.setData(res.data);
      },
      fail: function (res) {
        console.log("请求数据失败！")
      },
      complete: function (res) {
        console.log(res);
      }
    })
  },

  // 代理商信息--状态--显示/隐藏
  handleTapShowMessage: function (e) {
    var that = this;
    var index = e.currentTarget.dataset.index;

    if (index != that.data.currentSelectedIndex) {

      that.setData({
        currentSelectedIndex: index,
      })
    }else {
      that.setData({
        currentSelectedIndex: '-1',
      })
    }
  },
})