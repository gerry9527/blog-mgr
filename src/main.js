import Vue from 'vue';
import App from './App.vue';
import router from './router';
import Elemnet from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './styles/index.scss';
import './icons'; // icon
import store from './store';

Vue.config.productionTip = false;
Vue.use(Elemnet);

new Vue({
  el:'#app',
  router,
  store,
  render: h => h(App)
})
