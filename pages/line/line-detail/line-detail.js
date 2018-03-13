// pages/API/addressdetail/addressdetail.js
const app = getApp();
const Toast = require('../../../zanui-weapp/dist/toast/index');
var util = require('../../../utils/util.js')

Page(Object.assign({}, Toast, {
  data: {
    constant: app.constant,
  //轮播图
    inputContent: {},
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,

    optionsId: '',
    //电话弹窗
    isShowPhoneDialog: false,

    //优惠弹窗
    isShowActivityDetail: false,

    //出发日期
    startDatePriceListFormat: [],

    //已选择的出发日期
    selectedTravelDate: '',
    selectedTravelDateIndex: '',
    currentSelectedMonthIndex: '',

    //评论分页
    id: '',
    pageIndex: 1,
    pageSize: app.constant.pageSize,
    isShowCommendList: '',
    commendList: [],

    //是否还有更多数据
    'isNoMore': false,
    //是否正在加载中
    'isLoading': false,

    toView: '',
    windowHeight: '',
    scrollTop: 0,
    subHeaderTop: 0,
    strokeTop: 0,
    reminderTop: 0,
    expensesTop: 0,
    subHeaderHeight: 0,
    isSubHeaderTop: false,
    isStrokeFocus: false,
    isReminderFocus: false,
    isExpensesFocus: false,
    normalIds: [],
    normalViewHei: [],   // day显示的高度集合
    hei: 0
  },

  onLoad: function (options) {
    var that = this;
    wx.showNavigationBarLoading();
    console.log(options);
    //接收页面参数
    var id = options.id;
    if (!util.isEmptyStr(id)) {

      that.setData({
        optionsId: id
      })
      this.getLineDetailData(id);
    } else {
      console.error("id (线路Id) 不能为空 ")
    }

    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          windowHeight: res.windowHeight
        })
      }
    })
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

    var that = this;
    if (that.data.isShowCommendList) {

      if (!that.data.isNoMore) {
        this.setData({
          'isLoading': true,
        });

        var nextPageIndex = that.data.pageIndex + 1;
        setTimeout(() => {
          that.getCommendListData(that.data.id, that.data.pageIndex, that.data.pageSize)
        }, 500);

      } else {
        that.setData({
          'isLoading': false,
        });
      }
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (options) {

    var that = this;
    return {
      title: that.data.title,
      path: 'pages/line/line-detail/line-detail?id=' + that.data.id + "&distributerId=" + that.data.constant.distributerId,
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
  },

  /**
   * 咨询-点击
   */
  handleTapPhone: function () {

    var that = this;
    that.setData({
      isShowPhoneDialog: true,
    });

    console.log(that.data.isShowPhoneDialog);
  },

  /**
   * 咨询-取消
   */
  handleTapCancelPhoneDialog: function () {
    var that = this;
    that.setData({
      isShowPhoneDialog: false,
    });
  },

  /**
   * 咨询-确认
   */
  handleTapConfirmPhoneDialog: function () {

    var that = this;
    that.setData({
      isShowPhoneDialog: false,
    });

    wx.makePhoneCall({
      phoneNumber: '400-189-0876',
    })
  },

  /**
   * 优惠-点击
   */
  handleTapActivity: function () {
    var that = this;
    that.setData({
      isShowActivityDetail: !that.data.isShowActivityDetail
    });
  },

  /**
   * 优惠弹窗-关闭
   */
  handleTapActivityDetailCancel: function () {
    var that = this;
    that.setData({
      isShowActivityDetail: false,
      show: "0"
    });
  },

  /**
   * 领队-点击
   */
  handleTapLeaderIntroduce: function (event) {
    var id = event.currentTarget.dataset.id;
    var path = "/pages/line/leader-introduce/leader-introduce?id=" + id;
    console.log("path = " + path);
    wx.navigateTo({
      url: path
    })
  },

  /**
   * 评论更多-点击
   */
  handleTapCommendMore: function (event) {
    console.log(event);
    var that = this;
    var id = event.currentTarget.dataset.id;
    that.getCommendListData(that.data.id, that.data.pageIndex, that.data.pageSize)
    that.setData({
      isShowCommendList: true
    })
  },


  /**
   * 首页
   */
  handleTapIndex:function(event) {

    wx.switchTab({
      url: '/pages/line/index/index',
    })
  },
  

  //获取线路详情数据
  getLineDetailData: function (id) {
    var that = this;
    var url = that.data.constant.domain + '/distrbuter/line/detail/' + id;
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
      complete:function(res) {
        wx.hideNavigationBarLoading();
      }
    })

  },

  //获取评论数据
  getCommendListData: function (id, pageIndex, pageSize) {
    var that = this;
    var url = `${that.data.constant.domain}/distrbuter/line/commend/list/${id}/${pageIndex}/${pageSize}`
    console.log("url = " + url);
    wx.request({
      url: url,
      data: {},
      header: util.getRequestHeader(),
      success: function (res) {
        if (res.statusCode == 200) {

          if (res.data.list.length > 0) {
            var commendListTemp = [];
            if (typeof (that.data.commendList) != "undefined" && that.data.commendList.length > 0) {
              commendListTemp = that.data.commendList;
            }
            Array.prototype.push.apply(commendListTemp, res.data.list);
            that.setData({
              pageIndex: res.data.pageIndex,
              totalPage: res.data.totalPage,
              commendList: commendListTemp,
            })
            if (pageIndex >= res.data.totalPage) {

              that.setData({
                'isNoMore': true,
              })
            }

          } else {

            that.setData({
              'isNoMore': true,
            });
          }
        } else {

          var message = JSON.stringify(res.data)
          that.showZanToast(message);
        }
      },
      fail: function (res) { },
      complete: function (res) {

        if (that.data.isLoading) {
          wx.stopPullDownRefresh()
        }

        that.setData({
          'isLoading': false,
        });
      }
    })
  },

  // 点击处理banner图
  handleBanner: function (event) {
    var that = this;
    var src = event.currentTarget.dataset.src;
    that.navigateToUrl(src);
  },

  /**
  * 跳转url
  */
  navigateToUrl: function (url) {

    var path
    if (!util.isEmptyStr(url)) {

      if (util.isHttpUrl(url)) {
        path = "/pages/web-view/web-view?src=" + url;
      } else {
        path = url;
      }

      wx.navigateTo({
        url: path
      })

    } else {

      console.error("url为空")
      //测试
      that.showZanToast("url为空");
    }
  },


  /**
   * 处理出发日期下面的数据
   */
  setDataCallBack: function () {
    var that = this;
    var startDatePriceListTemp = [];
    if (that.data.priceList.length > 0) {
      for (var i = 0; i < that.data.priceList.length; i++)

        if (that.data.priceList[i].list.length > 0) {
          for (var j = 0; j < that.data.priceList[i].list.length; j++) {

            var datePriceListItemTemp = {};
            datePriceListItemTemp = that.data.priceList[i].list[j];
            datePriceListItemTemp.monthIndex = i;
            startDatePriceListTemp.push(that.data.priceList[i].list[j])
          }
        }
    }

    var startDatePriceListFormatTemp = [];
    if (startDatePriceListTemp.length > 0) {

      for (var i = 0; i < startDatePriceListTemp.length; i++) {

        var item = startDatePriceListTemp[i];
        // console.log(item);
        var itemDateArr = item.date.split("-");
        var itemDateFormatStr = itemDateArr[1] + "月" + itemDateArr[2] + "日";
        var itemDateFormat = {};

        itemDateFormat.date = item.date;
        itemDateFormat.dateStr = itemDateFormatStr;
        itemDateFormat.min = item.min;
        itemDateFormat.monthIndex = item.monthIndex;

        startDatePriceListFormatTemp.push(itemDateFormat);
      }
    }

    var commendListTemp = [];
    commendListTemp.push(that.data.comment);
    that.setData({
      startDatePriceListFormat: startDatePriceListFormatTemp,
      commendList: commendListTemp
    })

    //默认选中的出行日期
    that.setData({
      selectedTravelDate: that.data.startDatePriceListFormat[0].date,
      selectedTravelDateIndex: 0,
      currentSelectedMonthIndex: 0,
    });

  },

  /**
     * 出发日期-点击
     */
  handleTapChooseDate: function (e) {
    //选中的出行日期
    var currentSelectedTravelDate = e.currentTarget.dataset.date;
    //选中的出行日期所在的月份索引值
    var currentSelectedMonthIndex = e.currentTarget.dataset.month_index;
    var url = "/pages/order/choice-date/choice-date?currentSelectedTravelDate=" + currentSelectedTravelDate + "&currentSelectedMonthIndex=" + currentSelectedMonthIndex;
    console.log(url);

    var that = this;
    var dataIdx = e.currentTarget.dataset.data_idx;

    //设置当前样式
    if (this.data.selectedTravelDateIndex != dataIdx) {
      this.setData({
        selectedTravelDateIndex: dataIdx,
        selectedTravelDate: e.currentTarget.dataset.date,
        currentSelectedMonthIndex: currentSelectedMonthIndex
      })
    }

    var isOwnAccessToken = util.isOwnAccessToken()
    //跳转到绑定手机号
    if (!isOwnAccessToken) {

      wx.navigateTo({
        url: '/pages/user/wx-mobile/wx-mobile',
      })

    } else {
      wx.navigateTo({
        url: url,
      })
    }
  },

  /**
   * 开始预订-点击
   */
  handleTapStartOrder: function (e) {
    var that = this;
    var url = `/pages/order/choice-date/choice-date?currentSelectedTravelDate=${that.data.selectedTravelDate}&currentSelectedMonthIndex=${that.data.currentSelectedMonthIndex}`
    console.log("url = " + url);

    var isOwnAccessToken = util.isOwnAccessToken()
    //跳转到绑定手机号
    if (!isOwnAccessToken) {

      var returnUrl = '/pages/line/line-detail/line-detail?id=' + that.data.optionsId;
      returnUrl = encodeURIComponent(returnUrl);
      console.log(returnUrl);

      wx.navigateTo({
        url: '/pages/user/wx-mobile/wx-mobile?returnUrl=' + returnUrl,
      })

    } else {
      wx.navigateTo({
        url: url,
      })
    }
  },

  /**
   * 锚点跳转
   */
  bindAnchorScroll: function (e) {

    console.log(e);
    var that = this;
    var id = e.currentTarget.dataset.id;
    var scrollTop = 0;
    switch (id) {

      case 'stroke':
        scrollTop = that.data.strokeTop - that.data.subHeaderHeight
        break;

      case 'reminder':
        scrollTop = that.data.reminderTop - that.data.subHeaderHeight
        break;

      case 'expenses':
        scrollTop = that.data.expensesTop - that.data.subHeaderHeight
        break;
    }

    that.setData({
      toView: id,
      scrollTop: scrollTop
    })
  },


  scroll: function (e) {
    var that = this;
    var scrollTop = e.detail.scrollTop
    if (util.isEmptyStr(that.data.subHeaderTop)) {
      wx.createSelectorQuery().select('#sub-header').boundingClientRect(function (rect) {
        rect.id      // 节点的ID
        rect.dataset // 节点的dataset
        rect.left    // 节点的左边界坐标
        rect.right   // 节点的右边界坐标
        rect.top     // 节点的上边界坐标
        rect.bottom  // 节点的下边界坐标
        rect.width   // 节点的宽度
        rect.height  // 节点的高度
        var subHeaderTop = rect.top + e.detail.scrollTop;
        that.setData({
          subHeaderTop: subHeaderTop,
          subHeaderHeight: rect.height
        })

        // that.getViewHeigh();

      }).exec()
    }




    if (util.isEmptyStr(that.data.strokeTop)) {
      wx.createSelectorQuery().select('#stroke').boundingClientRect(function (rect) {
        that.setData({
          strokeTop: rect.top + e.detail.scrollTop - 30
        })
      }).exec()
    }

    if (util.isEmptyStr(that.data.reminderTop)) {
      wx.createSelectorQuery().select('#reminder').boundingClientRect(function (rect) {
        that.setData({
          reminderTop: rect.top + e.detail.scrollTop - 30
        })

      }).exec()
    }

    if (util.isEmptyStr(that.data.expensesTop)) {
      wx.createSelectorQuery().select('#expenses').boundingClientRect(function (rect) {
        that.setData({
          expensesTop: rect.top + e.detail.scrollTop - 30
        })
      }).exec()
    }

    // console.log("💥 💥 💥")
    // console.log("scrollTop = " + scrollTop);
    // console.log("that.data.subHeaderTop  = " + that.data.subHeaderTop);
    if (scrollTop > 0 && that.data.subHeaderTop > 0 && scrollTop >= that.data.subHeaderTop) {
      that.setData({
        isSubHeaderTop: true,
      })

    } else {

      that.setData({
        isSubHeaderTop: false,
      })
    }

    if ((scrollTop + that.data.subHeaderHeight) >= that.data.strokeTop && (scrollTop + that.data.subHeaderHeight) < that.data.reminderTop) {
      that.setData({
        isStrokeFocus: true
      })
    } else {

      that.setData({
        isStrokeFocus: false
      })
    }

    if ((scrollTop + that.data.subHeaderHeight) >= that.data.reminderTop && (scrollTop + that.data.subHeaderHeight) < that.data.expensesTop) {
      that.setData({
        isReminderFocus: true
      })
    } else {
      that.setData({
        isReminderFocus: false
      })
    }

    if ((scrollTop + that.data.subHeaderHeight) >= that.data.expensesTop) {

      that.setData({
        isExpensesFocus: true
      })

    } else {
      that.setData({
        isExpensesFocus: false
      })
    }
  },
  upper: function (e) {
    var that = this;
    that.setData({
      scrollTop: 0
    })
  },
  /**
      * 动态获得item的高低
      */
  // getViewHeigh: function () {
  //   var that = this;
  //   var ids = [];
  //   var viewHei;
  //   var normalHeighs = [];
  //   if (that.data.template.normal.length > 0) {    // 当有数据后
  //     for (var i = 0; i < that.data.template.normal.length; i++) {
  //       var name = "normal-" + i;
  //       ids.push(name);
  //       console.log(name);
  //     }
  //     that.setData({
  //       normalIds: ids
  //     })

  //     console.log("数据——————————————————————————————————————————————————————————————");
  //     console.log(that.data.template.normal.length);
  //     for (var i = 0; i < that.data.template.normal.length; i++) {
  //       var index = "#" + that.data.normalIds[i];
  //       wx.createSelectorQuery().select('index').boundingClientRect(function (rect) {
  //         rect.id      // 节点的ID  
  //         rect.dataset // 节点的dataset  
  //         rect.left    // 节点的左边界坐标  
  //         rect.right   // 节点的右边界坐标  
  //         rect.top     // 节点的上边界坐标  
  //         rect.bottom  // 节点的下边界坐标  
  //         rect.width   // 节点的宽度  
  //         rect.height  // 节点的高度  
  //         viewHei = rect.bottom - rect.top ;
  //         console.log("高度——————————————————————————————————————————————————————————————");
  //         console.log(viewHei);
  //         normalHeighs.push(viewHei);
  //         that.setData({
  //           normalViewHei: normalHeighs
  //         });
  //         console.log("高度集合——————————————————————————————————————————————————————————————");
  //         console.log(that.data.normalViewHei);

  //         that.setData({
  //           hei: viewHei
  //         })

  //       }).exec();
  //     }

  //   } else {
  //     console.log("数据空———————");

  //   }
  // },







}));

