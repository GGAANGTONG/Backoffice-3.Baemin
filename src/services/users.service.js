import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
// import usersRepository from '../repository/users.repository.js';
import dotenv from 'dotenv';

dotenv.config();
export class UsersService {
    constructor(usersRepository, redisCache) {
        //  this.생성된 인스턴스 = 설계도
        this.usersRepository = usersRepository;
        this.redisCache = redisCache;
    }
    signUp = async (data) => {
        const { email, kakao, password, name, role, address } = data;
        if (kakao) {
            const isExist = await this.usersRepository.findUserByKakao(kakao)
            if (isExist) {
                throw {
                    code: 400,
                    message: '이미 회원가입을 완료한 유저입니다.'
                }
            }
            if (role === '회원') {
                await this.usersRepository.createUser({
                    email,
                    kakao: email,
                    name,
                    role,
                    address,
                    point: 1000000
                })
            } else {
                await this.usersRepository.createUser({
                    email,
                    kakao: email,
                    name,
                    role,
                    address,
                })
            }

        } else {
            const isExist = await this.usersRepository.findUserByEmail(email);
            if (isExist) {
                throw {
                    code: 400,
                    message: '이미 회원가입을 완료한 유저입니다.'
                }
            } else {
                const hashedPassword = await bcrypt.hash(password, 10);
                if (role === '회원') {
                    await this.usersRepository.createUser({
                        email,
                        password: hashedPassword,
                        name,
                        role,
                        address,
                        point: 1000000
                    })
                } else {
                    await this.usersRepository.createUser({
                        email,
                        password: hashedPassword,
                        name,
                        role,
                        address
                    });
                }

            }
        }
    }

    signIn = async ({ kakao, email, password }) => {
        let user;
        if (kakao) {
            // 카카오 로그인
            user = await this.usersRepository.findUserByKakao(kakao);

            if (!user) {
                throw {
                    code: 401,
                    message: '올바르지 않은 로그인 정보입니다.'
                }
            }
        } else {
            if (!email) {
                throw {
                    code: 400,
                    message: '이메일은 필수값입니다.'
                }
            }
            if (!password) {
                return {
                    code: 400,
                    message: '비밀번호는 필수값입니다.'
                };
            }
            user = await this.usersRepository.findUserByEmail(email)
            const validPassword = await bcrypt.compare(password, user.password);
            if (!validPassword) {
                throw {
                    code: 401,
                    message: '비밀번호 오류.'
                }
            }
            if (!user) {
                throw {
                    code: 401,
                    message: '올바르지 않은 로그인 정보입니다.'
                }
            }
        }
        // 로그인 성공
        const accessToken = jwt.sign({ userId: user.userId }, process.env.ACCESS_TOKEN_KEY, { expiresIn: '12h' })
        const refreshToken = jwt.sign({ userId: user.userId }, process.env.REFRESH_TOKEN_KEY, { expiresIn: '7d' });

        await this.redisCache.set(user.userId, refreshToken);
        // const redisToken = await redisCache.get(user.userId);
        // console.log('redis는 잘 살아있는가? : ', redisToken)
        return {
            accessToken,
            refreshToken,
        }
    }

    findUser = async (email, kakao) => {
        if (email) {
            const user = await usersRepository.findUserByEmail(email)
            return user
        } else {
            const user = await usersRepository.findUserByKakao(kakao)
            return user
        }
    }

    deleteUser = async (userId) => {
        try {
            await usersRepository.deleteUser(userId);
            return { success: true, message: '사용자가 성공적으로 삭제되었습니다.' };
        } catch (error) {
            console.error('사용자 삭제 오류:', error);
            return { success: false, message: '사용자 삭제 중 오류가 발생했습니다.' };
        }
    }
}
