import Vuex from 'vuex'
import state from './state';
import mutations from './mutations'

export default Vuex.createStore({
  //在ES6中键名和键值是一样的话，可以不写键值
  state,
  mutations,
 });
