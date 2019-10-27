import Vue from 'vue';
import App from './App.vue';
import router from './router';
import Elemnet from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './styles/index.scss';
import './styles/normalize.css'
import './styles/element.scss'
import './icons'; // icon
import store from './store';
import axios from 'axios';
import '@/permission' // permission control

Vue.config.productionTip = false;
Vue.use(Elemnet);
Vue.prototype.$axios = axios;

new Vue({
  el:'#app',
  router,
  store,
  render: h => h(App)
})
