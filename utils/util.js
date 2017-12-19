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

function isEmail(value) {

  var pattern = /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/;
  if (!pattern.test(value)) {
    return false;
  }
  return true;
}

function getTitleWithId(mapArr,idValue) {

  var title = '';
  for(var i = 0; i < mapArr.length; i++){
    if(mapArr[i].id == idValue) {
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
 * 
 *  data.canlender = canlender;
 *  data.canlender.year = year;
 *  data.canlender.month = month;
 *  data.canlender.weeks = weeks;
 */
function getCanlenderData (year, month) {

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



module.exports = {
  formatTime: formatTime,
  isMobile: isMobile,
  isEmail: isEmail,
  getTitleWithId: getTitleWithId,
  sortBy: sortBy,
  getCanlenderData: getCanlenderData

}


