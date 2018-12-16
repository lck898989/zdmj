// components/beforeLoadImg/beforeLoadImg.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        //原始图片
        originalImage : String,
        //图片的宽度
        width : String,
        height : String,
        //图片剪裁mode同image的mode
        mode : String,
        styleClass : String,
        //是否存储进缓存
        isGoCache : String,
        //多少人看过该商品
        seeCount : Number
    },
    lifetime : {
        created : function(){
        },
        //组件数据准备完毕
        ready : function(){
            console.log("in ready this is ",this);
            console.log("isGoCache is ",this.data.isGoCache);
            // console.log("width is ",this.data.width);
            // console.log("height is ",this.data.height);
            // console.log("mode is ",this.data.mode);
            // console.log("styleClass ",this.data.styleClass);
            // console.log("在 ready函数中：self.data.originalImage is ",self.data.originalImage);
            
        }
    },
    /**
     * 组件的初始数据
     */
    data: {
        finishLoadFlag : false,

    },

    /**
     * 组件的方法列表
     */
    methods: {
        goLoad : function(e){
            let self = this;
            // console.log("in imageLoad e is ",e);
            if(this.data.isGoCache === 'true'){
                console.log("in imageLoad originalImage is ",self.data.originalImage);
                //将图片的url缓存到本地
                // wx.downloadFile({
                //     url: self.data.originalImage,
                //     success: function (res) {
                //         console.log("在下载中res is ", res);
                //         if (res.statusCode === 200) {
                //             let tempPath = res.tempFilePath;
                //             //根据tempPath去保存该图片到本地
                //             //获取文件管理器
                //             let fileManager = wx.getFileSystemManager();

                //             //获得数据缓存
                //             fileManager.saveFile({
                //                 tempFilePath: tempPath,
                //                 success: function (res) {
                //                     console.log("保存到本地res is ", res.savedFilePath);
                //                     self.originalImage = res.savedFilePath;
                //                     self.setData({
                //                         originalImage: self.originalImage
                //                     })
                //                 },
                //                 fail : function(e){
                //                     console.log("The reason of error with saving the cache is ",e);
                //                 }
                //             });
                //         }
                //     },
                //     fail: function () {
                //         console.log("下载文件失败");
                //     }
                // });
            }
            this.setData({
                finishLoadFlag : true
            })
        },
        error : function(e){
        },
        test : function(e){
            console.log("e is ");
            let tempPathArr = [];
            //下载完毕之后真实的图片路径
            let realPathArr = [];
            new Promise(function (resolve, reject) {
                self.data.swiperList.forEach(function (element) {
                    console.log("element is ", element);
                    let tempSrc = element.imgsrc;
                    //下载图片到本地
                    wx.downloadFile({
                        url: tempSrc,
                        success: function (res) {
                            if (res.statusCode === 200) {
                                console.log("res is ", res);
                                let tempPath = res.tempFilePath;
                                //获得文件
                                tempPathArr.push(tempPath);
                                console.log("tempPathArr is ", tempPathArr);
                            }
                            //swiper的长度等于临时路径数组的长度就认为是图片下载完毕
                            if (tempPathArr.length === swiperLen) {
                                //获取文件
                                let fileManager = wx.getFileSystemManager();
                                console.log("fileManager is ", fileManager);
                                //循环存储临时图片路径到本地
                                tempPathArr.forEach(function (element, index) {
                                    fileManager.saveFile({
                                        tempFilePath: element,
                                        success: function (res) {
                                            console.log("保存到本地的路径是：", res.savedFilePath);
                                            realPathArr.push(res.savedFilePath);
                                            console.log("index is ", index);
                                            if (index === tempPathArr.length - 1) {
                                                resolve();
                                            }
                                        }
                                    })
                                });
                            }
                        }
                    });
                });
            }).then(() => {
                console.log("tempPathArr is ", tempPathArr);
                console.log("realPathArr is ", realPathArr);
                for (let m = 0; m < realPathArr.length; m++) {
                    self.data.swiperList[m].imgsrc = realPathArr[m];
                }
                console.log("swiperList is ", self.data.swiperList);
                self.data.rollImagesOk
                self.setData({
                    swiperList: self.data.swiperList,
                })
            })
        }
    }
})
