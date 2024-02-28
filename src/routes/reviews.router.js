import express from 'express';
import authMiddleware from '../../middleware/jwt-validate.middleware.js';
import ReviewsRepository from '../repositories/reviewsrepository.js';
import ReviewsController from '../controllers/reviewscontroller.js';
import ReviewsService from '../services/reviewsservice.js';
import { dataSource } from '../typeorm/index.js';

const router = express.Router();

const reviewRepository = new ReviewsRepository(dataSource);

const reviewsService = new ReviewsService(reviewRepository);

const reviewsController = new ReviewsController(reviewsService);

router.post('/reviews', authMiddleware, (req, res, next) => {
  reviewsController.createReview(req, res, next);
});
router.get('/reviews', (req, res, next) =>
  reviewsController.getReviews(req, res, next)
);
router.get('/reviews/:id', (req, res, next) =>
  reviewsController.getReviewById(req, res, next)
);
router.patch('/reviews/:reviewId', authMiddleware, (req, res, next) =>
  reviewsController.updateReview(req, res, next)
);
router.delete('/reviews/:reviewId', authMiddleware, (req, res, next) =>
  reviewsController.deleteReview(req, res, next)
);

export default router;
