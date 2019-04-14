import Vue from 'vue';
import App from './App.vue';
import router from './router';
import Elemnet from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css'
import './icons' // icon
Vue.config.productionTip = false;
Vue.use(Elemnet);

new Vue({
  el:'#app',
  router,
  render: h => h(App)
})
