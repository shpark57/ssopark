// sendemail.ts

import * as express from "express";
import {Request, Response} from "express";
const router = express.Router();

import axios from 'axios';
import { mailOptions, transporter } from "../src/mail/nodemailer";
import { IContactForm } from "../src/mail/type/email";



router.post("",  async function(req: Request, res: Response) {

    const param = {
        "key" :     req.body.key
        ,"tel" :    req.body.tel
        ,"cd" :     req.body.cd
        ,"msg" :    req.body.msg
        ,"title" :  req.body.title
    }


    try {
        const response = await axios.post('http://211.172.232.124:9201', param);
        res.status(response.status).send(response.data);
    } catch (error) {
        res.status(500).send(error.response ? error.response.data : error.message);
    }



});

module.exports = router;