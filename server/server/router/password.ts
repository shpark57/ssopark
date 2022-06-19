
import * as express from "express";
import {Request, Response} from "express";
const router = express.Router();
import {createConnection , IsNull  , Not, MoreThan, Equal , LessThanOrEqual  , MoreThanOrEqual , } from "typeorm";

import {Users} from "../src/entity/Users";

import crypto from 'crypto'


createConnection().then(connection => {

    const usersRepository = connection.getRepository(Users)

   


}).catch(error => console.log("TypeORM connection error: ", error));

module.exports = router;