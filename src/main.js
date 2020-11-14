/*vue3.0它的好处是什么呢？为什么打包之后，它的体积变小，运行变快呢，是因为它并不是全局使用了所有的vue，
  而是它vue中所有的功能独立了，它并没有 import vue from 'vue'。 而是import { createApp } from 'vue'。vue2中
  组件如果要实例话，就是new vue,但实际vue3并没有这么做,它是把vue3中所有的功能全部抽离成函数,如果你想写一个vue3的
  项目的话，你只需要通过从vue这个大的库里面拿出一个createApp，然后只要通过这个createApp去创建你的应用。然后你需要使用
  到什么的组件或者是库、插件你就使用use去链式的调用，最后通过mount('#app')去挂载到这个app的这个节点上就可以了。
  vue3打包之后，体积变小，因为它并不是整个vue拿来打包。它是按需去取我们需要的功能，也就是我们的Composition-API，然后最终
  打包的结果是我们需要的那些东西，所以说它体积变小了。vue3还有一个好处，由于它函数化了，所以说你的所有的函数，几乎都是可以被
  抽离的，所以我们这个项目的day,month,Year组件其实没有什么逻辑，逻辑全部都抽离出去了，这样它会大量的减轻这个组件的体积。而你的
  所有的逻辑都会一个一个的放到外面去，你需要的时候，需要什么就拿什么进来*/
import { createApp } from 'vue';
import App from './App.vue'
import router from './router'
import store from './store'

//导入scss
import '@/assets/css/resets.css';
import '@/assets/css/border.css';
//导入移动端响应式布局和解决移动端点击事件延迟的common.js文件
//为什么不在main.js中导入fastclick.js呢，因为fastclick.js已经被import导入进了common.js中
//所以导入common.js实际上就相当于也导入了fastclick.js在main.js文件中
import '@/assets/js/common.js';

createApp(App).use(router).use(store).mount('#app')