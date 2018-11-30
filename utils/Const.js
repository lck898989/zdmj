export default {
    devHost: 'http://192.168.1.59:3150/',
    productionHost: 'http://shop.ykplay.com/',
    //数组内容为基本类型去重
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
    }

}