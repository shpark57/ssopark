// sendemail.ts

import * as express from "express";
import { Request, Response } from "express";
const router = express.Router();
const net = require('net');
import axios from 'axios';
import { mailOptions, transporter } from "../src/mail/nodemailer";
import { IContactForm } from "../src/mail/type/email";

interface SMSParams {
    key: string;
    tel: string[];
    cb: string;
    msg: string;
    title: string;
    date: string;
    count: number;
}

router.post("", async function (req: Request, res: Response) {
    const param: SMSParams = {
        key: req.body.key,
        tel: req.body.tel,
        cb: req.body.cb,
        msg: req.body.msg,
        title: req.body.title,
        date: req.body.date,
        count: req.body.count,
    };

    try {
        const result = await sendMsg(param);
        res.send(result);
    } catch (error) {
        res.status(500).send(error.response ? error.response.data : error.message);
    }
});

function byteLength(str: string): number {
    return Buffer.byteLength(str, 'utf8');
}

// Helper function to truncate string to a specified byte length
function subString(str: string, start: number, end: number): string {
    return str.slice(start, end);
}

// Helper function to encode the JSON string
function encode(str: string): string {
    return Buffer.from(str).toString('base64'); // Example encoding
}

function sendSocketData(client: any, data: string): Promise<Buffer> {
    return new Promise((resolve, reject) => {
        let buffer = Buffer.alloc(0);

        client.write(data);

        client.on('data', (chunk: Buffer) => {
        buffer = Buffer.concat([buffer, chunk]);
        if (buffer.length >= 6) {
        let msgType = buffer.slice(0, 2).toString();
        let sLen = buffer.slice(2, 6).toString().trim();
        let nLen = parseInt(sLen, 10);

        if (buffer.length >= 6 + nLen) {
            resolve(buffer.slice(0, 6 + nLen));
        }
    }
});

    client.on('error', (err: Error) => {
        reject(err);
    });
});
}

async function sendMsg(params: SMSParams): Promise<string> {
    let { key, tel, cb, msg, title, date, count } = params;
    let msgid = "";

    msg = msg.replace(/\r\n/g, "\n"); // 엔터값 1자리로 변경
    msg = subString(msg, 0, 2000);

    if (byteLength(msg) <= 90) {
        title = ""; // SMS 발송으로 판된되면 제목을 제거한다
    } else {
        title = title.replace(/\r\n/g, " "); // 엔터값 공백으로 변경
        title = subString(title, 0, 30);
    }

    // 발송내역 유니코드로 변환
    let jsonB = `{"msg":"${msg.trim()}","title":"${title.trim()}"}`;
    jsonB = encode(jsonB);

    const client = new net.Socket();

    await new Promise<void>((resolve, reject) => {
        client.connect(9201, '211.172.232.124', () => { // Replace with actual port and host
            resolve();
        });

    client.on('error', (err: Error) => {
        reject(err);
    });
});

    try {
        for (let k = 0; k < count; k++) {
            // 나머지 JSON 코드를 생성한다
            let json = `{"key":"${key}","tel":"${tel[k]}","cb":"${cb}","date":"${date}",${jsonB}`;
            let lenJson = String(byteLength(json)).padStart(4, '0');

            // 소켓을 보낸다
            await sendSocketData(client, '06' + lenJson + json);

            // 데이터 수신
            let data = await sendSocketData(client, '');

            let msgType = data.slice(0, 2).toString();
            let sLen = data.slice(2, 6).toString().trim();
            let nLen = parseInt(sLen, 10);
            let resultData = data.slice(6, 6 + nLen).toString();

            if (msgType === '02') {
                //result 의 구조는 성공/실패 2 char, 전화번호 12 char, msgid = 10 char
                if (resultData.substring(0, 2) === '00')
                    msgid += "발송완료: ";
                else
                    msgid += "발송실패: ";
                msgid += resultData + "\n";
            }
        }
    } catch (err) {
        console.error(err);
    } finally {
        client.end();
    }

    return msgid.trim();
}

module.exports = router;