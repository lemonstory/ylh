// pages/API/choice-person/choice-person.js
Page({
 data: {
          items: [{ name: '勾方圆', ID: '1425789154456465555', call: '123456789', url: 'http://image.365zhiding.com/wxapp/20171121/dui2.png'},
          { name: '谭玉', ID: '1425789234556644855', call: '123456789', url: 'http://image.365zhiding.com/wxapp/20171121/dui2.png'},
          { name: '谭玉', ID: '1478954625894777463', call: '123456789', url: 'http://image.365zhiding.com/wxapp/20171121/dui2.png'}]
     },
     back: function () {
          wx.navigateBack();
     },
   /**
      * 生命周期函数--监听页面加载
      */
     onLoad: function (options) {
        

     },
 
     bindCheckbox: function (e) {
        
 //拿到下标值，以在items作遍历指示用
          var index = parseInt(e.currentTarget.dataset.index);
          //原始的icon状态
          var url = this.data.items[index].url;
          var items = this.data.items;
          if (url == "http://image.365zhiding.com/wxapp/20171121/dui2.png") {
               //未选中时
               items[index].url = "http://image.365zhiding.com/wxapp/20171121/dui.png";
          } else {
               items[index].url = "http://image.365zhiding.com/wxapp/20171121/dui2.png";
          }

          // 写回经点击修改后的数组
          this.setData({
               items: items
          });
          // 遍历拿到已经勾选的值
          var checkedValues = [];
          for (var i = 0; i < items.length; i++) {
               if (items[i].url == "http://image.365zhiding.com/wxapp/20171121/dui.png") {
                    checkedValues.push(items[i].value);
               }
          }
          // 写回data，供提交到网络
          this.setData({
               checkedValues: checkedValues
          });
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

     }
})