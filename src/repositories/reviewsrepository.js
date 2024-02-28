// import { dataSource } from '../typeorm/index.js';

export class ReviewsRepository {
  constructor(dataSource) {
    this.dataSource = dataSource;
  }

  async create({ userId, storeId, menuId, rating, content }) {
    return this.dataSource.review.create({
      data: {
        userId,
        storeId,
        menuId,
        rating,
        content,
      },
      include: {
        menu: true,
      },
    });
  }

  async findAll({ storeId, orderKey = 'createdAt', orderValue = 'desc' }) {
    return this.dataSource.review.findMany({
      where: {
        storeId,
      },
      orderBy: {
        [orderKey]: orderValue,
      },
      include: {
        user: {
          select: {
            name: true,
          },
        },
        restaurant: {
          select: {
            name: true,
          },
        },
        menu: {
          select: {
            id: true,
            name: true,
            content: true,
          },
        },
      },
    });
  }

  async findById(reviewId) {
    return this.dataSource.review.findUnique({
      where: { id: reviewId },
      include: {
        user: {
          select: {
            name: true,
          },
        },
        restaurant: {
          select: {
            name: true,
          },
        },
        menu: {
          select: {
            id: true,
            name: true,
            content: true,
          },
        },
      },
    });
  }

  async update(reviewId, data) {
    return this.dataSource.review.update({
      where: { id: reviewId },
      data,
      include: {
        menu: true,
      },
    });
  }

  async delete(reviewId) {
    return this.dataSource.review.delete({
      where: { id: reviewId },
    });
  }
}
