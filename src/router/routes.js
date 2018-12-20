
export const page404 = {
  path: '/404',
  name: 'error-404',
  meta: {
    title: '404-页面不存在'
  },
  component: () => import("@/views/error-page/404.vue")
};


export const page500 = {
  path: '/500',
  meta: {
    title: '500-服务端错误'
  },
  name: 'error-500',
  component: () => import("@/views/error-page/500.vue")
};



export const home={
  path: "/",
  name: "home",
  component: ()=>import( /* webpackChunkName: "about" */ "@/views/Home.vue")
}


export const about=
{
  meta: {
    requireAuth: true
  },
  path: "/about",
  name: "about",
  // route level code-splitting
  // this generates a separate chunk (about.[hash].js) for this route
  // which is lazy-loaded when the route is visited.
  component: () =>import( /* webpackChunkName: "about" */ "@/views/About.vue")
}

export const routes = [
  home,
  about,
  page500,
  page404,
]



