var constant = {

     //业务域名
     "domain": "https://api.yuelvhui.com",

     //代理商域名
     "distributerDomain": "https://distributor.yuelvhui.com/api",

     //收银台域名
     "payDomain": "https://payment.yuelvhui.com",

     //系统来源,10悦旅汇，20小程序
     'tradeId': 20,
     //每页显示条数
     'pageSize': 20,

     //收银台支付
     "paymentTradeType": "WX_JSAPP",
     "paymentSysSource": "distributor",

     //数据存储key
     'userAccessDataKey': 'userAccessData',
     'distributerIdKey': 'distributerId',
     'distributerAccessDataKey': 'distributerAccessData',

     //用户访问数据
     'userAccessData': {},
     'distributerId': '',
     'distributerAccessData': {},

     //旅客证件类型
     "passengerCardType": [{
          id: '1',
          title: '身份证'
     }, {
          id: '2',
          title: '军官证'
     }, {
          id: '3',
          title: '护照'
     }, {
          id: '4',
          title: '港澳通行证'
     }, {
          id: '5',
          title: '台湾通行证'
     }, {
          id: '99',
          title: '其它'
     }],
     //旅客职业身份
     "passengerTitle": [{
          id: '1',
          title: '学龄前儿童',
          url:'http://image.365zhiding.com/wxapp/20180104/child.png'
     }, {
          id: '2',
          title: '在校学生',
          url:'http://image.365zhiding.com/wxapp/20180104/student.png'
     }, {
          id: '3',
          title: '在职人员',
          url:'http://image.365zhiding.com/wxapp/20180104/person.png'
     }, {
          id: '4',
          title: '自由职业者',
          url:'http://image.365zhiding.com/wxapp/20180104/free.png'
     }, {
          id: '5',
          title: '退休人员',
          url:'http://image.365zhiding.com/wxapp/20180104/tuixiu.png'
     }],

     //性别
     "gender": [{
          id: '1',
          title: '男'
     }, {
          id: '2',
          title: '女'
     }],

     //年龄分组
     "passengerAgeGroup": [{
          id: '2',
          title: '儿童'
     }, {
          id: '3',
          title: '成人'
     }, {
          id: '4',
          title: '老人'
     }],

     //机型要求
     "planeTicketType": [{
          id: '1',
          title: '直达'
     }, {
          id: '2',
          title: '转机'
     }, {
          id: '99',
          title: '无要求'
     }],

     //旅行目的地
     "travelIsInternational": [{
          id: '1',
          title: '境内'
     }, {
          id: '2',
          title: '境外'
     }],

     //仓位要求
     "planeTicketShippingSpace": [{
          id: '1',
          title: '经济舱'
     }, {
          id: '2',
          title: '公务舱'
     }, {
          id: '3',
          title: '头等舱'
     }],

     //酒店类型
     "hotelType": [{
          id: '1',
          title: '国际连锁'
     }, {
          id: '2',
          title: '常规15km'
     }, {
          id: '3',
          title: '市区10km'
     }, {
          id: '4',
          title: '市中心5km'
     }, {
          id: '99',
          title: '无要求'
     }],

     //酒店类型
     "hotelType": [{
          id: '1',
          title: '国际连锁'
     }, {
          id: '2',
          title: '常规15km'
     }, {
          id: '3',
          title: '市区10km'
     }, {
          id: '4',
          title: '市中心5km'
     }, {
          id: '99',
          title: '无要求'
     }],


     //酒店星级
     "hotelStars": [{
          id: '1',
          title: '三星'
     }, {
          id: '2',
          title: '四星'
     }, {
          id: '3',
          title: '五星'
     }],

//酒店客房标准(1标准双人间，2单间，3套房
     "hotelRoomStandard": [{
          id: '1',
          title: '标准双人间'
     }, {
          id: '2',
          title: '单间'
     }, {
          id: '3',
          title: '套房'
     }],

     //车辆类型要求
     "carsType": [{
          id: '1',
          title: '司导分离'
     }, {
          id: '2',
          title: '司兼导'
     }],

     //活动邀请函类型
     "activityInvitationType": [{
          id: '1',
          title: '邀请函客人自备'
     }, {
          id: '2',
          title: '邀请函我司提供'
     }],

     //签证原因
     "visaReason": [{
          id: '1',
          title: '因公'
     }, {
          id: '2',
          title: '因私'
     }],

     //签证类型
     "visaType": [{
          id: '1',
          title: '个人旅游签'
     }, {
          id: '2',
          title: 'ADS团队旅游签'
     }, {
          id: '3',
          title: '商签'
     }],

     //发票类型,1个人,2企业
     "orderBillType": [{
          id: '1',
          title: '个人'
     }, {
          id: '2',
          title: '企业'
     }],

     //结婚证字段
     "marriageCertificateField":['持证人', '登记日期', '结婚证字号', '备注', '姓名', '性别', '国籍', '出生日期', '身份证件号']
}
module.exports.constant = constant;