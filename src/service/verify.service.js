import jwt from 'jsonwebtoken';

import dotenv from 'dotenv';

dotenv.config();

class VerifyService {
    createVerifyToken = (email) => {
        try {
            const verifyToken = jwt.sign({ email }, process.env.VERIFY_TOKEN_KEY, {
                expiresIn: '5m',
            });
            return verifyToken;
        } catch (error) {
            throw new Error('Token creation error.' + error.message);
        }
    }
}

const verifyService = new VerifyService();
export default verifyService;
