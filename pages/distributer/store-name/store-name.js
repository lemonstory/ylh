var util = require('../../../utils/util.js');
const app = getApp();
const Toast = require('../../../zanui-weapp/dist/toast/index');
Page(Object.assign({}, Toast, {
     data: {
          'constant': app.constant,

          // 接口 post数据
          formData: {
               'shopName':'商铺名称'
          }
     },
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
     * 获取用户的名
     */
     getUserName: function () {

     },
      /**
     * 修改店铺名称
     */
     changeStoreName: function () {
          var that = this;
          var url = that.data.constant.distributerDomain + "/distributerShop/updateShopNameByPrimaryKey";

          if (!util.isEmptyStr(that.data.formData.shopName)){
          wx.request({
               url: url,
               data: that.data.formData,
               header: util.postRequestHeader(true),
               method: 'POST',
               success: function (res) {
                    that.showZanToast(res.message);
               },
               fail: function (res) {
                    console.log("出错了！");
                    that.showZanToast(res.message);
               },
               complete: function (res) {
                    console.log(res);

               }
          })
         
          }
          else {
               that.showZanToast("请完善修改信息!");
          }

        


     },



     /**
      * 监听输入框事件
      */
     bindInputValueChange: function (event) {
          var that = this;
          var formDataTemp = that.data.formData;
          formDataTemp[event.currentTarget.dataset.id] = event.detail.value;
          that.setData({
               formData: formDataTemp
          })
          console.log(that.data.formData);
         
     },
   
//    
     /**
      * 清空输入框
      */
     handleTapClearInput: function () {
          var that = this;
          that.setData({
               formData: '',
          })

     },


}))