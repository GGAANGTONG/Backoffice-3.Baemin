export default class ReviewsService {
  constructor(reviewsRepository) {
    this.reviewsRepository = reviewsRepository;
  }
  async createReview(menuId, storedId, userId, rating, content) {


    if (rating < 1 || rating > 5) {
      throw new Error('평점은 1~5점 까지입니다');
    }

   
    const reviewData = {
        menuId,
        storedId,
        userId,
        rating,
        content,
    };


    return await this.reviewsRepository.createReview(reviewData);
}

async getReviews() {
  return await this.reviewsRepository.getReviews();
}


async getReviewById(reviewId) {
  if (!reviewId) {
    throw new Error('리뷰 ID가 제공되지 않았습니다.');
  }

  const review = await this.reviewsRepository.getReviewById(reviewId);
  if (!review) {
      throw new Error('리뷰를 찾을 수 없습니다.');
  }
  return review;
}

async updateReview(reviewId, updateData) {
  // Add any needed validation or business logic here
  if (updateData.rating < 1 || updateData.rating > 5) {
      throw new Error('평점은 1~5까지 입니다');
  }
  const updatedReview = await this.reviewsRepository.updateReview(reviewId, updateData);
  if (!updatedReview) {
      throw new Error('리뷰가 없습니다');
  }
  return updatedReview;
}

async deleteReview(reviewId) {
    if (!reviewId) {
      throw new Error('리뷰 ID가 제공되지 않았습니다.');
    }

    const deleteResult = await this.reviewsRepository.deleteReview(reviewId);
    if (deleteResult.affected === 0) {
        throw new Error('리뷰를 찾을 수 없거나 이미 삭제되었습니다.');
    }

    return { message: '리뷰가 성공적으로 삭제되었습니다.' };
}

}
