//商品类 根据数据库的原型进行创建
export default class Goods {
    /**
     * @param  {Number} price 商品价格
     * @param  {Array} imagePath 商品图片地址
     * @param  {String} description 商品介绍
     * @param  {String} soler 卖家
     */
    constructor(price, head, description, soler) {
        this.price = price;
        this.imagePath = head;
        this.description = description;
        this.soler = soler;
    }
    getImagePath() {
        return this.imagePath;
    }
    getPrice() {
        return this.price;
    }
    getDescription() {
        return this.description;
    }
    getSoledr() {
        return this.soler;
    }

}