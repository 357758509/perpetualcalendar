//在index.js中完全的抽离我们的数据请求的逻辑，在这里面请求数据并对数据进行处理
import {getDayData,
        getMonthData,
        getYearData
    } from './request';

import {
    formatChsDate,
    mapForChsDate
} from '@/libs/utils';
//1 async 是 ES7 才有的与异步操作有关的关键字，和 Promise ， Generator 有很大关联的。
//语法
// async function name([param[, param[, ... param]]]) { statements }
// name: 函数名称。
// param: 要传递给函数的参数的名称。
// statements: 函数体语句。

//1.1 返回值
// async 函数返回一个 Promise 对象，可以使用 then 方法添加回调函数。

//1.2 await
// async 函数中可能会有 await 表达式，async 函数执行时，如果遇到 await 就会先暂停执行 ，等到触发的异步操作完成后，恢复 async 函数的执行并返回解析值。
// await 关键字仅在 async function 中有效。如果在 async function 函数体外使用 await ，你只会得到一个语法错误。

// await
// await 操作符用于等待一个 Promise 对象, 它只能在异步函数 async function 内部使用。
// 返回值
// 返回 Promise 对象的处理结果。如果等待的不是 Promise 对象，则返回该值本身。
// 如果一个 Promise 被传递给一个 await 操作符，await 将等待 Promise 正常处理完成并返回其处理结果。
// 正常情况下，await 命令后面是一个 Promise 对象，它也可以跟其他值，如字符串，布尔值，数值以及普通函数。
// await针对所跟不同表达式的处理方式：
// Promise 对象：await 会暂停执行，等待 Promise 对象 resolve，然后恢复 async 函数的执行并返回解析值。
// 非 Promise 对象：直接返回对应的值

//形参store:这个形参store是在Day.vue页面中传进的vuex中的store仓库
export default async (store, field, date) => {
    let data = null;
    //field == 'day'||'month'||'year'
    switch(field){
        case 'day':
            data = await getDayData(date);
            break;
        case 'month':
            data = await getMonthData(date);
            break;
        case 'year':
            data = await getYearData(date);
            break;
        default:
            break;
    }
    //判断接受后台的数据的error_code是否等于零，等于零请求数据成功，不等于零请求数据失败
    if(data.error_code !== 0){
          //setErrorCode是vuex中mutations中的方法，data.error_code是对应setErrorCode方法中的第二个形参errorCode以及第二个形参errorCode后面的形参
        store.commit('setErrorCode', data.error_code)
        return;
    }
   
    //处理不同路由组件中的接口数据
    let res = null;
    switch (field) {
        case 'day':
            res = data.result.data;
            res.date = formatChsDate(res.date, 'day');
            // res.suit = res.suit.length > 20 ? res.suit.substr(0,19) + '...' : res.suit;
            res['year-month'] = formatChsDate(res['year-month'], 'month');
            break;
        case 'month':
            res = data.result.data.holiday_array;
            res = mapForChsDate(res, 'festival');
            break;
        case 'year':
            res = data.result.data.holiday_list;
            res = mapForChsDate(res, 'startday');
    }
    //setData是vuex中mutations中的方法
    //把不同路由组件中处理好的接口数据传给vuex的state中
    store.commit('setData',{
        field,
        data: res
    })
}