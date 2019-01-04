import store from "@/store/index";
import router from "@/router/index";
import axios from "@/axios/index";
import { Message } from "element-ui";

import * as types from "@/store/mutation-types";
import qs from "qs";
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
    options.paramsSerializer = params => {
      return qs.stringify(params, {
        indices: false
      });
    };

    axios(options)
      .then(response => {
        if (response.code !== 0) {
          Message({
            message: response.msg,
            type: "error"
          });
        } else {
          options.success(response.data);
        }
      })
      .catch(error => {
        //失败了，打印具体的错误
        console.log(error);
        if (error.status === 401) {
          Message({
            message: "Unauthorized",
            type: "error"
          });
          store.commit(types.DO_LOG_OUT);
          router.replace({
            path: "login"
          });
        } else if (error.status === 404) {
          Message({
            message: "Not Found",
            type: "error"
          });
          router.replace({
            path: "404"
          });
        } else if (error.status === 500) {
          router.replace({
            path: "500"
          });
        } else {
          //todo
        }
      });
  },

  doLogin(options) {
    this.doRequest("user/login", options);
  },

  schemaDoc(options) {
    this.doRequest("schemaDoc", options);
  },

  schemaDocCount(options) {
    // options.method = options.method.toUpperCase();
    // if (options.method != "GET") {
    //   console.log("该方法只能get请求");
    // } else {

    // }
    this.doRequest("schemaDoc/count", options);
  },

  schemaDocRelated(options) {
    options.method = options.method.toUpperCase();
    if (options.method != "GET") {
      console.log("该方法只能get请求");
    } else {
      this.doRequest("schemaDoc/related", options);
    }
  },

  mapCount(options) {
    // options.method = options.method.toUpperCase();
    // if (options.method != "GET") {
    //   console.log("该方法只能get请求");
    // } else {

    // }
    options.method = "GET";
    this.doRequest("map/count", options);
  },

  map(options) {
    options.method = "GET";
    this.doRequest("map", options);
  },

  refactorCount(options) {
    // options.method = options.method.toUpperCase();
    options.method = "GET";
    if (options.method != "GET") {
      console.log("该方法只能get请求");
    } else {
      this.doRequest("refactor/count", options);
    }
  },

  refactor(options) {
    options.method = "GET";
    if (options.method != "GET") {
      console.log("该方法只能get请求");
    } else {
      this.doRequest("refactor", options);
    }
  },

  blanckRequest(url, options) {
    this.doRequest(url, options);
  },

  download(options) {
    if (options.method != "post") {
      console.log("下载的请求option的method必须为post请求");
    }
    this.doRequest("file/download", options);
  }
};

export default API;
