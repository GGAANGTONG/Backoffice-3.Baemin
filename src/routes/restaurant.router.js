import express from 'express';
import authMiddleware from '../../middleware/jwt-validate.middleware.js';
import { RestaurantRepository } from '../repositories/restaurant.repository.js';
import { RestaurantService } from '../services/restaurant.service.js';
import { RestaurantController } from '../controllers/restaurant.controller.js';
import { dataSource } from '../typeorm/index.js';

const app = express();
const router = express.Router();

const restaurantRepository = new RestaurantRepository(dataSource);
const restaurantService = new RestaurantService(restaurantRepository);
const restaurantController = new RestaurantController(restaurantService);

router.get('/restaurants', restaurantController.findAllRestaurant);
router.post(
  '/restaurants',
  authMiddleware,
  restaurantController.createRestaurant
);
router.get('/restaurants/:names', restaurantController.findAllRestaurantByName);
router.get('/restaurants/:name', restaurantController.findRestaurant);
router.put(
  '/restaurants',
  authMiddleware,
  restaurantController.updateRestaurant
);
router.delete(
  '/restaurants',
  authMiddleware,
  restaurantController.deleteRestaurant
);

export default router;
