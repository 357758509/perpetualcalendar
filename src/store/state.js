export default {
    headerTitle: '当天信息',  //存储的是头部标题
    placeholder: '请输入',    //存储的是input的默认输入值
    maxlength: 8,             //存储的是规定input中输入字符串长度的数值
    errorCode: 0,             //存储的是接口数据中的error_code,error_code是否等于零，等于零请求数据成功，不等于零请求数据失败
    dayData: {},              //day组件的接口数据
    monthData: [],            //month组件的接口数据
    yearData: [],             //year组件的接口数据
    field: 'day'              //field是对应路由组件的名称
}