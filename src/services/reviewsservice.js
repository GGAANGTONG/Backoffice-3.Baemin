export class ReviewsService {
  constructor(reviewsRepository) {
    this.reviewsRepository = reviewsRepository;
  }

  async createReview({ userId, storeId, menuId, rating, content }) {
    const review = this.reviewsRepository.create({
      userId,
      storeId,
      menuId,
      rating,
      content,
    });

    return await this.reviewsRepository.save(review);
  }

  async getReviews({ storeId, orderKey = 'createdAt', orderValue = 'DESC' }) {
    return await this.reviewsRepository.find({
      where: { storeId },
      order: { [orderKey]: orderValue },
      relations: ['user', 'menu', 'store'],
    });
  }

  async getReviewById(reviewId) {
    return await this.reviewsRepository.findOneBy({ id: reviewId });
  }

  async updateReview({ reviewId, updateData }) {
    const review = await this.reviewsRepository.findOneBy({ id: reviewId });
    if (!review) {
      throw new Error('리뷰 조회에 실패하였습니다.');
    }

    await this.reviewsRepository.update(reviewId, updateData);

    return this.getReviewById(reviewId);
  }

  async deleteReview(reviewId) {
    const review = await this.reviewsRepository.findOneBy({ id: reviewId });
    if (!review) {
      throw new Error('리뷰 조회에 실패하였습니다.');
    }

    return await this.reviewsRepository.delete(reviewId);
  }
}
