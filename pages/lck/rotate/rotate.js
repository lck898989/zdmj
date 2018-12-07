// pages/lck/testJing/perfact.js
import wxParse from '../../../wxParse/wxParse.js';
import Request from '../../../utils/Request.js';
import Const from '../../../utils/Const.js';
import regeneratorRuntime from '../../../utils/regenerator-runtime/runtime-module.js';
let app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        host: app.host,
        dkheight: 300,
        dkcontent: `你好<br/>nihao,<br/><br/><br/><br/><br/><br/><br/>这个是测试<br/><br/>你同意了吗<br/><br/><br/>hehe<b class='nihao'>n你好啊，我加粗了kk</b >
      <p><img src='http://shop.ykplay.com/upload/1/App.ico'/><strong>asdfasdfasd</strong></p>`,
        typeValue: null,
        showRightToast: false,
        changeImg: false,
        show: true,
        swiperList: [
            {
                index : 0,
                aurl: "../start/start",
                swpClass: "swp-left",
                active: false,
                imgsrc: "https://shop.ykplay.com/upload/activityhead/1543406417505.jpeg",
            },
            {
                index : 1,
                aurl: "#",
                swpClass: "swp-right",
                active: false,
                imgsrc: "https://shop.ykplay.com/upload/activityhead/1543455702117.jpeg"
            },
            {
                index : 2,
                aurl: "#",
                swpClass: "swp-right",
                active: false,
                imgsrc: "https://shop.ykplay.com/upload/activityhead/1543455729220.jpeg"
            },
            {
                index : 3,
                aurl: "#",
                swpClass: "swp-right",
                active: false,
                imgsrc: "https://shop.ykplay.com/upload/activityhead/1543455754045.jpeg"
            }],
        played: false,
        //滑动触点开始的时候
        startPoint : 0,
        currentImageIndex : 0

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.data.typeValue = {};
        this.data.typeValue.size = 'M';
        this.data.typeValue.color = 'red';
        console.log("typeValue is ", this.data.typeValue);
        this.setData({
            typeValue: this.data.typeValue
        })
        let winPage = this;
        wx.getSystemInfo({
            success: function (res) {
                let winHeight = res.windowHeight;
                console.log(winHeight);
                winPage.setData({
                    dkheight: winHeight - winHeight * 0.05 - 80
                })
            }
        })

        wxParse.wxParse('dkcontent', 'html', this.data.dkcontent, this, 5);
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
        //   wx.hideLoading();
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
    previewImage: function (e) {
        var that = this,
            //获取当前图片的下表
            index = e.currentTarget.dataset.index,
            //数据源
            pictures = this.data.pictures;
        wx.previewImage({
            //当前显示下表
            current: pictures[index],
            //数据源
            urls: pictures
        })
    },
    onShareAppMessage: function (ops) {
        console.log("ops is ", ops);
        let user = {
            name: 'asdf',
            age: 23,
            sex: 'man'
        }
        if (ops.from === 'button') {
            return {
                title: "指点迷津",
                desc: 'a good app for tianjin area',
                path: '/pages/lck/hotShopping/hotShopping?name=' + user.name
            }
        }
    },

    show: function (event) {
        this.setData({
            show: true
        })
    },
    back: function () {
        this.setData({
            show: false
        })
    },
    //显示求换按钮
    swpBtn: function (event) {
        let swp = this.data.swiperList;
        let max = swp.length;
        let dataSet = event.currentTarget.dataset;
        let idx = dataSet.index;
        console.log("idx is ", idx);
        let prev = swp[idx - 1];
        let curView = swp[idx];
        let next = swp[idx + 1];
        console.log("prev is ", prev);
        console.log("curView is ", curView);
        for (let j = 0; j < max; j++) {
            swp[j].active = true;
        }
        if (idx == 1 && prev && next) {
            prev.swpClass = 'swp-right';
            curView.swpClass = 'swp-left';
            console.log("curView.index is ",curView.index);
            for (let i = 2; i < max; i++) {
                if (i === 2) {
                    swp[i].swpClass = 'move-left1';
                } else if (i === 3) {
                    swp[i].swpClass = 'move-left2';
                }
            }
            let self = this;
            this.setData({
                swiperList: swp
            }, () => {
                console.log("外层的setData被调用");
                //将数组中的第一个元素删除放到最后的位置
                let first = swp.shift();
                swp.push(first);
                console.log("swp is ", swp);
                self.data.swiperList = swp;
                self.setData({
                    swiperList: swp
                }, () => {
                    console.log("最内层的setData被调用");
                })
            })
        }
    },
    start : function(e){
        console.log("e is ",e);
        this.data.startPoint = e.changedTouches[0].pageX;
        console.log("startPoint is ",this.data.startPoint);
    },
    end : function(e){
        let isLeft = false;
        let isRight = false;
        console.log("e is ",e);
        console.log("endPoint is ",e.changedTouches[0].pageX);
        let endPoint = e.changedTouches[0].pageX;
        console.log("是否向左移动？",(endPoint - this.data.startPoint) < 0 ? (isLeft = true ) : (isRight = true));
        console.log("isLeft is ",isLeft);
        console.log("isRight is ",isRight);
        //如果向左移动的话执行相应方法
        if(isLeft){
            this.moveLeft(1);
        }else{
            // this.moveRight();
        }
    },
    moveLeft : function (idx) {
        if(idx === 1){
            let swp = this.data.swiperList;
            let max = swp.length;
            let prev = swp[idx - 1];
            let curView = swp[1];
            let next = swp[idx + 1];
            console.log("prev is ", prev);
            console.log("curView is ", curView);
            for (let j = 0; j < max; j++) {
                swp[j].active = true;
            }
            if (prev && next) {
                prev.swpClass = 'swp-right';
                curView.swpClass = 'swp-left';
                console.log("curView.index is ",curView.index);
                // this.data.currentImageIndex = curView.index;
                this.setData({
                    currentImageIndex : curView.index
                })
                for (let i = 2; i < max; i++) {
                    if (i === 2) {
                        swp[i].swpClass = 'move-left1';
                    } else if (i === 3) {
                        swp[i].swpClass = 'move-left2';
                    }
                }
                let self = this;
                this.setData({
                    swiperList: swp
                }, () => {
                    console.log("外层的setData被调用");
                    //将数组中的第一个元素删除放到最后的位置
                    let first = swp.shift();
                    swp.push(first);
                    console.log("swp is ", swp);
                    self.data.swiperList = swp;
                    self.setData({
                        swiperList: swp
                    }, () => {
                        console.log("最内层的setData被调用");
                    })
                })
            }
        }
    },
    icon: function (e) {
        console.log("e is ", e);
    }
})