//购物车类
export default class Cart{
    constructor(goodsImagePath,count,goodsColor,size,isChoosed){
        this.goodsImagePath = goodsImagePath;
        this.count = count;
        this.goodsColor = goodsColor;
        this.size = size;
        this.isChoosed = isChoosed;
    }
    //修改该商品的数量
    setCount(newCount){
        this.count = newCount;
    }
    //修改商品的颜色
    setGoodsColor(newColor){
        this.color = newColor;

    }
    setSize(newSize){
        this.size = newSize;
    }


}