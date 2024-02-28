import express from 'express';
// import usersController from "../controller/users.controller.js"
import jwtValidate from '../../middleware/jwt-validate.middleware.js';
import { redisCache } from '../redis/index.js';
import { dataSource } from '../typeorm/index.js';
import { UsersController } from '../controllers/users.controller.js';
import { UsersService } from '../services/users.service.js';
import { UsersRepository } from '../repositories/users.repository.js';

const router = express.Router();

const usersRepository = new UsersRepository(dataSource);
const usersService = new UsersService(usersRepository, redisCache);
const usersController = new UsersController(usersService);

router.post('/sign-up', usersController.signUp);
router.post('/sign-in', usersController.signIn);
router.get('/get-info', jwtValidate, usersController.getInfo);

export default router;
