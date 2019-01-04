import axios from "axios";
import store from "@/store/index";

axios.defaults.timeout = 50000;

//http request拦截器
axios.interceptors.request.use(
  config => {
    if (store.getters.getToken) {
      //为所有的请求都加上后台验证
      config.headers.Authorization = `${store.getters.getToken}`;
      config.headers.user = `${store.getters.getUserName}`;
    }
    return config;
  },
  err => {
    return Promise.reject(err);
  }
);

//http response 拦截器
//可以对返回的结果进行修改或者屏蔽
axios.interceptors.response.use(
  response => {
    if (response.config.responseType === "blob") {
      return response;
    } else {
      return response.data;
    }
  },
  error => {
    //reject 之后 接下来的promise链就破坏了，会直接跳转到.catch
    return Promise.reject(error.response);
  }
);
export default axios;
