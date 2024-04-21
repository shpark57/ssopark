// nodemailer.ts
// 라이브러리 불러오기
import * as nodemailer from "nodemailer";
// 메일 주소 및 앱 비밀번호 선언하기 (gmail)
const email = "p_aver@naver.com";
const pass = "SILV@Rs5ul";


// transporter 생성하기
export const transporter = nodemailer.createTransport({
    service: "naver",
    host : "smtp.naver.com",
    port : "465",
    auth: {
        user: email,
        pass: pass,
    },
});


// 메일 옵션 정하기
export const mailOptions = {
    from: email, // 송신할 이메일
    to: email, // 수신할 이메일
};