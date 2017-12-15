// pages/API/food-require/food-require.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dishNum:1,
    soupNum:1,
    specialNum:1
    },
  back: function () {
    wx.redirectTo({
      url: "../car-require/car-require",
    })
  },
  next: function () {
    wx.redirectTo({
      url: "../public-active/public-active",
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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
  // 加减运算开始
  bindMinus: function (e) {
    var id = e.currentTarget.dataset.id;
    if (id == "dish") {
      var num = this.data.dishNum;
      if (num >= 1) {
        num--;
      }
      var minusStatus = num < 1 ? 'disabled' : 'normal';
      this.setData({
        dishNum: num,
        minusStatus: minusStatus
      });
    } else if (id == "soup") {
      var num = this.data.soupNum;
      if (num >= 1) {
        num--;
      }
      var minusStatus = num < 1 ? 'disabled' : 'normal';
      this.setData({
        soupNum: num,
        minusStatus: minusStatus
      });
    } else if (id == "special") {
      var num = this.data.specialNum;
      if (num >= 1) {
        num--;
      }
      var minusStatus = num < 1 ? 'disabled' : 'normal';
      this.setData({
        specialNum: num,
        minusStatus: minusStatus
      });
    }




  },
  bindPlus: function (e) {
    var id = e.currentTarget.dataset.id;
    if (id == "dish") {
      var num = this.data.dishNum;
      num++;
      this.setData({
        dishNum: num,
      });
    } else if (id == "soup") {
      var num = this.data.soupNum;
      num++;
      this.setData({
        soupNum: num,
      });
    }
    else if (id == "special") {
      var num = this.data.specialNum;
      num++;
      this.setData({
        specialNum: num,
      });
    }
  },



})