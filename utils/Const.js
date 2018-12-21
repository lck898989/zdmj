export default {
    devHost: 'http://192.168.1.177:3150/',
    productionHost: 'https://shop.ykplay.com/',
    appid: 'wxcf83376cf2f40081',
    appSecret: '023dd5acd11fc01a88373dd77d4f9cf9',
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
    },
    saleCommon : {
        2   : '审核通过',
        3   : '提交运单',
        3.5 : '运单审核中',
        4   : '退货中',
        5   : '完成',
        10  : '未通过审核' 
    },
    //处理小数相加的bug
    ADD : function(n1,n2){
        let r1,r2,m,c;
        try{
            r1 = n1.toString().split('.')[1].length
        }catch(e){
            r1 = 0;
        }
        try{
            r2 = n2.toString().split('.')[1].length;
        }catch(e){
            r2 = 0;
        }
        //去除两个数的小数位的相差的绝对值
        c = Math.abs(r1 - r2);
        m = Math.pow(10,Math.max(r1,r2));
        if(c > 0){
            let cm = Math.pow(10,c);
            if(r1 > r2){
                n1 = Number(n1.toString().replace('.',''));
                n2 = Number(n2.toString().replace('.',''))*cm;
            }else{
                n1 = Number(n1.toString().replace('.',''))*cm;
                n2 = Number(n2.toString().replace('.',''));
            }
        }else{
            n1 = Number(n1.toString().replace('.',''));
            n2 = Number(n2.toString().replace('.',''));
        }
        return (n1+n2)/m
    },
    //处理浮点数的减法
    SUB : function(n1,n2){
        let r1,r2,m,n;
        try{
            r1 = n1.toString().split('.')[1].length;
        }catch(e){
            r1 = 0;
        }
        try{
            r2 = n2.toString().split('.')[1].length;
        }catch(e){
            r2 = 0;
        }
        m = Math.pow(10,Math.max(r1,r2));
        n = (r1 >= r2) ? r1 : r2;
        return Number(((n1 * m - n2 * m)/m).toFixed(n));
    },
    //处理浮点数的乘法运算
    MUL : function(n1,n2){
        let m = 0,s1 = n1.toString(),s2 = n2.toString();
        try{
            m += s1.split('.')[1].length;
        }catch(e){

        }try{
            m+= s2.split('.')[1].length;
        }catch(e){

        }
        return Number(s1.replace('.','')) * Number(s2.replace('.','')) / Math.pow(10,m);
    },
    //处理浮点数的除法运算
    DIV : function(arg1,arg2){
        var t1 = 0, t2 = 0, r1, r2;
        try { t1 = arg1.toString().split(".")[1].length } catch (e) { }
        try { t2 = arg2.toString().split(".")[1].length } catch (e) { }
        r1 = Number(arg1.toString().replace(".", ""))
        r2 = Number(arg2.toString().replace(".", ""))
        return (r1 / r2) * Math.pow(10, t2 - t1);
    },
    //对象数组排序
    sortObjArr : function(arr){
        arr.sort(function(a,b){
            return a.index - b.index;
        });
        return arr;
    }
}