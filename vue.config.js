module.exports = {
  baseUrl: "./",
  devServer: {
    host: "0.0.0.0",
    port: 8080,
    proxy: {
      "/api": {
        target: "http://172.21.212.85:8081/",
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          "^/api": ""
        }
      },
      "/download": {
        target: "http://172.21.212.85:8081/",
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          "^/download": ""
        }
      }
    }
  }
};
