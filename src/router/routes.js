export const page404 = {
  path: "/*",
  name: "error-404",
  meta: {
    title: "404-页面不存在"
  },
  component: () => import("@/page/error-page/404")
};

export const page500 = {
  path: "/500",
  meta: {
    title: "500-服务端错误"
  },
  name: "error-500",
  component: () => import("@/page/error-page/500")
};

export const home = {
  path: "/",
  name: "home",
  component: () => import("@/page/HomePage")
};

export const about = {
  path: "/about",
  name: "about",

  component: () => import(/* webpackChunkName: "about" */ "@/page/About")
};

export const schema = {
  path: "/schema/:id",
  component: () => import("@/page/PageSchemaDetail/Schema"),

  children: [
    {
      path: "detail",
      component: () => import("@/page/PageSchemaDetail/SchemaDetail"),
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
          component: () => import("@/components/trees/SchemaTree")
        }
      ]
    }
  ]
};

export const schemas = {
  path: "/schema",
  component: () => import("@/page/PageSchemaDoc/SchemaList"),
  redirect: { path: "/schemaListContent" },
  children: [
    {
      path: "/schemaListContent",
      component: () => import("@/page/PageSchemaDoc/ListContent")
    }
  ]
};

export const refactors = {
  path: "/refactor",
  component: () => import("@/page/PageRefactorList/RefactorList"),
  children: [
    {
      path: "/refactorListContent",
      component: () => import("@/page/PageRefactorList/ListContent")
    }
  ]
};

export const refactor = {
  path: "/refactor/:id",
  component: () => import("@/page/PageRefactorService/Refactor")
};

export const maps = {
  path: "/map",
  component: () => import("@/page/PageMapList/MapList"),

  children: [
    {
      path: "/mapListContent",
      component: () => import("@/page/PageMapList/ListContent")
    }
  ]
};

export const map = {
  path: "/map/:id",
  component: () => import("@/page/PageMapService/Map")
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
