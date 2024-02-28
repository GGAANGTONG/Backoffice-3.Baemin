export class OrdersRepository {
  constructor(dataSource) {
    this.dataSource = dataSource;
  }

  async findStoreId(email) {
    const restaurant = await this.dataSource
      .getRepository('restaurant')
      .findOne({ where: { email: email } });
    if (restaurant) {
      return restaurant.storeId;
    } else {
      return null;
    }
  }

  async getAllOrders(storeId) {
    return await this.dataSource
      .getRepository('orders')
      .find({ where: { storeId: storeId } });
  }

  async getOrderById(orderId) {
    return await this.dataSource.getRepository('orders').findOne({
      where: { orderId: orderId },
    });
  }

  async updateOrder(orderId, status) {
    const order = await this.dataSource.getRepository('orders').findOne({
      where: { orderId: orderId },
    });
    order.status = status;
    await this.dataSource.getRepository('orders').save(order);
    return order;
  }

  async completeOrder(orderId, userId) {
    const order = await this.dataSource.getRepository('orders').findOne({
      where: { orderId: orderId },
    });
    const user = await this.dataSource.getRepository('users').findOne({
      where: { userId: userId },
    });
    user.point += order.totalPrice;
    await this.dataSource.getRepository('users').save(user);
    return user.point;
  }
}
