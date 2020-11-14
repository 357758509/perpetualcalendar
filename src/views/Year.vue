<template>
  <div class="container">
     <error-tip/>
     <div v-if="!errorCode">
          <card-list
           :data="yearData"
          />
     </div>
  </div>
</template>

<script>

import getData from '@/services';
import { computed, onMounted, watch} from 'vue';
import { useStore } from 'vuex';

import { getNowDate } from '@/libs/utils';
//ErrorTip是请求接口数据的返回的参数error_code不为零时，显示的页面错误信息组件
import CardList from '@/components/YearPage/List';
import ErrorTip from '@/components/ErrorTip';

export default {
  name: 'YearPage',
  components:{
    ErrorTip,
    CardList
  },
  setup(){
      const store = useStore(),
          state = store.state;

     onMounted(() => {
        getData(store, 'year', getNowDate('year'));
     });
    
    watch(() => {
      return state.yearData;
    }, () => {
      store.commit('setErrorCode', 0);
    });

    return {
      yearData: computed(() => state.yearData),
      errorCode: computed(() => state.errorCode)
    }
  }
}
</script>

<style lang="scss" scoped>
// HTML 的 lang 属性可用于网页或部分网页的语言。这对搜索引擎和浏览器是有帮助的。
</style>