// components/beforeLoadImg/beforeLoadImg.js
import Const from '../../utils/Const.js'
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
        styleClass : String
    },
    lifetime : {
        //组件数据准备完毕
        ready : function(){
            console.log("originalImage is ",this.data.originalImage);
            console.log("width is ",this.data.width);
            console.log("height is ",this.data.height);
            console.log("mode is ",this.data.mode);
            console.log("styleClass ",this.data.styleClass);
        }
    },
    /**
     * 组件的初始数据
     */
    data: {
        finishLoadFlag : false,
        imgHost : Const.productionHost
    },

    /**
     * 组件的方法列表
     */
    methods: {
        goLoad : function(e){
            console.log("in imageLoad e is ",e);
            this.setData({
                finishLoadFlag : true
            })
        },
        error : function(e){
            console.log("in imageLoad e is ",e);
        },
        test : function(e){
            console.log("e is ");
        }
    }
})
