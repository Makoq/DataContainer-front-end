import store from "@/store/index";
import router from "@/router/index";
import axios from "@/axios/index";

import * as types from "@/store/mutation-types";

var API = {
  baseUri: "api/",

  doRequest: function(api, options, useBaseUri = true) {
    let url = (useBaseUri ? this.baseUri : "") + api;

    if (!options || typeof options !== "object") options = {};
    options.url = url;

    if (!options.success || typeof options.success !== "function")
      options.success = () => {};

    //默认为Get请求
    if (!options.method) options.method = "get";

    if (options.method === "get") {
      options.headers = {
        "Content-Type": "application/x-www-form-urlencoded"
      };
      options.method = "GET";
    } else if (options.method === "post") {
      //包含文件参数的时候使用
      options.headers = {
        "Content-Type": "multipart/form-data"
      };
      options.method = "POST";
    } else if (options.method === "postJSON") {
      options.headers = {
        "Content-Type": "application/json" //方便后台直接序列化对象
      };
      options.method = "POST";
    } else if (options.method === "put") {
      //更新部分参数
      options.headers = {
        "Content-Type": "application/x-www-form-urlencoded"
      };
      options.method = "PUT";
    } else if (options.method === "putJSON") {
      options.headers = {
        "Content-Type": "application/json" //方便后台直接序列化对象
      };
      options.method = "PUT";
    }

    options.method = options.method.toUpperCase();

    axios(options)
      .then(response => {
        if (response.code === 0) {
          //成功，返回数据
          options.success(response.data);
        } else {
          //后台捕获到了的异常,返回msg信息
          console.log(response.msg);
        }
      })
      .catch(errResponse => {
        if (errResponse.status === 401) {
          store.commit(types.DO_LOG_OUT);
          router.replace({
            path: "login"
          });
        } else if (errResponse.status === 404) {
          router.replace({
            path: "404"
          });
        } else if (errResponse.status === 500) {
          router.replace({
            path: "500"
          });
        } else {
          console.log("发生后台未捕获的错误 :\n");
          console.log(errResponse);
        }
      });
  },

  doLogin(options) {
    //POST
    this.doRequest("user/login", options);
  },

  schemaDoc(options) {
    this.doRequest("schemaDoc", options);
  },

  map(options) {
    this.doRequest("map", options);
  },

  refactor(options) {
    this.doRequest("refactor", options);
  }
};

export default API;
