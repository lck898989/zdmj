
import regeneratorRuntime from '../../../utils/regenerator-runtime/runtime-module.js';
import Request from '../../../utils/Request.js';
import Const from '../../../utils/Const.js';
let app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        HeadImageArr: [],
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
        imgHost: Const.productionHost,
        dataArray: [],
        // scorll-view的高度
        scrollH: 0,
        //图片的宽度
        imageWidth: 342,
        //加载图片的数量
        loadingCount: 6,
        col1: [],
        page: 1,
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
        backgroundColor: '#3785cd',
        loadText: '下拉获取更多文章...',
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: async function (options) {
        let self = this;
        this.getScrollImages();
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
        });
        //请求吃相关信息
        let url = app.host + 'Data/GetHomeEOrP';
        let data = {
            page: this.data.page,
            shoptag: '玩',
            uid: app.uid
        }
        console.log("data is ", data);
        let req = new Request(url, data, "POST", "text");
        let res = await req.sendRequest();
        console.log("res is ", res);
        this.data.dataArray = res.data.shopessays;
        this.setEssayHeadImage();
        console.log("dataArray is ", this.data.dataArray);
        this.setData({
            dataArray: this.data.dataArray
        });
    },
    //获得滚动图
    getScrollImages: async function () {
        let url = app.host + 'Data/GetShopPageActivityHead';
        let data = {
            type: 3,
            tag: 3
        };
        let req = new Request(url, data, "POST", 'text');
        let res = await req.sendRequest();
        console.log("获取滚动图的res is ", res);
        this.setData({
            HeadImageArr: res.data.activitys
        });
    },
    setEssayHeadImage: function () {
        for (let j = 0; j < this.data.dataArray.length; j++) {
            //店铺文章
            this.data.dataArray[j].productstype = 'shopessays';
            if (this.data.dataArray[j].shopessayhead) {
                if (typeof (this.data.dataArray[j].shopessayhead) === 'string') {
                    this.data.dataArray[j].shopessayhead = this.data.dataArray[j].shopessayhead.split(',');
                }
            }
        }
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
            if (img.shopeid === imageId) {
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
        this.data.page++;
        console.log("page is ", this.data.page);
        this.loadImages();
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    },
    //view的下拉获取top位置信息
    onPageScroll: function (e) {
        console.log(e);
        if (e.scrollTop > 100) {
            this.setData({
                floorStatus: true,
            })
        } else {
            this.setData({
                floorStatus: false
            })
        }
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
        this.data.page = 1;
        let dataSet = event.currentTarget.dataset;
        let id = Number(dataSet.id);
        console.log("id is ", id);
        let typeLen = this.data.bannerType.length;
        for (let i = 0; i < typeLen; i++) {
            let currentjson = this.data.bannerType[i];
            //当前的json id跟穿件来的id相同
            if (currentjson.id === id) {
                currentjson.active = true;
            } else {
                currentjson.active = false;
            }
        }
        this.setData({
            bannerType: this.data.bannerType,
        });

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
    goTop: function (e) {
        if (wx.pageScrollTo) {
            wx.pageScrollTo({
                scrollTop: 0,
            })
        } else {
            wx.showModal({
                title: '提示',
                content: '当前微信版本过低，暂无法使用该功能',
            })
        }
    },
    //加载更多
    loadImages: async function () {
        let self = this;
        //找出现在是哪个分类
        let typeLen = this.data.bannerType.length;
        let res = null;
        let id = 0;
        for (let m = 0; m < typeLen; m++) {
            let currentBanner = this.data.bannerType[m];
            let typeText = currentBanner.text;
            //选中了哪个类别
            if (currentBanner.active === true) {
                console.log("当前选择的类型是：", typeText);
                //请求吃相关信息
                let url = app.host + 'Data/GetHomeEOrP';
                let data = {
                    page: this.data.page,
                    shoptag: '玩',
                    uid: app.uid
                }
                console.log("data is ", data);
                let req = new Request(url, data, "POST", "text");
                let res = await req.sendRequest();
                console.log("res is ", res);
                if (res.data.shopessays.length === 0) {
                    this.setData({
                        loadText: '已经到底了~~o(>_<)o ~~'
                    });
                } else {
                    for (let i = 0; i < res.length; i++) {
                        this.data.dataArray.push(res[i]);
                    }
                    this.setEssayHeadImage();
                    console.log("dataArray is ", this.data.dataArray);
                    console.log("当前的模拟数字是：", this.data.simulateTimes);
                    this.setData({
                        dataArray: this.data.dataArray
                    });
                }
            }
        }
    }
})