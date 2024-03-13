import express from 'express';
import * as db from './mariaDB' 
var bodyParser = require('body-parser')
const app = express();
const router = require("./router/router");
const file = require("./router/file")
const query = require("./router/query")


app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())
app.use("/fileService", file);
app.use("/query", query);
app.use("/:table", router);


const port: number = 6000;
app.listen(port, () => console.log(`${port}`));