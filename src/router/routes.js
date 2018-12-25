export const page404 = {
  path: "/*",
  name: "error-404",
  meta: {
    title: "404-页面不存在"
  },
  component: () => import("@/views/error-page/404")
};

export const page500 = {
  path: "/500",
  meta: {
    title: "500-服务端错误"
  },
  name: "error-500",
  component: () => import("@/views/error-page/500")
};

export const home = {
  path: "/",
  name: "home",
  component: () => import(/* webpackChunkName: "about" */ "@/views/Home")
};

export const about = {
  meta: {
    requireAuth: true
  },
  path: "/about",
  name: "about",
  // route level code-splitting
  // this generates a separate chunk (about.[hash].js) for this route
  // which is lazy-loaded when the route is visited.
  component: () => import(/* webpackChunkName: "about" */ "@/views/About")
};

export const schema = {
  path: "/schema/:id",
  component: () => import("@/views/schema/Schema"),
  children: [
    {
      path: "detail",
      component: () => import("@/components/schema/SchemaDetail")
    }
  ]
};

export const schemas = {
  path: "/schema",
  component: () => import("@/views/schema/SchemaList")
};

export const refactors = {
  path: "/refactor",
  component: () => import("@/views/refactor/RefactorList")
};

export const refactor = {
  path: "/refactor/:id",
  component: () => import("@/views/refactor/Refactor"),
  children: [
    {
      path: "detail",
      component: () => import("@/components/refactor/RefactorDetail")
    }
  ]
};

export const maps = {
  path: "/map",
  component: () => import("@/views/map/MapList")
};

export const map = {
  path: "/map/:id",
  component: () => import("@/views/map/Map"),
  children: [
    {
      path: "detail",
      component: () => import("@/components/map/MapDetail")
    }
  ]
};

export const routes = [
  home,
  about,
  schemas,
  refactors,
  maps,
  schema,
  refactor,
  map,
  page500,
  page404
];
