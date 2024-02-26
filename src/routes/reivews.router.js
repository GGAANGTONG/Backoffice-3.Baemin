import express from 'express';
import authMiddleware from '../middlewares/auth.middleware.js';
import { ReviewsController } from '../controllers/reviewscontroller.js'; 
import { ReviewsRepository } from '../repositories/reviewsrepository.js'; 
import { ReviewsService } from '../services/reviewsservice.js';
import { dataSource } from '../typeorm/index.js'; 

const router = express.Router();

const reviewsRepository = new ReviewsRepository(dataSource);

const reviewsService = new ReviewsService(reviewsRepository);

const reviewsController = new ReviewsController(reviewsService);


router.post('/reviews', authMiddleware, (req, res) => reviewsController.createReview(req, res));

router.get('/reviews',  (req, res) => reviewsController.getReviews(req, res));

router.get('/reviews/:reviewId', (req, res) => reviewsController.getReviewById(req, res));

router.patch('/reviews/:reviewId', authMiddleware, (req, res) => reviewsController.updateReview(req, res));

router.delete('/reviews/:reviewId', authMiddleware, (req, res) => reviewsController.deleteReview(req, res));

export default router;
