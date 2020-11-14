<template>
  <div class="search-wrap">
    <!-- input中的属性：
         属性              值                 描述
         maxlength         number             规定输入字段中的字符的最大长度。
         placeholder       text               规定帮助用户填写输入字段的提示。
         value             value              规定 input 元素的值-->
         <!-- @input 事件在用户输入时触发。 -->
       <input 
       type="text"
       :placeholder="placeholder"
       :maxlength="maxlength"
       :value="inputValue"
       @input="searchData($event)">
  </div>
</template>

<script>
//computed是计算属性
import {ref,computed, watch} from 'vue';

import { useStore } from 'vuex';
/* formatUserDate函数是把用户在搜索输入框输入的数值，转换成后台能接受的数值格式，然后发送给后台请求相应的数据。
   用户在当天信息这里搜索的时候，比如说20150503 -> 那么我们必须把用户输入的数值转换成这种2015-5-3格式，才能传给后台去请求数据。*/
import {formatUserDate, getNowDate} from '@/libs/utils';

import getData from '@/services'
export default {
   name: 'SearchInput',
   props: {
       placeholder: String,
       maxlength: Number,
   },
   //setup中的props是父向子组件传递的数据,也就是上面的props
   setup(props){
       const inputValue = ref(''),
             store = useStore(),
             state = store.state;

        console.log(state.field);
       const searchData = (e) => {
          inputValue.value = e.target.value;
          //field是对应路由组件的名称
          const field = computed(() => state.field).value;
          //props.maxlength是input上的maxlength属性：规定输入字段中的字符的最大长度
          //inputValue.value.length是用户输入数值的长度
          //当不同路由组件中的input输入字段中的字符的最大长度等于用户输入数值的长度时，才去请求数据
          if(inputValue.value.length === props.maxlength){
                getData(store, field, formatUserDate(inputValue.value))
          } else if (inputValue.value.length === 0) {
            //当input中的值被清空了，就回到当天来，显示当天的页面数据和input框中帮助用户填写输入字段的提示
            //getNowDate(field)是input输入框中帮助用户填写输入字段的提示
                getData(store, field, getNowDate(field))
          }
       }
      
       watch(() => {
         //监听点击路由组件时的变化
         return state.field;
       }, () => {
         //当路由组件跳转到另一个路由组件时，就把用户在搜索框中输入的值清空
         inputValue.value = '';
       })
       //setup里的数据和方法必须通过return暴露出去，才能在template的视图中调用
       return {
           inputValue,
           searchData
       }
   }
}
</script>


<style lang="scss" scoped>
.search-wrap {
    position: fixed;
    top: .44rem;
    left: 0;
    z-index: 1;
    width: 100%;
    height: .38rem;
    padding: .03rem .1rem;
    border-bottom: 1px solid #ddd;
    box-sizing: border-box;
    background-color: #fff;

input {
      width: 100%;
      height: 100%;
      font-size: .14rem;
      border: 1px solid #ddd;
      text-indent: .1rem;
      border-radius: .03rem;

      &:focus {
        border-color: #ed4040;
        box-shadow: 0 0 .02rem #ed4040;
        transition: all .3s;
      }
    }
  }
</style>