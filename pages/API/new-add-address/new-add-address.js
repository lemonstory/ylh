// pages/API/new-add-address/new-add-address.js

const app = getApp();
const Toast = require('../../../zanui-weapp/dist/toast/index');
Page(Object.assign({}, Toast, {

  /**
   * 页面的初始数据
   */
  data: {

    'constant': app.constant,

    addressInfo: {
      "id": 0,                    //地址ID
      "name": '',             //姓名
      "gender": 1,           //性别
      "mobile": '',             //手机号
      "email": '',               //邮箱
      "province": 1,           //省
      "city": 1,                   //市
      "district": 1,               //区
      "street": '',                //街道(地址描述)
    },

    allAddress: [], //省事全部集合


    addressDetail: '',

    address: {
      "province": {
        "id": 0,
        "name": '',
        "pid":0
      },
      "city": {
        "id": 0,
        "name": '',
        "pid": 0
      },
      "district": {
        "id": 0,
        "name": '',
        "pid": 0
      }
    },

    isAddressPickShow: true,

    province: [],
    city: [],
    district: [],

    value: [2, 2, 2],

    value1Defult: '省',
    value2Defult: '市',
    value3Defult: '区',

  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.getAllAddress();
    console.log(options);
    var itemJsonStr = options.itemJsonStr;
    if (typeof (itemJsonStr) != "undefined") {
      var editAddress = JSON.parse(itemJsonStr);
      that.setData({
        addressInfo: editAddress,
      })
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
   * 获得省市的全部信息
   */
  getAllAddress: function () {
    var that = this;
    var url = that.data.constant.domain + '/common/search/getChinaAreas';
    wx.request({
      url: url,
      data: {},
      header: {
        'content-type': 'application/json', // 默认值
      },
      success: function (res) {
        var allAddressList = res;
        that.setData({
          allAddress: allAddressList
        });
        that.getprovince();
      },
      fail: function (res) {
        console.log(res);
        that.showZanToast(res.message);
      },
      complete: function (res) {
        console.log(res);
      }
    })
  },

  /**
   * 获取省的集合
   */
  getprovince: function () {
    var that = this;
    var ItemList = [];
    for (var i = 0; i < that.data.allAddress.length; i++) {
      if (that.data.allAddress[i].pid == 36) {
        var itemprovince = that.data.allAddress[i];
        ItemList.push(itemprovince);
      }
    }
    that.setData({
      province: ItemList
    })
  },

  /**
   *  输入变化的监听
   */
  handelTextChanged: function (e) {
    var that = this;
    var id = e.currentTarget.id;
    var address = that.data.addressInfo;
    address[id] = e.detail.value;
    that.setData({
      addressInfo: address
    })
    console.log(that.data.addressInfo);
  },

  /**
   * 新建地址
   */
  createAddress: function () {
    var that = this;
    var url = '';
    if (that.data.addressInfo.id == 0) {       //新建
      url = that.data.constant.domain + '/distrbuter/member/address';
    } else {                                // 修改
      url = that.data.constant.domain + '/distrbuter/member/address/update';
    }
    var commitData = that.data.addressInfo;

    wx.request({
      url: url,
      data: commitData,
      header: {
        'content-type': 'application/json', // 默认值
      },
      method: 'POST',
      success: function (res) {
        that.setData(res);
      },
      fail: function (res) {
        console.log(res);
        that.showZanToast(res.message);
      },
      complete: function (res) {
        console.log(res);
      },
    })
  },

  /**
   * 处理保存按钮
   */

  handleSubmit: function () {
    var that = this;
    that.createAddress();
    // wx.navigateBack();
  },


}))