export default class ReviewsController {
  constructor(reviewsService) {
    this.reviewsService = reviewsService;
  }

async createReview(req, res, next) {
  try {

      const {  storedId, menuId, rating, content } = req.body; 
      const user = res.locals.user; console.log(11,user)
      const createdReview = await this.reviewsService.createReview(
          menuId,
          storedId,
          user.userId,
          rating,
          content,
      );
      res.status(201).json({ createdReview });
  } catch (error) {
      next(error);
  }
}


async getReviews(req, res, next) {
  try {
      const reviews = await this.reviewsService.getReviews();
      res.status(200).json({ reviews });
  } catch (error) {
      next(error);
  }
}

async getReviewById(req, res, next) {
  try {
      const reviewId = req.params.id; 
      if (!reviewId) {
          return res.status(400).json({ error: '리뷰 ID가 제공되지 않았습니다.' });
      }
      const review = await this.reviewsService.getReviewById(reviewId);
      res.status(200).json(review);
  } catch (error) {
      next(error);
  }
}


async updateReview(req, res, next) {
  try {
      const { reviewId } = req.params;
      const updateData = req.body;
      const updatedReview = await this.reviewsService.updateReview(reviewId, updateData);
      if (!updatedReview) {
          return res.status(404).json({ message: '리뷰가없습니다' });
      }
      res.status(200).json({ updatedReview });
  } catch (error) {
      next(error);
  }
}


async deleteReview(req, res, next) {
  try {
      const { reviewId } = req.params;
      await this.reviewsService.deleteReview(reviewId);
      res.status(204).send(); 
  } catch (error) {
      next(error);
  }
}







}
