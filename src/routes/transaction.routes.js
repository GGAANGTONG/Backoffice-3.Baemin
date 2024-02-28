import express from 'express';
import { getManager } from 'typeorm';
import { initializeDatabase } from '../typeorm/transaction.js';

const router = express.Router();

initializeDatabase().then(() => {
  // routes
  router.post('/test', async (req, res, next) => {
    // controller
    const { userId, menuId, address } = req.body;
    // repository
    const entityManager = getManager();
    await entityManager.transaction(async (transactionalEntityManager) => {
      const user = await transactionalEntityManager.findOne('users', {
        where: { userId: userId },
      });
      const menu = await transactionalEntityManager.findOne('menu', {
        where: { menuId: menuId },
      });
      // const menu = {
      //     "menuId": 1,
      //     "storeId": 1,
      //     "name": "게살 피자",
      //     "price": 10000,
      //     "image": "image_url_here",
      //     "category": "pizza"
      // }
      // service
      if (!userId || !menuId || !address) {
        return res.status(404).json({ message: '필수값 누락' });
      }
      if (user.point < menu.price) {
        return res
          .status(400)
          .json({ message: '포인트 부족으로인해 주문이 불가능 합니다.' });
      }
      user.point -= menu.price;
      await transactionalEntityManager.save('users', user);

      const newOrder = {
        userId: user.userId,
        storeId: menu.storeId,
        address: address,
      };
      await transactionalEntityManager.save('orders', newOrder);
    });

    // controller
    return res.status(200).json({ message: '주문 생성 완료 ' });
  });
});

export default router;
