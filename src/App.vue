<template>
  <div id="app">
        <my-header>{{ headerTitle }}</my-header>
        <search-input
         :placeholder="placeholder"
         :maxlength="maxlength"
        />
        <!--我们希望如果这个组件本身已经加载了，第二次再进入这个路由的话，我希望它是保存一个缓存的状态，
           就是我不希望它再去请求数据了。在vue2中我们可以直接使用keep-alive把<router-view/>包裹起来，
           就可以缓存路由组件的状态。但在vue3中已经不建议这么做了，在vue3中建议我们写成下面的写法 ，使用这种写法
           缓存数据之后，就不会再走onMounted-->
          <router-view v-slot="{ Component }"> 
              <keep-alive>
                   <component :is="Component" />
              </keep-alive>
          </router-view>
        <tab/>
  </div>
</template>

<script>
import MyHeader from '@/components/Header';
import Tab from '@/components/Tab';
import SearchInput from '@/components/SearchInput';

//在vue3.0中vuex包括router它的操作方法全部都是以这种Composition-API的方式
//所以还是要从vue中的vuex和router中取出相应的Composition-API的这些函数来使用
import { computed, watch } from 'vue';
import { useStore } from 'vuex';
import {useRouter} from 'vue-router'

export default {
  name: 'App',
  components: {
     MyHeader,
     SearchInput,
     Tab
  },
  setup () {
    //这种写法代表拿出store仓库，store仓库中有state,mutations,getters,actions
     const store = useStore(),
      state = store.state,
    //useRouter()这种写法代表获取vue3中的router路由
      router = useRouter();
    
    //当页面刷新时就回到DayPage首页
    router.push('/');
    //当页面刷新时设置DayPage首页input框默认显示当前年月日
    store.commit('setPlaceholder', 'day');
    console.log(router.currentRoute.value.name);
    
    /* watch可以监听任何的东西,它的两个参数都是回调函数*/
    watch(() => {
         //在第一个回调函数中return我们要监听的值
         //通过router.currentRoute.value.name可以获取router路由组件的name名称
          return router.currentRoute.value.name;
    }, (value) => {
       /*当watch中第一个回调函数中通过return我们要监听的值发生变化时，它会把这个值传到第二个回调函数的形参value中。
         也就是说watch中第一个回调函数中我们监听的router.currentRoute.value.name的值发生变化时，这个值会传到第二个回调函数的形参value中*/
        //setHeaderTitle是vuex中mutations中的方法，value是对应setHeaderTitle方法中的第二个形参routerName以及第二个形参routerName后面的形参
         store.commit('setHeaderTitle',value);
        //setPlaceholder是vuex中mutations中的方法，当路由组件的name名称改变时，动态在input默认显示当前路由组件对应的当前日期
         store.commit('setPlaceholder',value);
         //setMaxlength是vuex中mutations中的方法，当路由组件的name名称改变时，动态规定input输入字段中的字符的最大长度。
         store.commit('setMaxlength',value);
        //动态改变vuex中的state中存储的路由组件名称
         store.commit('setField', value)
        //当App.vue组件显示了，那就表明肯定请求数据成功了，因此我们需要把error_code重新设置为零
         store.commit('setErrorCode', 0)
    })

    //computed(() => state)：computed计算属性对state包裹了以后，state其实是一个静态的数据，就是只能读不可写
    //computed(() => state).value 但是vue3在计算属性后面安排一个.value,可以直接取出state的数据，并且可读写
    /*computed(() => state).value会返回一个state对象，因为state本身就是一个对象。所以相当于return了一个state对象。
      所以其实computed(() => state).value == {headerTitle, placeholder, maxlength}。headerTitle是vuex中state的值*/
     return computed(() => state).value
  }
}
</script>