import { Review } from '../typeorm/entities/review.entity.js'; 

export default class ReviewsRepository {
  constructor(dataSource) {
      this.repository = dataSource.getRepository(Review); 
  }

  async createReview({ menuId, storedId, userId, rating, content }) {
      const review = this.repository.create({
        menuId,
        storedId, 
        userId,
        rating,
        content,
      });
      
      await this.repository.save(review);
      return review;
  }


  async getReviews() {
    const reviews = await this.repository.find();
    return reviews;
  }


  async getReviewById(id) {
    const review = await this.repository.findOne({ where: { reviewId: id } });
    if (!review) {
      throw new Error('리뷰가없습니다');
    }
    return review;
  }


  async updateReview(reviewId, updateData) {
    const review = await this.repository.findOne({ where: { reviewId } });
    if (!review) {
        throw new Error('리뷰가없습니다');
    }
    Object.assign(review, updateData);
    await this.repository.save(review);
    return review;
}

async deleteReview(reviewId) {
    const deleteResult = await this.repository.delete({ reviewId });
    if (deleteResult.affected === 0) {
        throw new Error('리뷰가없거나 이미 삭제되었습니다');
    }
    return deleteResult;
}
  

}

