const base = {
    get() {
        return {
            url : "http://localhost:8080/nodejs2ht5t/",
            name: "nodejs2ht5t",
            // 退出到首页链接
            indexUrl: 'http://localhost:8080/nodejs2ht5t/front/dist/index.html'
        };
    },
    getProjectName(){
        return {
            projectName: "沧州交通学院二手交易系统"
        } 
    }
}
export default base
