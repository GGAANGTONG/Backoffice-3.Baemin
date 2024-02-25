import { dataSource } from '../typeorm/index';
import { Orders } from '../typeorm/entities/orders.entity';
import { Users } from '../typeorm/entities/users.entity';

class OrdersRepository {
  ordersRepository = dataSource.getRepository(Orders);

  getAllOrders = async () => {
    return await this.ordersRepository.find();
  };

  getOrderById = async (orderId) => {
    return await this.ordersRepository.findOne({
      where: { orderId: orderId },
    });
  };

  updateOrder = async (orderId, status) => {
    const order = await this.ordersRepository.findOne({
      where: { orderId: orderId },
    });
    order.status = status;
    await this.ordersRepository.save(order);
    return order;
  };

  completeOrder = async (orderId, userId) => {
    const order = await this.ordersRepository.findOne({
      where: { orderId: orderId },
    });
    const user = await dataSource.getRepository(Users).findOne({
      where: { userId: userId },
    });
    user.point += order.totalPrice;
    await dataSource.getRepository(Users).save(user);
  };
}

export default OrdersRepository;
