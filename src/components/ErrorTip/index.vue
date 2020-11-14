<template>
  <!-- 在if中零为false,非零为true。所以当errorCode为零时，就代表接口数据请求成功，不会在页面显示错误信息组件。如果
       errorCode不为零，就代表请求数据接口失败，就会在页面显示错误信息组件 -->
  <div class="error-tip" v-if="errorCode">
      <img :src="require('../../assets/img/error.png')" />
      <!--errorData[errorCode]：errorData是我们自己在error.js中配置的请求接口数据不成功时的错误信息。
          errorData的键名是number,跟接口返回的error_code数值一一对应,所以我们可以通过接口error_code的数值在
          errorData对象中取出对应的错误信息   -->
      <p>{{errorData[errorCode]}}</p>
  </div>
</template>

<script>
//errorData是请求接口不成功时，提示给用户看的错误信息。
import errorData from '@/data/error';

//computed是vue3中的计算属性
import {computed} from 'vue';
//useStore是vue3中vuex中的store仓库
import { useStore } from 'vuex';

export default {
   name: 'ErrorTip',
   setup(){
       const store = useStore();

       return {
           //store.state.errorCode是请求接口后返回的error_code。如果error_code等于0，代表获取数据成功。如果不等于零，代表获取数据失败
           errorCode: computed(() => store.state.errorCode),
           errorData
       }
   }
}
</script>


<style lang="scss" scoped>
    .error-tip {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 80vh;

    img {
      width: .5rem;
    }

    p {
      margin-top: .15rem;
      font-size: .14rem;
      color: #999;
    }
  }
</style>