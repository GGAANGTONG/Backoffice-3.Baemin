import jwtwebToken from 'jsonwebtoken';
import usersRepository from '../repository/users.repository.js';
import { redisCache } from '../redis/index.js';
import dotenv from 'dotenv'

dotenv.config();
class AuthService {
    verifyAccessToken = async (accessToken) => {
        const token = jwtwebToken.verify(accessToken, 'resume@#');
        if (!token.userId) {
            throw new Error('인증 정보가 올바르지 않습니다.');
        }
        const user = await usersRepository.findOneUserByUserId(token.userId);

        if (!user) {
            throw new Error('인증 정보가 올바르지 않습니다.');
        }
        return user;
    }

    verifyFreshToken = async (refreshToken) => {
        const token = jwtwebToken.verify(refreshToken, 'resume&%*');
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
        const user = await usersRepository.findOneUserByUserId(token.userId);
        if (!user) {
            throw {
                code: 401,
                message: '토큰 정보가 올바르지 않습니다.'
            }
        }

        const newAccessToken = jwtwebToken.sign({ userId: user.userId }, process.env.ACCESS_TOKEN_KEY, { expiresIn: '12h' });
        const newRefreshToken = jwtwebToken.sign({ userId: user.userId }, process.env.REFRESH_TOKEN_KEY, { expiresIn: '7d' });

        return {
            accessToken: newAccessToken,
            refreshToken: newRefreshToken,
        }
    }
}

const authService = new AuthService();
export default authService;