import express from 'express';
import * as db from './mariaDB'



const app = express();
const router = require("./router/router");
const users = require("./router/users");

db.init()

app.use("/", router);

app.use("/:table", users);

const port: number = 5000;
app.listen(port, () => console.log(`${port}`));