// components/swiper-item-component/swiper-item-component.js
let app = getApp();
import Const from '../../utils/Const.js'
Component({
    /**
     * 组件的属性列表
     */
    options: {
        multipleSlots: true // 在组件定义时的选项中启用多slot支持
    },
    properties: {
        item: {
            type: Object,
            value: {}
        },
        goods: {
            type: Array,
            value: []
        }
    },
    ready: function () {
        console.log("goods is ready is ", this.data.goods);
    },
    /**
     * 组件的初始数据
     */
    data: {
        imageHost: Const.productionHost
    },

    /**
     * 组件的方法列表
     */
    methods: {
        //跳转到商品详情界面
        goDetail : function(e){
            console.log("e is ",e);
            console.log("this.data.item is ",this.data.item);
            //找到当前的商品
            let dataSet = e.currentTarget.dataset;
            let index = Number(dataSet.index);
            let itemLen = this.data.item.products.length;
            let findItem = null;
            for(let i = 0;i < itemLen;i++){
                if(i === index){
                    findItem = this.data.item.products[i];
                    break;
                }
            }
            console.log("findItem is ",findItem);
            wx.setStorage({
                key: 'goods',
                data: findItem,
                success : function(){
                    wx.navigateTo({
                        url: '../cartGoodsDetail/cartGoodsDetail',
                    });
                }
            })
        }
    }
})
