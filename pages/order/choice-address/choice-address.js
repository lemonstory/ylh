// pages/API/choice-address/choice-address.js
const app = getApp();
const Toast = require('../../../zanui-weapp/dist/toast/index');
var util = require('../../../utils/util.js')
var areaUtil = require('../../../utils/china-area.js')
Page(Object.assign({}, Toast, {

  /**
   * 页面的初始数据
   */
  data: {

    'constant': app.constant,
    delBtnWidth: 180,//删除按钮宽度单位（rpx）

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

    // 页面初始化 options为页面跳转所带来的参数
    this.initEleWidth();
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

  touchS: function (e) {
    if (e.touches.length == 1) {
      this.setData({
        //设置触摸起始点水平方向位置
        startX: e.touches[0].clientX
      });
    }
  },

  touchM: function (e) {
    if (e.touches.length == 1) {
      //手指移动时水平方向位置
      var moveX = e.touches[0].clientX;
      //手指起始点位置与移动期间的差值
      var disX = this.data.startX - moveX;
      var delBtnWidth = this.data.delBtnWidth;
      var txtStyle = "";
      if (disX == 0 || disX < 0) {//如果移动距离小于等于0，文本层位置不变
        txtStyle = "left:0px";
      } else if (disX > 0) {//移动距离大于0，文本层left值等于手指移动距离
        txtStyle = "left:-" + disX + "px";
        if (disX >= delBtnWidth) {
          //控制手指移动距离最大值为删除按钮的宽度
          txtStyle = "left:-" + delBtnWidth + "px";
        }
      }
      //获取手指触摸的是哪一项
      var index = e.currentTarget.dataset.index;
      var list = this.data.data.list;
      list[index]['txtStyle'] = txtStyle;
      //更新列表的状态
      this.setData({
        'data.list': list
      });
    }
  },

  touchE: function (e) {
    if (e.changedTouches.length == 1) {
      //手指移动结束后水平位置
      var endX = e.changedTouches[0].clientX;
      //触摸开始与结束，手指移动的距离
      var disX = this.data.startX - endX;
      var delBtnWidth = this.data.delBtnWidth;
      //如果距离小于删除按钮的1/2，不显示删除按钮
      var txtStyle = disX > delBtnWidth / 2 ? "left:-" + delBtnWidth + "px" : "left:0px";
      //获取手指触摸的是哪一项
      var index = e.currentTarget.dataset.index;
      var list = this.data.data.list;
      list[index].txtStyle = txtStyle;
      //更新列表的状态
      this.setData({
        'data.list': list
      });
    }
  },

  //获取元素自适应后的实际宽度
  getEleWidth: function (w) {
    var real = 0;
    try {
      var res = wx.getSystemInfoSync().windowWidth;
      var scale = (750 / 2) / (w / 2);//以宽度750px设计稿做宽度的自适应
      // console.log(scale);
      real = Math.floor(res / scale);
      return real;
    } catch (e) {
      return false;
      // Do something when catch error
    }
  },

  initEleWidth: function () {
    var delBtnWidth = this.getEleWidth(this.data.delBtnWidth);
    this.setData({
      delBtnWidth: delBtnWidth
    });
  },
/**
   * 删除事件
   */
  delItem: function (e) {
    var that = this;
    var index = e.target.dataset.index;
    var addressId = e.currentTarget.dataset.addressid;
    wx.showLoading({
      title: '加载中',
    })

    var url = that.data.constant.domain + "/distrbuter/member/address/delete";
    wx.request({
      url: url,
      data: {
        "id": addressId
      },
      header: util.getRequestHeader(),
      method: 'POST',
      success: function (res) {
        if (res.statusCode == 200) {
          var list = that.data.data.list;
          //移除列表中下标为index的项
          list.splice(index, 1);
          //更新列表的状态
          that.setData({
            'data.list': list
          });
        }
     },
      fail: function (res) {
        console.error(res);
      },
      complete: function (res) {
        wx.hideLoading();
        console.log(res);

      }
    })
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
    var url = "/pages/order/add-address/add-address?itemJsonStr=" + itemJsonStr;
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
      var url = '/pages/order/fill-order/fill-order';
      var pages = getCurrentPages();
      var prevPage = pages[pages.length - 2];  //上一个页面
      var selectItem = that.getSelectAddress();
      prevPage.setData({
        profileId: that.data.selectAddress,
        receiverAddress: selectItem,
        'formData.receiverAddress': that.data.selectAddressDetail,
      })
      console.log(prevPage.data.receiverAddress);
      wx.navigateBack();
    }
  },

  /***
   * 获得选中的地址信息
   */
  getSelectAddress: function () {
    var that = this;
    var selectAddress;
    for (var i = 0; i < that.data.data.list.length; i++) {
      if (that.data.data.list[i].id == that.data.selectAddress) {
        selectAddress = that.data.data.list[i];
      }
    }
    return selectAddress;
  }

})
)