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
                imgsrc: "https://shop.ykplay.com/upload/activityhead/1543406417505.jpeg",
            },
            {
                index: 1,
                aurl: "#",
                swpClass: "move-left",
                active: false,
                imgsrc: "https://shop.ykplay.com/upload/activityhead/1543455702117.jpeg"
            },
            {
                index: 2,
                aurl: "#",
                swpClass: "move-left",
                active: false,
                imgsrc: "https://shop.ykplay.com/upload/activityhead/1543455729220.jpeg"
            },
            {
                index: 3,
                aurl: "#",
                swpClass: "move-left",
                active: false,
                imgsrc: "https://shop.ykplay.com/upload/activityhead/1543455754045.jpeg"
            },
            {
                index: 4,
                aurl: "#",
                swpClass: "move-left",
                active: false,
                imgsrc: "https://shop.ykplay.com/upload/activityhead/1543455771565.jpeg"
            },
            {
                index: 5,
                aurl: "#",
                swpClass: "move-left",
                active: false,
                imgsrc: "https://shop.ykplay.com/upload/activityhead/1543455794842.jpeg"
            },
            ],
            //带遮罩的图片移动的倍数
            tax: [0.9, 0.8, 0.7],
            //当前图片的索引
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
    //获取当前的index
    currentEvent: function (event) {
        console.log("当前第几张图片");
        console.log(event.detail.current);
        this.setData({
            currentIndex: event.detail.current
        })
    },
    //向右移动
    moveStart: function (e) {
        console.log("e is ", e);
        this.data.startPoint = e.changedTouches[0].pageX;
        console.log("startPoint is ", this.data.startPoint);
    },
    moveEnd: function (e) {
        let isLeft = false;
        let isRight = false;
        console.log("in end e is ", e);
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
    moveLeft(index) {
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
                currentIndex: cur.index
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
                swp[0].swpClass = 'swiper-left';
                // swp[swp.length - 1].swpClass = 'right-most';
                self.setData({
                    swiperList: swp
                }, () => {
                    console.log("最内层setData执行了");
                    console.log("最能层执行完setdata后 swiperList is ", self.data.swiperList);
                });
            })
        }
    },
})