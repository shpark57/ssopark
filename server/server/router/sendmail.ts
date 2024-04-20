// sendemail.ts

import * as express from "express";
import {Request, Response} from "express";
const router = express.Router();

import { mailOptions, transporter } from "../src/mail/nodemailer";
import { IContactForm } from "../src/mail/type/email";



router.post("",  async function(req: Request, res: Response) {
    const data: IContactForm = req.body;
    if (!data || !data.name || !data.email || !data.message) {
        return res.status(400).send({ message: "Bad request" });
    }
    mailOptions.to = data.email
    // transperter 활용해 이메일 전송
    try {
        await transporter.sendMail({
            ...mailOptions,
            ...{
                text: data.message,
            },
            subject: `[승현네] ${data.name}`,
        });

        return res.status(200).json({ success: true });
    } catch (err) {
        console.log(err);
        return res.status(400).json({ message: err.message });
    }

});

module.exports = router;