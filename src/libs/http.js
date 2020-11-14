// 写一个项目我们首先要先封装一个网络请求，要想怎么先去处理，请求数据。怎么维护后期的数据，然后再想视图的事情。如果你事先不封装网络请求
// 就开始写项目，到后期才想封装网络请求，那就非常麻烦了。
import axios from 'axios';
//qs是序列化的工具
//什么是序列化：就是把js中的Object对象转化为字符串
import qs from 'qs';

import {JUHE_APPKEY} from '@/configs/keys';

//封装axios的Post请求方法
function axiosPost (options){
    axios({
        url: options.url,
        method: 'post',
        header: {
            "Content-Type":"application/x-www-form-urlencoded"
        },
        data: qs.stringify({
            // ...options.data:因为options.data传递进来的是一个对象，所以要用扩展运算符把这个对象展开。不然axios的data中的qs.stringify转换成字符串的对象
            //中就会又包裹了一层对象
            ...options.data,
            key: JUHE_APPKEY
          })
        })
        .then((res) => {
             options.success(res.data);
        })
        .catch((err) => {
            options.error(err);
        })
}

//封装axios的get请求方法
function axiosGet (options) {
    axios(options.url + "&key=" + JUHE_APPKEY)
    .then((res) => {
        options.success(res.data);
   })
   .catch((err) => {
       options.error(err);
   })
}

export {
    axiosPost,
    axiosGet
}