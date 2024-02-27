import jwt from 'jsonwebtoken';
import usersRepository from '../repository/users.repository.js';
import { redisCache } from '../redis/index.js';
import dotenv from 'dotenv'

dotenv.config();
class AuthService {
    verifyAccessToken = async (accessToken) => {
        console.log(' Token is ', accessToken, process.env.ACCESS_TOKEN_KEY)
        const token = jwt.verify(accessToken, process.env.ACCESS_TOKEN_KEY);
        console.log(token)
        if (!token.userId) {
            throw new Error('인증 정보가 올바르지 않습니다.');
        }
        const user = await usersRepository.findUserByUserId(token.userId);

        if (!user) {
            throw new Error('인증 정보가 올바르지 않습니다.');
        }
        return user;
    }

    verifyFreshToken = async (refreshToken) => {
        const token = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_KEY);
        console.log(token)
        if (!token.userId) {
            throw {
                code: 401,
                message: '토큰 정보가 올바르지 않습니다.'
            }
        }
        const redis = await redisCache.get(`REFRESH_TOKEN:${token.userId}`);
        if (!redis || redis !== refreshToken) {
            throw {
                code: 401,
                message: '토큰 정보가 올바르지 않습니다.'
            }
        }
        const user = await usersRepository.findUserByUserId(token.userId);
        if (!user) {
            throw {
                code: 401,
                message: '토큰 정보가 올바르지 않습니다.'
            }
        }

        const newAccessToken = jwt.sign({ userId: user.userId }, process.env.ACCESS_TOKEN_KEY, { expiresIn: '12h' });
        const newRefreshToken = jwt.sign({ userId: user.userId }, process.env.REFRESH_TOKEN_KEY, { expiresIn: '7d' });

        return {
            accessToken: newAccessToken,
            refreshToken: newRefreshToken,
        }
    }
}

const authService = new AuthService();
export default authService;