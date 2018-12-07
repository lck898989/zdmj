// pages/lck/play/play.js
import Request from '../../../utils/Request';
import Const from '../../../utils/Const';
let app = getApp();
import regeneratorRuntime from '../../../utils/regenerator-runtime/runtime-module.js';
Page({

    /**
     * 页面的初始数据
     */
    data: {
        imageHost: "https://shopfile.ykplay.com/",
        serverImageHost : 'https://shop.ykplay.com/',
        swiperIndex: 0,
        btnArr : [{
                    btnText     : '精品分享',
                    active      : true,
                    srcActive   : '../../../resources/btn_share_1.png',
                    srcUnActive : '../../../resources/btn_share_0.png'
                  },
                  {
                    btnText     : '热卖商城',
                    active      : false,
                    srcActive   : '../../../resources/btn_shopping_1.png',
                    srcUnActive : '../../../resources/btn_shopping_0.png'
                  }
        ],
        btnActive: 'background: linear-gradient(to right,#e84e86,#644caf);background: -webkit - linear - gradient(to right, #e84e86, #644caf);',
        btnUnActive: 'background: linear-gradient(to right,#7d7d7d,#999999);background: -webkit - linear - gradient(to right, #7d7d7d, #999999);',
        //一级分类源数据
        topLevelSource : [],
        //一级分类数组
        bannerType: [],
        //一级分类是否展开
        isTopLevel : false,
        //二级分类数组
        secondLevels : [],
        //二级分类是否展开
        IsecondLevel : false,
        dataArray: [
         
        ],
        //模拟加载更能多数据
        moreDataArray: [
     
        ],
        backgroundColor : '#d0d0d0',
        goods : [],
        //以及分类id
        tid   : null,
        //一级分类下的二级分类
        t2id : 0,
        page : 1,
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
       
        col2: [],
        ratio: 2,
        col1H: 0,
        col2H: 0,
        isHot : false,
        isShare : true,
        //显示加入购物车半窗
        showWindow : false,
        typeArr : [],
        typeValueArr : [],
        sendServerSize : {},
        //当前商品
        currentGoods : null,
        selectColor: '#ede2f4',
        selectFontColor: '#863bb7',
        unSelectColor: '#eee',
        unSelectFontColor: '#000',
        selectBorder: '2rpx solid #863bb7',
        unselectBorder: '2rpx solid #eee',
        count : 1,
        updateState : 0,
        sizeValueArr : [],
        isOk : false,
        floorStatus : false,
        //是否是全部
        isAll : true,
        HeadImageArr : []
    },
    topLevelArr: ["resources/btn_type_5.png","resources/btn_type_6.png", "resources/btn_type_1.png", "resources/btn_type_2.png", "resources/btn_type_4.png", "resources/btn_type_7.png", "resources/btn_type_3.png", "resources/btn_type_8.png", "resources/btn_type_9.png", "resources/btn_type_10.png"],
    //详细分类
    detailClass : function(e){

        //将一级分类展开显示
        this.setData({
            isTopLevel : !this.data.isTopLevel
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: async function (options) {
        let self = this;
        this.getAllDataArrayInShare(function(){
            wx.hideLoading();
        });
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
        //通过tid获取
        console.log("tid is ",this.data.tid);
        //获得一级分类
        let oneClassUrl = app.host + 'Data/GetTabs';
        let oneClassData = {};
        let req = new Request(oneClassUrl,oneClassData,"POST","text");
        let res = await req.sendRequest();
        console.log("一级分类res is ",res);
        for(let i = 0;i < res.data.tabs.length;i++){
            let tempJson = {
                tid     : res.data.tabs[i].tid,
                choosed : false,
                text   : res.data.tabs[i].tname,
            }
            this.data.bannerType.push(tempJson);
        }
        console.log("加入全部之前bannerType is ",this.data.bannerType);
        this.data.topLevelSource = res.data.tabs;
        console.log("toplevelSource is ",this.data.topLevelSource);
        let allJson = {
            tid     : -1,
            text    : '全部',
            choosed : true
        }
        this.data.bannerType.unshift(allJson);
        this.setData({
            bannerType     : this.data.bannerType,
            topLevelSource : res.data.tabs            
        });
        console.log("bannerType is ",this.data.bannerType);
        this.getAllType();
        
    },
    //获得滚动图
    getScrollImages: async function () {
        let url = app.host + 'Data/GetProductPageActivityHead';
        let data = {
            type: 3
        };
        let req = new Request(url,data,"POST",'text');
        let res = await req.sendRequest();
        console.log("获取滚动图的res is ", res);
        this.setData({
            HeadImageArr : res.data.activitys
        });
    },
    //滚动图跳转
    goDetail: async function (e) {
        console.log("-----> e is ", e);
        //跳转网页
        let pid = e.currentTarget.dataset.pid;
        //跳转类型：商铺文章，商品文章，商品详情界面
        //商品id
        console.log("pid is ", pid);
        let currentList = null;
        let listLen = this.data.HeadImageArr.length;
        for (let i = 0; i < listLen; i++) {
            let tempList = this.data.HeadImageArr[i];
            if (tempList.pid === pid) {
                currentList = tempList;
                break;
            }
        }
        console.log("currentList is ", currentList);
        console.log("jumptype is ", currentList.ptype);
        let jumptype = currentList.ptype;
        let url = '';
        switch (jumptype) {
            case '1':
                let url = app.host + 'Data/GetProductByPid';
                let data = {
                    pid : pid,
                    uid : app.uid
                };
                //跳转商品界面,获得对应pid的商品
                let product = null;
                let req = new Request(url, data, 'POST', 'text');
                let res = await req.sendRequest();
                console.log("product is ", res.data.product);
                //对产品的头图进行分割
                if (typeof(res.data.product.head) === 'string'){
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
            case '2':
                //跳转到店铺文章
                app.wenzhangShop = null;
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
            case '3':
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
                console.log("data is ", data);
                req = new Request(url, data, 'POST', 'text');
                res = await req.sendRequest();
                console.log("--->>res is ", res);
                wx.navigateTo({
                    url: '../../ActicleScene/ActicleScene?essayhead=' + res.data.essay.essayhead + '&title=' + res.data.essay.title + '&authorurl=' + res.data.essay.authorurl + '&authorname=' + res.data.essay.authorname + '&pid=' + currentList.pid + '&eid=' + res.data.essay.eid,
                })
                break;
        }
    },
    //获取精品分享中的全部信息
    getAllDataArrayInShare : function(callback){
        wx.showLoading({
            title: '数据加载中...',
        });
        let self = this;
        app.ShortConnect(app.urlw + "Data/GetAllEssays", {
            page: self.data.page
        }, "getWenzhang", function (r) {
            console.log("----adfasdf", r);
            if(r.length > 0){
                for (let i = 0; i <= r.length - 1; i++) {
                    r[i].author_head = r[i].author_head.split(",");
                    r[i].essayhead = r[i].essayhead.split(",");
                    r[i].productstype = 'essays'
                }
                console.log("r is ", r);
                for(let j = 0;j < r.length;j++){
                    this.data.dataArray.push(r);
                }
                this.setData({
                    dataArray: r
                },()=>{
                    callback();
                });
                console.log("dataArray is ", this.data.dataArray);
            }else{
                wx.hideLoading();
                wx.showToast({
                    title : '没有更多了',
                    icon  : 'none'
                })
            }
        }.bind(this));
    },
    //获得购首页的轮播图数组
    // getScrollImage : async function(){
    //     //显示全部商品
    //     // let url = app.host + 'Data/';
    //     // let data = {
    //     //     uid: app.uid,
    //     // }
    //     // let req = new Request(url, data, 'POST', 'text');
    //     // let res = await req.sendRequest();
    //     // console.log("购首页的头图轮播是：", res);
    // },
    //获取全部下的所有商品信息
    getAllType : async function(){
        console.log("---Alltype is ------");
        //显示全部商品
        let url = app.host + 'Data/GetAllProductsByPage';
        let data = {
            uid: app.uid,
            page: this.data.page
        }
        let req = new Request(url,data,'POST','text');
        let res = await req.sendRequest();
        console.log("---Alltype is res is ",res);
        this.splitHeadImage(res.data.products);
        for(let i = 0;i < res.data.products.length;i++){
            this.data.goods.push(res.data.products[i]);
        }
        //将图片的头图分割成数组
        this.setData({
            goods : this.data.goods
        });
    },
    //获得二级分类
    getTwoClass : async function(){
        //通过t2id得到二级分类下的商品
        console.log("in getTwoClass t2id is ",this.data.t2id);
        let req1 = new Request(app.host + 'Data/GetProductsByT2id', { page: this.data.page, t2id: this.data.t2id }, "POST", "text");
        let res1 = await req1.sendRequest();
        console.log("products is ", res1.data.products);
        this.splitHeadImage(res1.data.products);
        console.log("goods is ", res1.data.products);
        this.setData({
            goods: res1.data.products
        });
    },
    splitHeadImage : function(array){
        let goodsLen = array.length;
        for(let i = 0;i < goodsLen;i++){
            if(typeof array[i].head === 'string')
                array[i].head = array[i].head.split(',');
        }
    },
    getTid : function(e){
        let dataSet = e.currentTarget.dataset;
        let tid = dataSet.tid;
        let self = this;
        this.setData({
            tid : tid,

        },()=>{
            console.log("关闭一级分类标签");
            this.setActiveByTid(tid);
            self.setData({
                IsecondLevel : true
            });
            //设置二级分类数据
            console.log("in getTid tid is ",tid);
            self.getT2idByTid(tid);
        });
        this.hideTopLevel();
    },
    //隐藏一级分类
    hideTopLevel : function(){
        this.data.IsecondLevel
        this.setData({
            isTopLevel   : false,
            // IsecondLevel : false,
        })
    },
    //自定义组件触发的事件加入购物车或者是直接购买
    myevent : async function(e){
        let self = this;
        console.log("组件传递过来的数据是：e is ",e);
        let dataSet = e.detail;
        let currentGoods = null;
        //点击的是哪个商品，然后根据商品的id获取到对应的规格信息显示加入购物车半窗
        let id = dataSet.id;
        //找到该id对应的商品
        for(let i = 0;i < this.data.goods.length;i++){
            if(this.data.goods[i].pid == id){
                currentGoods = this.data.goods[i];
            }
        }
        console.log("currentGoods is ",currentGoods);
        if (currentGoods.openstandard !== 1) {
            let sizeStr = currentGoods.size;
            console.log("sizeStr is ", sizeStr);
            sizeStr.trim();
            console.log("sizeStr is ", sizeStr);
            self.data.size = JSON.parse(sizeStr);
            for (let m in self.data.size) {
                console.log("m is ", m);
                self.data.typeArr.push(m);
                let value = self.data.size[m];
                let valueItemArr = value.split('|');
                let outJson = {};
                console.log("valueItemArr is ", valueItemArr);
                let len = valueItemArr.length;
                console.log("len is ", len);
                outJson[`${m}`] = [];
                for (let i = 0; i < len; i++) {
                    let ob = {};
                    ob.mode = valueItemArr[i];
                    if (i === 0) {
                        ob.touch = true;
                        this.data.sendServerSize[`${m}`] = ob.mode;
                        console.log("sendServerSize is ", this.data.sendServerSize);
                        this.setData({
                            sendServerSize: this.data.sendServerSize
                        })
                    } else {
                        ob.touch = false;
                    }
                    outJson[`${m}`].push(ob);
                }
                //将每一项对应的键值
                self.data.typeValueArr.push(outJson);
                console.log("value is ", self.data.typeValueArr);
            }
            console.log("typeArr is ", self.data.typeArr);
            console.log("typeValueArr is", self.data.typeValueArr);
            /**
             * 
             * 发送加入购物车请求的时候没有规格产品的该size依情况而定
             * 
             */
            console.log("sendServerSize is ", self.data.sendServerSize);
            self.data.typeArr = Const.uniqByObj(self.data.typeArr);
            self.data.typeValueArr = Const.uniqObjInArray(self.data.typeValueArr);
            self.setData({
                typeArr      : self.data.typeArr,
                typeValueArr : self.data.typeValueArr,
                showWindow   : true,
                currentGoods : currentGoods
            })
        } else {
            //有规格的商品
            let url = app.host + 'Data/GetStandardByPid';
            let data = {
                pid: currentGoods.pid
            }
            let req = new Request(url, data, 'POST', 'text');
            let res = await req.sendRequest();
            console.log("有规格的产品的规格是：", res.data.products);
            let categoryArr = res.data.products;
            let categoryLen = categoryArr.length;
            for (let i = 0; i < categoryLen; i++) {
                let keys = Object.keys(categoryArr[i]);
                console.log("keys is ", keys);
                //把规格存进数组
                for (let m = 0; m < keys.length; m++) {
                    let keyObj = keys[m];
                    this.data.typeArr.push(keyObj);
                    // console.log("种类的值是：", categoryArr[i][`${keyObj}`]);
                    let le = categoryArr[i][`${keyObj}`].length;
                    let tempJson = {};
                    console.log("le is ", le);
                    console.log("keyObj is ", keyObj);
                    tempJson[`${keyObj}`] = [];
                    for (let a = 0; a < le; a++) {
                        // console.log("种类值是：", categoryArr[i][`${keyObj}`][a]);
                        let innerJson = {

                        }
                        innerJson.mode = categoryArr[i][`${keyObj}`][a];
                        let typeKeys = categoryArr[i][`${keyObj}`];
                        console.log("typeKeys is ", typeKeys);
                        // a === 0 ? (innerJson.touch = true) : (innerJson.touch) = false;
                        if (a === 0) {
                            innerJson.touch = true;
                            //默认选择的类型
                            this.data.sendServerSize[`${keyObj}`] = innerJson.mode;
                        } else {
                            innerJson.touch = false;
                        }
                        // //检查商品中的size_choosed中的value值是否与该
                        // innerJson.touch = false;
                        tempJson[`${keyObj}`].push(innerJson);
                    }
                    this.data.typeValueArr.push(tempJson);
                }
            }
            let keys = Object.keys(categoryArr);
            console.log("typeArr is ", this.data.typeArr);
            console.log("typeValueArr is ", this.data.typeValueArr);
            self.data.typeArr = Const.uniqByObj(self.data.typeArr);
            self.data.typeValueArr = Const.uniqObjInArray(self.data.typeValueArr);
            this.setData({
                typeArr         : this.data.typeArr,
                typeValueArr    : this.data.typeValueArr,
                sendServerSize  : this.data.sendServerSize,
                showWindow      : true,
                currentGoods    : currentGoods
            });
        }
    },
    //取消显示半窗
    cancel : function(e){
        console.log("e is ",e);
        this.setData({
            typeArr: [],
            typeValueArr: [],
            sendServerSize: {},
            showWindow: false,
        })
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
    //进入商品详情
    enterDetail : function(e){
        console.log("enterDetail 组件内传递过来的数据是：e is ",e);
        let id = e.detail.id;
        //找到该id对应的商品
        console.log("goods is ",this.data.goods);
        let goodsLen = this.data.goods.length;
        let goodsItem = null;
        for(let i = 0;i < goodsLen;i++){
            if(this.data.goods[i].pid == id){
                console.log("找到了该goods ",this.data.goods[i]);
                goodsItem = this.data.goods[i];
            }
        }
        if(goodsItem !== null){
            //存入缓存备商品详情页面使用
            wx.setStorage({
                key: 'goods',
                data: goodsItem,
                success : function(res){
                    wx.navigateTo({
                        url: '../cartGoodsDetail/cartGoodsDetail',
                    });
                }
            });
        }
    },
    onImageLoad: function (e) {
        let imageId = Number(e.currentTarget.id);
        let oImgW = e.detail.width;         //图片原始宽度
        let oImgH = e.detail.height;        //图片原始高度
        let imgWidth = this.data.imageWidth;  //图片设置的宽度
        let scale = imgWidth / oImgW;        //比例计算
        let imgHeight = oImgH * scale;      //自适应高度
        let images = this.data.dataArray;
        let imageObj = null;
        for (let i = 0; i < images.length; i++) {
            console.log("images is ", images);
            console.log("imageId is ", typeof (imageId), imageId);
            let img = images[i];
            if (img.pid === imageId) {
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
        console.log(JSON.stringify(data.col1)+"////////////////////");
        console.log(JSON.stringify(data.col2) +"////////////////////");
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
    onReachBottom: async function () {
        wx.showLoading({
            title: '数据正在赶来...',
        })
        
        if(this.data.isHot){
            if(this.data.isAll){
                //点击了全部刷新的时候请求的方式不一样
                this.data.page++;
                this.getAllType();
                wx.hideLoading();
                console.log("goods is ",this.data.goods);
            }else{
                let url = '';
                let data = {};
                switch(this.data.updateState){
                    case 0 : 
                        url = 'Data/GetProductsByT2id';
                        data.page = ++this.data.page;
                        break;
                }
                data.t2id = this.data.t2id;
                console.log("上拉刷新的时候 data is ",data);
                let req = new Request(app.host + url,data,"POST","text");
                let res = await req.sendRequest();
                if(res.data.products.length === 0){
                    wx.hideLoading();
                    wx.showToast({
                        title : '已经到底了',
                        icon  : 'none'
                    });
                }else{
                    wx.hideLoading();
                    this.data.goods = this.addGoods(this.data.goods, res.data.products);
                    this.splitHeadImage(this.data.goods);
                    this.data.goods = Const.uniqObjInArray(this.data.goods);
                    this.setData({
                        goods: this.data.goods
                    });
                }
            }

        }else{
            if(this.data.isAll){
                this.data.page++;
                //获取全部的商品文章
                this.getAllDataArrayInShare(function(){
                    wx.hideLoading();
                });
            }else{

            }
        }
    },
    
    //追加商品
    addGoods: function (sourceArr, tempArr) {
        let len = tempArr.length;
        for (let j = 0; j < len; j++) {
            sourceArr.push(tempArr[j]);
        }
        return sourceArr;
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
    setActiveByTid : function(tid){
        let typeLen = this.data.bannerType.length;
        for (let i = 0; i < typeLen; i++) {
            let currentjson = this.data.bannerType[i];
            //当前的json id跟穿件来的id相同
            if (currentjson.tid === tid) {
                currentjson.choosed = true;
            } else {
                currentjson.choosed = false;
            }
        }
        this.setData({
            bannerType : this.data.bannerType
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
            if (currentjson.tid === id) {
                currentjson.choosed = true;
            } else {
                currentjson.choosed = false;
            }
        }
        this.setData({
            bannerType: this.data.bannerType
        })
    },
    chooseBannerType: async function (event) {
        let self = this;
        console.log("in chooseType event is ", event);
        console.log("bannerType is ",this.data.bannerType);
        let id = Number(event.currentTarget.dataset.id);
        console.log("id is ", id);
        this.data.tid = id;
        wx.showLoading({
            title: '加载数据中...',
        })
        if(id === -1){
            for (let i = 0; i < this.data.bannerType.length;i++){
                if(this.data.bannerType[i].tid === id){
                    this.data.bannerType[i].choosed = true;
                }else{
                    this.data.bannerType[i].choosed = false;
                }
            }
            if (this.data.isHot) {
                this.setData({
                    bannerType   : this.data.bannerType,
                    isAll        : true,
                    IsecondLevel : false,
                    goods        : [],
                    page         : 1
                },()=>{
                    wx.hideLoading();
                });
            }else if(this.data.isShare){
                this.setData({
                    bannerType: this.data.bannerType,
                    isAll: true,
                    IsecondLevel : false,
                    goods : [],
                    dataArray : [],
                    col1 : [],
                    col2 : [],
                    page : 1
                }, () => {
                    wx.hideLoading();
                    //请求服务器
                    self.getAllDataArrayInShare();
                });
            }
        }else{
            this.setData({
                isAll : false
            });
        }
        if(this.data.isAll){
            //如果是全部的话就
            this.getAllType();
        }else{
            this.setActiveByTid(id);
            //根据tid获得t2id
            await this.getT2idByTid(this.data.tid);
            //重置page=1
            this.data.page = 1;
            let data = {
                t2id: this.data.t2id,
                page: this.data.page
            }
            let url = 'Data/GetProductsByT2id'
            let req = new Request(app.host + url, data, 'POST', 'text');
            let res = await req.sendRequest();
            wx.hideLoading();
            console.log("in chooseType res is ", res);
            if (res.data.products.length === 0) {
                wx.showToast({
                    title: '暂时还没有该分类的商品...',
                    icon: 'none'
                })
            }
            this.splitHeadImage(res.data.products);
            this.setData({
                goods        : res.data.products,
                bannerType   : this.data.bannerType,
                IsecondLevel : true 
            });
        }
    },
    getT2idByTid : async function(tid){
        let typeUrl = 'Data/GetTab2ByTid';
        let data = {
            tid: this.data.tid
        }
        let typeReq = new Request(app.host + typeUrl, data, 'POST', 'text');
        let typeRes = await typeReq.sendRequest();
        console.log("获得二级分类的res is ", typeRes.data.tab2s);
        this.setData({
            secondLevels : typeRes.data.tab2s
        })
    },
    //选择二级分类
    chooset2Id : function(e){
        let dataSet = e.currentTarget.dataset;
        let t2id = dataSet.ttid;
        let tid = dataSet.tid;
        console.log("选择二级分类 t2id is ",t2id);
        this.setData({
            t2id         : t2id,
            IsecondLevel : false
        })
        console.log("选择二级分类 t2id is ", t2id);
        //根据二级分类获取到商品信息
        this.getTwoClass();
        console.log("选择二级分类后的商品是：",this.data.goods);
    },
    //选择规格
    chooseStand: function (event) {
        //无规格商品
        console.log("event is ", event);
        console.log("event.id is ", event.currentTarget.id);
        let target = event.currentTarget.id;
        let targetArr = target.split('-');
        let targetValue = targetArr[0];
        let index = targetArr[1];
        let tag = targetArr[2];
        console.log("sendServerSize is ", this.data.sendServerSize);
        console.log("index is ", index);
        console.log("tag is ", tag);
        //在typeValueArr中找到mode为id的这个对象并设置该对象的touch属性为true
        let testData = this.data.typeValueArr;
        console.log("testData is ", testData);
        let len = testData.length;
        console.log("len is ", len);
        let find = false;
        let innerLen = testData[index][`${tag}`].length;
        console.log("innerLen is ", innerLen);
        for (let j = 0; j < innerLen; j++) {
            if (testData[index][`${tag}`][j].mode === targetValue) {
                console.log("找到了");
                testData[index][`${tag}`][j].touch = !testData[index][`${tag}`][j].touch;
                console.log("该尺寸类型是否被选中：", testData[index][`${tag}`][j].touch);
                if (testData[index][`${tag}`][j].touch) {
                    //动态添加属性
                    this.data.sendServerSize[`${tag}`] = targetValue;
                } else {
                    console.log("该属性需要删除！");
                    //删除该属性
                    delete this.data.sendServerSize[`${tag}`];
                }
                console.log("sendServerSize obj is ", this.data.sendServerSize);
                console.log("index is ", index);
            } else {
                //将其他的touch重置为false
                testData[index][`${tag}`][j].touch = false;
            }
        }
        console.log("typeValueArr is ", this.data.typeValueArr);
        this.setData({
            typeValueArr: testData,
            sendServerSize: this.data.sendServerSize,
            sizeValueArr: this.data.sizeValueArr,
        });
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
        });
    },
    //选择精品商城或者热卖商城
    chooseIt : function(e){
        console.log("e is ",e);
        let dataSet = e.currentTarget.dataset;
        let typeName = dataSet.type;
        console.log("typeName is ",typeName);
        this.setData({
            dataArray : []
        });
        if(typeName === '热卖商城'){
            this.data.isHot = true;
            this.data.isShare = false;
        }else if(typeName === '精品分享'){
            this.data.isShare = true;
            this.data.isHot = false;
            //精品分享请求全部


        }
        console.log("isHot is ",this.data.isHot,"isShare is ",this.data.isShare);
        //重置page为1
        this.setData({
            isHot     : this.data.isHot,
            isShare   : this.data.isShare,
            page      : 1,
            dataArray : []
        });
    },
    chooseItByCss : function(e){
        console.log("e is ", e);
        let dataSet = e.currentTarget.dataset;
        let typeName = dataSet.type;
        console.log("typeName is ", typeName);
    },
    //减少商品数量
    sub: function () {
        if (this.data.count > 1) {
            this.setData({
                count: this.data.count - 1
            })
        }
    },
    add: function () {
        this.setData({
            count: this.data.count + 1
        })
    },
    confirm : function(e){
        console.log("e is ",e);
        let data = this.checkData(this.data.currentGoods.pid);
        console.log("data is ", data);
        console.log("购买的currentGoods is ", this.data.currentGoods);
        data.pname = this.data.currentGoods.pname;
        //分割头图
        if (typeof (this.data.currentGoods.head) === 'string') {
            data.head = this.data.currentGoods.head.split(',')[0];
        } else if (this.data.currentGoods.head instanceof Array) {
            data.head = this.data.currentGoods.head[0];
        }
        data.price = this.data.currentGoods.price * data.count;
        //是否开启规格
        data.openstandard = this.data.currentGoods.openstandard;
        //分割头图
        let orderA = [];
        orderA.push(data);
        wx.setStorageSync('orderArray', orderA);
        console.log("orderA is ",orderA);
        //如果数据合法的话就跳转页面
        if (this.data.isOk) {
            wx.navigateTo({
                url: '../order/order'
            });
        }
    },
    //检查数据是否填充完毕
    //检查加入购物车或者立即购买的时候选择的数据是否合法
    checkData: function (pid) {
        let cancel = '';
        if (arguments.length === 2) {
            cancel = arguments[1];
        }
        let data = {
            uid: app.uid,
            pid: pid,
            size: this.data.sendServerSize,
            count: this.data.count,
            source: 0,
        }
        console.log("typeArr is ", this.data.typeArr);
        let typeA = this.data.typeArr;
        let typeLen = this.data.typeArr.length;
        console.log("data.size is ", this.data.sendServerSize);
        let checkNum = 0;
        for (let i = 0; i < typeLen; i++) {
            console.log("i --->> ", `${typeA[i]}`);
            console.log("--->>>", data.size[`${typeA[i]}`]);
            console.log("--->>> <<<", data.size[`${typeA[i]}`] === undefined);
            let hasThisProperty = data.size.hasOwnProperty(`${typeA[i]}`);
            console.log("有没有改属性：", hasThisProperty);
            if (hasThisProperty) {
                checkNum++;
            }
        }
        console.log('checkNum is ', checkNum);
        if (checkNum === typeLen) {
            console.log("所有类型都已经选择");
            this.setData({
                isOk: true
            })
        } else {
            console.log("类型没有选择完")
            this.setData({
                isOk: false
            })
        }
        console.log("isOk is ", this.data.isOk);
        //规格没有选择正确或者是没有选择足够
        if (!this.data.isOk && cancel !== 'cancel') {
            if (this.data.goods.openstandard === 1) {
                wx.showToast({
                    title: '请选择规格',
                    icon: 'none'
                })
            }
        }
        return data;
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
    // //加载更多商品
    // loadMoreGoods : function(e){
    //     console.log("e is ",e);
    //     //查看当前的选择的类型
    //     console.log("type is ",this.data.bannerType);
    // }
})