import express from 'express';
import authMiddleware from '../middlewares/auth.middleware.js';
import OrdersController from '../controllers/orders.controller.js';

const router = express.Router();

const ordersController = new OrdersController();

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
