import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export function createVerifyToken(email) {
    try {
        const verifyToken = jwt.sign({ email }, process.env.VERIFY_TOKEN_KEY, {
            expiresIn: '3m',
        });
        return verifyToken;
    } catch (error) {
        throw new Error('토큰 생성 에러.' + error.message);
    }
}