<template>
  <div class="container">
     <error-tip/>
      <!-- 在if中零为false,非零为true。所以当errorCode为零时，就代表接口数据请求成功，不会在页面显示错误信息组件。如果
       errorCode不为零，就代表请求数据接口失败，就会在页面显示错误信息组件。!errorCode就代表当errorCode为零时取反就为真，就会
       显示请求接口成功的数据 -->
     <div v-if="!errorCode">
              <day-card :data="dayData"/>
              <day-list :data="dayData"/>
     </div>
  </div>
</template>

<script>

import getData from '@/services';
//现在在做vue3.0的开发就要有一个思想了，所有的vue工具，函数都是从vue里面解构出来用的。而不是在export default对象里面直接写的
import {computed, watch, onMounted} from 'vue';
//useStore是vue3的vuex的store仓库
import {useStore} from 'vuex';
import DayCard from '@/components/DayPage/Card';
import DayList from '@/components/DayPage/List';
//ErrorTip是请求接口数据的返回的参数error_code不为零时，显示的页面错误信息组件
import ErrorTip from '@/components/ErrorTip';

import { getNowDate} from '@/libs/utils';

export default {
  name: 'DayPage',
  components:{
    DayCard,
    DayList,
    ErrorTip
  },
  //所有的逻辑都要写在setup函数里面
  setup () {
   const store = useStore(),
         state = store.state;

  // onMounted的参数是一个回调函数，所有的逻辑都必须写在这个回调函数中。onMounted是一个高阶函数
   onMounted(() => {
     //getData()函数中store实参，是vue3中的vuex的store仓库
     //getNowDate('day')是封装好的获取对应组件当前日期的请求参数格式
       getData(store, 'day', getNowDate('day'));
   });
   
   //能显示Day.vue组件，那么数据肯定请求成功的。所以只要请求成功我们就在计算属性中重新给vuex的state中存储的后台返回error_code重新设置为0。
   watch(() => {
     return state.dayData
   }, () => {
     store.commit('setErrorCode', 0);
   });
   //视图上面要使用的所有的方法和数据都需要通过setup中的return暴露出去，然后才能在视图使用
   return {
     //computed是vue3中的计算属性
     //state.dayData获取vuex中的state中的dayData数据
        dayData: computed(() => state.dayData),
        errorCode: computed(() => state.errorCode) 
   }
  }
}
</script>

<style lang="scss" scoped>
// HTML 的 lang 属性可用于网页或部分网页的语言。这对搜索引擎和浏览器是有帮助的。
</style>