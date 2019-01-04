module.exports = {
  devServer: {
    host: "0.0.0.0",
    port: 8080,
    proxy: {
      "/api": {
        target: "http://223.2.38.118:8081/",
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          "^/api": ""
        }
      },
      "/download": {
        target: "http://223.2.38.118:8081/",
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          "^/download": ""
        }
      }
    }
  }
};
