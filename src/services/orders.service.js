export class OrdersService {
  constructor(ordersRepository) {
    this.ordersRepository = ordersRepository;
  }

  createOrder = async (userId, menuId, address) => {
    return await this.ordersRepository.createOrder(userId, menuId, address);
  };

  getAllOrders = async (storeId) => {
    return await this.ordersRepository.getAllOrders(storeId);
  };

  findStoreId = async (email) => {
    return await this.ordersRepository.findStoreId(email);
  };

  getOrderById = async (orderId) => {
    return await this.ordersRepository.getOrderById(orderId);
  };

  updateOrder = async (orderId, status) => {
    return await this.ordersRepository.updateOrder(orderId, status);
  };

  completeOrder = async (orderId, userId) => {
    return await this.ordersRepository.completeOrder(orderId, userId);
  };
}
