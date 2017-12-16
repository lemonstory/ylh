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

module.exports = {
  formatTime: formatTime,
  isMobile: isMobile,
  getTitleWithId: getTitleWithId,
}


