// pages/lck/scancode/scancode.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        longitude : 0,
        latitude : 0,
        markets : [
            {
                id : 2,
            },
            
        ],
        scale : 18,
        show3D : true,
        showCompass : true,
        jiazai : false

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let self = this;
        let mapContext = wx.createMapContext("zdmj", this)
        mapContext.getCenterLocation({
            success : function(res){
                console.log("in centerLocation is ",res.longitude);
                console.log("in centerLocation is ",res.latitude);
            }
        })
        wx.getLocation({
            success: function(res) {
                console.log("res is ",res);
                self.data.longitude = res.longitude;
                self.data.latitude = res.latitude;
                self.setData({
                    longitude : res.longitude,
                    latitude  : res.latitude,
                    jiazai    : true
                })
            },
        })
    },
    //打开地图
    openMap : function(){
        wx.openLocation({
            latitude  : this.data.latitude,
            longitude : this.data.longitude,
            scale     : this.data.scale
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
    scancode : function(e){
        let self = this;
        wx.getImageInfo({
            src: 'https://shop.ykplay.com/smallprogram/shopshare_4.png',
            success : function(res){
                console.log("res.path is ",res.path);
                let canvasContext = wx.createCanvasContext('qrcode', self);
                canvasContext.drawImage(res.path,10,10,140,140);
                canvasContext.draw();
            }
        })
    }  
})