const { createProxyMiddleware } = require("http-proxy-middleware");


module.exports = function (app) {
    app.use("/api" ,
        createProxyMiddleware({
            target: "http://localhost:6000", //운영
            pathRewrite: { '^/api': '' },
            changeOrigin: true,
        })
    );
};
