import { dataSource } from '../typeorm/index.js';

class ReviewsRepository {
  constructor(dataSource) {
    this.repository = dataSource.getRepository(Review);
  }

  async create({ userId, storeId, menuId, rating, content }) {
    const review = this.repository.create({
      userId,
      storeId, 
      menuId,
      rating,
      content,
    });
    
    return await this.repository.save(review);
  }

  async findAll({ storeId, orderKey = 'createdAt', orderValue = 'DESC' }) {
    return await this.repository.find({
      where: { storeId },
      order: { [orderKey]: orderValue.toUpperCase() }, 
      relations: ['user', 'restaurant', 'menu'],
    });
  }

  async findById(reviewId) {
    return await this.repository.findOne({
      where: { id: reviewId },
      relations: ['user', 'restaurant', 'menu'],
    });
  }

  async update(reviewId, data) {
    await this.repository.update(reviewId, data);
    return this.findById(reviewId); 
  }

  async delete(reviewId) {
    return await this.repository.delete(reviewId);
  }
}

export default ReviewsRepository;
