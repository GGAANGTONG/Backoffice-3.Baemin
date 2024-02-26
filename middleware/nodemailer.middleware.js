import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const { NODEMAILER_USER, NODEMAILER_PASSWORD } = process.env;

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: NODEMAILER_USER,
        pass: NODEMAILER_PASSWORD,
    },
});

export default function emailSender(toEmail, Token) {
    const mailOptions = {
        from: NODEMAILER_USER,
        to: toEmail,
        subject: '우리동네 동아리(우동) 회원가입 인증',
        html: `<p>아래의 주소를 클릭하여 이메일을 인증해 주세요 : </p>
        <p> <a href="http://localhost:3000/api/auth?email=${toEmail}&token=${Token}">인증하기</a></p>`,
    };
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error(error);
        } else {
            console.log('Email Sent : ', info);
        }
    });
}
