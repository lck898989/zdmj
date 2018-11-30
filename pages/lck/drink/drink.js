// pages/lck/play/play.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        pictureList: [
            'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1543244953214&di=9c5b79e78d8ea46348499084da98b1b9&imgtype=0&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F0179155b5935ffa801215c8f20b8ec.jpg',
            'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1543245015029&di=137362d1fd7e2186afee81a7e96e1a56&imgtype=0&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F01b8ba5adda421a80120927be45a32.jpg%401280w_1l_2o_100sh.jpg',
            'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1543245096167&di=f722e1beb0ecc7fb032d254816054167&imgtype=0&src=http%3A%2F%2Fi-2.kuaila.com%2F2018%2F11%2F25%2F3cbdb8ba-55b6-43c8-ab53-16c5cd0dc85b.jpg'

        ],
        swiperIndex: 0,
        bannerType: [
            {
                id: 0,
                text: '全部',
                active: true
            },
            {
                id: 1,
                text: '酒店',
                active: false
            },
            {
                id: 2,
                text: '景点',
                active: false
            },
            {
                id: 3,
                text: '乐园',
                active: false
            },
            {
                id: 4,
                text: '旅行社',
                active: false
            },
        ],
        dataArray: [
            {
                id: 0,
                watched: 257,
                text: '这里的KTV包厢音响效果很好非常赞，环境也不错。',
                author: 'lck',
                authorAvatar: 'https://wx.qlogo.cn/mmopen/vi_32/bmtmeRwn3Sv5WcnbKaE7V3XFpLNwh0DjicwtJYzy997p451ibIy6tu8R05fRQOmibdlyCD2FPLpJNYnnZzic0JhDDw/132',
                goodsPicture: '../../../resources/fanli_4.png'
            },
            {
                id: 1,
                watched: 1000,
                text: '这里的KTV包厢音响效果很好非常赞，环境也不错。',
                author: 'lck',
                authorAvatar: 'https://wx.qlogo.cn/mmopen/vi_32/bmtmeRwn3Sv5WcnbKaE7V3XFpLNwh0DjicwtJYzy997p451ibIy6tu8R05fRQOmibdlyCD2FPLpJNYnnZzic0JhDDw/132',
                goodsPicture: 'http://pic.qiantucdn.com/58pic/28/79/71/80P58PICPNScdhmZ9JE79_PIC2018.jpg'
            },
            {
                id: 2,
                watched: 70,
                text: '这里的KTV包厢音响效果很好非常赞，环境也不错。',
                author: 'lck',
                authorAvatar: 'https://wx.qlogo.cn/mmopen/vi_32/bmtmeRwn3Sv5WcnbKaE7V3XFpLNwh0DjicwtJYzy997p451ibIy6tu8R05fRQOmibdlyCD2FPLpJNYnnZzic0JhDDw/132',
                goodsPicture: '../../../resources/fanli_4.png'
            },
            {
                id: 3,
                watched: 60,
                text: '这里的KTV包厢音响效果很好非常赞，环境也不错。',
                author: 'lck',
                authorAvatar: 'https://wx.qlogo.cn/mmopen/vi_32/bmtmeRwn3Sv5WcnbKaE7V3XFpLNwh0DjicwtJYzy997p451ibIy6tu8R05fRQOmibdlyCD2FPLpJNYnnZzic0JhDDw/132',
                goodsPicture: '../../../resources/fanli_4.png'
            },
            {
                id: 4,
                watched: 10,
                text: '这里的KTV包厢音响效果很好非常赞，环境也不错。环境nice,建议去',
                author: 'lck',
                authorAvatar: 'https://wx.qlogo.cn/mmopen/vi_32/bmtmeRwn3Sv5WcnbKaE7V3XFpLNwh0DjicwtJYzy997p451ibIy6tu8R05fRQOmibdlyCD2FPLpJNYnnZzic0JhDDw/132',
                goodsPicture: 'http://pic.qiantucdn.com/58pic/28/79/71/80P58PICPNScdhmZ9JE79_PIC2018.jpg'
            },
            {
                id: 5,
                watched: 2,
                text: '这里的KTV包厢音响效果很好非常赞，环境也不错。',
                author: 'lck',
                authorAvatar: 'https://wx.qlogo.cn/mmopen/vi_32/bmtmeRwn3Sv5WcnbKaE7V3XFpLNwh0DjicwtJYzy997p451ibIy6tu8R05fRQOmibdlyCD2FPLpJNYnnZzic0JhDDw/132',
                goodsPicture: 'http://pic.qiantucdn.com/58pic/28/79/71/80P58PICPNScdhmZ9JE79_PIC2018.jpg'
            },

        ],
        //模拟加载更能多数据
        moreDataArray: [
            {
                id: 6,
                watched: 60,
                text: '这里的KTV包厢音响效果很好非常赞，环境也不错。',
                author: 'lck',
                authorAvatar: 'https://wx.qlogo.cn/mmopen/vi_32/bmtmeRwn3Sv5WcnbKaE7V3XFpLNwh0DjicwtJYzy997p451ibIy6tu8R05fRQOmibdlyCD2FPLpJNYnnZzic0JhDDw/132',
                goodsPicture: '../../../resources/fanli_4.png'
            },
            {
                id: 7,
                watched: 10,
                text: '这里的KTV包厢音响效果很好非常赞，环境也不错。环境nice,建议去',
                author: 'lck',
                authorAvatar: 'https://wx.qlogo.cn/mmopen/vi_32/bmtmeRwn3Sv5WcnbKaE7V3XFpLNwh0DjicwtJYzy997p451ibIy6tu8R05fRQOmibdlyCD2FPLpJNYnnZzic0JhDDw/132',
                goodsPicture: 'http://pic.qiantucdn.com/58pic/28/79/71/80P58PICPNScdhmZ9JE79_PIC2018.jpg'
            },
            {
                id: 8,
                watched: 2,
                text: '这里的KTV包厢音响效果很好非常赞，环境也不错。',
                author: 'lck',
                authorAvatar: 'https://wx.qlogo.cn/mmopen/vi_32/bmtmeRwn3Sv5WcnbKaE7V3XFpLNwh0DjicwtJYzy997p451ibIy6tu8R05fRQOmibdlyCD2FPLpJNYnnZzic0JhDDw/132',
                goodsPicture: 'http://pic.qiantucdn.com/58pic/28/79/71/80P58PICPNScdhmZ9JE79_PIC2018.jpg'
            },
        ],
        // scorll-view的高度
        scrollH: 0,
        //图片的宽度
        imageWidth: 342,
        //加载图片的数量
        loadingCount: 6,
        col1: [],

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
        backgroundColor: '#c8799e',
        topNum: 0,
        // 是否显示回到顶部按钮
        floorStatus: false,
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let self = this;
        //获取到系统的信息
        wx.getSystemInfo({
            success: function (res) {
                console.log("res is ", res);
                let ratio = res.pixelRatio;
                let ww = res.windowWidth;
                let wh = res.windowHeight;
                let scrollH = wh;
                self.setData({
                    scrollH: scrollH,
                    ratio: ratio
                })
                console.log("scrollH is ", self.data.scrollH);
            }
        })
    },
    onImageLoad: function (e) {
        console.log("e is ", e);
        let imageId = Number(e.currentTarget.id);
        let oImgW = e.detail.width;         //图片原始宽度
        console.log("图片的原始宽度为：", oImgW / this.data.ratio);
        let oImgH = e.detail.height;        //图片原始高度
        console.log("图片的原始高度为：", oImgH / this.data.ratio);
        let imgWidth = this.data.imageWidth;  //图片设置的宽度
        console.log("imgWidth is ", imgWidth);
        let scale = imgWidth / oImgW;        //比例计算
        console.log("缩放比例是：", scale);
        let imgHeight = oImgH * scale;      //自适应高度
        console.log("自适应的高度为：", imgHeight);
        let images = this.data.dataArray;
        let imageObj = null;

        for (let i = 0; i < images.length; i++) {
            console.log("images is ", images);
            console.log("imageId is ", typeof (imageId), imageId);
            let img = images[i];
            if (img.id === imageId) {
                imageObj = img;
                break;
            }
        }

        imageObj.height = imgHeight;
        console.log("imageObj is ", imageObj);
        let loadingCount = this.data.loadingCount - 1;
        let col1 = this.data.col1;
        let col2 = this.data.col2;
        //只要第一列的列高度小于第二列就往第一列放，否则往第二列放
        if (this.data.col1H <= this.data.col2H) {
            this.data.col1H += imgHeight;
            col1.push(imageObj);
        } else {
            this.data.col2H += imgHeight;
            col2.push(imageObj);
        }
        console.log("col1 is ", col1);
        console.log("col1H is ", this.data.col1H);
        console.log("col2 is ", col2);
        console.log("col2H is ", this.data.col2H);
        this.setData({
            col1H: this.data.col1H,
            col2H: this.data.col2H
        })
        let data = {
            loadingCount: loadingCount,
            col1: col1,
            col2: col2
        };

        if (!loadingCount) {
            data.images = [];
        }

        this.setData(data);
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
    getIndex: function (e) {
        console.log("e is ", e);
        let current = e.detail.current;
        this.setData({
            swiperIndex: current
        })
    },
    //选择类型
    chooseType: function (event) {
        let dataSet = event.currentTarget.dataset;
        let id = Number(dataSet.id);
        console.log("id is ", id);
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
            bannerType: this.data.bannerType
        })
    },
    //加载更多的图片
    loadImages: function () {
        wx.showLoading({
            title: '数据正在赶来...',
        })
        console.log("dataArray is ", this.data.dataArray);
        console.log("moredataArray is ", this.data.moreDataArray);
        for (let i = 0; i < this.data.moreDataArray.length; i++) {
            this.data.dataArray.push(this.data.moreDataArray[i]);
        }
        this.setData({
            dataArray: this.data.dataArray
        }, () => {
            wx.hideLoading();
        })
    },
    //跳转搜索界面
    enterSearch: function (e) {
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
    //滚动到顶部
    scrollTop: function (e) {
        console.log("scrollTop is ", e.detail.scrollTop);
        if (e.detail.scrollTop > 100) {
            this.setData({
                floorStatus: true
            })
        } else {
            this.setData({
                floorStatus: false
            })
        }
    },
    //一键回到顶部
    goTop: function () {
        this.setData({
            topNum: this.data.topNum = 0
        })
    }
})