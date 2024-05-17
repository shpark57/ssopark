// sendemail.ts

import * as express from "express";
import { Request, Response } from "express";
const router = express.Router();
const net = require('net');
import { Buffer } from 'buffer';
import iconv from 'iconv-lite';

interface SMSParams {
    key: string;
    tel: string[];
    cb: string;
    msg: string;
    title: string;
    count: number;
}

router.post("", async function (req: Request, res: Response) {
    const param: SMSParams = {
        key: req.body.key,
        tel: [req.body.tel],  // tel을 배열로 감싸줍니다.
        cb: req.body.cb,
        msg: req.body.msg,
        title: req.body.title,
        count: Number(req.body.count),  // count를 숫자로 변환합니다.
    };

    try {
        const result = await sendMsg(param);
        res.send(result);
    } catch (error) {
        res.status(500).send(error.response ? error.response.data : error.message);
    }
});

// Helper function to truncate string to a specified byte length
function subString(str: string, start: number, end: number): string {
    return str.slice(start, end);
}

function sendAndReceiveSocketData(client: any, data: Buffer, timeout: number = 5000): Promise<Buffer> {
    return new Promise((resolve, reject) => {
        let buffer = Buffer.alloc(0);

        console.log(`Sending data: ${data.toString('hex')}`);
        client.write(data);

        const timer = setTimeout(() => {
            reject(new Error('Socket timeout'));
        }, timeout);

        client.on('data', (chunk: Buffer) => {
            buffer = Buffer.concat([buffer, chunk]);
            if (buffer.length >= 6) {
                let msgType = buffer.slice(0, 2).toString();
                let sLen = buffer.slice(2, 6).toString().trim();
                let nLen = parseInt(sLen, 10);

                if (buffer.length >= 6 + nLen) {
                    clearTimeout(timer);
                    resolve(buffer.slice(0, 6 + nLen));
                }
            }
        });

        client.on('error', (err: Error) => {
            clearTimeout(timer);
            reject(err);
        });

        client.on('close', () => {
            clearTimeout(timer);
            reject(new Error('Socket closed'));
        });
    });
}

async function sendMsg(params: SMSParams): Promise<string> {
    let { key, tel, cb, msg, title, count } = params;
    let msgid = "";

    msg = msg.replace(/\r\n/g, "\n"); // 엔터값 1자리로 변경
    msg = subString(msg, 0, 2000);

    // `euc-kr` 인코딩으로 메시지의 길이를 계산
    let msgEucKr = iconv.encode(msg, 'euc-kr');
    if (msgEucKr.length <= 90) {
        title = ""; // SMS 발송으로 판단되면 제목을 제거한다
    } else {
        title = title.replace(/\r\n/g, " "); // 엔터값 공백으로 변경
        title = subString(title, 0, 30);
    }

    const client = new net.Socket();

    await new Promise<void>((resolve, reject) => {
        client.connect(9201, '211.172.232.124', () => { // Replace with actual port and host
            console.log('Socket connected');
            resolve();
        });

        client.on('error', (err: Error) => {
            console.error('Socket connection error:', err);
            reject(err);
        });

        client.on('close', () => {
            console.log('Socket closed');
            reject(new Error('Socket closed'));
        });
    });

    try {
        for (let k = 0; k < count; k++) {
            // JSON 패킷 생성
            let json = {
                key: key,
                tel: tel[k],
                cb: cb,
                msg: msg,
                title: title
            };

            let jsonStr = JSON.stringify(json);
            let jsonEucKr = iconv.encode(jsonStr, 'euc-kr');
            let lenJson = jsonEucKr.length;  // Buffer의 길이 직접 사용
            let lenJsonStr = String(lenJson).padStart(4, '0');
            let packet = Buffer.concat([Buffer.from('06'), Buffer.from(lenJsonStr), jsonEucKr]);

            // 소켓으로 데이터 전송
            console.log(`Sending message to ${tel[k]}: ${jsonStr}`);
            let response = await sendAndReceiveSocketData(client, packet);

            console.log('Response received:', response.toString('hex'));
            let msgType = response.slice(0, 2).toString();
            let sLen = response.slice(2, 6).toString().trim();
            let nLen = parseInt(sLen, 10);
            let resultData = iconv.decode(response.slice(6, 6 + nLen), 'euc-kr');

            if (msgType === '02') {
                if (resultData.substring(0, 2) === '00')
                    msgid += "발송완료: ";
                else
                    msgid += "발송실패: ";
                msgid += resultData + "\n";
            }
        }
    } catch (err) {
        console.error('Error during message sending:', err);
    } finally {
        client.end();
        console.log('Socket connection closed');
    }

    return msgid.trim();
}

module.exports = router;
