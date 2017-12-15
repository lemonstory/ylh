// pages / API / erweima / erweima.js
//获取应用实例
//参考文档：https://developers.weixin.qq.com/blogdetail?action=get_post_info&lang=zh_CN&token=&docid=166eb4bdf352f67a45e993a0bfdc2025
var app = getApp()

//封面图地址
var imageUrl = 'http://image.365zhiding.com/wxapp/20171121/logo.png';

//页面二维码地址
var qrCodeUrl = 'http://image.365zhiding.com/wxapp/20171129/erweima.png';

//用户头像地址
var avatarUrl = "https://tva3.sinaimg.cn/crop.10.0.1102.1102.50/b8b73ba1jw8fcno216vedj20v90ummzs.jpg";
const ctx = wx.createCanvasContext('myCanvas');

Page({

     data: {
          'isImageDownloadComplete': false,
          'isQrCodeDownloadComplete': false,
          'isAvatarDownloadComplete': false,

          'imageTempFilePath': '',
          'qrCodeTempFilePath': '',
          'avatarTempFilePath': '',
          'canvasTempFilePath': '',
          'isCanvasToFileOk': false,
          'isCanvasToFileBeing': false,
     },

     onLoad: function (options) {

          var that = this;


          //下载封面图地址
          wx.downloadFile({

               url: imageUrl,
               success: function (res) {
                    console.log("wx.downloadFile SUCCESS");
                    if (res.statusCode === 200) {
                         that.setData({
                              'imageTempFilePath': res.tempFilePath,
                         });
                    }
               },
               fail: function (res) {
                    console.log("wx.downloadFile FAIL");
                    console.log(res);
               },

               complete: function (res) {
                    console.log("wx.downloadFile COMPLETE");
                    console.log(res);
                    that.setData({
                         'isImageDownloadComplete': true,
                    });

                    if (that.data.isImageDownloadComplete && that.data.isQrCodeDownloadComplete && that.data.isAvatarDownloadComplete) {
                         that.startCanvasDraw();
                    }
               }
          });

          //下载二维码
          wx.downloadFile({

               url: qrCodeUrl,
               success: function (res) {
                    console.log("wx.downloadFile SUCCESS");
                    if (res.statusCode === 200) {
                         that.setData({
                              'qrCodeTempFilePath': res.tempFilePath,
                         });
                    }
               },
               fail: function (res) {
                    console.log("wx.downloadFile FAIL");
                    console.log(res);
               },

               complete: function (res) {
                    console.log("wx.downloadFile COMPLETE");
                    console.log(res);
                    that.setData({
                         'isQrCodeDownloadComplete': true,
                    });

                    if (that.data.isImageDownloadComplete && that.data.isQrCodeDownloadComplete && that.data.isAvatarDownloadComplete) {
                         that.startCanvasDraw();
                    }
               }
          });

          //下载头像
          wx.downloadFile({

               url: avatarUrl,
               success: function (res) {
                    console.log("wx.downloadFile SUCCESS");
                    if (res.statusCode === 200) {
                         that.setData({
                              'avatarTempFilePath': res.tempFilePath,
                         });
                    }
               },
               fail: function (res) {
                    console.log("wx.downloadFile FAIL");
                    console.log(res);
               },

               complete: function (res) {
                    console.log("wx.downloadFile COMPLETE");
                    console.log(res);
                    that.setData({
                         'isAvatarDownloadComplete': true,
                    });

                    if (that.data.isImageDownloadComplete && that.data.isQrCodeDownloadComplete && that.data.isAvatarDownloadComplete) {
                         that.startCanvasDraw();
                    }
               }
          });
     },

     startCanvasDraw: function () {

          var rectWidth;
          var rectHeight;
          var rectX = 60;
          var rectY = 100;
          var imageWidth = 67;
          var imageHeight = 67;
          var avatarWidth = 28;
          var avatarHeight = 28;
          var avatarMargin = 20;
          var nameMarginLeft = 20;
          var titleMarginLeft = 60;
          var lineHeight = 25;
          var qrCodeWidth = 216;
          var qrCodeHeight = 216;

          try {
               var res = wx.getSystemInfoSync()
               console.log(res.model)
               console.log(res.pixelRatio)
               console.log(res.windowWidth)
               console.log(res.windowHeight)
               console.log(res.language)
               console.log(res.version)
               console.log(res.platform)

               rectWidth = res.windowWidth * 0.84;
               rectHeight = res.windowHeight * 0.56;
               rectX = res.windowWidth * 0.08;
               rectY = res.windowHeight * 0.074;

          } catch (e) {
               // Do something when catch error
          }

          console.log("rectWidth = " + rectWidth + ", rectHeight = " + rectHeight + ", rectX = " + rectX + ", rectY = " + rectY);



          var that = this;

          //正方形容器,阴影
          //TODO:圆角矩形背景
          ctx.setFillStyle('blue')
          // ctx.setShadow(30, 10, 50, '#B5B5B5');
          // ctx.fillRect(30, 10, 300, 400)
          ctx.setStrokeStyle('blue')
          // ctx.strokeRect(rectX, rectY, rectWidth, rectHeight)
          ctx.fillRect(rectX, rectY, rectWidth, rectHeight)

          //TODO:让封面图居中

          ctx.drawImage(that.data.imageTempFilePath, rectX + rectWidth / 3 - imageWidth / 2, rectY, imageWidth, imageHeight);

          //用户头像

          ctx.save(); // 保存当前ctx的状态
          ctx.arc(rectX + avatarWidth / 2 + avatarWidth / 2, rectY + avatarMargin + imageWidth + avatarWidth / 2, avatarWidth / 2, 0, 2 * Math.PI); //画出圆
          ctx.clip(); //裁剪上面的圆形
          ctx.drawImage(that.data.avatarTempFilePath, rectX + avatarWidth / 2, rectY + avatarMargin + imageWidth, avatarWidth, avatarWidth); // 在刚刚裁剪的园上画图
          ctx.restore(); // 还原状态

          //二维码
          ctx.drawImage(that.data.qrCodeTempFilePath, rectWidth * 0.5 - qrCodeWidth / 3, rectY + imageHeight + avatarMargin + avatarMargin + lineHeight * 3 - qrCodeWidth / 3, qrCodeWidth, qrCodeWidth);

          // //用户姓名
          // //最多四个汉字
          // ctx.setFontSize(15)
          // ctx.setFillStyle("#FFA500")
          // ctx.setTextAlign('left')

          // ctx.fillText('高勇', rectX + avatarWidth + nameMarginLeft, rectY + imageHeight + avatarMargin + avatarMargin)

          //专辑名称
          ctx.setFontSize(14)
          ctx.setFillStyle("#B5B5B5")
          ctx.setTextAlign('left')
          ctx.fillText('家的小宝贝 正在收听黑猫警', rectX + avatarWidth + nameMarginLeft + titleMarginLeft, rectY + imageHeight + avatarMargin + avatarMargin)
          ctx.fillText('长长长的名字', rectX + avatarWidth + nameMarginLeft, rectY + imageHeight + avatarMargin + avatarMargin + lineHeight)

          //二维码推荐语
          ctx.setFontSize(13)
          ctx.setFillStyle("red")
          ctx.setTextAlign('left')
          ctx.fillText('长按或扫描二维码进入店铺', rectX + avatarWidth, rectY + imageHeight + avatarMargin + avatarMargin + lineHeight * 10)

          //draw是异步
          //TODO:draw 的异步callback在ios  微信6.5.23 上时而工作,时而不工作
          console.log("开始 ### draw ### ");
          ctx.draw(false, function () {
               console.log("完成 ### draw ### ");
               console.log("🐷 🐷 🐷 🐷 🐷 🐷 🐷 🐷 🐷 🐷");
               that.handleCanvasToTempFilePath();
          });

          if (!that.data.isCanvasToFileBeing && !that.data.isCanvasToFileOk) {
               setTimeout(that.handleCanvasToTempFilePath, 600);
          }
     },

     onReady: function () {

     },

     onShow: function () {
          // 生命周期函数--监听页面显示
     },

     onHide: function () {
          // 生命周期函数--监听页面隐藏
     },

     onUnload: function () {
          // 生命周期函数--监听页面卸载
     },

     //canvas生成图片
     //TODO:偶发的会出现 canvasToTempFilePath fail canvas is empty 的错误
     handleCanvasToTempFilePath: function () {

          console.log("开始 ### CanvasToTempFilePath ### ");
          var that = this;
          console.log("that.data.isCanvasToFileOk = " + that.data.isCanvasToFileOk);
          if (!that.data.isCanvasToFileBeing && !that.data.isCanvasToFileOk) {

               that.setData({
                    'isCanvasToFileBeing': true,
               })

               wx.canvasToTempFilePath({
                    x: 0,
                    y: 0,
                    canvasId: 'myCanvas',
                    fileType: 'png',
                    quality: 1,
                    success: function (res) {
                         console.log("😀😀😀😀😀😀");
                         console.log(res);
                         that.setData({
                              'canvasTempFilePath': res.tempFilePath,
                              'isCanvasToFileOk': true,
                         })
                    },
                    fail(res) {
                         console.log("🐌 🐌 🐌 wx.canvasToTempFilePath FAIL");
                         console.log(res);
                    },
                    complete(res) {
                         that.setData({
                              'isCanvasToFileBeing': false,
                         })
                         console.log("🍺 🍺 🍺 wx.canvasToTempFilePath COMPLETE");
                         console.log(res);
                    },
               })
          }
          console.log("完成 ### CanvasToTempFilePath ### ");
     },


     handleSaveImageToPhotosAlbum: function () {

          var that = this;
          //保存图片到系统相册
          if (that.data.isCanvasToFileOk) {
               wx.saveImageToPhotosAlbum({
                    filePath: that.data.canvasTempFilePath,
                    success(res) {
                         console.log("wx.saveImageToPhotosAlbum SUCCESS");
                         console.log(res);
                    },

                    fail(res) {
                         console.log("wx.saveImageToPhotosAlbum FAIL");
                         console.log(res);
                    },

                    complete(res) {
                         console.log("wx.saveImageToPhotosAlbum COMPLETE");
                         console.log(res);
                    },
               })
          } else {
               console.log("🐛 handleSaveImageToPhotosAlbum isCanvasToFileOk FALSE")
          }

     },

     handlePreviewImage: function () {

          var that = this;
          if (that.data.isCanvasToFileOk) {

               wx.previewImage({
                    current: that.data.canvasTempFilePath, // 当前显示图片的http链接
                    urls: [that.data.canvasTempFilePath], // 需要预览的图片http链接列表
                    success: function (res) {

                         console.log("wx.previewImage SUCCESS");
                         console.log(res);
                    },
                    fail: function (res) {
                         console.log("wx.previewImage FAIL");
                         console.log(res);
                    },
                    complete: function (res) {
                         console.log("wx.previewImage COMPLETE");
                         console.log(res);
                    },
               })
          } else {
               console.log("🐛 handlePreviewImage isCanvasToFileOk FALSE")
          }
     },


})