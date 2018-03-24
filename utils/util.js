var constant = require('../constant.js');

const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}
function isMobile(value) {
  var pattern = /^1[3578][0123456789]\d{8}$/;
  if (!pattern.test(value)) {
    return false;
  }
  return true;
}
function isTelephone(value) {
  //"兼容格式: 国家代码(2到3位)-区号(2到3位)-电话号码(7到8位)-分机号(3位)"
  var pattern = /^(([0\+]\d{2,3}-)?(0\d{2,3})-)(\d{7,8})(-(\d{3,}))?$/;
  if (!pattern.test(value)) {
    return false;
  }
  return true;
}
function isTax(value) {

  var pattern = /^[A-Z0-9]{15}$|^[A-Z0-9]{17}$|^[A-Z0-9]{18}$|^[A-Z0-9]{20}$/;
  if (!pattern.test(value)) {
    return false;
  }
  return true;
}

function hideMobile(value) {
  var mobile = value;
  mobile = mobile.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2');
  return mobile;
}

function isEmail(value) {
  var pattern = /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/;
  if (!pattern.test(value)) {
    return false;
  }
  return true;
}

/**
 * 是否是军官证
 */
function isOfficialCard(value) {
  var reg = /[\u4e00-\u9fa5](字第){1}(\d{4,8})(号?)$/;
  if (!reg.test(value)) {
    return false;
  }
  return true;
}

/**
 * 是否是护照
 */
function isPassport(value) {
  var reg = /^1[45][0-9]{7}|([P|p|S|s]\d{7})|([S|s|G|g]\d{8})|([Gg|Tt|Ss|Ll|Qq|Dd|Aa|Ff]\d{8})|([H|h|M|m]\d{8，10})$/;
  if (!reg.test(value)) {
    return false;
  }
  return true;
}


function getTitleWithId(mapArr, idValue) {
  var title = '';
  for (var i = 0; i < mapArr.length; i++) {
    if (mapArr[i].id == idValue) {
      title = mapArr[i].title;
      break;
    }
  }
  return title;
}

function sortBy(field1, field2) {
  return function (a, b) {
    if (a.field1 == b.field1) return a.field2 - b.field2;
    return a.field1 - b.field1;
  }
}

/**
 * 根据年-月获取日历数据
 *  data.canlender = canlender;
 *  data.canlender.year = year;
 *  data.canlender.month = month;
 *  data.canlender.weeks = weeks;
 */
function getCanlenderData(year, month) {
  var that = this;
  var canlender = [];
  // var _date = new Date()
  // var year = _date.getFullYear()  //年
  // var month = _date.getMonth() + 1  //月
  // var date = _date.getDate()  //日
  // var year = 2017  //年
  // var month = 10  //月
  // var date = 6  //日
  console.log("📅 现在日期")
  console.info(year + "-" + month)

  // var day = _date.getDay()
  var firstDay = new Date(year, month - 1, 1).getDay();

  // console.warn('first day of this month :' + firstDay)

  var lastMonthDays = [];
  for (var i = firstDay; i > 0; i--) {
    // console.warn(new Date(year, month, -i).getDate())
    lastMonthDays.push({
      'date': new Date(year, month, -i).getDate(),
      'month': parseInt(month) - 1
    })
  }

  var currentMonthDys = [];
  for (var i = 1; i <= new Date(year, month, 0).getDate(); i++) {
    currentMonthDys.push({
      'date': i,
      'month': parseInt(month),
    })
  }
  var nextMonthDays = []
  var endDay = new Date(year, month, 0).getDay();
  // console.log('end day:' + endDay)
  for (var i = 1; i < 7 - endDay; i++) {

    nextMonthDays.push({
      'date': i,
      'month': parseInt(month) + 1 > 12 ? 1 : parseInt(month) + 1
    })
  }
  canlender = canlender.concat(lastMonthDays, currentMonthDys, nextMonthDays)
  var weeks = []
  for (var i = 0; i < canlender.length; i++) {
    if (i % 7 == 0) {
      weeks[parseInt(i / 7)] = new Array(7);
    }
    weeks[parseInt(i / 7)][i % 7] = canlender[i]
  }

  var data = {};
  // data.canlender = canlender;
  data.year = year;
  data.month = month;
  data.weeks = weeks;


  // console.info(weeks)
  // that.setData({
  //   canlender: canlender,
  //   'canlender.year': year,
  //   'canlender.month': month,
  //   'canlender.weeks': weeks,
  //   // currentTapDate: date
  // })

  // console.log(canlender);
  // console.log("🚀 🚀 🚀");
  // console.log(that.data.canlender);

  return data;
}

/**
 * 同步获取
 * 获取http header Authorization value
 */
function getUserAccessData() {

  var userAccessDataValue = {};
  if (isEmptyObject(constant.constant.userAccessData)) {

    console.log("全局 accessToken为空");
    try {
      var userAccessData = wx.getStorageSync(constant.constant.userAccessDataKey);
      if (typeof (userAccessData) != "undefined") {

        userAccessDataValue = userAccessData;
        constant.constant.userAccessData = userAccessData;

      }
    } catch (e) {
      // Do something when catch error

      console.warn(e);
    }
  } else {
    userAccessDataValue = constant.constant.userAccessData;
  }

  return userAccessDataValue;
}


/**
 * 同步获取
 * 
 */
function getDistributerAccessData() {

  var distributerAccessValue = '';
  if (isEmptyObject(constant.constant.distributerAccessData)) {

    console.log("全局 distributerToken 为空");
    try {
      var distributerAccessData = wx.getStorageSync(constant.constant.distributerAccessDataKey);
      if (typeof (distributerAccessData) != "undefined") {

        distributerAccessValue = distributerAccessData;
        constant.constant.distributerAccessData = distributerAccessData;

      }
    } catch (e) {
      // Do something when catch error
      console.error(e);
    }
  } else {
    console.log("全局 distributerToken 不为空");
    distributerAccessValue = constant.constant.distributerAccessData;
  }

  return distributerAccessValue;
}



function isEmptyObject(e) {
  var t;
  for (t in e)
    return !1;
  return !0
}

/** 
 * 是否为空字符串，有空格不是空字符串 
 * @param str 
 * @returns {Boolean} 
 */
function isEmptyStr(str) {
  if (str == null || typeof str == "undefined" ||
    str == "") {
    return true;
  }
  return false;
};

/**
 * 验证身份证
 */
function isValidID(ID) {
  if (typeof ID !== 'string') return '非法字符串';
  var city = { 11: "北京", 12: "天津", 13: "河北", 14: "山西", 15: "内蒙古", 21: "辽宁", 22: "吉林", 23: "黑龙江 ", 31: "上海", 32: "江苏", 33: "浙江", 34: "安徽", 35: "福建", 36: "江西", 37: "山东", 41: "河南", 42: "湖北 ", 43: "湖南", 44: "广东", 45: "广西", 46: "海南", 50: "重庆", 51: "四川", 52: "贵州", 53: "云南", 54: "西藏 ", 61: "陕西", 62: "甘肃", 63: "青海", 64: "宁夏", 65: "新疆", 71: "台湾", 81: "香港", 82: "澳门", 91: "国外" };
  var birthday = ID.substr(6, 4) + '/' + Number(ID.substr(10, 2)) + '/' + Number(ID.substr(12, 2));
  var d = new Date(birthday);
  var newBirthday = d.getFullYear() + '/' + Number(d.getMonth() + 1) + '/' + Number(d.getDate());
  var currentTime = new Date().getTime();
  var time = d.getTime();
  var arrInt = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
  var arrCh = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2'];
  var sum = 0, i, residue;

  if (!/^\d{17}(\d|x)$/i.test(ID)) return false //'非法身份证';
  if (city[ID.substr(0, 2)] === undefined) return false //"非法地区";
  if (time >= currentTime || birthday !== newBirthday) return false//'非法生日';
  for (i = 0; i < 17; i++) {
    sum += ID.substr(i, 1) * arrInt[i];
  }
  residue = arrCh[sum % 11];
  if (residue !== ID.substr(17, 1)) return false //'非法身份证哦';

  //return city[ID.substr(0, 2)] + "," + birthday + "," + (ID.substr(16, 1) % 2 ? " 男" : "女")
  return true;
}


/**
 * 用户Auth头
 */
function getUserAuthorizationValue() {

  var authorizationValue = 'Bearer '
  var userAccessData = getUserAccessData();
  if (!isEmptyObject(userAccessData.access_token)) {
    authorizationValue = authorizationValue + userAccessData.access_token
  }
  return authorizationValue;
}

/**
 * 代理商Auth头
 */
function getDistributerAuthorizationValue() {

  var authorizationValue = 'Distributer '
  var distributerAccessData = getDistributerAccessData();
  if (!isEmptyStr(distributerAccessData.distributerToken)) {
    authorizationValue = authorizationValue + distributerAccessData.distributerToken
  }
  return authorizationValue;
}

function getRequestHeader(isDistributer = false) {
  var authValue = ''
  if (isDistributer) {
    authValue = getDistributerAuthorizationValue();
  } else {
    authValue = getUserAuthorizationValue();
  }
  var header = {
    'Authorization': authValue,
    'Content-Type': 'application/json', //默认值
  }
  return header;
}

function postRequestHeader(isDistributer = false) {

  var authValue = ''

  if (isDistributer) {
    authValue = getDistributerAuthorizationValue();
  } else {
    authValue = getUserAuthorizationValue();
  }

  var header = {
    'Authorization': authValue,
    'Content-Type': 'application/x-www-form-urlencoded'
  }

  return header;
}

/**
 * 是否为代理商-同步
 */
function isDistributer() {

  var ret = false;
  try {
    var distributerIdValue = wx.getStorageSync(constant.constant.distributerIdKey)
    var distributerAccessDataValue = wx.getStorageSync(constant.constant.distributerAccessDataKey)

    if (!isEmptyStr(distributerIdValue) && !isEmptyObject(distributerAccessDataValue)) {
      ret = true;
    }
  } catch (e) {
    ret = false;
  }
  return ret;
  return true;
}

/**
 * 是否含有代理商Id-同步
 */
function isOwnDistributerId() {

  var ret = false;
  try {
    var distributerIdValue = wx.getStorageSync(constant.constant.distributerIdKey)
    if (distributerIdValue) {
      ret = true;
    }
  } catch (e) {
    ret = false;
  }

  return ret;
}

/**
 * 是否含有accessToken
 */
function isOwnAccessToken() {
  var ret = false;
  try {

    var userAccessData = getUserAccessData();
    var accessTokenValue = userAccessData.access_token;
    if (!isEmptyStr(accessTokenValue)) {
      ret = true;
    }
  } catch (e) {
    ret = false;
  }

  return ret;
}

/**
 * 获取微信OpenId
 */
function getWxOpenId() {
  var openId = '';
  try {

    var userAccessData = getUserAccessData();
    //接口里面的返回的openid i是小写
    openId = userAccessData.openid;

  } catch (e) {

    console.error(e);
  }

  return openId;
}


/**
 * 设置代理商ID-异步
 * 
 *  代理商登录
 *  代理商二维码识别
 *  线路首页-分享卡片
 *  线路详情-分享卡片 
 */
function setDistributerId(distributerId) {

  console.log("😀 😀 😀");
  //写入本地存储
  wx.setStorage({
    key: constant.constant.distributerIdKey,
    data: distributerId,
    success: function (res) {
      constant.constant.distributerId = distributerId;
    },
    fail: function (res) {
      console.warn("setDistributerId Fail");
      console.warn(res)
    }
  })
}

/**
 * 获取代理商Id
 */
function getDistributerId() {

  //读取本地存储
  var distributerIdValue = ''
  try {
    distributerIdValue = wx.getStorageSync(constant.constant.distributerIdKey)
  } catch (e) {
    console.warn(e);
  }
  return distributerIdValue;
}

/**
 * 代理商是否登录
 */
function isDistributerLogin() {

  var distributerAccessData = getDistributerAccessData();
  if (!isEmptyStr(distributerAccessData.distributerToken)) {

    return true;
  }
  return false;
}

/**
 * 跳转url是否为web
 */
function isHttpUrl(url) {

  console.log("url = " + url);
  if (!isEmptyStr(url)) {
    var startIndex = url.indexOf("http");
    if (startIndex == 0) {
      return true;
    }
  }
  return false;
}


/**
 * 默认分享数据
 */
function defaultShareData() {

  return {
    title: '环球悦旅会',
    path: '/page/line/index/index?distributerId=' + getDistributerId(),
    success: function (res) {
      // 转发成功
    },
    fail: function (res) {
      // 转发失败
      console.error(res);
    }
  }
}
module.exports = {
  formatTime: formatTime,
  isMobile: isMobile,
  isTelephone: isTelephone,
  isEmail: isEmail,
  isValidID: isValidID,
  isTax: isTax,
  hideMobile: hideMobile,
  getTitleWithId: getTitleWithId,
  sortBy: sortBy,
  getCanlenderData: getCanlenderData,

  getUserAccessData: getUserAccessData,
  getUserAuthorizationValue: getUserAuthorizationValue,

  getDistributerAccessData: getDistributerAccessData,
  getDistributerAuthorizationValue: getDistributerAuthorizationValue,

  getRequestHeader: getRequestHeader,
  postRequestHeader: postRequestHeader,

  isEmptyObject: isEmptyObject,
  isEmptyStr: isEmptyStr,
  isHttpUrl: isHttpUrl,

  isDistributer: isDistributer,
  isOwnDistributerId: isOwnDistributerId,
  isOwnAccessToken: isOwnAccessToken,
  isDistributerLogin: isDistributerLogin,
  setDistributerId: setDistributerId,
  getDistributerId: getDistributerId,



  getWxOpenId: getWxOpenId,
  defaultShareData: defaultShareData,
}


