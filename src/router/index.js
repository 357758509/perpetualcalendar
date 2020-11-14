import { createRouter, createWebHistory } from 'vue-router';
import DayPage from '@/views/Day.vue';

const routes = [
    {
      path: '/',
      name: 'day',
      //这种路由导入组件的方式不是动态的，不是按需加载的。只要启动vue就会加载这个DayPage页面
      //注意不动态导入组件是components，而不是component。
      component: DayPage,
    },
    {
      path: '/month',
      name: 'month',
      //这种路由导入组件的方式是动态的，是按需加载的，只有用户切换到Month.vue页面，才会动态导入Month.vue页面，才会加载Month.vue页面
      //注意动态导入组件是component，而不是components。
      component: () => import(
        '../views/Month.vue'
      )
    },
    {
      path: '/year',
      name: 'year',
      component: () => import(
        '../views/Year.vue'
      )
    }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  mode:'hash',
  routes
})

export default router

