import express from 'express';
import { RestaurantRepository } from '../repositories/restaurant.repository.js';
import { RestaurantService } from '../services/restaurant.service.js';
import { RestaurantController } from '../controllers/restaurant.controller.js';
import { dataSource } from '../typeorm/index.js';

const app = express();
const router = express.Router();

const restaurantRepository = new RestaurantRepository(dataSource);
const restaurantService = new RestaurantService(restaurantRepository);
const restaurantController = new RestaurantController(restaurantService);

router.post('/', restaurantController.createRestaurant);
router.get('/:name', restaurantController.findAllRestaurant);
router.get('/:name', restaurantController.findRestaurant);
router.put('/', restaurantController.updateRestaurant);
router.delete('/', restaurantController.deleteRestaurant);

export default router;
