import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import API from "./axios/api";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";

import mavonEditor from "mavon-editor";
import "mavon-editor/dist/css/index.css";

import Axios from "axios";

Vue.config.productionTip = false;
Vue.prototype.$API = API;

Vue.prototype.$axios = Axios;

import x2js from "x2js";
Vue.prototype.$x2js = new x2js();

Axios.defaults.headers.post["Content-Type"] =
  "application/x-www-form-urlencoded";

Vue.use(ElementUI);
Vue.use(mavonEditor);

new Vue({
  router,
  store,
  Axios,
  render: h => h(App)
}).$mount("#app");
