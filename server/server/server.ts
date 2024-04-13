import express from 'express';
import * as db from './mariaDB'

var createError = require('http-errors');
var logger = require('morgan');


var bodyParser = require('body-parser')
const app = express();
const router = require("./router/router");
const file = require("./router/file")


app.use(logger('dev'));
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json({limit: '100mb'}))
app.use("/fileService", file);
app.use("/:table", router);




// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});
// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});


const port: number = 6000;
app.listen(port, () => console.log(`${port}`));
