<template>
  <div class="container">
      <error-tip/>
      <div v-if="!errorCode">
          <card-list :data="monthData"/>
      </div>
  </div>
</template>

<script>
import getData from '@/services';
import { computed, watch, onMounted } from 'vue';
import { useStore } from 'vuex';

import { getNowDate } from '@/libs/utils';
//ErrorTip是请求接口数据的返回的参数error_code不为零时，显示的页面错误信息组件
import CardList from '@/components/MonthPage/List';
import ErrorTip from '@/components/ErrorTip';
export default {
  name: 'MonthPage',
  components:{
    ErrorTip,
    CardList
  },
  setup () {
    const store = useStore(),
          state = store.state;

    onMounted(() => {
      getData(store, 'month', getNowDate('month'))
    });
    watch(() => {
     return state.monthData;
    }, () => {
      store.commit('setErrorCode', 0);
    });
    return {
      monthData: computed(() => state.monthData),
      errorCode: computed(() => state.errorCode)
    }
  }
}
</script>

<style lang="scss" scoped>
// HTML 的 lang 属性可用于网页或部分网页的语言。这对搜索引擎和浏览器是有帮助的。
</style>