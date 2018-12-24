import Vue from "vue";
import Router from "vue-router";
import store from "@/store/index";
import { routes } from "@/router/routes";

Vue.use(Router);

// 页面刷新时，重新赋值token
if (localStorage.getItem("token")) {
  store.dispatch("doLogIn", {
    username: localStorage.getItem("username"),
    token: localStorage.getItem("token")
  });
}

const router = new Router({
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(r => r.meta.requireAuth)) {
    if (localStorage.getItem("username") && to.name !== "login") {
      next();
    } else {
      next({
        name: "login",
        query: {
          redirect: to.fullPath
        }
      });
    }
  } else {
    next();
  }
});

export default router;
