// components/eat-drink-play-fun-component/edpf.js
/**
 * 
 * 吃喝玩乐组件
 * 
 */
Component({
    /**
     * 组件的属性列表，需要传递进组件的动态数据
     */
    properties: {
        //顶部文字信息形式如喝.开怀畅饮
        topTitle : {
            type : String,
            value : ''
        },
        //滚动视图的列表
        pictureList : {
            type    : Array,
            value   : []
        },
        //分类列表
        bannerType : {
            type   : Array,
            value  : []
        },
        //显示瀑布流的数据
        dataArray : {
            type  : Array,
            value : []
        },
        //下拉加载显示的更多数据
        moreDataArray : {
            type  : Array,
            value : []
        },
        //组件的背景色
        backgroundColor : {
            type  : String,
            value : ''
        },
    },
    //组件所在页面的生命周期方法
    pageLifetimes : {
        show : function(){

        },
        hide : function(){

        },
        //页面尺寸发生变化
        resize : function(size){

        }
    },
    lifetimes : {
        created : function(){
            let self = this;
            console.log("created was execed");
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
        ready   : function(){
            console.log("ready was execed");
            console.log("topTitle is ",this.data.topTitle);
            console.log("pictureList is ",this.data.pictureList);
            console.log("bannerType is ",this.data.bannerType);
            console.log("dataArray is ",this.data.dataArray);
            console.log("moreDataArray is ",this.data.moreDataArray);
            console.log("backgroundColor is ",this.data.backgroundColor);
        },
        //组件实例进入页面节点树时候执行
        attached : function(){

        }
    },
    /**
     * 组件的初始数据
     */
    data: {
        //scroll-view的高度
        scrollH : 0,
        //图片的宽度
        imageWidth : 342,
        //加载图片的数量
        loadingCount : 6,
        col1  : [],
        col2  : [],
        ratio : 2,
        col1H : 0,
        col2H : 0
    },
    /**
     * 组件的方法列表
     */
    methods: {
        getIndex : function(e){
            console.log("e is ",e);
            let current = e.detail.current;
            this.setData({
                swiperIndex : current
            })
        },
        //图片加载完成之后进行的回调，返回图片的尺寸信息
        onImageLoad : function(e){
            let self = this;
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
            });
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
        }
    }
})
