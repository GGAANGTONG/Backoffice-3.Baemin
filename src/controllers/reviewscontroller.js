class ReviewsController {
  constructor(reviewsService) {
    this.reviewsService = reviewsService;
  }

  async createReview(req, res, next) {
    try {
      const { userId } = req.user; 
      const { storeId, rating, content } = req.body;
      const review = await this.reviewsService.createReview({
        userId,
        storeId,
        rating,
        content,
      });
      res.status(201).json({ data: review });
    } catch (error) {
      next(error);
    }
  }

  async getReviews(req, res, next) {
    try {
      const { storeId } = req.query;
      const reviews = await this.reviewsService.getReviews({ storeId });
      res.status(200).json({ data: reviews }); 
    } catch (error) {
      next(error);
    }
  }

  async getReviewById(req, res, next) {
    try {
      const { reviewId } = req.params;
      const review = await this.reviewsService.getReviewById(reviewId);
      res.status(200).json({ data: review });
    } catch (error) {
      next(error);
    }
  }

  async updateReview(req, res, next) {
    try {
      const { reviewId } = req.params;
      const { rating, content } = req.body;
      const updatedReview = await this.reviewsService.updateReview(reviewId, {
        rating,
        content,
      });
      res.status(200).json({ message: "리뷰가 수정되었습니다.", data: updatedReview });
    } catch (error) {
      next(error);
    }
  }

  async deleteReview(req, res, next) {
    try {
      const { reviewId } = req.params;
      await this.reviewsService.deleteReview(reviewId);
      res.status(200).json({ message: "리뷰가 삭제되었습니다." });
    } catch (error) {
      next(error);
    }
  }
}

export default ReviewsController;
