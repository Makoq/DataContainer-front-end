import * as types from "@/store/mutation-types";
const state = {
  user: {
    username: "",
    token: ""
  }
};

const getters = {
  getUserName: state => {
    return state.user.username;
  },
  getToken: state => {
    return state.user.token;
  }
};

//异步操作 dispatch action
//解构获取commit和state
const actions = {
  doLogIn({ commit }, user) {
    commit(types.DO_LOG_IN, user);
  },
  doLogOut({ commit }) {
    commit(types.DO_LOG_OUT);
  }
};

//同步动作
//state的更改必须在mutations里面
const mutations = {
  [types.DO_LOG_IN](state, user) {
    state.user = user;
    window.localStorage.setItem("token", user.token);
    window.localStorage.setItem("username", user.username);
  },
  [types.DO_LOG_OUT](state) {
    state.user = {
      username: "",
      token: ""
    };
    window.localStorage.removeItem("token");
    window.localStorage.removeItem("username");
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
