import bcrypt from 'bcrypt'
import jwtwebToken from 'jsonwebtoken'
import usersRepository from '../repository/users.repository.js';
import dotenv from 'dotenv';
import { redisCache } from '../redis';

dotenv.config();
class UsersService {

    signUp = async (data) => {
        const { email, clientId, password, name, role, address } = data;
        if (clientId) {
            const isExist = await usersRepository.findUserByEmail(clientId)
            if (isExist) {
                throw {
                    code: 400,
                    message: '이미 회원가입을 완료한 유저입니다.'
                }
            }

            await usersRepository.createUser({
                email: clientId,
                clientId,
                name,
                grade,
            })
        } else {
            const isExist = await usersRepository.findUserByEmail(email);
            if (isExist) {
                throw {
                    code: 400,
                    message: '이미 회원가입을 완료한 유저입니다.'
                }
            }

            const hashedPassword = await bcrypt.hash(password, 10);
            await usersRepository.createUser({
                email,
                password: hashedPassword.tostring(),
                name,
                role,
                address
            });
        }
    }

    signIn = async ({ clientId, email, password }) => {
        if (clientId) {
            let user = await usersRepository.findUserByEmail(clientId)
            if (!user) {
                throw {
                    code: 401,
                    message: '올바르지 않은 로그인 정보'
                }
            }
        } else {
            let user = await usersRepository.findUserByEmail(email)
            if (!email) {
                throw {
                    code: 400,
                    message: '이메일은 필수값입니다.'
                }
            }
            if (!password) {
                throw {
                    code: 400,
                    message: '비밀번호는 필수값입니다.'
                }
            }
            const hashedPassword = await bcrypt.hash(password, 10);
            user = await usersRepository.findUserByEmailAndPassword(
                email,
                hashedPassword.toString());

            if (!user) {
                throw {
                    code: 401,
                    message: '올바르지 않은 로그인 정보'
                }
            }
        }

        const accessToken = jwtwebToken.sign({ userId: user.userId }, process.env.ACCESS_TOKEN_KEY, { expiresIn: '12h' })
        const refreshToken = jwtwebToken.sign({ userId: user.userId }, process.env.REFRESH_TOKEN_KEY, { expiresIn: '7d' });

        await redisCache.set(`REFRESH_TOKEN:${user.userId}`, refreshToken);

        return {
            accessToken,
            refreshToken,
        }
    }

    verifyEmail = async (email) => {

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

const usersService = new UsersService();
export default usersService;
