import Vue from "vue";
import Vuex from "vuex";
import user from "@/store/modules/user";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    //
  },
  mutations: {
    //
  },
  actions: {
    //共有的action
  },
  modules: {
    user
  }
});
