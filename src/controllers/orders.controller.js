import OrdersService from '../services/orders.service.js';

class OrdersController {
  getAllOrders = async (req, res, next) => {
    try {
      const user = req.user;

      if (user.role !== 'owner') {
        return res.status(400).json({ errorMessage: '접근 권한이 없습니다.' });
      }

      const orders = await OrdersService.getAllOrders();

      if (!orders.length) {
        return res.status(404).json({ errorMessage: '주문이 없습니다.' });
      }

      return res.status(200).json({ data: orders });
    } catch (error) {
      next(error);
    }
  };

  getOrderById = async (req, res, next) => {
    try {
      const user = req.user;

      if (user.role !== 'owner') {
        return res.status(400).json({ errorMessage: '접근 권한이 없습니다.' });
      }

      const { orderId } = req.params;
      const order = await OrdersService.getOrderById(orderId);

      if (!order) {
        return res.status(404).json({ errorMessage: '해당 주문이 없습니다.' });
      }

      return res.status(200).json({ data: order });
    } catch (error) {
      next(error);
    }
  };

  updateOrder = async (req, res, next) => {
    try {
      const user = req.user;

      if (user.role !== 'owner') {
        return res.status(400).json({ errorMessage: '접근 권한이 없습니다.' });
      }

      const { orderId } = req.params;
      const { status } = req.body;

      const order = await OrdersService.getOrderById(orderId);

      if (!order) {
        return res
          .status(404)
          .json({ errorMessage: '해당 주문이 존재하지 않습니다.' });
      }
      if (order.status === '배달 완료')
        if (!status) {
          return res
            .status(400)
            .json({ errorMessage: '이미 배달이 완료된 주문입니다.' });
        }

      const updatedOrder = await OrdersService.updateOrder(orderId, status);

      if (updatedOrder.status === '배달 완료') {
        await OrdersService.completeOrder(orderId, user.userId);
      }

      return res
        .status(200)
        .json({ data: updatedOrder, message: '성공적으로 변경되었습니다.' });
    } catch (error) {
      next(error);
    }
  };
}

export default OrdersController;
