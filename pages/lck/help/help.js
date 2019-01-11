// pages/lck/help/help.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        imageHost : 'https://shopfile.ykplay.com/resources',
        bannerType : [
            {
                index  : "01",
                text   : '指点迷津',
                active : true,
                top    : 0,
                height : 1400
            },
            {
                index  : "02",
                text   : '分享经济',
                active : false,
                top    : 1400,
                height : 740
            },
            {
                index  : "03",
                text   : '专业优势',
                active : false,
                top    : 2140,
                height : 2689
            },
            {
                index  : "04",
                text   : '互惠互利',
                active : false,
                top    : 4829,
                height : 4320
            },
            {
                index  : "05",
                text   : '使用奖励',
                active : false,
                top    : 9080,
                height : 1450
            },
            {
                index  : "06",
                text   : '活动规则',
                active : false,
                top    : 10500,
                height : 390
            },
        ],
        imgList : [
            {
                url    : 'https://shopfile.ykplay.com/resources/help_01.png',
                height : 1400
            },
            {
                url    : 'https://shopfile.ykplay.com/resources/help_02.png',
                height : 740
            },
            {
                url    : 'https://shopfile.ykplay.com/resources/help_03.png',
                height : 2689
            },
            {
                url    : 'https://shopfile.ykplay.com/resources/help_04a.png',
                height : 2800
            },
            {
                url    : 'https://shopfile.ykplay.com/resources/help_04b.png',
                height : 1180
            },
            {
                url    : 'https://shopfile.ykplay.com/resources/help_04c.png',
                height : 280
            },
            {
                url    : 'https://shopfile.ykplay.com/resources/help_05.png',
                height : 1450
            },
            {
                url    : 'https://shopfile.ykplay.com/resources/help_06.png',
                height : 390
            },
        ],
        top : 0,
        scrollViewHeight : 0,
        ratio : 0,
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        console.log("imgList is ",this.data.imgList);
        let self = this;
        wx.getSystemInfo({
            success: function(res) {
                console.log("res is ",res);
                self.data.ratio = res.pixelRatio;
                self.data.screenHeight = res.screenHeight * self.data.ratio - 190;
                self.setData({
                    screenHeight : self.data.screenHeight,
                    ratio        : self.data.ratio
                })
            },
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
    onPageScroll : function(e){
        console.log("e is ",e);
    },
    //选择分享经济的类型
    chooseIndex : function(e){
        console.log("e is ",e);
        let dataSet = e.currentTarget.dataset;
        let index = dataSet.index;
        let top = 0;
        for(let i = 0;i < this.data.bannerType.length;i++){
            if(this.data.bannerType[i].index == index){
                this.data.bannerType[i].active = true;
                top = this.data.bannerType[i].top;
            }else{
                this.data.bannerType[i].active = false;
            }
        }
        console.log("");
        this.setData({
            bannerType : this.data.bannerType,
            top        : top
        });
        // if (wx.pageScrollTo) {
        //     wx.pageScrollTo({
        //         scrollTop: top,
        //     })
        // } else {
        //     wx.showModal({
        //         title: '提示',
        //         content: '当前微信版本过低，暂无法使用该功能',
        //     });
        // }
    },
    scroll : function(e){
        console.log("e is ",e);
    }

})