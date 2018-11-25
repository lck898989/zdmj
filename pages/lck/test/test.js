// pages/lck/test/test.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        swiperList: [
            {
                index: 0,
                aurl: "",
                swpClass: "swp-left",
                active: false,
                imgsrc: "../../../resources/test.png",
            },
            {
                index: 1,
                aurl: "#",
                swpClass: "move-left",
                active: false,
                imgsrc: "../../../resources/800.jpg"
            },
            {
                index: 2,
                aurl: "#",
                swpClass: "move-left",
                active: false,
                imgsrc: "../../../resources/900.jpg"
            },
            {
                index: 3,
                aurl: "#",
                swpClass: "move-left",
                active: false,
                imgsrc: "../../../resources/1000.jpg"
            },
            {
                index: 4,
                aurl: "#",
                swpClass: "move-left",
                active: false,
                imgsrc: "../../../resources/600.jpg"
            }],
            //带遮罩的图片移动的倍数
            tax : [0.9,0.8,0.7],
            startPoint : 0,
            currentIndex : 0
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

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
    //执行切换动画动态改变组件的class
    swapBtn : function(e){
        let dataSet = e.currentTarget.dataset;
        let index = dataSet.index;
        let swp = this.data.swiperList;
        let max = swp.length;
        console.log("index is ",index);
        let prev = swp[index - 1];
        let cur = swp[index];
        let next = swp[index + 1];
        //如果点击的是第二张图片进行动画的播放
        if(index === 1){
            for(let i = 0;i < max;i++){
                swp[i].active = true;
            }
            //根据不同的变换赋值不同的class
            prev.swpClass = 'swiper-right'; //前一个向左移动500rpx，透明度从100-->0
            //当前的图片向左移动110rpx 遮罩透明度从0.5--->1 放到到1
            cur.swpClass = 'swiper-left';
            //剩下的图片依次向左移动相应的距离，并且放大到相应的倍数，遮罩透明度不变
            for(let j = 0;j < this.data.tax.length;j++){
                swp[j+2].swpClass = 'move-left'+j;
                //放大相应的倍数
                // let currentTax = this.data.tax[j];
            }
            let self = this;
            this.setData({
                swiperList : swp
            },function(){
                console.log("最外层setData执行了");
                let first = swp.shift();
                swp.push(first);
                self.setData({
                    swiperList : swp
                },()=>{
                    console.log("最内层setData执行了");
                    console.log("最能层执行完setdata后 swiperList is ",self.data.swiperList);
                })
            })

        }else if(index == 0){
            let self = this;
            //向右移动如果左边没有
            console.log("cur is ",cur);
            console.log("左边有");
            let leftItem = null;
            //左边的一定是swpClass为swiper-right的一个对象
            for(let i = 0;i < max;i++){
                let tempSwpClass = swp[i].swpClass;
                switch(tempSwpClass){
                    case 'swiper-right':
                        swp[i].swpClass = 'move-right4';
                        break;
                    case 'swiper-left' :
                        swp[i].swpClass = 'move-right0';
                        break;
                    case 'move-left0' :
                        swp[i].swpClass = 'move-right1';
                        break;
                    case 'move-left1' :
                        swp[i].swpClass = 'move-right2';
                        break;
                    case 'move-left2' :
                        swp[i].swpClass = 'move-right3';
                        break;          
                }
            }
            console.log("swiperList is ",swp);
            self.setData({
                swiperList : swp
            },()=>{
                let lastItem = swp.pop();
                swp.unshift(lastItem);
                console.log("右移最能层的setData后的 swp is ",swp);
                self.setData({
                    swiperList : swp
                })
            })
        }

    },
    moveStart : function(e){
        console.log("e is ", e);
        this.data.startPoint = e.changedTouches[0].pageX;
        console.log("startPoint is ", this.data.startPoint);
    },
    moveEnd : function(e){
        let isLeft = false;
        let isRight = false;
        console.log("in end e is ",e);
        let endPoint = e.changedTouches[0].pageX;
        console.log("是否向左移动？", (endPoint - this.data.startPoint) < 0 ? (isLeft = true) : (isRight = true));
        console.log("isLeft is ", isLeft);
        console.log("isRight is ", isRight);
        //如果向左移动的话执行相应方法
        if (isLeft) {
            this.moveLeft(1);
        } else {
            // this.moveRight();
        }
    },
    moveLeft(index){
        let swp = this.data.swiperList;
        let max = swp.length;
        console.log("index is ", index);
        let prev = swp[index - 1];
        let cur = swp[index];
        let next = swp[index + 1];
        //如果点击的是第二张图片进行动画的播放
        if (index === 1) {
            for (let i = 0; i < max; i++) {
                swp[i].active = true;
            }
            //根据不同的变换赋值不同的class
            prev.swpClass = 'swiper-right'; //前一个向左移动500rpx，透明度从100-->0
            //当前的图片向左移动110rpx 遮罩透明度从0.5--->1 放到到1
            cur.swpClass = 'swiper-left';
            this.setData({
                currentIndex : cur.index
            })
            //剩下的图片依次向左移动相应的距离，并且放大到相应的倍数，遮罩透明度不变
            for (let j = 0; j < this.data.tax.length; j++) {
                swp[j + 2].swpClass = 'move-left' + j;
                //放大相应的倍数
                // let currentTax = this.data.tax[j];
            }
            let self = this;
            this.setData({
                swiperList: swp
            }, function () {
                console.log("最外层setData执行了");
                let first = swp.shift();
                swp.push(first);
                self.setData({
                    swiperList: swp
                }, () => {
                    console.log("最内层setData执行了");
                    console.log("最能层执行完setdata后 swiperList is ", self.data.swiperList);
                })
            })
        }
    }
})