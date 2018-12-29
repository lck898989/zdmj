// pages/HistroyShare/HistroyShare.js
import regeneratorRuntime from '../../utils/regenerator-runtime/runtime-module.js';
import Request from '../../utils/Request.js';
import Const from '../../utils/Const.js';
var app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        hiddenData:false,
        isHidden: false,
        //
        indexYear: null,
        indexMonth: null,
        //判断是否是当前月
        ismonth: true,
        url: "",
        isleftDa: true,
        //判断当前选中的index
        index1: null,
        day: null,
        page: 1,
        dete: null,
        LoadOk: false,
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
        dete: [],
        timeList: [],

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: async function(options) {
        this.setData({
            url: app.urlw3
        })
        console.log("onload");
        console.log("in onLoad resData is ", resData);
        let resData = await this.getType('0');
        for (let m = 0; m < resData.length; m++) {
            if (resData[m].shopessayhead) {
                resData[m].shopessayhead = resData[m].shopessayhead.split(',');
            } else if (resData[m].head) {
                resData[m].head = resData[m].head.split(',');
            }
        }
        //console.log("看这里:",JSON.stringify(resData[0]));
        ///////////////////////////////////////日历
        let now = new Date();
        let year = now.getFullYear();
        console.log('333333333333333       ', year)
        let month = now.getMonth() + 1;
        var dataxianzairiqi = now.getDate()
        dataxianzairiqi = dataxianzairiqi.toString().length == 1 ? '0' + dataxianzairiqi.toString() : dataxianzairiqi.toString()
        this.dateInit();
        this.setData({
            indexYear: year,
            indexMonth: month,
            year: year,
            month: month,
            day: now.getDate().toString(),
            isToday: '' + year + month + now.getDate(),
            jinri: '' + year + (month.toString().length == 1 ? '0' + month.toString() : month.toString()) + dataxianzairiqi
        })
        console.log(this.data.year + "??????????????????????");
        console.log(this.data.month + "??????????????????????");
        if (this.setHistroyCall) {
            this.setHistroyCall();
        }
        app.setHistroy = res => {
            var keys = Object.keys(res.data.sharerecords);
            var values = Object.values(res.data.sharerecords);
            var data1 = [];
            for (let i = 0; i <= keys.length - 1; i++) {
                var dataSon = {};
                for (let j = 0; j <= values.length - 1; j++) {
                    if (i == j) {
                        let time = keys[i].split("-");
                        time = this.subZero(time[1]) + "月" + this.subZero(time[2]) + "日";
                        dataSon.time = time;
                        dataSon.msg = values[j];
                        data1.push(dataSon);
                    }
                }
            }
            this.setData({
                dete: data1
            })
            for (let i = 0; i <= this.data.dete.length - 1; i++) {
                for (let j = 0; j <= this.data.dete[i].msg.length - 1; j++) {
                    if (this.data.dete[i].msg[j].producttype == "shopessay") {
                        //   if (this.data.dete[i].msg[j].shopessay[rebate] == undefined)
                        //   {
                        //       this.data.dete[i].msg[j].shopessay.rebate=0.40;
                        //   }
                        if (this.data.dete[i].msg[j].shopessay.shopessaycustom == 1) {
                            this.data.dete[i].msg[j].shopessay.shopessaycustomhead = this.data.dete[i].msg[j].shopessay.shopessaycustomhead.split(",");
                            this.data.dete[i].msg[j].shopessay.shopessayhead = this.data.dete[i].msg[j].shopessay.shopessayhead.split(",");
                        } else {
                            this.data.dete[i].msg[j].shopessay.shopessayhead = this.data.dete[i].msg[j].shopessay.shopessayhead.split(",");
                        }
                    } else if (this.data.dete[i].msg[j].producttype == "essay") {
                        //   if (this.data.dete[i].msg[j].essay[rebate] == undefined) {
                        //       this.data.dete[i].msg[j].essay.rebate = 0.40;
                        //   }
                        if (this.data.dete[i].msg[j].essay.essaycustom == 1) {
                            this.data.dete[i].msg[j].essay.essaycustomhead = this.data.dete[i].msg[j].essay.essaycustomhead.split(",");
                            this.data.dete[i].msg[j].essay.essayhead = this.data.dete[i].msg[j].essay.essayhead.split(",");
                        } else {
                            this.data.dete[i].msg[j].essay.essayhead = this.data.dete[i].msg[j].essay.essayhead.split(",");
                        }
                    } else {
                        //   if (this.data.dete[i].msg[j].product[rebate] == undefined) {
                        //       this.data.dete[i].msg[j].product.rebate = 0.40;
                        //   }
                        this.data.dete[i].msg[j].product.head = this.data.dete[i].msg[j].product.head.split(",");
                    }
                }
            }
            this.setData({
                dete: this.data.dete
            })

            for (let i = 0; i <= this.data.dete.length - 1; i++) {
                console.log(this.data.dete[i].msg.length + "!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
                if (this.data.dete[i].msg.length % 2 == 0) {
                    let leftArray1 = [];
                    let rightArray1 = [];
                    for (let j = 0; j <= this.data.dete[i].msg.length - 1; j++) {
                        if (j <= (this.data.dete[i].msg.length / 2 - 1)) {
                            leftArray1.push(this.data.dete[i].msg[j]);
                            this.data.dete[i].leftArray = leftArray1;
                            console.log(JSON.stringify(this.data.dete[i].leftArray) + "\\\\\\\\\\\\\\\\\\");
                        } else {
                            rightArray1.push(this.data.dete[i].msg[j]);
                            this.data.dete[i].rightArray = rightArray1;

                        }
                        if (j == this.data.dete[i].msg.length - 1) {

                        }
                    }
                } else {
                    let leftArray1 = [];
                    let rightArray1 = [];
                    for (let j = 0; j <= this.data.dete[i].msg.length - 1; j++) {
                        if (j <= (this.data.dete[i].msg.length / 2 - 0.5)) {
                            leftArray1.push(this.data.dete[i].msg[j]);
                            this.data.dete[i].leftArray = leftArray1;


                        } else {
                            rightArray1.push(this.data.dete[i].msg[j]);
                            this.data.dete[i].rightArray = rightArray1;

                        }
                        if (j == this.data.dete[i].msg.length - 1) {

                        }
                    }
                }
            }
            this.setData({
                dete: this.data.dete
            })
            console.log(JSON.stringify(this.data.dete) + "---------------------------");
            for (let k = 0; k <= this.data.dete.length - 1; k++) {
                if (this.data.dete[k].leftArray != null && this.data.dete[k].rightArray != null) {
                    for (let i = 0; i <= this.data.dete[k].leftArray.length - 1; i++) {
                        console.log(i + "iiiiiiiiiiiii");
                        for (let j = 0; j <= this.data.dete[k].rightArray.length - 1; j++) {
                            if (i == j) {
                                if (this.data.dete[k].leftArray[i].height > this.data.dete[k].rightArray[j].height) {
                                    if (this.data.isleftDa) {
                                        this.setData({
                                            isleftDa: false,
                                        })
                                        break;
                                    } else {
                                        var leftNumber = this.data.dete[k].leftArray[i];
                                        this.data.dete[k].leftArray[i] = this.data.dete[k].rightArray[j];
                                        this.data.dete[k].rightArray[j] = leftNumber;
                                        this.setData({
                                            isleftDa: true,
                                        })
                                    }
                                } else if (this.data.dete[k].leftArray[i].height < this.data.dete[k].rightArray[j].height) {
                                    if (this.data.isleftDa) {
                                        var leftNumber = this.data.dete[k].leftArray[i];
                                        this.data.dete[k].leftArray[i] = this.data.dete[k].rightArray[j];
                                        this.data.dete[k].rightArray[j] = leftNumber;
                                        this.setData({
                                            isleftDa: false,
                                        })
                                    } else {
                                        this.setData({
                                            isleftDa: true,
                                        })
                                        break;
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        app.setHistroyData = res => {
            var timeList = [];
            for (let j = 0; j <= res.data.timeList.length - 1; j++) {
                res.data.timeList[j] = res.data.timeList[j].split("-");
                if (res.data.timeList[j][1][0] == '0') {
                    res.data.timeList[j][1] = res.data.timeList[j][1][1];
                }
                if (res.data.timeList[j][2][0] == '0') {
                    res.data.timeList[j][2] = res.data.timeList[j][2][1];
                }
                timeList.push(res.data.timeList[j][0] + res.data.timeList[j][1] + res.data.timeList[j][2]);
            }
            this.setData({
                timeList: timeList
            })
            for (let i = 0; i <= this.data.dateArr.length - 1; i++) {
                this.data.dateArr[i].istrue = false;
                this.data.dateArr[i].isShow = true;

            }

            for (let i = 0; i <= this.data.dateArr.length - 1; i++) {
                for (let j = 0; j <= timeList.length - 1; j++) {
                    if (this.data.dateArr[i].isToday == timeList[j]) {
                        this.data.dateArr[i].istrue = true;
                    }
                }
            }
            this.setData({
                dateArr: this.data.dateArr
            })
            console.log(JSON.stringify(this.data.dateArr)+"====================================================");
        }
    },
    //刷新dataArr
    refushData: function() {
        //   var timeList = [];
        //   for (let j = 0; j <= this.data.timeList.length - 1; j++) {
        //       this.data.timeList[j] = this.data.timeList[j].split("-");
        //       if (this.data.timeList[j][1][0] == '0') {
        //           this.data.timeList[j][1] = this.data.timeList[j][1][1];
        //       }
        //       if (this.data.timeList[j][2][0] == '0') {
        //           this.data.timeList[j][2] = this.data.timeList[j][2][1];
        //       }
        //       timeList.push(this.data.timeList[j][0] + this.data.timeList[j][1] + this.data.timeList[j][2]);
        //   }
        for (let i = 0; i <= this.data.dateArr.length - 1; i++) {
            this.data.dateArr[i].istrue = false;
            this.data.dateArr[i].isShow = true;
        }

        for (let i = 0; i <= this.data.dateArr.length - 1; i++) {
            for (let j = 0; j <= this.data.timeList.length - 1; j++) {
                if (this.data.dateArr[i].isToday == this.data.timeList[j]) {
                    this.data.dateArr[i].istrue = true;
                }
            }
        }
        this.setData({
            dateArr: this.data.dateArr
        })
    },
    //获得首页的分类信息
    getType: async function(tag) {
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
        this.data.LoadOk = true;
        this.setData({
            LoadOk: this.data.LoadOk
        })
        console.log('看这里2：', this.data.LoadOk);
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
    addZero: function(a) {
        if (a.length == 1) {
            a = "0" + a;
        }
        return a;
    },
    subZero: function(a) {
        if (a.length == 2 && a[0] == '0') {
            a = a[1];
        }
        return a;

    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {
        console.log("onShow");
        if (this.data.day == null) {
            this.setHistroyCall = res => {
                let day = this.data.year.toString() + "-" + this.addZero(this.data.month.toString()) + "-" + this.addZero(this.data.day);

                app.ShortConnect(app.urlw + "Data/GetShareRecordDate", {
                    uid: app.uid
                }, "getHistroyData");
                app.ShortConnect(app.urlw + "Data/GetShareRecordStartByDay", {
                    day: day,
                    uid: app.uid,
                    page: 1
                }, "getHistroy");
            }

        } else {
            let day = this.data.year.toString() + "-" + this.addZero(this.data.month.toString()) + "-" + this.addZero(this.data.day);

            app.ShortConnect(app.urlw + "Data/GetShareRecordDate", {
                uid: app.uid
            }, "getHistroyData");
            app.ShortConnect(app.urlw + "Data/GetShareRecordStartByDay", {
                day: day,
                uid: app.uid,
                page: 1
            }, "getHistroy");
        }
    },
    shousuoBox: function() {
        if (this.data.isHidden==false)
        {
           
            var isfind = false;
            var isfindleft = false;
            var ishasToday = false;
            var todayIndex = null;
            if (this.data.index1 == null) {
                for (let i = 0; i <= this.data.dateArr.length - 1; i++) {
                    if (this.data.dateArr[i].isToday == this.data.isToday) {
                        todayIndex = i;
                        ishasToday = true;
                    }
                }
                if (ishasToday) {
                    //向右寻找
                    for (let i = todayIndex; i <= this.data.dateArr.length - 1; i++) {
                        let year = "";
                        let month = "";
                        let day = "";
                        let isToday = "";
                        //获取今天是星期几
                        let sunday = "";
                     
                        if (this.data.dateArr[i]["year"]== "undefined") {

                            if (isfind) {
                                this.data.dateArr[i].isShow = false;
                            } else {
                                this.data.dateArr[i].isShow = true;
                            }
                           
                            // year = this.data.dateArr[i].year.toString();
                           
                            // month = this.addZero(this.data.dateArr[i].month.toString());
                            // day = this.addZero(this.data.dateArr[i].dateNum.toString());
                            // isToday = year + "-" + month + "-" + day;
                            // //获取今天是星期几
                            // sunday = new Date(isToday).getDay();
                            // if (isfind == false) {
                            //     this.data.dateArr[i].isShow = true;
                            // } else {
                            //     this.data.dateArr[i].isShow = false;
                            // }
                            // if (sunday == 6 && isfind == false) {
                            //     isfind = true;
                            // }
                        } else {
                            year = this.data.dateArr[i].year.toString();
                            month = this.addZero(this.data.dateArr[i].month.toString());
                            day = this.addZero(this.data.dateArr[i].dateNum.toString());
                            isToday = year + "-" + month + "-" + day;
                            //获取今天是星期几
                            sunday = new Date(isToday).getDay();
                            if (isfind == false) {
                                this.data.dateArr[i].isShow = true;
                            } else {
                                this.data.dateArr[i].isShow = false;
                            }
                            if (sunday == 6 && isfind == false) {
                                isfind = true;
                            }
                        }

                    }
                    //向左寻找
                    for (let i = todayIndex; i >= 0; i--) {
                        let year = "";
                        let month = "";
                        let day = "";
                        let isToday = "";
                        //获取今天是星期几
                        let sunday = "";
                   
                        if (this.data.dateArr[i]["year"]===undefined) {
                            if (isfindleft) {
                                this.data.dateArr[i].isShow = false;
                            } else {
                                this.data.dateArr[i].isShow = true;
                            }
                        } else {
                            // console.log(JSON.stringify(this.data.dateArr[i])+"$$$$$$$$$$$$$$$$$$$$$$$$");
                            year = this.data.dateArr[i].year.toString();
                            month = this.addZero(this.data.dateArr[i].month.toString());
                            day = this.addZero(this.data.dateArr[i].dateNum.toString());
                            isToday = year + "-" + month + "-" + day;
                            //获取今天是星期几
                            sunday = new Date(isToday).getDay();
                        
                            if (isfindleft == false) {
                                
                                this.data.dateArr[i].isShow = true;
                            } else {
                                   console.log(JSON.stringify(this.data.dateArr[i])+"$$$$$$$$$$$$$$$$$$$$$$$$");
                                this.data.dateArr[i].isShow = false;
                            }
                            if (sunday == 0 && isfindleft == false) {
                                isfindleft = true;
                            }    
                        }
                    }
                }
                else
                {
                    let now = new Date();
                    let year = now.getFullYear();
                    let month = now.getMonth();
                    this.dateInit(year, month);
                    this.refushData();
                    for (let i = 0; i <= this.data.dateArr.length - 1; i++) {
                        if (this.data.dateArr[i].isToday == this.data.isToday) {
                            todayIndex = i;
                        }
                    }
                    this.setData({
                        year: year,
                        month: month+1,
                        ismonth:true
                    })
                    //向右寻找
                    for (let i = todayIndex; i <= this.data.dateArr.length - 1; i++) {
                        let year = "";
                        let month = "";
                        let day = "";
                        let isToday = "";
                        //获取今天是星期几
                        let sunday = "";

                        if (this.data.dateArr[i]["year"] == "undefined") {

                            if (isfind) {
                                this.data.dateArr[i].isShow = false;
                            } else {
                                this.data.dateArr[i].isShow = true;
                            }

                            // year = this.data.dateArr[i].year.toString();

                            // month = this.addZero(this.data.dateArr[i].month.toString());
                            // day = this.addZero(this.data.dateArr[i].dateNum.toString());
                            // isToday = year + "-" + month + "-" + day;
                            // //获取今天是星期几
                            // sunday = new Date(isToday).getDay();
                            // if (isfind == false) {
                            //     this.data.dateArr[i].isShow = true;
                            // } else {
                            //     this.data.dateArr[i].isShow = false;
                            // }
                            // if (sunday == 6 && isfind == false) {
                            //     isfind = true;
                            // }
                        } else {
                            year = this.data.dateArr[i].year.toString();
                            month = this.addZero(this.data.dateArr[i].month.toString());
                            day = this.addZero(this.data.dateArr[i].dateNum.toString());
                            isToday = year + "-" + month + "-" + day;
                            //获取今天是星期几
                            sunday = new Date(isToday).getDay();
                            if (isfind == false) {
                                this.data.dateArr[i].isShow = true;
                            } else {
                                this.data.dateArr[i].isShow = false;
                            }
                            if (sunday == 6 && isfind == false) {
                                isfind = true;
                            }
                        }

                    }
                    //向左寻找
                    for (let i = todayIndex; i >= 0; i--) {
                        let year = "";
                        let month = "";
                        let day = "";
                        let isToday = "";
                        //获取今天是星期几
                        let sunday = "";

                        if (this.data.dateArr[i]["year"] === undefined) {
                            if (isfindleft) {
                                this.data.dateArr[i].isShow = false;
                            } else {
                                this.data.dateArr[i].isShow = true;
                            }
                        } else {
                            // console.log(JSON.stringify(this.data.dateArr[i])+"$$$$$$$$$$$$$$$$$$$$$$$$");
                            year = this.data.dateArr[i].year.toString();
                            month = this.addZero(this.data.dateArr[i].month.toString());
                            day = this.addZero(this.data.dateArr[i].dateNum.toString());
                            isToday = year + "-" + month + "-" + day;
                            //获取今天是星期几
                            sunday = new Date(isToday).getDay();

                            if (isfindleft == false) {

                                this.data.dateArr[i].isShow = true;
                            } else {
                                console.log(JSON.stringify(this.data.dateArr[i]) + "$$$$$$$$$$$$$$$$$$$$$$$$");
                                this.data.dateArr[i].isShow = false;
                            }
                            if (sunday == 0 && isfindleft == false) {
                                isfindleft = true;
                            }
                        }
                    }
                    

                }

            } else {
                //向右寻找
                for (let i = this.data.index1; i <= this.data.dateArr.length - 1; i++) {
                    let year = "";
                    let month = "";
                    let day = "";
                    let isToday = "";
                    //获取今天是星期几
                    let sunday = "";
                    if (this.data.dateArr[i]["year"]===undefined) {
                        if (isfind) {
                            this.data.dateArr[i].isShow = false;
                        } else {
                            this.data.dateArr[i].isShow = true;
                        }
                    } else {
                        year = this.data.dateArr[i].year.toString();
                        month = this.addZero(this.data.dateArr[i].month.toString());
                        day = this.addZero(this.data.dateArr[i].dateNum.toString());
                        isToday = year + "-" + month + "-" + day;
                        //获取今天是星期几
                        sunday = new Date(isToday).getDay();
                        if (isfind == false) {
                            this.data.dateArr[i].isShow = true;
                        } else {
                            this.data.dateArr[i].isShow = false;
                        }
                        if (sunday == 6 && isfind == false) {
                            isfind = true;
                        }
                    }
                }
                //向左寻找
                for (let i = this.data.index1; i >= 0; i--) {
                    let year = "";
                    let month = "";
                    let day = "";
                    let isToday = "";
                    //获取今天是星期几
                    let sunday = "";
                    if (this.data.dateArr[i]["year"]===undefined) {
                        if (isfindleft) {
                            this.data.dateArr[i].isShow = false;
                        } else {
                            this.data.dateArr[i].isShow = true;
                        }
                    } else {
                        year = this.data.dateArr[i].year.toString();
                        month = this.addZero(this.data.dateArr[i].month.toString());
                        day = this.addZero(this.data.dateArr[i].dateNum.toString());
                        isToday = year + "-" + month + "-" + day;
                        //获取今天是星期几
                        sunday = new Date(isToday).getDay();
                        if (isfindleft == false) {
                            this.data.dateArr[i].isShow = true;
                        } else {
                            this.data.dateArr[i].isShow = false;
                        }
                        if (sunday == 0 && isfindleft == false) {
                            isfindleft = true;
                        } 
                    }
                }
            }
            this.setData({
                isHidden: true,
                dateArr: this.data.dateArr
            })
        }
        else
        {
           
            for (let i = 0; i <= this.data.dateArr.length - 1; i++) {
                // this.data.dateArr[i].istrue = false;
                this.data.dateArr[i].isShow = true;
            }
            this.setData({
                isHidden: false,
                dateArr: this.data.dateArr
            })
        }
    },
    getHeight: function(event) {
        var width = event.detail.width;
        var height = event.detail.height;
        if (event.currentTarget.dataset.type == "left") {
            this.data.dete[event.currentTarget.dataset.ids].leftArray[event.currentTarget.dataset.id].height = 343 * height / width;
            this.setData({
                dete: this.data.dete
            })
        }
        if (event.currentTarget.dataset.type == "right") {
            this.data.dete[event.currentTarget.dataset.ids].rightArray[event.currentTarget.dataset.id].height = 343 * height / width;
            this.setData({
                dete: this.data.dete
            })
        }
        console.log(JSON.stringify(this.data.dete) + "!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
        //获取每张图片的高度
    },
    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    },
    dateInit: function(setYear, setMonth) {
        //全部时间的月份都是按0~11基准，显示月份才+1
        let dateArr = []; //需要遍历的日历数组数据
        let arrLen = 0; //dateArr的数组长度
        let now = setYear ? new Date(setYear, setMonth) : new Date();
        let year = setYear || now.getFullYear();
        let nextYear = 0;
        let month = setMonth || now.getMonth(); //没有+1方便后面计算当月总天数
        let nextMonth = (month + 1) > 11 ? 1 : (month + 1);
        let startWeek = new Date(year + ',' + (month + 1) + ',' + 1).getDay(); //目标月1号对应的星期
        let dayNums = new Date(year, nextMonth, 0).getDate(); //获取目标月有多少天
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
        console.log(nowYear + "=================");
        console.log(nowMonth + "=================");
        console.log(nowWeek + "=================");

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
    lastMonth: function() {
        //全部时间的月份都是按0~11基准，显示月份才+1
        let year = this.data.month - 2 < 0 ? this.data.year - 1 : this.data.year;
        let month = this.data.month - 2 < 0 ? 11 : this.data.month - 2;
        this.setData({
            year: year,
            month: (month + 1),
            index1: null
        })
        if (this.data.year == this.data.indexYear && this.data.month == this.data.indexMonth) {
            this.setData({
                ismonth: true
            })
        } else {
            this.setData({
                ismonth: false
            })
        }
        console.log(year.toString()+"%%%%%%%%%%%%%%%%%");
        console.log(month.toString() + "%%%%%%%%%%%%%%%%%");
        this.dateInit(year, month);
        this.refushData();
        // console.log(JSON.stringify(this.data.dateArr) + "//////////////////////////");
    },
    nextMonth: function() {
        //全部时间的月份都是按0~11基准，显示月份才+1
        let year = this.data.month > 11 ? this.data.year + 1 : this.data.year;
        let month = this.data.month > 11 ? 0 : this.data.month;
        this.setData({
            year: year,
            month: (month + 1),
            index1: null
        })
        if (this.data.year == this.data.indexYear && this.data.month == this.data.indexMonth) {
            this.setData({
                ismonth: true
            })
        } else {
            this.setData({
                ismonth: false
            })
        }
        this.dateInit(year, month);
        this.refushData();
        console.log(this.data.dateArr);
    },


    //点击日期事件
    dianjidata(e) {
        if (JSON.parse(e.currentTarget.id).istrue == "true" && JSON.parse(e.currentTarget.id).nyr != this.data.isToday) {
            // this.data.dateArr[JSON.parse(e.currentTarget.id).index].ischoose=true;
            this.setData({
                dateArr: this.data.dateArr,
                index1: JSON.parse(e.currentTarget.id).index,
                hiddenData: false

            })
            var k = JSON.parse(e.currentTarget.id);
            let day = k.year + "-" + this.addZero(k.month) + "-" + this.addZero(k.riqi);
            app.ShortConnect(app.urlw + "Data/GetShareRecordStartByDay", {
                day: day,
                uid: app.uid,
                page: 1
            }, "getHistroy");
            // console.log(k)
            // this.dianjishouyi2(k)
        } else {
            this.setData({
                hiddenData:true
            })
            // wx.showToast({
            //     title: '这一天没有分享哦', //提示文字
            //     duration: 2000, //显示时长
            //     mask: false, //是否显示透明蒙层，防止触摸穿透，默认：false  
            //     icon: 'success', //图标，支持"success"、"loading"  
            //     success: function() {}, //接口调用成功
            //     fail: function() {}, //接口调用失败的回调函数  
            //     complete: function() {} //接口调用结束的回调函数  
            // })
        }

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