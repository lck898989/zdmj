// pages/lck/index/index.js
let bmap = require('../../../libs/bmap-wx.min.js');
let weatherdata = require('../../../utils/weather.js');
Page({

    /**
     * 页面的初始数据
     */
    data: {
        imgUrls: [
            'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
            'https://img.alicdn.com/tps/i4/TB1XpXppNYaK1RjSZFnSuu80pXa.jpg',
            'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
            '../../../resources/example.jpg',
            'https://img.alicdn.com/tps/i4/TB1XpXppNYaK1RjSZFnSuu80pXa.jpg',
        ],
        currentIndex : 0,
        //天气对象
        weatherData : {},
        swiperIndex : 0,
        slider : [
            'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
            'https://img.alicdn.com/tps/i4/TB1XpXppNYaK1RjSZFnSuu80pXa.jpg',
            'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg'
        ],
        swiperList: [
            {
                index: 0,
                aurl: "",
                swpClass: "swp-left",
                active: false,
                imgsrc: "../../../resources/test.png",
            },
            {
                index: 1,
                aurl: "#",
                swpClass: "move-left",
                active: false,
                imgsrc: "../../../resources/800.jpg"
            },
            {
                index: 2,
                aurl: "#",
                swpClass: "move-left",
                active: false,
                imgsrc: "../../../resources/900.jpg"
            },
            {
                index: 3,
                aurl: "#",
                swpClass: "move-left",
                active: false,
                imgsrc: "../../../resources/1000.jpg"
            },
            {
                index: 4,
                aurl: "#",
                swpClass: "move-left",
                active: false,
                imgsrc: "../../../resources/600.jpg"
            }],
        //带遮罩的图片移动的倍数
        tax: [0.9, 0.8, 0.7],
        startPoint: 0,
        currentIndex: 0,
        goods : [
            {
                headImg: '../../resources/fanli_4.png',
                price: 120,
                pname: 'asdfasdfasd'
            },
            {
                headImg: '../../resources/fanli_4.png',
                price: 120,
                pname: 'asdfasdfasd'
            },
            {
                headImg: '../../resources/fanli_4.png',
                price: 120,
                pname: 'asdfasdfasd'
            },
        ],
        bannerType : [
            {
                text    : '推荐',
                choosed : true,
                id      : 0
            },
            {
                text    : '美食',
                choosed : false,
                id      : 1
            },
            {
                text    : '玩乐',
                choosed : false,
                id      : 2
            },
            {
                text    : '结婚',
                choosed : false,
                id      : 3
            },
            {
                text    : '丽人',
                choosed : false,
                id      : 4
            },
            {
                text    : '家居',
                choosed : false,
                id      : 5
            },
            {
                text    : '家装',
                choosed : false,
                id      : 6
            },
            {
                text    : '家装',
                choosed : false,
                id      : 6
            },
            {
                text    : '丽人',
                choosed : false,
                id      : 4
            },
            {
                text    : '家居',
                choosed : false,
                id      : 5
            },
            {
                text    : '家装',
                choosed : false,
                id      : 6
            },
            {
                text    : '家装',
                choosed : false,
                id      : 6
            },
            {
                text    : '丽人',
                choosed : false,
                id      : 4
            },
            {
                text    : '家居',
                choosed : false,
                id      : 5
            },
            {
                text    : '家装',
                choosed : false,
                id      : 6
            },
            {
                text    : '家装',
                choosed : false,
                id      : 6
            },
        ],
        easyItemArray : [
            {
                id           : 0,
                watched      : 257,
                text         : '这里的KTV包厢音响效果很好非常赞，环境也不错。',
                author       : 'lck',
                authorAvatar : 'https://wx.qlogo.cn/mmopen/vi_32/bmtmeRwn3Sv5WcnbKaE7V3XFpLNwh0DjicwtJYzy997p451ibIy6tu8R05fRQOmibdlyCD2FPLpJNYnnZzic0JhDDw/132',
                goodsPicture : '../../resources/fanli_4.png'
            },
            {
                id           : 0,
                watched      : 1000,
                text         : '这里的KTV包厢音响效果很好非常赞，环境也不错。',
                author       : 'lck',
                authorAvatar : 'https://wx.qlogo.cn/mmopen/vi_32/bmtmeRwn3Sv5WcnbKaE7V3XFpLNwh0DjicwtJYzy997p451ibIy6tu8R05fRQOmibdlyCD2FPLpJNYnnZzic0JhDDw/132',
                goodsPicture : 'http://pic.qiantucdn.com/58pic/28/79/71/80P58PICPNScdhmZ9JE79_PIC2018.jpg'
            },
            {
                id           : 0,
                watched      : 70,
                text         : '这里的KTV包厢音响效果很好非常赞，环境也不错。',
                author       : 'lck',
                authorAvatar : 'https://wx.qlogo.cn/mmopen/vi_32/bmtmeRwn3Sv5WcnbKaE7V3XFpLNwh0DjicwtJYzy997p451ibIy6tu8R05fRQOmibdlyCD2FPLpJNYnnZzic0JhDDw/132',
                goodsPicture : '../../resources/fanli_4.png'
            },
            {
                id           : 0,
                watched      : 60,
                text         : '这里的KTV包厢音响效果很好非常赞，环境也不错。',
                author       : 'lck',
                authorAvatar : 'https://wx.qlogo.cn/mmopen/vi_32/bmtmeRwn3Sv5WcnbKaE7V3XFpLNwh0DjicwtJYzy997p451ibIy6tu8R05fRQOmibdlyCD2FPLpJNYnnZzic0JhDDw/132',
                goodsPicture : '../../resources/fanli_4.png'
            },
            {
                id           : 0,
                watched      : 10,
                text         : '这里的KTV包厢音响效果很好非常赞，环境也不错。',
                author       : 'lck',
                authorAvatar : 'https://wx.qlogo.cn/mmopen/vi_32/bmtmeRwn3Sv5WcnbKaE7V3XFpLNwh0DjicwtJYzy997p451ibIy6tu8R05fRQOmibdlyCD2FPLpJNYnnZzic0JhDDw/132',
                goodsPicture : '../../resources/fanli_4.png'
            },
            {
                id: 0,
                watched: 2,
                text: '这里的KTV包厢音响效果很好非常赞，环境也不错。',
                author: 'lck',
                authorAvatar: 'https://wx.qlogo.cn/mmopen/vi_32/bmtmeRwn3Sv5WcnbKaE7V3XFpLNwh0DjicwtJYzy997p451ibIy6tu8R05fRQOmibdlyCD2FPLpJNYnnZzic0JhDDw/132',
                goodsPicture: 'http://pic.qiantucdn.com/58pic/28/79/71/80P58PICPNScdhmZ9JE79_PIC2018.jpg'
            },
        ]
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        console.log("weatherData is ",weatherdata);
        let self = this;
        let bMap = new bmap.BMapWX({
            ak: 'wkdnji6S22wixYccwzDVFzqx9XtjDZl7'
        });
        let fail = function(data){
            console.log("data is ",data);
        }
        let success = function(data){
            console.log("天气数据是：",data);
            let weather = data.currentWeather[0];
            let city = weather.currentCity;
            let pm25 = weather.pm25;
            let date = weather.date;
            let temperature = weather.temperature;
            let weatherDesc = weather.weatherDesc;
            let wind = weather.wind;
            self.setData({
                weatherData : weather
            })
            
        }
        bMap.weather({
            fail    : fail,
            success : success
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

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    },
    //获取当前的index
    currentEvent : function(event){
        console.log("当前第几张图片");
        console.log(event.detail.current);
        this.setData({
            currentIndex : event.detail.current
        })
    },
    //获取当前经纬度
    getLocation : function(){
        let selft = this;
        wx.getLocation({
            success: function(res) {
                console.log("res is ",res);
                console.log("维度信息是：",res.latitude);
                console.log("经度信息是：",res.longitude);
            },
        })
    },
    //获取当前的城市
    getCity  : function(){

    },
    swiperChaner : function(event){
        console.log("--->>>",event.detail.current);
        this.setData({
            swiperIndex : event.detail.current
        })
    },
    scrollEvent : function(event){
        console.log("在横向滚动视图中event is ",event);
    },
    //选择类型
    chooseType:function(event){
        let dataSet = event.currentTarget.dataset;
        let id = Number(dataSet.id);
        console.log("id is ",id);
        let typeLen = this.data.bannerType.length;
        for (let i = 0; i < typeLen;i++){
            let currentjson = this.data.bannerType[i];
            //当前的json id跟穿件来的id相同
            if(currentjson.id === id){
                currentjson.choosed = true;
            }else{
                currentjson.choosed = false;
            }
        }
        this.setData({
            bannerType : this.data.bannerType
        })
    },
    //向右移动
    
    moveStart: function (e) {
        console.log("e is ", e);
        this.data.startPoint = e.changedTouches[0].pageX;
        console.log("startPoint is ", this.data.startPoint);
    },
    moveEnd: function (e) {
        let isLeft = false;
        let isRight = false;
        console.log("in end e is ", e);
        let endPoint = e.changedTouches[0].pageX;
        console.log("是否向左移动？", (endPoint - this.data.startPoint) < 0 ? (isLeft = true) : (isRight = true));
        console.log("isLeft is ", isLeft);
        console.log("isRight is ", isRight);
        //如果向左移动的话执行相应方法
        if (isLeft) {
            this.moveLeft(1);
        } else {
            // this.moveRight();
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
                //放大相应的倍数
                // let currentTax = this.data.tax[j];
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
                })
            })
        }
    }
})