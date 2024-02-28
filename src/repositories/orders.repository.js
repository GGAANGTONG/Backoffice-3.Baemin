export class OrdersRepository {
  constructor(dataSource) {
    this.dataSource = dataSource;
  }

  async createOrder(userId, menuId, address) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const menu = await queryRunner.manager.findOne('menu', {
        where: { menuId: menuId },
      });
      const user = await queryRunner.manager.findOne('users', {
        where: {
          userId: userId,
        },
      });

      if (!menu || !user) {
        throw new Error('회원이나 메뉴가 존재하지 않습니다.');
      }
      if (user.point < menu.price) {
        throw new Error('잔액이 부족합니다.');
      }

      user.point -= menu.price;

      await queryRunner.manager.save('users', user);
      const newOrder = {
        userId: user.userId,
        storeId: menu.storeId,
        address: address,
        totalPrice: menu.price,
      };

      await queryRunner.manager.save('orders', newOrder);
      await queryRunner.commitTransaction();

      return newOrder;
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }
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
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const order = await queryRunner.manager.findOne('orders', {
        where: {
          orderId: orderId,
        },
      });
      const user = await queryRunner.manager.findOne('users', {
        where: {
          userId: userId,
        },
      });
      if (!order || !user) {
        throw new Error('회원이나 주문이 존재하지 않습니다.');
      }

      user.point = user.point - 0 + (order.totalPrice - 0);

      await queryRunner.manager.save('users', user);
      await queryRunner.commitTransaction();

      return user.point;
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }
  }
}
