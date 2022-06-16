
import * as express from "express";
import {Request, Response} from "express";
const router = express.Router();
import {createConnection , IsNull  , Not, MoreThan, Equal , LessThanOrEqual  , MoreThanOrEqual , } from "typeorm";

import {Users} from "../src/entity/Users";

import crypto from 'crypto'


createConnection().then(connection => {

    const usersRepository = connection.getRepository(Users)

    router.post("/check", async function(req: Request, res: Response) {
        // /테이블명/1 의 형태의 url은 이곳으로 온다.

        let user_id = req.body.user_id
        let password = req.body.password

        usersRepository.findOneBy({user_id : user_id})
        .then((response) => {
            const salt = response.salt 
            password = crypto.pbkdf2Sync(password, salt, 1, 32, 'sha512').toString('hex');
        }).then((response) => {
            usersRepository.findOneBy({user_id : user_id , password : password})
            .then((response) => {
                if(response){
                    let params = {
                        check : true,
                        id : response.id,
                        user_id : response.user_id,
                        user_name : response.user_name,
                        avatar : response.avatar,
                        email : response.email,
                        phone_number : response.phone_number
                    }
                    res.send(params);
                }else{
                    let params = {
                        check : false,
                        id : 0,
                        user_id : '',
                        user_name : '',
                        avatar : '',
                        email : '',
                        phone_number : ''
                    }
                    res.send(params);
                }
            })
        }) .catch(err => {
            console.log(`query error : ${err}`);
            res.status(500).send(err);
        });
    });


    router.patch("/change/:id", async function(req: Request, res: Response) {
        // /테이블명/1 의 형태의 url은 이곳으로 온다.

        req.body['id'] = Number(req.params.id)
        const salt = crypto.randomBytes(32).toString('hex');
        req.body['salt'] = salt
        req.body['password'] = crypto.pbkdf2Sync(req.body.password, salt, 1, 32, 'sha512').toString('hex');
        const response = await usersRepository.save(req.body)
        .then(response => {
            console.log(response)
            res.send(response);
        })
        .catch(err => {
            console.log(`query error : ${err}`);
            res.status(500).send(err);
        });
    });


}).catch(error => console.log("TypeORM connection error: ", error));

module.exports = router;