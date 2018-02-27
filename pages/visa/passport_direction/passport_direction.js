// pages/wx-cropper/index.js
// 手机的宽度
const app = getApp();
const Toast = require('../../../zanui-weapp/dist/toast/index');
var util = require('../../../utils/util.js');
var windowWRPX = 750
// 拖动时候的 pageX
var pageX = 0
// 拖动时候的 pageY
var pageY = 0
var pixelRatio = wx.getSystemInfoSync().pixelRatioSA
// 调整大小时候的 pageX
var sizeConfPageX = 0
// 调整大小时候的 pageY
var sizeConfPageY = 0
var initDragCutW = 0
var initDragCutL = 0
var initDragCutH = 0
var initDragCutT = 0
// 移动时 手势位移与 实际元素位移的比
var dragScaleP = 2
Page({
  data: {
    animationData: {},
    showCutView: false,
    isShowImg: true,
    // 初始化的宽高
    cropperInitW: windowWRPX,
    cropperInitH: windowWRPX,
    // 动态的宽高
    cropperW: windowWRPX,
    cropperH: windowWRPX,
    // 动态的left top值
    cropperL: 0,
    cropperT: 0,
    // 图片缩放值
    scaleP: 0,
    imageW: 0,
    imageH: 0,
    // 裁剪框 宽高
    cutW: 0,
    cutH: 0,
    cutL: 0,
    cutT: 0,
    // 判断是正反面
    face: 0,
    // 图片base64数据
    imageBase64: "",

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    console.log(options);
    var imageface = options.imageface;
    var imageback = options.imageback;
    var imagePassport = options.imagePassport;
    if (!util.isEmptyStr(imageface)) {
      that.setData({
        imageSrc: imageface,
        face: 1
      })
    }
    if (!util.isEmptyStr(imageback)) {
      that.setData({
        imageSrc: imageback,
        face: 0
      })
    }
    if (!util.isEmptyStr(imagePassport)) {
      that.setData({
        imageSrc: imagePassport,
        face: 0
      })
    }
    console.log("---------------初始的------------------------");
    console.log(that.data.face);
    console.log(that.data.imageSrc);
  },

  onReady: function () {
    var that = this
    that.initImage();
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
  onShow: function () {
    var animation = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease',
    })
    this.animation = animation
    // animation.scale(2, 2).rotate(45).step()
    this.setData({
      animationData: animation.export()
    })
  },

  /**
      * 初始化圖片，處理適配屏幕
      */
  initImage() {
    var that = this;
    // 獲得圖片信息
    wx.getImageInfo({
      src: that.data.imageSrc,
      success: function success(res) {
        var innerAspectRadio = res.width / res.height;
        // 根据图片的宽高显示不同的效果   保证图片可以正常显示
        if (innerAspectRadio >= 1) {
          that.setData({
            cropperW: windowWRPX,
            cropperH: windowWRPX / innerAspectRadio,
            // 初始化left right
            cropperL: Math.ceil((windowWRPX - windowWRPX) / 2),
            cropperT: Math.ceil((windowWRPX - windowWRPX / innerAspectRadio) / 2),
            // 裁剪框  宽高  
            cutW: windowWRPX - 200,
            cutH: windowWRPX / innerAspectRadio - 200,
            cutL: Math.ceil((windowWRPX - windowWRPX + 200) / 2),
            cutT: Math.ceil((windowWRPX / innerAspectRadio - (windowWRPX / innerAspectRadio - 200)) / 2),                 // 图片缩放值
            scaleP: res.width * pixelRatio / windowWRPX,
            // 图片原始宽度 rpx
            imageW: res.width * pixelRatio,
            imageH: res.height * pixelRatio
          }) 
        } else {
          that.setData({
            cropperW: windowWRPX * innerAspectRadio,
            cropperH: windowWRPX,
            //初始化left right
            cropperL: Math.ceil((windowWRPX - windowWRPX * innerAspectRadio) / 2),
            cropperT: Math.ceil((windowWRPX - windowWRPX) / 2),
            //裁剪框的宽高
            cutW: windowWRPX * innerAspectRadio - 50,
            cutH: 200,
            cutL: Math.ceil((windowWRPX * innerAspectRadio - (windowWRPX * innerAspectRadio - 50)) / 2),
            cutT: Math.ceil((windowWRPX - 200) / 2),
            // 图片缩放值
            scaleP: res.width * pixelRatio / windowWRPX,
            // 图片原始宽度 rpx
            imageW: res.width * pixelRatio,
            imageH: res.height * pixelRatio
          })
        }
      }
    });
  },
  // 拖动时候触发的touchStart事件
  contentStartMove(e) {
    pageX = e.touches[0].pageX
    pageY = e.touches[0].pageY
  },
  /**
  *  拖拽事件
  */
  contentMoveing(e) {
    var that = this;
    var dragLengthX = (pageX - e.touches[0].pageX) * dragScaleP
    var dragLengthY = (pageY - e.touches[0].pageY) * dragScaleP
    var minX = Math.max(that.data.cutL - (dragLengthX), 0)
    var minY = Math.max(that.data.cutT - (dragLengthY), 0)
    var maxX = that.data.cropperW - that.data.cutW
    var maxY = that.data.cropperH - that.data.cutH
    this.setData({
      cutL: Math.min(maxX, minX),
      cutT: Math.min(maxY, minY),
    })
    console.log(`${maxX} ----- ${minX}`)
    pageX = e.touches[0].pageX
    pageY = e.touches[0].pageY
  },

  /**
   * 图片剪切
   */
  cutImage() {
    var that = this;
    wx.showLoading({
      title: '正在裁剪...',
    })
    // 计算图片尺寸
    var canvasW = that.data.cutW / that.data.cropperW * that.data.imageW / pixelRatio
    var canvasH = that.data.cutH / that.data.cropperH * that.data.imageH / pixelRatio
    var canvasL = that.data.cutL / that.data.cropperW * that.data.imageW / pixelRatio
    var canvasT = that.data.cutT / that.data.cropperH * that.data.imageH / pixelRatio
    // 将图片写入画布
    const ctx = wx.createCanvasContext('myCanvas');
    ctx.drawImage(that.data.imageSrc);
    // TODO ..................................................................
    ctx.draw();

    // 生成新的图片路径
    console.log(`canvasW:${canvasW} --- canvasH: ${canvasH} --- canvasL: ${canvasL} --- canvasT: ${canvasT} ------ that.data.imageW: ${that.data.imageW}  ------- that.data.imageH: ${that.data.imageH}`)
    wx.canvasToTempFilePath({
      x: canvasL,
      y: canvasT,
      width: canvasW,
      height: canvasH,
      destWidth: canvasW,
      destHeight: canvasH,
      canvasId: 'myCanvas',
      success: function (res) {
        // 成功获得地址的地方
        console.log("------------裁剪后----------------")
        console.log(res.tempFilePath)
        var newImgePath = res.tempFilePath;
        wx.getImageInfo({
          src: newImgePath,
          success: function (res) {
            console.log(res.path);
          },
          complete: function (res) {
            console.log(res);
          }
        })
        that.setData({
          // imageSrc: newImgePath,
          showCutView: true,
        })
        // wx.previewImage({
        //      current: '', // 当前显示图片的http链接
        //      urls: [that.data.imageSrc] // 需要预览的图片http链接列表
        // })
      },
      complete(res) {
        console.log(res);
        wx.hideLoading();
      }
    })
  },

  /**
   * 设置大小的时候触发的touchStart事件
  */
  dragStart(e) {
    var that = this
    console.log("退拽開始----------------")
    sizeConfPageX = e.touches[0].pageX
    sizeConfPageY = e.touches[0].pageY
    initDragCutW = that.data.cutW
    initDragCutL = that.data.cutL
    initDragCutT = that.data.cutT
    initDragCutH = that.data.cutH
  },

  /**
   * 设置大小的时候触发的touchMove事件
   */
  dragMove(e) {
    console.log("退拽----------------")
    var that = this
    var dragType = e.target.dataset.drag
    switch (dragType) {
      case 'right':
        var dragLength = (sizeConfPageX - e.touches[0].pageX) * dragScaleP
        if (initDragCutW >= dragLength) {
          // 如果 移动小于0 说明是在往下啦  放大裁剪的高度  这样一来 图片的高度  最大 等于 图片的top值加 当前图片的高度  否则就说明超出界限
          if (dragLength < 0 && that.data.cropperW > initDragCutL + that.data.cutW) {
            this.setData({
              cutW: initDragCutW - dragLength
            })
          }
          // 如果是移动 大于0  说明在缩小  只需要缩小的距离小于原本裁剪的高度就ok
          if (dragLength > 0) {
            this.setData({
              cutW: initDragCutW - dragLength
            })
          }
          else {
            return
          }
        } else {
          return
        }
        break;
      case 'left':
        var dragLength = (dragLength = sizeConfPageX - e.touches[0].pageX) * dragScaleP
        console.log(dragLength)
        if (initDragCutW >= dragLength && initDragCutL > dragLength) {
          if (dragLength < 0 && Math.abs(dragLength) >= initDragCutW) return
          this.setData({
            cutL: initDragCutL - dragLength,
            cutW: initDragCutW + dragLength
          })
        } else {
          return;
        }
        break;
      case 'top':
        var dragLength = (sizeConfPageY - e.touches[0].pageY) * dragScaleP
        if (initDragCutH >= dragLength && initDragCutT > dragLength) {
          if (dragLength < 0 && Math.abs(dragLength) >= initDragCutH) return
          this.setData({
            cutT: initDragCutT - dragLength,
            cutH: initDragCutH + dragLength
          })
        } else {
          return;
        }
        break;
      case 'bottom':
        var dragLength = (sizeConfPageY - e.touches[0].pageY) * dragScaleP
        // console.log(_this.data.cropperH > _this.data.cutT + _this.data.cutH)
        console.log(dragLength)
        console.log(initDragCutH >= dragLength)
        console.log(that.data.cropperH > initDragCutT + that.data.cutH)
        // 必须是 dragLength 向上缩小的时候必须小于原本的高度
        if (initDragCutH >= dragLength) {
          // 如果 移动小于0 说明是在往下啦  放大裁剪的高度  这样一来 图片的高度  最大 等于 图片的top值加 当前图片的高度  否则就说明超出界限
          if (dragLength < 0 && that.data.cropperH > initDragCutT + that.data.cutH) {
            this.setData({
              cutH: initDragCutH - dragLength
            })
          }
          // 如果是移动 大于0  说明在缩小  只需要缩小的距离小于原本裁剪的高度就ok
          if (dragLength > 0) {
            this.setData({
              cutH: initDragCutH - dragLength
            })
          }
          else {
            return
          }
        } else {
          return
        }
        break;
      case 'rightBottom':
        var dragLengthX = (sizeConfPageX - e.touches[0].pageX) * dragScaleP
        var dragLengthY = (sizeConfPageY - e.touches[0].pageY) * dragScaleP
        if (initDragCutH >= dragLengthY && initDragCutW >= dragLengthX) {
          // bottom 方向的变化
          if ((dragLengthY < 0 && that.data.cropperH > initDragCutT + that.data.cutH) || (dragLengthY > 0)) {
            this.setData({
              cutH: initDragCutH - dragLengthY
            })
          }
          // right 方向的变化
          if ((dragLengthX < 0 && that.data.cropperW > initDragCutL + that.data.cutW) || (dragLengthX > 0)) {
            this.setData({
              cutW: initDragCutW - dragLengthX
            })
          }
          else {
            return
          }
        } else {
          return
        }
        break;
      case 'topTight':
        break;
      case 'bottomLeft':
        break;
      case 'leftTop':
        break;
      default:
        break;
    }
  },

  /**
        * 翻转
        */
  handleTapRotate: function () {
    // var n = 0;
    // n = n + 1,
    //      console.log(n);
    // this.animation.rotate(90 * (n)).step()
    this.animation.rotate(90).step()
    this.setData({
      animationData: this.animation.export()
    })
  },
  /**
   * 正转
   */
  handleTapRotateN: function () {
    // var m = 0;
    // m = m - 1;
    // console.log(m)
    // this.animation.rotate(90 * (m)).step()
    this.animation.rotate(90).step()
    this.setData({
      animationData: this.animation.export()
    })

  },
  /**
  * 调用身份证api,识别身份证信息
  */
  handleTapIdCard: function () {
    var that = this;
    var url = "https://qa-distributor.yuelvhui.com/alyOCR/imageToBase64";
    var head = util.getRequestHeader(true);
    console.log(head);
    wx.uploadFile({
      url: url,
      filePath: that.data.imageSrc,
      name: 'file',
      header: util.getRequestHeader(true),
      formData: {
        'distributerId': that.data.distributerId
      },
      success: function (res) {
        wx.showLoading({
          title: '正在识别证件...',
        })
        console.log(res);
        if (res.statusCode == 200) {
          var info = JSON.parse(res.data)
          var img64data = info.imageStr;
          that.setData({
            imageBase64: img64data,
          })
          if (that.data.face == 1) {
            that.IdcardIdentification();
          }else{
            that.IdcardBackIdentification();
          }
        }
      },
      fail: function (res) {
        console.log(res);
        wx.showModal({
          title: '提示',
          content: '上传失败',
          showCancel: false
        })
      },
      complete: function (res) {
        console.log("完成--------------------------------")
        console.log(res);
      }
    })
  },
  /**
   * 证件识别--->身份证正面
   */
  // 
  IdcardIdentification: function () {
    var that = this;
    var imageBase64 = that.data.imageBase64;
    wx.request({
      url: "https://dm-51.data.aliyun.com/rest/160601/ocr/ocr_idcard.json",
      method: 'POST',
      header: {
        'Content-Type': 'application/json',
        'Authorization': "APPCODE " + "e682e10d5ba94a2d895d318138d06850"
      },
      data: {
        "inputs": [
          {
            "image": {
              "dataType": 50,
              "dataValue": imageBase64
            },
            "configure": {
              "dataType": 50,
              "dataValue": "{\"side\":\"face\"}"
            }
          }
        ]
      },
      success: function (res) {
        var imageUrl = that.data.imageSrc;
        wx.hideLoading();
        console.log(res.data);
        wx.navigateTo({
          url: '/pages/visa/idcard-face/idcard-face?imageface=' + imageUrl + '&userInfo=' + JSON.stringify(res.data),
        })
      },
      fail: function () {
        wx.showLoading({
          title: '身份证信息不完善，请...',
        })
      },
      complete: function (res) {
        console.log("完成----------------证件识别----------------")
        console.log(res);
      }
    })
  },

   /**
   * 证件识别--->身份证反面
   */ 
  IdcardBackIdentification: function () {
    var that = this;
    var imageBase64 = that.data.imageBase64;
    wx.request({
      url: "https://dm-51.data.aliyun.com/rest/160601/ocr/ocr_idcard.json",
      method: 'POST',
      header: {
        'Content-Type': 'application/json',
        'Authorization': "APPCODE " + "e682e10d5ba94a2d895d318138d06850"
      },
      data: {
        "inputs": [
          {
            "image": {
              "dataType": 50,
              "dataValue": imageBase64
            },
            "configure": {
              "dataType": 50,
              "dataValue": "{\"side\":\"back\"}"
            }
          }
        ]
      },
      success: function (res) {
        var imageUrl = that.data.imageSrc;
        wx.hideLoading();
        console.log(res.data);
        wx.navigateTo({
          url: '/pages/visa/idcard-back/idcard-back?imageface=' + imageUrl + '&userInfo=' + JSON.stringify(res.data),
        })
      },
      fail: function () {
        wx.showLoading({
          title: '身份证信息不完善，请...',
        })
      },
      complete: function (res) {
        console.log("完成----------------证件识别----------------")
        console.log(res);
      }
    })
  }
})






