const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
    app.use(
        createProxyMiddleware("/api", {
            //target: "http://localhost:8081",
            target: "http://shpark91.synology.me:8081",
            changeOrigin: true,
        })
    );
};