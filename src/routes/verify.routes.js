import express from 'express';
import { getRepository } from 'typeorm';
import jwt from 'jsonwebtoken';
import { User } from '../entities/User'; // Assuming you have a User entity defined

const router = express.Router();

router.get('/auth', async (req, res) => {
    const email = req.query.email;
    const token = req.query.token;

    try {
        const userRepository = getRepository(User);
        const user = await userRepository.findOne({ where: { email } });

        if (!user) {
            return res.status(400).send('User not found.');
        }

        const decodedToken = jwt.verify(token, process.env.CUSTOM_SECRET_KEY);

        if (decodedToken.email === email) {
            user.isVerified = true;
            const updatedUser = await userRepository.save(user);

            return res.status(200).json({
                message: 'Email authentication process completed.',
                user: updatedUser,
            });
        } else {
            res.status(400).send('Inappropriate email or token.');
        }
    } catch (error) {
        console.error('Token authentication error:', error);
        res.status(500).send('Token authentication error.');
    }
});

export default router;