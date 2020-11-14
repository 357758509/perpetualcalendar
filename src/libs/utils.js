//日数和星期几如果小于10，就在前面给补个零
function _addZero (value) {
    return value < 10 ? ('0' + value) : value;
}

//封装根据传入的实参来判断是获取当前年，还是当前日，还是当前星期几的函数
function getIconDate (type) {
    const date = new Date();
    switch(type){
         case 'day':
            return  _addZero(date.getDate().toString());  //返回日
         case 'month':
            return _addZero((date.getMonth() + 1).toString());  //返回月
         case 'year':
             return date.getFullYear().toString().substr(2);  //获取当前年,并且只取年数的后两位,例如：2020，实际取出的是20
     }
}

/*formatChsDate函数用来处理接口是对象类型的数据，形参data是接口数据。形参type是路由组件名称。
  */
function formatChsDate (date, type){
    //split把字符串分隔成数组
    const _arr = date.split('-');

    switch(type) {
        case 'day':
            return `${_arr[0]}年${_arr[1]}月${_arr[2]}日`;
        case 'month':
            return `${_arr[0]}年${_arr[1]}月`;
        case 'year':
            return `${_arr[0]}年`;
        default:
            return `${_arr[0]}年${_arr[1]}月${_arr[2]}日`;
    }
}

//mapForChsDate是处理接口为数组类型的数据
/*data是接口数据。key是日期的键名。不同路由组件中日期的键名是不一样的，平且不同路由组件中的请求的接口数据类型
  也是不一样的，比如day路由组件中的接口数据类型是对象类型，month和year路由组件中的接口数据类型是数组类型*/
function mapForChsDate (data, key){
    return data.map((item) => {
        //item[key]取出来的是数组中的每一个对象
        //formatChsDate函数如果不传type实参,默认会走formatChsDate函数中switch中的最后一个条件判断语句default
        item[key] = formatChsDate(item[key]);  
        return item;
    });
}

//getNowDate函数是处理当前日期参数的格式，然后将这个处理好的当前日期参数的格式传入到请求接口的参数当中
//field是对应router路由组件的名称
function getNowDate (field) {
    const date = new Date();

    let year = date.getFullYear(),  //年
    month = date.getMonth() + 1,    //月
    day = date.getDate();           //日

    switch (field) {
        case 'day':
            return `${year}-${month}-${day}`;
        case 'month':
            return `${year}-${month}`;
        case 'year':
            return `${year}`;
        default:
            return `${year}-${month}-${day}`;
    }
}

/* formatUserDate函数是把用户在搜索输入框输入的数值，转换成后台能接受的数值格式，然后发送给后台请求相应的数据。
   用户在当天信息这里搜索的时候，比如说20150503 -> 那么我们必须把用户输入的数值转换成这种2015-5-3格式，才能传给后台去请求数据。*/
function formatUserDate (value) {
    const len = value.length;
    if(len < 4){
     /*如果用户输入的数值长度小于4位，那我们就直接return,不用去请求后台数据了。因为后台规定请求参数最小的数值长度是4位，是年。小于四位用户这样输入肯定是错误的*/
        return;
    }

    if(len === 4) {
    /*如果用户输入的数值长度等于4位，那肯定是年，那我们就不用处理这种数据格式了，因为后台是接受这种数据格式的，我们就直接返回用户数据*/
        return value;
    }
   
    if(len > 4 && len < 6){
    //如果用户输入了五位数值，那么我们就截取前四位,就是年份
         return value.substr(0, 4);
    }
    
    let _arr = [],
        pattern;
    if (len >= 6 && len < 8) {
        //如果用户输入是六位和七位数值长度，那么我们就截取六位数值长度
        pattern = /(\d{4})(\d{2})/;
        //"$1-$2"是正则表达式
        value = value.substr(0, 6).replace(pattern, "$1-$2"); //现在就得到了2020-07
        //　Array.from()方法就是将一个类数组对象或者可遍历对象转换成一个真正的数组。
        _arr = Array.from(value).filter((item, index) => {
            //去除日期格式中的零
            if(index === 5 && item === '0'){
                return false;
            }
            return true;
        });
    }

    if (len >= 8){
        //如果用户输入的数值长度大于八位，那么就要取八位，取八位得到的就是年、月、日了。
        pattern = /(\d{4})(\d{2})(\d{2})/;
        //$1-$2_$3是正则表达式
        value = value.substr(0, 8).replace(pattern, "$1-$2-$3"); //现在就得到了2020-07-30
        _arr = Array.from(value).filter((item, index) => {
            //去除日期格式中的零
            if((index === 5 || index === 8) && item === '0'){
                return false;
            }
            return true;
        });
    }
    //_arr.toString()之后是这种数据格式2,0,2,0,-,0,7,-,3,0
    return _arr.toString().replace(/,/g, ''); //现在得到的是这种格式2020-7-30  
}

export {
    getIconDate,
    formatChsDate,
    mapForChsDate,
    getNowDate,
    formatUserDate
}