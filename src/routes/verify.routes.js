import express from 'express';
import { redisCache } from '../redis/index.js';
import { dataSource } from '../typeorm/index.js';
import { UsersService } from '../services/users.service.js';
import emailSender from '../../middleware/nodemailer.middleware.js';
import { UsersRepository } from '../repositories/users.repository.js';
import { VerifyService } from '../services/verify.service.js';
import { VerifyController } from '../controllers/verify.controller.js';

const router = express.Router();

const usersRepository = new UsersRepository(dataSource);
const usersService = new UsersService(usersRepository, redisCache);
const verifyService = new VerifyService();
const verifyController = new VerifyController(
  usersService,
  emailSender,
  usersRepository,
  verifyService
);

router.post('/email', verifyController.sendVerifyEmail);
router.get('/verify', verifyController.verifyEmail);

export default router;
