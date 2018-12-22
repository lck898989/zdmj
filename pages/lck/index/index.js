// pages/lck/index/index.js
let bmap = require('../../../libs/bmap-wx.min.js');
// let weatherdata = require('../../../utils/weather.js');
let app = getApp();
import regeneratorRuntime from '../../../utils/regenerator-runtime/runtime-module.js';
import Request from '../../../utils/Request.js';
import Const from '../../../utils/Const.js';
Page({
    /**
     * 页面的初始数据
     */
    data: {
        app: app,
        imgHost: Const.productionHost,
        imgUrls: [
            'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
            'https://img.alicdn.com/tps/i4/TB1XpXppNYaK1RjSZFnSuu80pXa.jpg',
            'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
            '../../../resources/example.jpg',
            'https://img.alicdn.com/tps/i4/TB1XpXppNYaK1RjSZFnSuu80pXa.jpg',
        ],
        currentIndex: 0,
        //天气对象
        weatherData: {},
        swiperIndex: 0,
        slider: [
            'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
            'https://img.alicdn.com/tps/i4/TB1XpXppNYaK1RjSZFnSuu80pXa.jpg',
            'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg'
        ],
        swiperList: [],
        //带遮罩的图片移动的倍数
        tax: [0.9, 0.8, 0.7],
        startPoint: 0,
        currentIndex: 0,
        goods: [
            {
                headImg: '../../resources/fanli_4.png',
                price: 100,
                pname: '爽肤系列'
            },
            {
                headImg: '../../resources/fanli_4.png',
                price: 150,
                pname: '惊艳唇膏'
            },
            {
                headImg: '../../resources/fanli_4.png',
                price: 500,
                pname: '香水系列'
            },
        ],
        bannerType: [
            {
                text: '推荐',
                choosed: true,
                id: 0
            },
            {
                text: '吃',
                choosed: false,
                id: 1
            },
            {
                text: '喝',
                choosed: false,
                id: 2
            },
            {
                text: '玩',
                choosed: false,
                id: 3
            },
            {
                text: '乐',
                choosed: false,
                id: 4
            },
            {
                text: '购',
                choosed: false,
                id: 5
            },
        ],
        isleftDa: false,
        dataArray: [],
        //模拟加载更能多数据
        moreDataArray: [],
        imageArr: [{
                id: 'eat',
                src: '../../../resources/btn_eat.png',
                width: 362
            },
            {
                id: 'drink',
                src: '../../../resources/btn_drink.png',
                width: 366
            },
            {
                id: 'play',
                src: '../../../resources/btn_play.png',
                width: 362
            },
            {
                id: 'fun',
                src: '../../../resources/btn_fun.png',
                width: 366
            },
        ],
        // scorll-view的高度
        scrollH: 0,
        //图片的宽度
        imageWidth: 342,
        //加载图片的数量
        loadingCount: 6,
        col1: [],
        col2: [],
        ratio: 2,
        col1H: 0,
        col2H: 0,
        //头图信息
        HeadImageArr: [],
        //主图信息
        MainImageArr: [],
        //是否显示小火箭
        floorStatus: false,
        topNum: 0,
        simulateTimes: 0,
        loadText : '下拉获取更多分享文章...',
        //页数
        page: 1,
        //滚动视图可以滚动
        canRoll : false,
        //节点选择器对象
        //在onImageLoad里面只渲染那些新增的文章，渲染完成之后添加到文章列表中去
        newAddEssays: [],
        timer : 0,
        //自动播放
        autoPlay : false,
        //用户是否操作轮播图了
        userOperation : false,
        //加载完毕
        loadOver : false,
        //是否点击了分类，点击分类默认是请求了数据的这样就不会再执行onReachBottom方法导致少显示一页的内容
        click : true
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: async function (options) {
        let fileManager = wx.getFileSystemManager();
        fileManager.getSavedFileList({
            success : function(res){
                console.log("in onLoad res is ",res);
            }
        });
        // console.log("weatherData is ",weatherdata);
        wx.showLoading({
            title: '数据正在赶来..',
        });
        let self = this;
        let bMap = new bmap.BMapWX({
            ak: 'wkdnji6S22wixYccwzDVFzqx9XtjDZl7'
        });
        let fail = function (data) {
            console.log("data is ", data);
        }
        let success = function (data) {
            console.log("天气数据是：", data);
            let weather = data.originalData.results[0].weather_data[0];
            let dayIcon = data.originalData.results[0].weather_data[0].dayPictureUrl;
            let nightIcon = data.originalData.results[0].weather_data[0].nightPictureUrl;
            let dayUrl = self.getWeatherName(dayIcon);
            let nightUrl = self.getWeatherName(nightIcon);
            console.log("dayUrl is ",dayUrl);
            console.log("nightUrl is ",nightUrl);
            weather.dayUrl = 'https://shopfile.ykplay.com/resources/' + dayUrl;
            weather.nightUrl = 'https://shopfile.ykplay.com/resources/' + nightUrl;
            self.setData({
                weatherData: weather
            });
        }
        bMap.weather({
            fail: fail,
            success: success
        })
        //获取到系统的信息
        wx.getSystemInfo({
            success: function (res) {
                console.log("res is ", res);
                let ratio = res.pixelRatio;
                let ww = res.windowWidth;
                let wh = res.windowHeight;
                let scrollH = wh * ratio;
                self.setData({
                    scrollH: scrollH,
                    ratio: ratio
                });
                console.log("scrollH is ", self.data.scrollH);
            }
        });
        await this.getRollInfo();
        await this.getMainInfo();
        //请求推荐的商品
        let resData = await this.getType('0');
        console.log("in onLoad resData is ", resData);
        for (let m = 0; m < resData.length; m++) {
            if (resData[m].shopessayhead) {
                resData[m].shopessayhead = resData[m].shopessayhead.split(',');
            }else if(resData[m].head){
                resData[m].head = resData[m].head.split(',');
            }else if(resData[m].essayhead){
                resData[m].essayhead = resData[m].essayhead.split(',');
            }
        }
        this.setData({
            newAddEssays : resData,
            click        : false
        }, () => {
            console.log("newAddEssays is ", self.data.newAddEssays);
        })
        wx.hideLoading();
        //自动播放轮播图并且用户没有操作
        if(!this.data.autoPlay && !this.data.autoPlay){
            this.data.timer = setInterval(function(){
                this.moveLeft(1);
            }.bind(this),4000);
            console.log("timer is ",this.data.timer);
            this.setData({
                autoPlay : true
            });
        }
        this.updateWeaterFall();
    },
    //获取百度地图返回的天气信息字符串
    getWeatherName : function(weatherInfo){
        let weatherIndex = weatherInfo.indexOf('weather');
        let res = weatherInfo.substr(weatherIndex);
        return res;
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
        console.log("in getType res is ", res);
        if (tag === '0') {
            let wantArr = [];
            if(res.data.allproducts.length === 0){
                this.data.loadText = '已经到底了~~o(>_<)o ~~';
                this.setData({
                    loadText : this.data.loadText
                })
            }else{
                console.log("删除之前res.data.allproducts is ",res.data.allproducts);
                //将商品去除
                for(let i = 0;i < res.data.allproducts.length;i++){
                    let tempItem = res.data.allproducts[i];
                    console.log("tempItem is ",tempItem);
                    if(tempItem.productstype !== 'products'){
                        console.log("productstype is ",tempItem.productstype);
                        wantArr.push(tempItem);
                    }
                }
            }
            return wantArr;
        } else {
            return res.data.shopessays;
        }
    },
    //进入滚动图的详情
    enterScrollImg: function (e) {
        console.log("滚动视图的详情是：", e);
    },
    goDetail: async function (e) {
        console.log("-----> e is ", e);
        //跳转网页
        let pid = e.currentTarget.dataset.pid;
        //跳转类型：商铺文章，商品文章，商品详情界面
        //商品id
        console.log("pid is ",pid);
        let currentList = null;
        let listLen = this.data.HeadImageArr.length;
        for(let i = 0;i < listLen;i++){
            let tempList = this.data.HeadImageArr[i];
            console.log("tempList is ",tempList);
            if(tempList.pid === pid){
                currentList = tempList;
                break;
            }
        }
        console.log("currentList is ",currentList);
        console.log("jumptype is ",currentList.ptype);
        let jumptype = currentList.ptype;
        let url = '';
        switch(jumptype){
            case '1' :
                let url = app.host + 'Data/GetProductByPid';
                let data = {
                    pid: pid,
                    uid: app.uid
                };
                //跳转商品界面,获得对应pid的商品
                let product = null;
                let req = new Request(url, data, 'POST', 'text');
                let res = await req.sendRequest();
                console.log("product is ", res.data.product);
                //对产品的头图进行分割
                if (typeof (res.data.product.head) === 'string') {
                    res.data.product.head = res.data.product.head.split(',');
                }
                wx.setStorage({
                    key: 'goods',
                    data: res.data.product,
                });
                wx.navigateTo({
                    url: '../cartGoodsDetail/cartGoodsDetail',
                })
                break;
            case '2' :
                //跳转到店铺文章
                app.wenzhangShop = null;
                new Promise(function (resolve, reject) {

                })
                app.ShortConnect(app.urlw + "Data/GetShopProductsByShopEssayShopid", {
                    shopid: currentList.pid,
                    uid: app.uid
                }, "turnShopWen");
                url = app.host + 'Data/GetShopProductsByShopEssayShopid';
                data = {
                    shopid: currentList.pid,
                    uid: app.uid
                }
                console.log("data is ", data);
                req = new Request(url, data, 'POST', 'text');
                res = await req.sendRequest();
                console.log("res is ", res);
                console.log("shopWenZhangJson is ", app.shopWenZhangJson);
                break;
            case '3' :
                app.wenzhangJson = null;
                app.ShortConnect(app.urlw + "Data/GetEssayInfo", {
                    pid: currentList.pid,
                    eid: currentList.pid,
                    uid: app.uid
                }, "interWenZhang");
                url = app.host + 'Data/GetEssayInfo';
                data = {
                    pid: currentList.pid,
                    eid: currentList.pid,
                    uid: app.uid
                }
                console.log("data is ",data);
                req = new Request(url,data,'POST','text');
                res = await req.sendRequest();
                console.log("--->>res is ",res);
                wx.navigateTo({
                    url: '../../ActicleScene/ActicleScene?essayhead=' + res.data.essay.essayhead + '&title=' + res.data.essay.title + '&authorurl=' + res.data.essay.authorurl + '&authorname=' + res.data.essay.authorname + '&pid=' + res.data.essay.pid + '&eid=' + res.data.essay.eid,
                })
                break;     
        }
    },
    //获取滚动视图信息
    getRollInfo: async function () {
        let self = this;
        //获取活动滚动视图
        let url = 'Data/GetActivityHead';
        let data = {
            type: 1,
        }
        let req = new Request(app.host + url, data, "POST", "text");
        let res = await req.sendRequest();
        console.log("获取到的头图数组是：", res.data.activitys);
        this.setData({
            HeadImageArr : res.data.activitys
        });
        let source = res.data.activitys
        for (let i = 0; i < 5; i++) {
            let currentItem = source[i];
            if (currentItem.valid === 'true') {
                let tempJson = {
                    index: i,
                }
                tempJson.aurl = currentItem.acturl,
                    i === 0 ? tempJson.swpClass = "swp-left" : tempJson.swpClass = "move-left";
                tempJson.active = false;
                tempJson.imgsrc = app.host + currentItem.acthead;
                //跳转方式1表示跳转网页0表示跳转小程序页面
                tempJson.jumpType = currentItem.acturltype;
                tempJson.pid = currentItem.pid;
                this.data.swiperList.push(tempJson);
            }
        }
        console.log("swiperList is ", this.data.swiperList);
        this.setData({
            swiperList: this.data.swiperList
        });
    },
    //获取主图数据
    getMainInfo: async function () {
        let url = 'Data/GetActivityGroup';
        let data = {
            type: 2,
        }
        let req = new Request(app.host + url, data, "POST", "text");
        let res = await req.sendRequest();
        // console.log("主图 res is ", res);
        this.setData({
            MainImageArr: res.data.activitys
        })
        console.log("mainImageArr is ", this.data.MainImageArr);
        for (let i = 0; i < this.data.MainImageArr.length; i++) {
            this.data.MainImageArr[i].acthead = this.data.MainImageArr[i].acthead.split(',');
            this.data.MainImageArr[i].direction = this.data.MainImageArr[i].direction.split(',');
            let goods = new Array(3);
            for(let m = 0;m < goods.length;m++){
                goods[m] = {};
                goods[m].head = this.data.MainImageArr[i].acthead[m];
                goods[m].pname = this.data.MainImageArr[i].products[m].pname;
                goods[m].price = this.data.MainImageArr[i].products[m].price;
            }
            for(let j = 0;j < this.data.MainImageArr[i].products.length;j++){
                this.data.MainImageArr[i].products[j].head = this.data.MainImageArr[i].products[j].head.split(',');
            }
            //文章对应的pid
            this.data.MainImageArr[i].goods = goods;
            this.data.MainImageArr[i].pid = this.data.MainImageArr[i].pid.split(',');
            console.log("MainImageArr[i] is ", this.data.MainImageArr[i]);
        }
        console.log("主图是：",this.data.MainImageArr);
        this.setData({
            MainImageArr: this.data.MainImageArr
        })
    },
    //创建瀑布流
    updateWeaterFall : function(){
        console.log("newAddEssays is ",this.data.newAddEssays);
        console.log("dixio is ",this.data.ratio);
        let addEssaysLen = this.data.newAddEssays.length;
        for(let i = 0;i < addEssaysLen;i++){
            let imgW = this.data.newAddEssays[i].width;
            let imgH = this.data.newAddEssays[i].height;
            let imgWidth = this.data.imageWidth;
            let scale = imgWidth / imgW;
            //自适应高度
            let imgHeight = imgH * scale;
            this.data.newAddEssays[i].height = imgHeight;
            let col1 = this.data.col1;
            let col2 = this.data.col2;
            //只要第一列的列高度小于第二列就往第一列放，否则往第二列放
            if (this.data.col1H <= this.data.col2H) {
                this.data.col1H += imgHeight;
                col1.push(this.data.newAddEssays[i]);
            } else {
                this.data.col2H += imgHeight;
                col2.push(this.data.newAddEssays[i]);
            }
        }
        this.setData({
            col1     : this.data.col1,
            col2     : this.data.col2,
            loadOver : true,
            click    : false
        },()=>{

        })
        console.log('in createWeaterFall newAddEssays is ',this.data.newAddEssays);
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
        console.log("开启自动轮播");
        //自动轮播设置
        if(!this.data.autoPlay && !this.data.userOperation){
            this.data.timer = setInterval(function(){
                this.moveLeft(1);
            }.bind(this),4000);
            this.data.autoPlay = true;
        }
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {
        console.log("关闭自动轮播",this.data.timer);
        this.data.autoPlay = false;
        clearInterval(this.data.timer);
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
    onPageScroll : function(e){
        if(e.scrollTop > 100){
            this.setData({
                floorStatus : true,
            })
        }else{
            this.setData({
                floorStatus : false
            })
        }
    },

    /**
     * 
     * 页面上拉触底事件的处理函数
     * 
     */
    onReachBottom: async function () {
        if(!this.data.click){
            this.data.page++;
            console.log("page is ",this.data.page);
            this.setData({
                loadOver : false
            })
            await this.loadImages();
            this.updateWeaterFall();
        }
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    },
    //获取当前的index
    currentEvent: function (event) {
        console.log("当前第几张图片");
        console.log(event.detail.current);
        this.setData({
            currentIndex: event.detail.current
        });
    },
    //获取当前经纬度
    getLocation: function () {
        let self = this;
        wx.getLocation({
            success: function (res) {
                console.log("res is ", res);
                console.log("维度信息是：", res.latitude);
                console.log("经度信息是：", res.longitude);
            },
        })
    },
    //获取当前的城市
    getCity: function () {

    },
    swiperChaner: function (event) {
        console.log("--->>>", event.detail.current);
        this.setData({
            swiperIndex: event.detail.current
        });
    },
    scrollEvent: function (event) {
        console.log("在横向滚动视图中event is ", event);
    },
    //选择类型
    chooseType: async function (event) {
        wx.showLoading({
            title: '数据加载中...',
        });
        this.setData({
            loadText : '下拉获取更多文章...'
        });
        let self = this;
        //将dataArray设置空为了让数据绑定来刷新新的数据
        //初始化列的数据
        this.setData({
            col1         : [],
            col2         : [],
            col1H        : 0,
            col2H        : 0,
            scrollH      : 0,
            newAddEssays : [],
            click        : true
        });
        let dataSet = event.currentTarget.dataset;
        let id = Number(dataSet.id);
        console.log("id is ", id);
        let res = null;
        console.log("type of id is ", typeof id);
        let typeLen = this.data.bannerType.length;
        for (let i = 0; i < typeLen; i++) {
            let currentjson = this.data.bannerType[i];
            //当前的json id跟穿件来的id相同
            if (currentjson.id === id) {
                currentjson.choosed = true;
            } else {
                currentjson.choosed = false;
            }
        }
        this.setData({
            bannerType : this.data.bannerType,
            loadOver   : false,
            page       : 0
        })
        switch (id) {
            case 0:
                this.data.page = 1;
                res = await this.getType('0');
                break;
            case 1:
                this.data.page = 1;
                res = await this.getType('吃');
                break;
            case 2:
                this.data.page = 1;
                res = await this.getType('喝');
                break;
            case 3:
                this.data.page = 1;
                res = await this.getType('玩');
                break;
            case 4:
                this.data.page = 1;
                res = await this.getType('乐');
                break;
            case 5:
                this.data.page = 1;
                res = await this.getType('购');
                break;
        }
        this.data.newAddEssays = res;
        if(this.data.newAddEssays.length === 0){
            wx.hideLoading();
            this.setData({
                loadOver     : true,
                loadText     : '已经到底了~~o(>_<)o ~~',
                newAddEssays : []
            });
        }else{
            console.log("id is ",id);
            this.setEssayHeadImage(id);
            console.log("set 之前newAddEssays is ", this.data.newAddEssays);
            this.setData({
                newAddEssays : this.data.newAddEssays,
                click        : false
            },()=>{
                wx.hideLoading();
            })
        }
        this.updateWeaterFall();
    },
    setEssayHeadImage : function(id){
        for (let j = 0; j < this.data.newAddEssays.length; j++) {
            if (id === 1 || id === 2 || id === 3 || id === 4) {
                this.data.newAddEssays[j].productstype = 'shopessays';
            }
            if (this.data.newAddEssays[j].shopessayhead) {
                if(typeof(this.data.newAddEssays[j].shopessayhead) === 'string'){
                    this.data.newAddEssays[j].shopessayhead = this.data.newAddEssays[j].shopessayhead.split(',');
                }
            } else if (this.data.newAddEssays[j].head) {
                if (typeof(this.data.newAddEssays[j].head) === 'string') {
                    this.data.newAddEssays[j].head = this.data.newAddEssays[j].head.split(',');
                }
            } else if (this.data.newAddEssays[j].essayhead) {
                if (typeof(this.data.newAddEssays[j].essayhead) === 'string') {
                    this.data.newAddEssays[j].essayhead = this.data.newAddEssays[j].essayhead.split(',');
                }
            }
        }
    },
    //向右移动
    moveStart: function (e) {
        console.log("e is ", e);
        this.data.startPoint = e.changedTouches[0].pageX;
        console.log("startPoint is ", this.data.startPoint);
        //关闭自动播放
        this.data.autoPlay = false;
        clearInterval(this.data.timer);
        //记录用户操作
        this.data.userOperation = true;
        //记录最后一次点击的时间
        let lastTouchTime = new Date().getTime();
        console.log("最后一次触发的时间是：",lastTouchTime);
        //开始计时是否超过5s用户未操作
        app.checkTime(function(){
            console.log("5s用户未操作了，可以开启自动轮播图了");
            console.log("this is ",this);
            this.data.autoPlay = true;
            this.data.userOperation = false;
            this.data.timer = setInterval(function(){
                this.moveLeft(1);
            }.bind(this),4000);
        }.bind(this));
    },
    moveEnd: function (e) {
        let isLeft = false;
        let isRight = false;
        console.log("in end e is ", e);
        // this.data.userOperation = true;
        let endPoint = e.changedTouches[0].pageX;
        // console.log("是否向左移动？", (endPoint - this.data.startPoint) <  ? (isLeft = true) : (isRight = true));
        console.log("移动了", endPoint - this.data.startPoint);
        if(endPoint - this.data.startPoint < -60){
            isLeft = true;
            this.setData({
                canRoll : true
            });
        }else if(endPoint - this.data.startPoint > 60){
            isRight = true;
            this.setData({
                canRoll : true
            });
        }else{
            this.setData({
                canRoll : false
            });
        }
        console.log("isLeft is ", isLeft);
        console.log("isRight is ", isRight);
        //如果向左移动的话执行相应方法
        if (isLeft) {
            this.moveLeft(1);
        } else if(isRight){
            this.moveRight(0);
        }
    },
    moveLeft(index) {
        let swp = this.data.swiperList;
        let max = swp.length;
        console.log("index is ", index);
        let prev = swp[index - 1];
        let cur = swp[index];
        let next = swp[index + 1];
        //如果点击的是第二张图片进行动画的播放
        if (index === 1) {
            for (let i = 0; i < max; i++) {
                swp[i].active = true;
            }
            //根据不同的变换赋值不同的class
            prev.swpClass = 'swiper-right'; //前一个向左移动500rpx，透明度从100-->0
            //当前的图片向左移动110rpx 遮罩透明度从0.5--->1 放到到1
            cur.swpClass = 'swiper-left';
            this.setData({
                currentIndex: cur.index
            })
            //剩下的图片依次向左移动相应的距离，并且放大到相应的倍数，遮罩透明度不变
            for (let j = 0; j < this.data.tax.length; j++) {
                swp[j + 2].swpClass = 'move-left' + j;
            }
            let self = this;
            this.setData({
                swiperList: swp
            }, function () {
                console.log("最外层setData执行了");
                let first = swp.shift();
                swp.push(first);
                self.setData({
                    swiperList: swp
                }, () => {
                    console.log("最内层setData执行了");
                    console.log("最能层执行完setdata后 swiperList is ", self.data.swiperList);
                });
            })
        }
    },
    //向右移动
    moveRight(index) {
        let swp = this.data.swiperList;
        let max = swp.length;
        console.log("index is ", index);
        let prev = swp[max - 1];
        let cur = swp[index];
        let next = swp[index + 1];
        //如果点击的是第二张图片进行动画的播放
        if (index === 0) {
            for (let i = 0; i < max; i++) {
                swp[i].active = true;
            }
            //根据不同的变换赋值不同的class
            prev.swpClass = 'swiper-right-reverse'; //前一个向左移动500rpx，透明度从100-->0
            //当前的图片向左移动110rpx 遮罩透明度从0.5--->1 放到到1
            cur.swpClass = 'swiper-left-reverse';
            //剩下的图片依次向左移动相应的距离，并且放大到相应的倍数，遮罩透明度不变
            for (let j = 0; j < this.data.tax.length; j++) {
                swp[j + 1].swpClass = 'move-left' + j + '-reverse';
            }
            let self = this;
            this.setData({
                swiperList: swp
            }, function () {
                console.log("最外层setData执行了");
                let last = swp.pop();
                swp.unshift(last);
                swp[0].swpClass = 'swiper-right-reverse'
                // swp[swp.length - 1].swpClass = 'right-most';
                self.setData({
                    swiperList: swp,
                    currentIndex: prev.index
                }, () => {
                    console.log("最内层setData执行了");
                    console.log("最能层执行完setdata后 swiperList is ", self.data.swiperList);
                });
            })
        }
    },
    //加载更多的图片
    loadImages: async function () {
        //找出现在是哪个分类
        let typeLen = this.data.bannerType.length;
        let res = null;
        let id = 0;
        for (let m = 0; m < typeLen; m++) {
            let currentBanner = this.data.bannerType[m];
            let typeText = currentBanner.text;
            //选中了哪个类别
            if (currentBanner.choosed === true) {
                switch (typeText) {
                    case '推荐':
                        res = await this.getType('0');
                        id = 0;
                        break;
                    case '吃':
                        res = await this.getType('吃');
                        id = 1;
                        break;
                    case '喝':
                        res = await this.getType('喝');
                        id = 2;
                        break;
                    case '玩':
                        res = await this.getType('玩');
                        id = 3;
                        break;
                    case '乐':
                        res = await this.getType('乐');
                        id = 4;
                        break;
                    case '购':
                        res = await this.getType('购');
                        id = 5;
                        break;
                }
            }
        }
        console.log("res is ", res);
        if(res.length === 0){
            wx.hideLoading();
            this.setData({
                loadText     : '已经到底了~~o(>_<)o ~~',
                loadOver     : true,
                newAddEssays : []
            });
        }else{
            this.data.newAddEssays = res;
            this.setEssayHeadImage(id);
            console.log("newAddEssays is ", this.data.newAddEssays);
            console.log("当前的模拟数字是：", this.data.simulateTimes);
            this.setData({
                newAddEssays : this.data.newAddEssays,
            }, () => {
                wx.hideLoading();
            })
        }
    },
    //跳转搜索界面
    enterSearch: function (e) {
        app.nearsreachArray = null;
        app.hotsreachArray = null;
        app.goodShop = null;
        app.ShortConnect(app.urlw + "Data/GetSearch", {
            uid: app.uid,
        }, "InterSreach");
        app.ShortConnect(app.urlw + "Data/GetRecommendProduct", {
            page: 1,
        }, "InterSreach1");
        wx.navigateTo({
            url: '../../../pages/search/search',
            success: function () {
                console.log("跳转成功");
            },
            fail: function () {
                console.log("跳转失败");
            }
        })
    },
    //进入图片的连接
    enterTheLink: function (e) {
        console.log("图片连接e is ", e);
        let dataSet = e.currentTarget.dataset;
        console.log("dataSet is ", dataSet);
        let src = dataSet.websrc;
        if (dataSet.jumptype === '1') {
            // 跳转网页
            wx.navigateTo({
                url: '../webview/webview?websrc=' + src,
            })
        }
    },
    scrollEvent : function(e){
        console.log("e is ",e);
        if (e.detail.scrollTop > 100) {
            this.setData({
                floorStatus: true
            });
        } else {
            this.setData({
                floorStatus: false
            });
        }
    },
    goTop1 : function(e){
        this.setData({
            topNum : 0
        })
    },
    //一键回到顶部
    goTop: function (e) {
        if(wx.pageScrollTo){
            console.log("res is asdfasdf");
            wx.pageScrollTo({
                scrollTop : 0,
                success   : function(){
                    
                }
            })
        }else{
            wx.showModal({
                title: '提示',
                content: '当前微信版本过低，暂无法使用该功能',
            });
        }
    },
    //进入吃喝玩乐界面
    enterEDPFS: function (event) {
        let dataSet = event.currentTarget.dataset;
        let id = dataSet.id;
        console.log("id is ", id);
        let url = '';
        switch (id) {
            case 'eat':
                url = '../eat/eat';
                break;
            case 'drink':
                url = '../drink/drink';
                break;
            case 'play':
                url = '../play/play';
                break;
            case 'fun':
                url = '../fun/fun';
                break;
        }
        console.log("url is ", url);
        wx.navigateTo({
            url: url,
        })
    },
    //进入购的界面
    enterShop: function (e) {
        let dataSet = e.currentTarget.dataset;
        let id = dataSet.id;
        console.log("in enterShop id is ", id);
        if (id === 'shop') {
            // wx.navigateTo({
            //     url: '../shop/shop',
            //     success :function(e){
            //         console.log(e);
            //     },
            //     fail : function(e){
            //         console.log("e is ",e);
            //     }
            // })
            // wx.switchTab({
            //     url: '../shop/shop',
            // })
            wx.navigateTo({
                url: '../shop/shop',
            })
        }
    }
})