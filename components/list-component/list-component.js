// pages/goodsList.js
let app = getApp();
import Host from '../../utils/Const'
Component({
    //包含多个slot节点的时候需要声明的
    options: {
        multipleSlots: true
    },
    //组件之间代码复用机制   
    behaviors: [],
    /**
     * 组件的属性列表
     */
    properties: {
        pro: {
            type: String,
            value: '',
            //数据发生变化的时候出发该事件
            observer: function (newVal, oldVal, changedPath) {
                console.log("newVal is ", newVal);
                console.log("oldVal is ", oldVal);
            }
        },
        //商品类
        goods: {
            type: Object,
            value: {},
            observer: function (newVal, oldVal, changedPath) {

            }
        },

    },
    lifetimes: {
        created: function () {
            console.log("created()-->商品列表单元组件被创建...");
            console.log(this.data.goods);
        },
        attached: function () {
            console.log("商品列表项被创建-->", "attacher()");
        },
        ready: function () {
            console.log("商品列表信息" + 'ready()');
            console.log("goods is ",this.data.goods);
            //对头图进行切割
            let headList = this.data.goods.head.split(',');
            console.log("headList is ",headList);
            this.data.headList = headList;
            this.setData({
                headList : this.data.headList
            })
        },
        moved: function () {
            console.log("该组件被移动了");
        },
        detached: function () {
            console.log("组件被节点树移动了");
        },
    },
    //组件所在页面的生命周期声明对象，
    pageLifetimes: {
        show: function () {
            console.log("pagelifetimes show");
        },
        hide: function () {
            console.log("pagelifetimes hide");
        }
    },
    /**
     * 组件的初始数据 进行模板渲染
     */
    data: {
        host : Host.productionHost,
        headList : []
    },

    /**
     * 组件的方法列表
     */
    methods: {
        onLoad: function () {
            this.data.paramA,
            this.data.paramB
        },
        onMyButtonTap: function () {
            this.setData({

            })
        },
        _myPrivateMethod: function () {
            this.setData({

            })
        },
        anotherEventListener: function (e) {
            console.log("e is ", e);
        },
        onTap: function () {
            console.log("in listComponent goods is ",this.data.goods);
            console.log("goods String is ",JSON.stringify(this.data.goods));
            //利用缓存传递数据
            wx.setStorage({
                key: 'goods',
                data: this.data.goods,
            })
            wx.navigateTo({
                url: '../cartGoodsDetail/cartGoodsDetail'
            })
            // console.log("tap is -->>");
            // //自定义组件触发事件时候，需要使用triggerEvent 方法，指定事件名，detail对象和事件选项
            // let eventname = 'eventListener';
            // //detail对象
            // let eventDetail = { "tag": 1 };
            // //事件的选项
            // let eventOption = {
            //     bubbles: true,
            //     composed: false,
            // };
            // //自定义组件触发事件
            // this.triggerEvent(eventname, eventDetail, eventOption);

        }
    }
})
