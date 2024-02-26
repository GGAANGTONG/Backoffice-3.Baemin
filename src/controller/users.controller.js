import { Code } from "typeorm";
import usersService from "../service/users.service.js";

class UsersController {
    signUp = async (req, res, next) => {
        // ORM인 Prisma에서 Posts 모델의 create 메서드를 사용해 데이터를 요청합니다.
        try {
            const { email, kakao, password, passwordCheck, name, role, address } = req.body;
            if (role && !['회원', '식당 주인', '관리자'].includes(role)) {
                return res.status(400).json({ success: false, message: '역할이 잘못되었습니다.' })
            }
            if (!kakao) {
                if (!email || !password || !passwordCheck) {
                    return res.status(400).json({ success: false, message: '필수값이 누락되었습니다.' })
                }
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (email && !emailRegex.test(email)) {
                    return res.status(400).json({ success: false, message: '이메일 형식에 맞지 않습니다.' });
                }

                if (password !== passwordCheck) {
                    return res.status(400).json({ success: false, message: '비밀번호와 비밀번호 확인이 일치하지 않습니다.' })
                }
                if (password.length < 6) {
                    return res.status(400).json({ success: false, message: '비밀번호는 여섯자리 이상입니다.' })
                }
            }
            if (!name || !role) {
                return res.status(400).json({ success: false, message: '필수값이 누락되었습니다.' })
            }

            await usersService.signUp({
                email,
                kakao,
                password,
                name,
                role,
                address
            })
            return res.status(200).json({
                email,
                name,
                role,
            })
        } catch (err) {
            return res.status(404).json(err)
        }
    }

    signIn = async (req, res) => {
        try {
            console.log('c1111')
            const { email, kakao, password } = req.body;
            console.log('c2222')
            const token = await usersService.signIn({ email, kakao, password })
            console.log('c3333')
            return res.json(token);
        } catch (err) {
            return res.status(404).json(err)
        }
    }

    getInfo = async (req, res) => {
        try {
            const user = res.locals.user;

            return res.json({
                email: user.email,
                name: user.name,
            })
        } catch (err) {
            return res.status(err.code).json(err)
        }
    }

    verify = async (req, res) => {
        try {
            const { email } = req.body();
            await usersService.verify(email);
        } catch (err) {
            return res.status(err.code).json(err)
        }
    }

}

const usersController = new UsersController();
export default usersController;