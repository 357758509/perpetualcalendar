export default {
    //setHeaderTitle()这个方法通过传入对应路由名称，就可以改变vuex中state的对应的headerTitle值,从而动态改变头部标题
    //state是vex中的state数据，routerName是对应路由组件的名称
    setHeaderTitle (state, routerName){
    //routerName == 'day'||'month'||'year'
       switch (routerName) {
           case 'day':
               state.headerTitle = '当天信息';
               break;
           case 'month':
               state.headerTitle = '近期假期';
               break;
           case 'year':
               state.headerTitle = '当年假期';
               break;
           default:
               state.headerTitle = '当天信息';
               break;
        }
    },
    //setMaxLength()这个方法通过传入对应路由名称,改变vuex中state的对应的maxlength值，从而动态规定input输入字段中的字符的最大长度
    //state是vex中的state数据，routerName是对应路由组件的名称
    setMaxlength (state, routerName){
        switch (routerName) {
            case 'day':
                state.maxlength = 8;
                break;
            case 'month':
                state.maxlength = 6;
                break;
            case 'year':
                state.maxlength = 4;
                break;
            default:
                state.maxlength = 8;
                break;
         }
    },
     //setPlaceholder()这个方法通过传入对应路由名称,改变vuex中state的对应的placeholder值，从而动态的在input中输入当前日期
    //state是vex中的state数据，routerName是对应路由组件的名称
    setPlaceholder (state, routerName) {
        const date = new Date();
        let year = date.getFullYear(),  //年
            month = date.getMonth() + 1, //月
            day = date.getDate();   //日

        month = month < 10 ? '0' + month : month;
        day = day < 10 ? '0' + day : day;

        switch (routerName) {
            case 'day':
                state.placeholder = `格式: ${year}${month}${day} (${year}年${month}月${day}日)`;
                break;
            case 'month':
                state.placeholder = `格式: ${year}${month} (${year}年${month}月)`;
                break;
            case 'year':
                state.placeholder = `格式: ${year} (${year}年)`;
                break;
            default:
                state.placeholder = `格式: ${year}${month}${day} (${year}年${month}月${day}日)`;
                break;
         }
    },
    setErrorCode (state, errorCode) {
        state.errorCode = errorCode;
    },
    setData (state, payload){
        const {field, data} = payload;
        switch(field){
            case 'day':
                state.dayData = data;
                break;
            case 'month':
                state.monthData = data;
                break;
            case 'year':
                state.yearData = data;
                break;
            default:
                break;
        }
    },
    setField (state, field) {
        state.field = field;
    }
}