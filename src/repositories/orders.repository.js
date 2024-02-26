import { dataSource } from '../typeorm/index.js';
import { Orders } from '../typeorm/entities/orders.entity.js';
import { Users } from '../typeorm/entities/users.entity.js';
import { Restaurant } from '../typeorm/entities/restaurant.entity.js';

class OrdersRepository {
  ordersRepository = dataSource.getRepository(Orders);

  findStoreId = async (email) => {
    const restaurant = await dataSource
      .getRepository(Restaurant)
      .findOne({ where: { email: email } });
    if (restaurant) {
      return restaurant.storeId;
    } else {
      return null;
    }
  };

  getAllOrders = async (storeId) => {
    return await this.ordersRepository.find({ where: { storeId: storeId } });
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
