import express from 'express';
import authMiddleware from '../middlewares/auth.middleware';
import { OrdersController } from '../controllers/orders.controller';

const router = express.Router;

const ordersController = new OrdersController();

router.get('/orders', authMiddleware, (req, res) =>
  ordersController.getAllOrders(req, res)
);
router.get('/orders/:orderId', authMiddleware, (req, res) =>
  ordersController.getOrderById(req, res)
);
router.patch('/orders/:orderId', authMiddleware, (req, res) =>
  ordersController.updateOrder(req, res)
);

export default router;
