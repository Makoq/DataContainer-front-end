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
  component: () => import("@/views/HomePage")
};

export const about = {
  path: "/about",
  name: "about",

  component: () => import(/* webpackChunkName: "about" */ "@/views/About")
};

export const schema = {
  path: "/schema/:id",
  component: () => import("@/views/schema/Schema"),

  children: [
    {
      path: "detail",
      component: () => import("@/components/schema/SchemaDetail"),
      redirect: { path: "detail/markdown" },
      children: [
        {
          path: "markdown",
          component: () => import("@/components/common/MarkDown")
        },
        {
          path: "table",
          component: () => import("@/components/common/MapAndRefactorTable")
        },
        {
          path: "schematree",
          component: () => import("@/components/schema/SchemaTree")
        }
      ]
    }
  ]
};

export const schemas = {
  path: "/schema",
  component: () => import("@/views/schema/SchemaList"),
  redirect: { path: "/schemaListContent" },
  children: [
    {
      path: "/schemaListContent",
      component: () => import("@/views/schema/ListContent")
    }
  ]
};

export const refactors = {
  path: "/refactor",
  component: () => import("@/views/refactor/RefactorList"),
  children: [
    {
      path: "/refactorListContent",
      component: () => import("@/views/refactor/ListContent")
    }
  ]
};

export const refactor = {
  path: "/refactor/:id",
  component: () => import("@/views/refactor/Refactor")
};

export const maps = {
  path: "/map",
  component: () => import("@/views/map/MapList"),
  children: [
    {
      path: "/mapListContent",
      component: () => import("@/views/map/ListContent")
    }
  ]
};

export const map = {
  path: "/map/:id",
  component: () => import("@/views/map/Map")
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
