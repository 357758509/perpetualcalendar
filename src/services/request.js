import {axiosPost} from '@/libs/http';

//获取当天的详细信息
function getDayData (date) {
    return new Promise((resolve, reject) => {
        axiosPost({
            //url中的这个"/api"其实就是我们在vue.config.js中配置请求后台接口的网络地址"http://v.juhe.cn/"的缩写，这个"/api"就是后台接口的网络地址"http://v.juhe.cn/"
            //url中的这个"/api"其实就是我们在vue.config.js中配置与后台接口地址一致的网络地址，以此来解决跨域的问题。
            //跨域就是同源策略，指协议、域名、端口号三个都必须相同，其中一个不同就会产生跨域
            url: "/api/calendar/day",
            data: {date},
            success (data) {
                resolve(data);
            },
            error (err) {
                reject(err);
            }
        })
    })
}

//获取近期假期
function getMonthData (yearMonth) {
    return new Promise((resolve, reject) => {
        axiosPost({
            url: "/api/calendar/month",
            data: {
                "year-month":yearMonth,
            },
            success (data) {
                resolve(data);
            },
            error (err) {
                reject(err);
            }
        })
    })
}

//获取当年的假期列表
function getYearData (year) {
    return new Promise((resolve, reject) => {
        axiosPost({
            url: "/api/calendar/year",
            data: {year},
            success (data) {
                resolve(data);
            },
            error (err) {
                reject(err);
            }
        })
    })
}

export {
    getDayData,
    getMonthData,
    getYearData
}