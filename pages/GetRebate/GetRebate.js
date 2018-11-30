// pages/GetRebate/GetRebate.js
var app = getApp();
Page({
    /**
     * 页面的初始数据
     */
    data: {
        imageUrl:"",
        // //存储页面分享这的openid
        // shareParentUid: "",
        // shareHidden: true,
        // rebate: true,
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.setData({
            imageUrl: app.imageUrl
        })
    
    },
    //点击我的钱包
    pressMyMoney:function(){
      app.ShortConnect(app.urlw + "Data/GetPersonCenter", {
        uid: app.uid

      }, "getMyQian");
     
    },
    //点击入门返利
    pressIntroduction:function(){
        app.rumenPage=1;
        app.ShortConnect(app.urlw2+"Data/GetHotProducts",{
            page: app.rumenPage
        },"interIntroduction");
       
    },
    //点击进阶返利
    pressGradeRebate:function(){
        app.ShortConnect(app.urlw + "Data/GetAllAgencys", {
            uid: app.uid
        }, "interJinjie");
        // wx.navigateTo({
        //     url: '../JinRebate/JinRebate',
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
        console.log("5555555");

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
    agree: function () {
        // app.ShortConnect("http://192.168.1.49:3150/Data/AddAgency", {
        //     parent: this.data.shareParentUid,
        //     child: app.uid
        // },"agreeRank");
        console.log("44444");
        app.ShortConnect(app.urlw+"Data/AddAgency", {
            parent: this.data.shareParentUid,
            child: app.uid
        }, "agree");
    },
    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function (Object) {
        // console.log("onShareAppMessage4");
        // console.log(app.uid);
        // console.log(app.uid.toString());
        // // return {
        // //     title: '这里的秘密,你知道多少?我来帮你指点迷津',
        // //     path: 'pages/GetRebate/GetRebate'
        // // }
        // // return custom share data when user share.
        // var shareObj = {
        //     desc: '距离成功只差一步，求少侠出手！',
        //     title: '分享商城',
        //     path: 'pages/GetRebate/GetRebate?uid=' + app.uid.toString(),
        //     success: function (res) {
        //         console.log("333");
        //         // 转发成功之后的回调
        //         if (res.errMsg == 'shareAppMessage:ok') {

        //         }
        //     },
        //     fail: function (res) {　　　　　　 // 转发失败之后的回调
        //         console.log(res.errMsg);
        //     },
        // }
        // console.log(shareObj);
        // return shareObj;
    }
})