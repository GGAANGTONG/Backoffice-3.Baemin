import { dataSource } from '../typeorm/index.js';
import { Review } from '../entity/Review.js'; 
class ReviewsRepository {
  async create({ userId, storeId, menuId, rating, content }) {
    const reviewRepository = dataSource.getRepository(Review);
    const review = reviewRepository.create({
      userId,
      storeId,
      menuId,
      rating,
      content,
    });

    return reviewRepository.save(review);
  }

  async findAll({ storeId, orderKey = 'createdAt', orderValue = 'desc' }) {
    const reviewRepository = dataSource.getRepository(Review);
    return reviewRepository.find({
      where: { storeId },
      order: { [orderKey]: orderValue === 'desc' ? 'DESC' : 'ASC' },
      relations: ['user', 'restaurant', 'menu'],
    });
  }

  async findById(reviewId) {
    const reviewRepository = dataSource.getRepository(Review);
    return reviewRepository.findOne({
      where: { id: reviewId },
      relations: ['user', 'restaurant', 'menu'],
    });
  }

  async update(reviewId, data) {
    const reviewRepository = dataSource.getRepository(Review);
    await reviewRepository.update(reviewId, data);
    return this.findById(reviewId); 
  }

  async delete(reviewId) {
    const reviewRepository = dataSource.getRepository(Review);
    return reviewRepository.delete(reviewId);
  }
}

export default ReviewsRepository;
