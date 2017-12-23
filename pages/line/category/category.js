// pages/moreaddress1/moreaddress1.js
const app = getApp();
const Toast = require('../../../zanui-weapp/dist/toast/index');
var util = require('../../../utils/util.js')
Page(Object.assign({}, Toast, {
  data: {

    constant: app.constant,

    currentCategoryIndex: 0,
    currentMappingIndex: 0,
    currentMappingAreaList: [],

    //目前固定显示3条
    lineCount: 3
  },

  onLoad: function (options) {
    var that = this;
    that.getData(that.data.lineCount);
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

  //获取接口
  getData: function (lineCount) {
    var that = this;
    var url = that.data.constant.domain + '/distrbuter/line/category/list/' + lineCount;
    console.log("url = " + url);
    wx.request({
      url: url,
      data: {},
      header: util.getRequestHeader(),

      success: function (res) {
          if (res.statusCode == 200) {       
          console.log(res.data);
          that.setData(res.data);
          that.setDataCallBack();
        
        } else {
          var message = JSON.stringify(res.data)
          that.showZanToast(message);
        }
      },

      fail: function (res) {

        var message = JSON.stringify(res.data)
        that.showZanToast(message);
      },

      complete: function (res) { }
    })
  },

  /** 获取数据成功回调*/
  setDataCallBack: function () {

    var that = this;
    var defaultCategoryIndex = 0;
    that.setCurrentMappingAreaListData(defaultCategoryIndex);
  },

  /**
   * 设置热门目的地数据
   */
  setCurrentMappingAreaListData: function (categoryIndex) {

    var that = this;
    var currentCategoryIdTemp = that.data.category[categoryIndex].id;
    
    var currentMappingIndexTemp = 0;
    var currentMappingItemListTemp = [];
    var currentMappingAreaListTemp = [];
    for (var i = 0; i < that.data.mapping.length; i++) {

      var mappingItem = that.data.mapping[i];
      if (mappingItem.category == currentCategoryIdTemp) {

        currentMappingIndexTemp = i;
        currentMappingItemListTemp = mappingItem.list;
        break;
      }
    }

    if (currentMappingItemListTemp.length > 0) {

      for (var j = 0; j < currentMappingItemListTemp.length; j++) {

        for (var k = 0; k < that.data.areaList.length; k++) {

          if (currentMappingItemListTemp[j] == that.data.areaList[k].id) {
            currentMappingAreaListTemp.push(that.data.areaList[k]);
          }
        }
      }

      that.setData({
        currentCategoryIndex: categoryIndex,
        currentMappingIndex: currentMappingIndexTemp,
        currentMappingAreaList: currentMappingAreaListTemp
      })

    } else {
      //mapping->list为空
      console.warn("mapping->list为空");
    }
    console.log(that.data);
  },


  /**
   * 分类-点击
   */
  handleTapCategoryItem: function (event) {
   var that = this;
    var id = event.currentTarget.dataset.category_id;
    var index = event.currentTarget.dataset.category_index;
    that.setCurrentMappingAreaListData(index);
  },

  /**
   * 全部目的地-点击
   */
  handleTapAreaItem:function(event) {

    var that = this;
    var areaId = event.currentTarget.dataset.area_id;
    var path = "/pages/line/line-list/line-list?areaId=" + areaId;
    console.log(path);
    wx.navigateTo({
      url: path
    })
  },

  /**
   * 线路 - 点击
   */
  handleTapLineDetail: function (event) {

    var id = event.currentTarget.dataset.id;
    var path = "/pages/line/line-detail/line-detail?id=" + id;
    console.log(path);
    wx.navigateTo({
      url: path
    })
  }

}));