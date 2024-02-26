import express from 'express';
import authMiddleware from '../middlewares/auth.middleware.js';
import OrdersController from '../controllers/orders.controller.js';

const router = express.Router();

const ordersController = new OrdersController();

// 테스트용
router.get('/', (req, res) => ordersController.getAllOrders(req, res));
router.get('/:orderId', (req, res) => ordersController.getOrderById(req, res));
router.patch('/:orderId', (req, res) => ordersController.updateOrder(req, res));

// router.get('/', authMiddleware, (req, res) =>
//   ordersController.getAllOrders(req, res)
// );
// router.get('/:orderId', authMiddleware, (req, res) =>
//   ordersController.getOrderById(req, res)
// );
// router.patch('/:orderId', authMiddleware, (req, res) =>
//   ordersController.updateOrder(req, res)
// );

export default router;
