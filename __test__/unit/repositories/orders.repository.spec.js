import { dataSource } from '../../../src/typeorm/index.js';
import ordersRepository from '../../../src/repositories/orders.repository.js';

jest.mock('../../src/typeorm/index.js');

describe('OrdersRepository', () => {
  describe('사장님 - 주문 확인 기능', () => {
    it('전체 주문 조회', async () => {
      dataSource.initialize = jest.jn();
      dataSource.getRepository = (tableName) => ({
        find: jest.fn(() => [
          {
            orderId: 1,
            storeId: 1,
            userId: 1,
            status: '배달 전',
            address: '주소',
          },
        ]),
      });
      const result = await ordersRepository.getAllOrders();
      expect(typeof result).toBe('object');
      expect(result).toHaveLength(1);
      expect(result).toBeDefined();
    });
  });
});
