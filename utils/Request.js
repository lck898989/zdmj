export default class Request {
    constructor(url, data, method, responseType) {
        this.url = url;
        this.data = data;
        this.method = method;
        this.responseType = responseType;
    }
    /**
     * 发送网络请求
     * @return {Promise} 请求结束后的结果
     */
    sendRequest() {
        let self = this;
        return new Promise(function (resolve, reject) {
            wx.request({
                url: self.url,
                data: self.data,
                header: {
                    'content-type': 'application/json'
                },
                method: self.method,
                dataType: "json",
                responseType: self.responseType,
                success: function (res) {
                    console.log("res",res);
                    resolve(res);
                },
                fail: function () {
                    console.log("请求失败！！！");
                    reject("request err");
                },
            })
        });
    }
}