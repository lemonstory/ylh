// pages/API/add-address/add-address.js
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
    isSelected: 0,
    isUnSelect: 'http://image.365zhiding.com/wxapp/20171210/unselect.png',
    isSelect: 'http://image.365zhiding.com/wxapp/20171210/select.png',
    addressInfo: {
      "id": 0,                    //地址ID
      "name": '',             //姓名
      "gender": 1,           //性别
      "mobile": '',             //手机号
      "email": '',               //邮箱
      "province": 0,           //省
      "city": 0,                   //市
      "district": 0,               //区
      "street": '',                //街道(地址描述)
    },

    allAddress: [], //省事全部集合


    addressDetail: '',

    address: {
      "province": {
        "id": 0,
        "name": '',
        "pid": 0
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

    isAddressPickShow: false,

    province: [],
    city: [],
    district: [],

    value: [2, 0, 0],

    value1Defult: '省',
    value2Defult: '市',
    value3Defult: '区',

    selectProvinceId: 193,
    selectCityId: 194,
    selectDistrictId: 200,

    selectValue1: 0,
    selectValue2: 0,

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

    //设置标题
    if (that.data.addressInfo.id != 0) {
      wx.setNavigationBarTitle({
        title: '修改地址',
      })
      var address;
      if (that.data.addressInfo.province != 0 && that.data.addressInfo.city != 0 && that.data.addressInfo.district != 0) {
        address = areaUtil.getAreaName(that.data.addressInfo.province) + "-" + areaUtil.getAreaName(that.data.addressInfo.city) + "-" + areaUtil.getAreaName(that.data.addressInfo.district);
      } else if (that.data.addressInfo.province != 0 && that.data.addressInfo.city != 0 && that.data.addressInfo.district == 0) {
        address = areaUtil.getAreaName(that.data.addressInfo.province) + "-" + areaUtil.getAreaName
          (that.data.addressInfo.city);
      } else if (that.data.addressInfo.province != 0 && that.data.addressInfo.city == 0 && that.data.addressInfo.district == 0){
        address = areaUtil.getAreaName(that.data.addressInfo.province);
      } 
      that.setData({
        addressDetail: address,
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
      header: util.getRequestHeader(),
      success: function (res) {
        var allAddressList = res.data;
        that.setData({
          allAddress: allAddressList
        });
        that.getprovince();
        that.getCity();
        that.getDistrict();
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
      if (that.data.allAddress[i].pid == 37) {
        var itemprovince = that.data.allAddress[i];
        ItemList.push(itemprovince);
      }
    }
    that.setData({
      province: ItemList
    })
  },

  /**
   * 获取市的集合
   */
  getCity: function () {
    var that = this;
    var itemCityList = [];
    for (var i = 0; i < that.data.allAddress.length; i++) {
      if (that.data.allAddress[i].pid == that.data.selectProvinceId) {
        var itemCity = that.data.allAddress[i];
        itemCityList.push(itemCity);
      }
    }
    that.setData({
      city: itemCityList
    })
    console.log(that.data.city);
  },

  /**
   * 获取区的集合
   */
  getDistrict: function () {
    var that = this;
    var itemDistrictList = [];
    for (var i = 0; i < that.data.allAddress.length; i++) {
      if (that.data.allAddress[i].pid == that.data.selectCityId) {
        var itemDistrict = that.data.allAddress[i];
        itemDistrictList.push(itemDistrict);
      }
    }
    that.setData({
      district: itemDistrictList
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
   * 地址选择框的隐藏和显示
   */

  hideOrShowAddressPicker: function () {
    var that = this;
    var isShow = that.data.isAddressPickShow;
    console.log(isShow)
    if (isShow) {
      isShow = false;
    } else {
      isShow = true;
    }
    that.setData({
      isAddressPickShow: isShow,
    })
  },

  /**
   * 判断当前地址是否选择完整
   */
  addressIsWhole: function () {
    var that = this;
    var isWhole = true;
    if (that.data.city.length > 0) {
      if (that.data.selectCityId == 0 || that.data.value2Defult == "市") {
        isWhole = false;
      }
    }
    if (that.data.district.length > 0) {
      if (that.data.selectDistrictId == 0 || that.data.value3Defult == "区") {
        isWhole = false;
      }
    }
    return isWhole;
  },

  /**
   *  监听地址点击事件
   */
  handelAddressTap: function (e) {
    var that = this;
    that.hideOrShowAddressPicker();
  },

  /***
 *  处理点击地址确定
 */
  handelAddressCommit: function (e) {
    var that = this;
    if (that.addressIsWhole()) {
      that.hideOrShowAddressPicker();
      // 处理地址赋值
      var addressShow;
      if (that.data.selectCityId != 0 && that.data.selectDistrictId != 0) {
        addressShow = that.data.value1Defult + "-" + that.data.value2Defult + "-" + that.data.value3Defult;
      } else if (that.data.selectCityId != 0 && that.data.selectDistrictId == 0) {
        addressShow = that.data.value1Defult + "-" + that.data.value2Defult;
      } else if (that.data.selectCityId == 0 && that.data.selectDistrictId == 0) {
        addressShow = that.data.value1Defult;
      }
      var address = that.data.addressInfo;
      address.province = that.data.selectProvinceId;
      address.city = that.data.selectCityId;
      address.district = that.data.selectDistrictId;
      that.setData({
        addressInfo: address,
        addressDetail: addressShow
      })
      console.log(that.data.addressInfo);
    } else {
      that.showZanToast("请完善地址！");
    }
  },



  /**
   * 处理地址点击取消
   */

  handelAddressDis: function (e) {
    var that = this;
    that.hideOrShowAddressPicker();

  },

  /**
   * 监听地址的选择事件
   */
  handleSelectChange: function (e) {
    var that = this;
    const val = e.detail.value;
    var provinceVal = that.data.province[val[0]].id;
    if (provinceVal != that.data.selectProvinceId) {
      var selectProvinceName = that.data.province[val[0]].name;
      that.setData({
        value1Defult: selectProvinceName,
        selectProvinceId: provinceVal,
      })
      that.getCity();
    }
    if (that.data.city.length > 0) {
      var index1;
      if (val[1] == that.data.selectValue1) {
        index1 = 0;
      } else {
        index1 = val[1];
        that.setData({
          selectValue1: index1
        })
      }
      var cityVal = that.data.city[index1].id;

      if (cityVal != that.data.selectCityId) {
        var selectCityName = that.data.city[index1].name;
        that.setData({
          value2Defult: selectCityName,
          selectCityId: cityVal,
        })
        that.getDistrict();
      }
    } else {
      // 台湾、香港、澳门的处理
      that.setData({
        value2Defult: '市',
        selectCityId: 0,
      })
      that.getDistrict();
    }
    if (that.data.district.length > 0) {
      var index2;
      if (val[2] == that.data.selectValue2) {
        index2 = 0;
      } else {
        index2 = val[2];
        that.setData({
          selectValue2: index2
        })
      }
      var districtVal = that.data.district[index2].id;
      if (districtVal != that.data.selectDistrictId) {
        var selectDistrictName = that.data.district[index2].name;
        that.setData({
          selectDistrictId: districtVal,
          value3Defult: selectDistrictName
        })
      }
    } else {
      // 台湾、香港、澳门的处理
      that.setData({
        selectDistrictId: 0,
        value3Defult: "区"
      })
    }
  },

  /**
   * 新建地址
   */
  createAddress: function () {

    var that = this;
    wx.showLoading({
      title: '加载中',
    })

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
      header: util.postRequestHeader(),
      method: 'POST',
      success: function (res) {
        var address = that.data.addressInfo;
        address.id = res.data.id;
        that.setData({
          addressInfo: address
        });
      },
      fail: function (res) {
        that.showZanToast(res.message);
      },

      complete: function (res) {
        wx.hideLoading();
        console.log(res);
        // 处理返回的数据携带
        var url = '/pages/order/choice-address/choice-address';
        var pages = getCurrentPages();
        var prevPage = pages[pages.length - 2];  //上一个页面
        wx.redirectTo({
          url: url,
        })
      }
    })
  },

  /**
   * 处理性别选择
   */
  handleGenderSelect: function (e) {
    var that = this;
    var sex = e.currentTarget.dataset.sex;
    var address = that.data.addressInfo;
    address.gender = sex;
    console.log(sex);
    that.setData({
      addressInfo: address
    })
  },

  /**
   * 处理保存按钮
   */

  handleSubmit: function () {
    var that = this;
    that.createAddress();
  },


}))