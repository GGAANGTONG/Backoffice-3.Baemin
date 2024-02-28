export class OrdersController {
  constructor(ordersService) {
    this.ordersService = ordersService;
  }
  getAllOrders = async (req, res, next) => {
    try {
      const user = res.locals.user;

      if (user.role !== '식당 주인') {
        return res.status(400).json({ errorMessage: '접근 권한이 없습니다.' });
      }

      const storeId = await this.ordersService.findStoreId(user.email);

      if (!storeId) {
        return res
          .status(404)
          .json({ errorMessage: '계정으로 등록된 가게가 없습니다.' });
      }

      const orders = await this.ordersService.getAllOrders(storeId);

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
      const user = res.locals.user;

      if (user.role !== '식당 주인') {
        return res.status(400).json({ errorMessage: '접근 권한이 없습니다.' });
      }

      const { orderId } = req.params;
      const order = await this.ordersService.getOrderById(orderId);

      if (!order) {
        return res.status(404).json({ errorMessage: '해당 주문이 없습니다.' });
      }

      const storeId = await this.ordersService.findStoreId(user.email);

      if (storeId !== order.storeId) {
        return res
          .status(400)
          .json({ errorMessage: '해당 가게의 주문이 아닙니다.' });
      }

      return res.status(200).json({ data: order });
    } catch (error) {
      next(error);
    }
  };

  updateOrder = async (req, res, next) => {
    try {
      const user = res.locals.user;

      if (user.role !== '식당 주인') {
        return res.status(400).json({ errorMessage: '접근 권한이 없습니다.' });
      }

      const { orderId } = req.params;
      const { status } = req.body;

      if (!status) {
        return res
          .status(400)
          .json({ errorMessage: '변경할 상태가 입력되지 않았습니다.' });
      }

      const order = await this.ordersService.getOrderById(orderId);

      if (!order) {
        return res
          .status(404)
          .json({ errorMessage: '해당 주문이 존재하지 않습니다.' });
      }

      const storeId = await this.ordersService.findStoreId(user.email);

      if (storeId !== order.storeId) {
        return res
          .status(400)
          .json({ errorMessage: '해당 가게의 주문이 아닙니다.' });
      }

      if (order.status === '배달 완료') {
        return res.status(400).json('이미 배달이 완료된 주문입니다.');
      }

      if (status === '배달 완료') {
        const resultPoint = await this.ordersService.completeOrder(
          orderId,
          user.userId
        );

        await this.ordersService.updateOrder(orderId, status);

        return res.status(200).json({
          message: `성공적으로 배달 완료 처리되었습니다. 현재 포인트: ${resultPoint}`,
        });
      }

      const updatedOrder = await this.ordersService.updateOrder(
        orderId,
        status
      );

      return res.status(200).json({
        data: updatedOrder,
        message: '상태가 성공적으로 변경되었습니다.',
      });
    } catch (error) {
      next(error);
    }
  };
}
