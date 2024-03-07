const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
    app.use(
        createProxyMiddleware("/api", {
            target: "http://shpark91.iptime.org:6000", //운영
            changeOrigin: true,
        })
    );
};