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

router.post('/restaurants', restaurantController.createRestaurant);
router.get('/restaurants/:name', restaurantController.findAllRestaurant);
router.get('/restaurants/:name', restaurantController.findRestaurant);
router.put('/restaurants', restaurantController.updateRestaurant);
router.delete('/restaurants', restaurantController.deleteRestaurant);

export default router;
