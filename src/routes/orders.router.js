import express from 'express';
import authMiddleware from '../middlewares/auth.middleware.js';
import { dataSource } from '../typeorm/index.js';
import { OrdersController } from '../controllers/orders.controller.js';
import { OrdersRepository } from '../repositories/orders.repository.js';
import { OrdersService } from '../services/orders.service.js';

const router = express.Router();

const ordersRepository = new OrdersRepository(dataSource);
const ordersService = new OrdersService(ordersRepository);
const ordersController = new OrdersController(ordersService);

router.get('/', authMiddleware, (req, res) =>
  ordersController.getAllOrders(req, res)
);
router.get('/:orderId', authMiddleware, (req, res) =>
  ordersController.getOrderById(req, res)
);
router.patch('/:orderId', authMiddleware, (req, res) =>
  ordersController.updateOrder(req, res)
);

export default router;
