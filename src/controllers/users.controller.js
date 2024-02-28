// import usersService from "../service/users.service.js"; // 본체와 단절시킨다.

export class UsersController {
    // 생성자 함수를 통해 usersService의 설계도를 가져옴. -> 생성해서 쓸것이다. 
    constructor(usersService) {
        //  this.생성된 인스턴스 = 설계도
        this.usersService = usersService;
    }
    signUp = async (req, res) => {
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

            await this.usersService.signUp({
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
        // try {
        const { email, kakao, password } = req.body;
        const { accessToken, refreshToken } = await this.usersService.signIn({ email, kakao, password })
        res.cookie('access', `Bearer ${accessToken}`);
        res.cookie('refresh', `Bearer ${refreshToken}`);
        return res.json({ accessToken, refreshToken });

        // } catch (err) {
        //     return res.status(404).json(err)
        // }
    }

    getInfo = async (req, res) => {
        // try {
        const user = res.locals.user;
        console.log(user)

        return res.json({
            email: user.email,
            name: user.name,
        })
        // } catch (err) {
        //     return res.status(err.code).json(err)
        // }
    }

}
