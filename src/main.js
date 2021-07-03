import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './assets/css/global.css'
Vue.prototype.$http = axios
Vue.config.productionTip = false
Vue.use(ElementUI);
new Vue({
    router,
    render: h => h(App)
}).$mount('#app')