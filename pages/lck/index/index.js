// pages/lck/index/index.js
let bmap = require('../../../libs/bmap-wx.min.js');
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
    
})