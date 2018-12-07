// pages/HistroyShare/HistroyShare.js
import regeneratorRuntime from '../../utils/regenerator-runtime/runtime-module.js';
import Request from '../../utils/Request.js';
import Const from '../../utils/Const.js';
var app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
   page:1,
   dete:null,
   LoadOk:false,
   year: 0,
    month: 0,
    date: ['日', '一', '二', '三', '四', '五', '六'],
    dateArr: [],
    isToday: 0,
    isTodaym: 0,
    jinri: 0,
    isTodayWeek: false,
    todayIndex: 0,
    isToday2: 0,
    isToday2m: 0,
    hide1: false,
    hide2: true,
    intdangqian: 0,
    today: 0,
    todamo: 0,
    toyear: 0,
    today1: 0,
    todamo1: 0,
    toyear1: 0,
    leixing: '0',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    let resData = await this.getType('0');
    console.log("in onLoad resData is ", resData);
    for (let m = 0; m < resData.length; m++) {
      if (resData[m].shopessayhead) {
        resData[m].shopessayhead = resData[m].shopessayhead.split(',');
      } else if (resData[m].head) {
        resData[m].head = resData[m].head.split(',');
      }
    }
    //console.log("看这里:",JSON.stringify(resData[0]));
    let a = [{ time: '12月6日', data: [{ shopeid: 1, shoptitle: "测试文章", shopessayhead: ["/upload/shopessayhead/1544064715664.jpeg"], shopauthor: "e6a8b1e6a183e88081e4b8b8e5ad90", shopauthoruid: 4, shopintroduction: "", see: 0, forword: 0, shopid: 4, txt: "<p>测试测试测试测试测试测试测试测试测试测试测试测试测试测试</p>", time: "2018-12-06 10:51:55", shopessaycustom: 0, shopessaycustomhead: "", wxnickname: "樱桃老丸子", wxhead: "https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTLzmEaKe0UdUaXWjd9hD7vDaibiaDibvfI3DzZ7yFmGydelDJQMvv6NRdibI6Eza2YubHGDzMLib5uZ8ZQ/132", productstype: "shopessays", shop: { shopid: 4, shopname: "量贩式KTV", shophead: "/upload/shophead/1543578245838.jpeg", shoptype: 1, businessarea: "天津", shopaddress: "测试商品", shopphone: "12345678900", opentime: "周一至周五5:00-19:00", shoptag: "乐", entertime: "2018-11-30 19:44:05", bankcard: "6228480262942471117", available: "true", earnings: 0, bank: "中国农业银行", bankname: "吕俊锋", shoptname: "西餐" }, products: [{ shoppid: 8, head: "/upload/head2/1543578920789.png", shoppname: "便携式榨汁机果汁机", shopprice: 454, shopoprice: 233, shopprofit: 221, count: 100, info: "121", sales: 0, shopid: 4, starttime: "2018-11-21 00:00:00", endtime: "2018-12-21 00:00:00", type: 2, sequence: -1, putaway: "up", usefullife: 24 }], rebate: "110.50" }, { shopeid: 1, shoptitle: "测试文章", shopessayhead: ["/upload/shopessayhead/1544064715664.jpeg"], shopauthor: "e6a8b1e6a183e88081e4b8b8e5ad90", shopauthoruid: 4, shopintroduction: "", see: 0, forword: 0, shopid: 4, txt: "<p>测试测试测试测试测试测试测试测试测试测试测试测试测试测试</p>", time: "2018-12-06 10:51:55", shopessaycustom: 0, shopessaycustomhead: "", wxnickname: "樱桃老丸子", wxhead: "https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTLzmEaKe0UdUaXWjd9hD7vDaibiaDibvfI3DzZ7yFmGydelDJQMvv6NRdibI6Eza2YubHGDzMLib5uZ8ZQ/132", productstype: "shopessays", shop: { shopid: 4, shopname: "量贩式KTV", shophead: "/upload/shophead/1543578245838.jpeg", shoptype: 1, businessarea: "天津", shopaddress: "测试商品", shopphone: "12345678900", opentime: "周一至周五5:00-19:00", shoptag: "乐", entertime: "2018-11-30 19:44:05", bankcard: "6228480262942471117", available: "true", earnings: 0, bank: "中国农业银行", bankname: "吕俊锋", shoptname: "西餐" }, products: [{ shoppid: 8, head: "/upload/head2/1543578920789.png", shoppname: "便携式榨汁机果汁机", shopprice: 454, shopoprice: 233, shopprofit: 221, count: 100, info: "121", sales: 0, shopid: 4, starttime: "2018-11-21 00:00:00", endtime: "2018-12-21 00:00:00", type: 2, sequence: -1, putaway: "up", usefullife: 24 }], rebate: "110.50" }, { shopeid: 1, shoptitle: "测试文章", shopessayhead: ["/upload/shopessayhead/1544064715664.jpeg"], shopauthor: "e6a8b1e6a183e88081e4b8b8e5ad90", shopauthoruid: 4, shopintroduction: "", see: 0, forword: 0, shopid: 4, txt: "<p>测试测试测试测试测试测试测试测试测试测试测试测试测试测试</p>", time: "2018-12-06 10:51:55", shopessaycustom: 0, shopessaycustomhead: "", wxnickname: "樱桃老丸子", wxhead: "https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTLzmEaKe0UdUaXWjd9hD7vDaibiaDibvfI3DzZ7yFmGydelDJQMvv6NRdibI6Eza2YubHGDzMLib5uZ8ZQ/132", productstype: "shopessays", shop: { shopid: 4, shopname: "量贩式KTV", shophead: "/upload/shophead/1543578245838.jpeg", shoptype: 1, businessarea: "天津", shopaddress: "测试商品", shopphone: "12345678900", opentime: "周一至周五5:00-19:00", shoptag: "乐", entertime: "2018-11-30 19:44:05", bankcard: "6228480262942471117", available: "true", earnings: 0, bank: "中国农业银行", bankname: "吕俊锋", shoptname: "西餐" }, products: [{ shoppid: 8, head: "/upload/head2/1543578920789.png", shoppname: "便携式榨汁机果汁机", shopprice: 454, shopoprice: 233, shopprofit: 221, count: 100, info: "121", sales: 0, shopid: 4, starttime: "2018-11-21 00:00:00", endtime: "2018-12-21 00:00:00", type: 2, sequence: -1, putaway: "up", usefullife: 24 }], rebate: "110.50" }] }, { time: '12月6日', data: [{ shopeid: 1, shoptitle: "测试文章", shopessayhead: ["/upload/shopessayhead/1544064715664.jpeg"], shopauthor: "e6a8b1e6a183e88081e4b8b8e5ad90", shopauthoruid: 4, shopintroduction: "", see: 0, forword: 0, shopid: 4, txt: "<p>测试测试测试测试测试测试测试测试测试测试测试测试测试测试</p>", time: "2018-12-06 10:51:55", shopessaycustom: 0, shopessaycustomhead: "", wxnickname: "樱桃老丸子", wxhead: "https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTLzmEaKe0UdUaXWjd9hD7vDaibiaDibvfI3DzZ7yFmGydelDJQMvv6NRdibI6Eza2YubHGDzMLib5uZ8ZQ/132", productstype: "shopessays", shop: { shopid: 4, shopname: "量贩式KTV", shophead: "/upload/shophead/1543578245838.jpeg", shoptype: 1, businessarea: "天津", shopaddress: "测试商品", shopphone: "12345678900", opentime: "周一至周五5:00-19:00", shoptag: "乐", entertime: "2018-11-30 19:44:05", bankcard: "6228480262942471117", available: "true", earnings: 0, bank: "中国农业银行", bankname: "吕俊锋", shoptname: "西餐" }, products: [{ shoppid: 8, head: "/upload/head2/1543578920789.png", shoppname: "便携式榨汁机果汁机", shopprice: 454, shopoprice: 233, shopprofit: 221, count: 100, info: "121", sales: 0, shopid: 4, starttime: "2018-11-21 00:00:00", endtime: "2018-12-21 00:00:00", type: 2, sequence: -1, putaway: "up", usefullife: 24 }], rebate: "110.50" }, { shopeid: 1, shoptitle: "测试文章", shopessayhead: ["/upload/shopessayhead/1544064715664.jpeg"], shopauthor: "e6a8b1e6a183e88081e4b8b8e5ad90", shopauthoruid: 4, shopintroduction: "", see: 0, forword: 0, shopid: 4, txt: "<p>测试测试测试测试测试测试测试测试测试测试测试测试测试测试</p>", time: "2018-12-06 10:51:55", shopessaycustom: 0, shopessaycustomhead: "", wxnickname: "樱桃老丸子", wxhead: "https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTLzmEaKe0UdUaXWjd9hD7vDaibiaDibvfI3DzZ7yFmGydelDJQMvv6NRdibI6Eza2YubHGDzMLib5uZ8ZQ/132", productstype: "shopessays", shop: { shopid: 4, shopname: "量贩式KTV", shophead: "/upload/shophead/1543578245838.jpeg", shoptype: 1, businessarea: "天津", shopaddress: "测试商品", shopphone: "12345678900", opentime: "周一至周五5:00-19:00", shoptag: "乐", entertime: "2018-11-30 19:44:05", bankcard: "6228480262942471117", available: "true", earnings: 0, bank: "中国农业银行", bankname: "吕俊锋", shoptname: "西餐" }, products: [{ shoppid: 8, head: "/upload/head2/1543578920789.png", shoppname: "便携式榨汁机果汁机", shopprice: 454, shopoprice: 233, shopprofit: 221, count: 100, info: "121", sales: 0, shopid: 4, starttime: "2018-11-21 00:00:00", endtime: "2018-12-21 00:00:00", type: 2, sequence: -1, putaway: "up", usefullife: 24 }], rebate: "110.50" }] }, { time: '12月6日', data: [{ shopeid: 1, shoptitle: "测试文章", shopessayhead: ["/upload/shopessayhead/1544064715664.jpeg"], shopauthor: "e6a8b1e6a183e88081e4b8b8e5ad90", shopauthoruid: 4, shopintroduction: "", see: 0, forword: 0, shopid: 4, txt: "<p>测试测试测试测试测试测试测试测试测试测试测试测试测试测试</p>", time: "2018-12-06 10:51:55", shopessaycustom: 0, shopessaycustomhead: "", wxnickname: "樱桃老丸子", wxhead: "https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTLzmEaKe0UdUaXWjd9hD7vDaibiaDibvfI3DzZ7yFmGydelDJQMvv6NRdibI6Eza2YubHGDzMLib5uZ8ZQ/132", productstype: "shopessays", shop: { shopid: 4, shopname: "量贩式KTV", shophead: "/upload/shophead/1543578245838.jpeg", shoptype: 1, businessarea: "天津", shopaddress: "测试商品", shopphone: "12345678900", opentime: "周一至周五5:00-19:00", shoptag: "乐", entertime: "2018-11-30 19:44:05", bankcard: "6228480262942471117", available: "true", earnings: 0, bank: "中国农业银行", bankname: "吕俊锋", shoptname: "西餐" }, products: [{ shoppid: 8, head: "/upload/head2/1543578920789.png", shoppname: "便携式榨汁机果汁机", shopprice: 454, shopoprice: 233, shopprofit: 221, count: 100, info: "121", sales: 0, shopid: 4, starttime: "2018-11-21 00:00:00", endtime: "2018-12-21 00:00:00", type: 2, sequence: -1, putaway: "up", usefullife: 24 }], rebate: "110.50" }, { shopeid: 1, shoptitle: "测试文章", shopessayhead: ["/upload/shopessayhead/1544064715664.jpeg"], shopauthor: "e6a8b1e6a183e88081e4b8b8e5ad90", shopauthoruid: 4, shopintroduction: "", see: 0, forword: 0, shopid: 4, txt: "<p>测试测试测试测试测试测试测试测试测试测试测试测试测试测试</p>", time: "2018-12-06 10:51:55", shopessaycustom: 0, shopessaycustomhead: "", wxnickname: "樱桃老丸子", wxhead: "https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTLzmEaKe0UdUaXWjd9hD7vDaibiaDibvfI3DzZ7yFmGydelDJQMvv6NRdibI6Eza2YubHGDzMLib5uZ8ZQ/132", productstype: "shopessays", shop: { shopid: 4, shopname: "量贩式KTV", shophead: "/upload/shophead/1543578245838.jpeg", shoptype: 1, businessarea: "天津", shopaddress: "测试商品", shopphone: "12345678900", opentime: "周一至周五5:00-19:00", shoptag: "乐", entertime: "2018-11-30 19:44:05", bankcard: "6228480262942471117", available: "true", earnings: 0, bank: "中国农业银行", bankname: "吕俊锋", shoptname: "西餐" }, products: [{ shoppid: 8, head: "/upload/head2/1543578920789.png", shoppname: "便携式榨汁机果汁机", shopprice: 454, shopoprice: 233, shopprofit: 221, count: 100, info: "121", sales: 0, shopid: 4, starttime: "2018-11-21 00:00:00", endtime: "2018-12-21 00:00:00", type: 2, sequence: -1, putaway: "up", usefullife: 24 }], rebate: "110.50" }] }];
    this.setData({dete:a});
    console.log('模拟数据:',a);
   ///////////////////////////////////////日历
    let now = new Date();
    let year = now.getFullYear();
    console.log('333333333333333       ', year)
    let month = now.getMonth() + 1;
    var dataxianzairiqi = now.getDate()
    dataxianzairiqi = dataxianzairiqi.toString().length == 1 ? '0' + dataxianzairiqi.toString() : dataxianzairiqi.toString()
    this.dateInit();
    this.setData({
      year: year,
      month: month,
      isToday: '' + year + month + now.getDate(),
      jinri: '' + year + (month.toString().length == 1 ? '0' + month.toString() : month.toString()) + dataxianzairiqi
    })
  },
  //获得首页的分类信息
  getType: async function (tag) {
    //获得推荐的商品
    let url = 'Data/GetHomeEOrP'
    let data = {
      page: this.data.page,
      shoptag: tag,
      uid: app.uid
    }
    console.log("data is ", data);
    let req = new Request(app.host + url, data, "POST", "text");
    let res = await req.sendRequest();
    this.data.LoadOk=true;
    this.setData({
      LoadOk : this.data.LoadOk
    })
    console.log('看这里2：',this.data.LoadOk);
    console.log("in getType res is ", res);
    if (tag === '0') {
      if (res.data.allproducts.length === 0) {
        this.data.loadText = '已经到底了~~o(>_<)o ~~';
        this.setData({
          loadText: this.data.loadText
        })
      }
      return res.data.allproducts;
    } else {
      return res.data.shopessays;
    }


    // this.setData({


    // })
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
  dateInit: function (setYear, setMonth) {
    //全部时间的月份都是按0~11基准，显示月份才+1
    let dateArr = [];						//需要遍历的日历数组数据
    let arrLen = 0;							//dateArr的数组长度
    let now = setYear ? new Date(setYear, setMonth) : new Date();
    let year = setYear || now.getFullYear();
    let nextYear = 0;
    let month = setMonth || now.getMonth();					//没有+1方便后面计算当月总天数
    let nextMonth = (month + 1) > 11 ? 1 : (month + 1);
    let startWeek = new Date(year + ',' + (month + 1) + ',' + 1).getDay();							//目标月1号对应的星期
    let dayNums = new Date(year, nextMonth, 0).getDate();				//获取目标月有多少天
    let obj = {};
    let num = 0;

    if (month + 1 > 11) {
      nextYear = year + 1;
      dayNums = new Date(nextYear, nextMonth, 0).getDate();
    }
    arrLen = startWeek + dayNums;
    for (let i = 0; i < arrLen; i++) {
      if (i >= startWeek) {
        num = i - startWeek + 1;
        obj = {
          isToday: '' + year + (month + 1) + num,
          year: year,
          month: (month + 1),
          dateNum: num,
        }
        console.log(this.data.isToday, "    2")
      } else {
        obj = {};
      }
      dateArr[i] = obj;
    }
    this.setData({
      dateArr: dateArr
    })

    let nowDate = new Date();
    let nowYear = nowDate.getFullYear();
    let nowMonth = nowDate.getMonth() + 1;
    let nowWeek = nowDate.getDay();
    let getYear = setYear || nowYear;
    let getMonth = setMonth >= 0 ? (setMonth + 1) : nowMonth;

    if (nowYear == getYear && nowMonth == getMonth) {
      this.setData({
        isTodayWeek: true,
        todayIndex: nowWeek
      })
    } else {
      this.setData({
        isTodayWeek: false,
        todayIndex: -1
      })
    }
  },
  lastMonth: function () {
    //全部时间的月份都是按0~11基准，显示月份才+1
    let year = this.data.month - 2 < 0 ? this.data.year - 1 : this.data.year;
    let month = this.data.month - 2 < 0 ? 11 : this.data.month - 2;
    this.setData({
      year: year,
      month: (month + 1)
    })
    this.dateInit(year, month);
  },
  nextMonth: function () {
    //全部时间的月份都是按0~11基准，显示月份才+1
    let year = this.data.month > 11 ? this.data.year + 1 : this.data.year;
    let month = this.data.month > 11 ? 0 : this.data.month;
    this.setData({
      year: year,
      month: (month + 1)
    })
    this.dateInit(year, month);
  },


  //点击日期事件
  dianjidata(e) {
    var k = JSON.parse(e.currentTarget.id);
    console.log(k)
    this.dianjishouyi2(k)
  },
  dianjishouyi2(e) {
      this.setData({
        isToday: e.nyr,
        isToday2: 0,
        isToday2m: 0,
        today: e.riqi,
      })
  },
  dianjishouyi(e) {
    
  },
})