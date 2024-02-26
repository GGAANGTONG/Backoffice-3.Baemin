class ReviewsService {
  constructor(reviewsRepository) {
    this.reviewsRepository = reviewsRepository;
  }

  async createReview({ userId, storeId, menuId, rating, content }) {
    return this.reviewsRepository.create({
      userId: Number(userId),
      storeId: Number(storeId),
      menuId: Number(menuId), 
      rating: Number(rating),
      content,
    });
  }

  async getReviews({ storeId, orderKey = 'createdAt', orderValue = 'DESC' }) {
    return this.reviewsRepository.findAll({
      storeId: Number(storeId),
      orderKey, 
      orderValue: orderValue.toUpperCase() === 'ASC' ? 'asc' : 'desc', 
    });
  }

  async getReviewById(reviewId) {
    return this.reviewsRepository.findById(Number(reviewId));
  }

  async updateReview({ reviewId, updateData }) {
    if (!reviewId) {
      throw new Error('리뷰ID가 필요합니다');
    }

    const review = await this.reviewsRepository.findById(Number(reviewId));
    if (!review) {
      throw new Error('리뷰 조회에 실패하였습니다.');
    }

    return this.reviewsRepository.update(Number(reviewId), updateData);
  }

  async deleteReview(reviewId) {
    const review = await this.reviewsRepository.findById(Number(reviewId));
    if (!review) {
      throw new Error('리뷰 조회에 실패하였습니다.');
    }

    return this.reviewsRepository.delete(Number(reviewId));
  }
}

export default ReviewsService;
