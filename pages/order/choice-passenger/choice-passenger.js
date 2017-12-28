// pages/API/choice-person/choice-person.js
const app = getApp();
const Toast = require('../../../zanui-weapp/dist/toast/index');
var util = require('../../../utils/util.js')
Page(Object.assign({}, Toast, {
  data: {
    'constant': app.constant,
    'passengerIdArr': [],
    'passengerIdStr': '',
    'checkedIds': [],

    delBtnWidth: 180,   //删除按钮宽度单位（rpx）

    icUnSelect: 'http://image.365zhiding.com/wxapp/20171121/dui2.png',   // 非选择图片
    icSelect: 'http://image.365zhiding.com/wxapp/20171121/dui.png',         // 选择图片
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

    var passengerIdStr = options.passengerIdStr;
    if (!util.isEmptyStr(passengerIdStr)) {
      var passengerIdArrTemp = passengerIdStr.split(",")
      var ids = that.StringToInt(passengerIdArrTemp);
      console.log(ids);
      that.setData({
        'passengerIdStr': passengerIdStr,
        'checkedIds': ids
      })
      console.log(that.data.checkedIds);
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
    var that = this;
    that.getData();
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

  //点击删除按钮事件
  delItem: function (e) {
    //获取列表中要删除项的下标
    var index = e.target.dataset.index;

    //调用接口删除
    var that = this;
    wx.showLoading({
      title: '加载中',
    })

    //删除出行人接口
    var url = that.data.constant.domain + '/distrbuter/member/passenger/delete';
    wx.request({
      url: url,
      data: {
        'id': that.data.data.list[index].id,
      },
      method: 'POST',
      header: util.postRequestHeader(),
      success: function (res) {

        if (res.statusCode == 200) {

          var list = that.data.data.list;
          //移除列表中下标为index的项
          list.splice(index, 1);
          //更新列表的状态
          that.setData({
            'data.list': list
          });

        } else {

          console.error(res);
          that.showZanToast(res.data.message);
        }
      },

      fail: function (res) {
        console.error(res);
        var res = JSON.stringify(res);
        that.showZanToast(res);
      },

      complete: function (res) {
        wx.hideLoading();
      }
    });
  },


  // bindCheckbox: function (e) {
  //   //拿到下标值，以在items作遍历指示用
  //   var index = parseInt(e.currentTarget.dataset.index);
  //   //原始的icon状态
  //   var url = this.data.items[index].url;
  //   var items = this.data.items;
  //   if (url == "http://image.365zhiding.com/wxapp/20171121/dui2.png") {
  //     //未选中时
  //     items[index].url = "http://image.365zhiding.com/wxapp/20171121/dui.png";
  //   } else {
  //     items[index].url = "http://image.365zhiding.com/wxapp/20171121/dui2.png";
  //   }

  //   // 写回经点击修改后的数组
  //   this.setData({
  //     items: items
  //   });
  //   // 遍历拿到已经勾选的值
  //   var checkedValues = [];
  //   for (var i = 0; i < items.length; i++) {
  //     if (items[i].url == "http://image.365zhiding.com/wxapp/20171121/dui.png") {
  //       checkedValues.push(items[i].value);
  //     }
  //   }
  //   // 写回data，供提交到网络
  //   this.setData({
  //     checkedValues: checkedValues
  //   });
  // },

  /**
   * 获取数据
   */
  getData: function () {
    var that = this;
    var url = that.data.constant.domain + '/distrbuter/member/passenger/list/1/100';
    console.log("url = " + url);
    wx.request({
      url: url,
      data: {},
      header: util.getRequestHeader(),
      success: function (res) {
        that.setData(res);
        that.setDataCallBack();
      },
      fail: function (res) {
        console.log(res);
        this.showZanToast('出错了');
      },
      complete: function (res) {
        console.log(res);
      },

    })
  },

  /**
   * 获取数据后回调处理 - 设置默认选中项
   */
  setDataCallBack: function () {
    var that = this;
    //接收上个页面传过来的旅客ID以逗号(,)分隔的字符串
    var passengerIdStr = that.data.passengerIdStr;
    var passengerIdArr = [];

    if (!util.isEmptyStr(passengerIdStr)) {
      passengerIdArr = passengerIdStr.split(",")
    }
    var tempData = that.data.data;

    if (passengerIdArr.length > 0) {
      //修改list item数据增加checked字段
      for (var i = 0; i < tempData.list.length; i++) {

        var id = tempData.list[i].id + "";
        var idIndex = passengerIdArr.indexOf(id);
        if (idIndex != -1) {
          tempData.list[i].checked = true;
        } else {
          tempData.list[i].checked = false;
        }
      }
    } else {
      //修改list item数据增加checked=false字段
      for (var i = 0; i < tempData.list.length; i++) {
        tempData.list[i].checked = false;
      }
    }
    that.setData({
      'data': tempData
    })
  },




  // checkboxChange: function (e) {
  //   var that = this;
  //   //console.log('checkbox发生change事件，携带value值为：', e.detail.value)
  //   that.setData({
  //     'checkedIds': e.detail.value
  //   })
  // },

/**
 * 处理选择事件
 * 将选中的出行人id，添加到集合
 */
  selectPassenger:function(e){
    var that  = this;
    var itemId = e.currentTarget.dataset.id;
    console.log(itemId);
    var selectIdList = that.data.checkedIds;
    var index = selectIdList.indexOf(itemId)
    if (index != -1){  //如果包含，(删除,并且checked = false)
      selectIdList.splice(index, 1);
    } else {                                                  // 如果没有,(添加,并且checked = true)
      selectIdList.push(itemId);
    }
    that.setData({
      checkedIds:selectIdList
    })
    console.log(that.data.checkedIds);
    that.handleItemCheck();

  },



  /**
   *  处理item选中
   */
  handleItemCheck:function(){
    var that =this;
    var tempData = that.data.data;
    var selectIds = that.data.checkedIds;

    if (selectIds.length > 0) {
      //修改list item数据增加checked字段
      for (var i = 0; i < tempData.list.length; i++) {
        var id = tempData.list[i].id ;
        var idIndex = selectIds.indexOf(id);
        if (idIndex != -1) {
          tempData.list[i].checked = true;
        } else {
          tempData.list[i].checked = false;
        }
      }
    } else {
      //修改list item数据增加checked=false字段
      for (var i = 0; i < tempData.list.length; i++) {
        tempData.list[i].checked = false;
      }
    }
    that.setData({
      'data': tempData
    })
  },



  /**
   * 完成按钮
   */
  handleTapComplete: function () {

    var that = this;
    //将已选择的旅客信息传输到 填写信息页
    var checkedPassengerListStr = {};
    var checkedPassengerList = [];
    var tempData = that.data.data;

    if (that.data.checkedIds.length > 0) {

      //修改list item数据增加checked字段
      for (var i = 0; i < tempData.list.length; i++) {
        var id = tempData.list[i].id;
        var idIndex = that.data.checkedIds.indexOf(id);
        if (idIndex != -1) {
          checkedPassengerList.push(tempData.list[i]);
        }
      }
    } else {
      this.showZanToast('一个出行人都没有选哦');
    }

    var url = '/pages/order/fill-order/fill-order';
    var pages = getCurrentPages();
    var currPage = pages[pages.length - 1];   //当前页面
    var prevPage = pages[pages.length - 2];  //上一个页面

    var adultSum = 0;
    var childSum = 0;
    var oldSum = 0;

    console.log(checkedPassengerList)

    for (var i = 0; i < checkedPassengerList.length; i++) {

      switch (checkedPassengerList[i].ageGroup) {

        case 2:
          childSum = childSum + 1;
          break;

        case 3:
          adultSum = adultSum + 1;
          break;

        case 4:
          oldSum = oldSum + 1;
          break;
      }
    }

    var message = "";
    console.log(adultSum);
    console.log(oldSum);
    console.log(childSum);
    if (adultSum != prevPage.data.formData.tourers.subNum.adult) {

      message = "请选择" + prevPage.data.formData.tourers.subNum.adult + "个成人";
      this.showZanToast(message);

    } else if (childSum != prevPage.data.formData.tourers.subNum.child) {

      message = "请选择" + prevPage.data.formData.tourers.subNum.child + "个儿童";
      this.showZanToast(message);

    } else if (oldSum != prevPage.data.formData.tourers.subNum.old) {

      message = "请选择" + prevPage.data.formData.tourers.subNum.old + "个老人";
      this.showZanToast(message);

    } else {

      //直接调用上一个页面的setData()方法，把数据存到上一个页面中去
      prevPage.setData({
        checkedPassengerList: checkedPassengerList
      })
      wx.navigateBack();
    }
  },


  /**
   *  处理修改
   */
  handleTapEdit: function (event) {
    var that = this;
    var idx = event.currentTarget.dataset.idx;
    var itemJsonStr = JSON.stringify(that.data.data.list[idx]);
    console.log(itemJsonStr);
    var url = "/pages/order/add-passenger/add-passenger?itemJsonStr=" + itemJsonStr;
    wx.redirectTo({
      url: url,
    })
  },

  /**
   * 字符转数字
   */
  StringToInt:function(stringList){
      var ids = [];
      for(var i = 0; i<stringList.length; i++){
        var id = parseInt(stringList[i]);
        ids.push(id);
      }
      return ids;
  }

}));