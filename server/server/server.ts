import express from 'express';
import * as db from './mariaDB' 
var bodyParser = require('body-parser')
const app = express();

const router = require("./router/router");
//const password = require("./router/password");
//const query = require("./router/query");


app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())
//app.use("/query", query);
app.use("/:table", router);
//app.use("/password", password);

const port: number = 5000;
app.listen(port, () => console.log(`${port}`));