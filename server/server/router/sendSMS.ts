// sendemail.ts

import * as express from "express";
import {Request, Response} from "express";
const router = express.Router();

import axios from 'axios';
import { mailOptions, transporter } from "../src/mail/nodemailer";
import { IContactForm } from "../src/mail/type/email";



router.post("",  async function(req: Request, res: Response) {

    const param = {
        "key" :  "7b035420e12cc0e8ec83b7540f668cfe"
        ,"tel" : "01050348381"
        ,"cd" : "01090293089"
        ,"msg" : "테스트 메시지"
        ,"title" : "테스트 제목"
    }

    try {
        const response = await axios.post('http://211.172.232.124:9201', param);
        res.status(response.status).send(response.data);
    } catch (error) {
        res.status(500).send(error.response ? error.response.data : error.message);
    }



});

module.exports = router;