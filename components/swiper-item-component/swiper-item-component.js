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
        item  : {
            type  : Object,
            value : {}
        },
        goods : {
            type  : Array,
            value : []
        }
    },
    ready : function(){
        console.log("goods is ready is ",this.data.goods);
    },
    /**
     * 组件的初始数据
     */
    data: {
        imageHost : Const.productionHost
    },

    /**
     * 组件的方法列表
     */
    methods: {

    }
})
