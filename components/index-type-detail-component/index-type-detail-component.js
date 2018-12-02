// components/index-type-detail-component/index-type-detail-component.js
import Const from '../../utils/Const.js'
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        easyItem : {
            type  : Object,
            value : {}
        },
        shadow : {
            type  : String,
            value : '#d0d0d0'
        }
    },
    ready : function(){
        console.log("data is ",this.data);
        console.log("easyItem is ",this.data.easyItem);
        console.log("shadown is ",this.data.shadow);
    },
    /**
     * 组件的初始数据
     */
    data: {
        imgHost : Const.productionHost
    },

    /**
     * 组件的方法列表
     */
    methods: {

    }
})
