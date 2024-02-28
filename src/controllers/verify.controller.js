// import verifyService from "../service/verify.service.js";
// import usersService from "../service/users.service.js";
import jwt from 'jsonwebtoken';
// import emailSender from '../../middleware/nodemailer.middleware.js'
// import usersRepository from "../repository/users.repository.js";

export class VerifyController {
    constructor(usersService, emailSender, usersRepository, verifyService) {
        this.usersService = usersService;
        this.emailSender = emailSender;
        this.usersRepository = usersRepository;
        this.verifyService = verifyService
    }
    sendVerifyEmail = async (req, res) => {
        const { email } = req.body;

        // try {
        const user = await this.usersService.findUser(email);
        if (!user) {
            return res.status(404).json({ ok: false, msg: '유저를 찾을 수 없습니다..' });
        }
        if (!user.verify) {
            const verifyToken = this.verifyService.createVerifyToken(user.email);
            res.cookie('verification', `Bearer ${verifyToken}`);
            this.emailSender(email, verifyToken);

            return res.json({
                ok: true,
                msg: '이메일 발송 완료.',
                token: verifyToken,
            });
        } else {
            return res.status(400).json({ ok: false, msg: '이 이메일은 이미 인증되었습니다.' });
        }
        // } catch (error) {
        //     console.error('Error sending verification email:', error);
        //     res.status(500).json({ ok: false, msg: 'Internal server error.' });
        // }
    }

    verifyEmail = async (req, res) => {
        const email = req.query.email;
        const token = req.query.token;
        // try {
        const decodedToken = jwt.verify(token, process.env.VERIFY_TOKEN_KEY);
        if (decodedToken.email === email) {
            const data = {
                verify: true
            }
            const updatedVerify = await this.usersRepository.updateUserByEmail(email, data);

            return res.status(200).json({
                message: '이메일 인가 완료.',
                user: updatedVerify,
            });
        } else {
            res.status(400).send('잘못된 이메일 또는 토큰');
        }
        // } catch (error) {
        //     console.error('Token authentication error:', error);
        //     res.status(500).send('Token authentication error.');
        // }
    }
}
