import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import "./assets/css/base.css"
import 'element-ui/lib/theme-default/index.css'
import echarts from 'echarts'
// import common from "./assets/js/common.js"
import Apiconfig from "./config/api-config.js"
import axios from "axios"
import VueClipboard from "vue-clipboard2"

import "./assets/css/base.css"
// 注册全局过滤器
import filters from './assets/js/filters.js';
Object.keys(filters).forEach((k) => Vue.filter(k, filters[k]));

Vue.use(ElementUI)
Vue.use(VueClipboard)
Vue.config.productionTip = false
Vue.prototype.$echarts = echarts
// Vue.prototype.common = common;
Vue.prototype.extendApi = Apiconfig;
Vue.prototype.axios = axios;

let querystring=require("querystring");
Vue.prototype.querystring = querystring;
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
