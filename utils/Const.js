export default {
    devHost: 'http://192.168.1.44:3150/',
    productionHost: 'https://shop.ykplay.com/',
    //数组内容为
    uniq   : function(array){
        let temp = [];
        let index = [];
        let len = array.length;
        for(let i = 0;i < len;i++){
            for(let j = i+1;j < len;j++){
                //如果下一个值等于前一个值重复
                if(array[i] === array[j]){
                    i++;
                    j = i;
                }
            }
            temp.push(array[i]);
            index.push(i);
        }
        return temp;
    },
    //数组去重方法二：将数组的每一项转换为对象的一个键值，缺点是返回的数组里面
    //元素都为字符串
    uniqByObj : function(array){
        let len = array.length;
        let tempJson = {

        }
        for(let i = 0;i < len;i++){
            tempJson[`${array[i]}`] = true;
        }
        console.log("tempJson is ",tempJson);
        return Object.keys(tempJson);
    },
    //对象数组的去重
    uniqObjInArray : function(objarray){
        let len = objarray.length;
        let tempJson = {
            
        };
        let res = [];
        for(let i = 0;i < len;i++){
            //取出每一个对象
            tempJson[JSON.stringify(objarray[i])] = true;
        }
        console.log("tempJson is ",tempJson);
        let keyItems= Object.keys(tempJson);
        for(let j = 0;j < keyItems.length;j++){
            res.push(JSON.parse(keyItems[j]));
        }
        return res;
    },
    saleCommon : {
        "1" : '申请退款',
        "2" : '申请途中退货',
        "3" : '申请到货退货',
        "4" : '申请到货换货'
    },
    //日期字符串格式化
    formatDate : function(dataString){
        let ymd = dataString.slice(0, 8);
        let hms = dataString.slice(8);
        let year = ymd.slice(0, 4);
        let month = ymd.slice(4, 6);
        let day = ymd.slice(6, 8);
        let formatYmd = year + '-' + month + '-' + day + ' ';
        let hours = hms.slice(0, 2);
        let minutes = hms.slice(2, 4);
        let seconds = hms.slice(4, 6);
        let formatMms = hours + ':' + minutes + ':' + seconds;
        return formatYmd + formatMms;
    },
    //拼接对象数组或者是普通数组
    concatObjInArr : function(source,newArr){
        if (source instanceof Array && newArr instanceof Array) {
            let newLen = newArr.length;
            for (let i = 0; i < newLen; i++) {
                source.push(newArr[i]);
            }
        }
        //对source进行去重
        this.uniqObjInArray(source);
        return source;
    }

}
