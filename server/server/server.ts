import express from 'express';
import * as db from './mariaDB'
var bodyParser = require('body-parser')




const app = express();
const router = require("./router/router");
const users = require("./router/users");


db.init()
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())
app.use("/:table", users);

const port: number = 5000;
app.listen(port, () => console.log(`${port}`));