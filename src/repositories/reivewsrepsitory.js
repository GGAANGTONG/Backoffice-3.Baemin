import { dataSource } from '../typeorm/index.js';

class ReviewsRepository {
  constructor(prisma) {
    this.prisma = prisma;
  }

  async create({ userId, storeId, menuId, rating, content }) {
    return this.prisma.review.create({
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
    return this.prisma.review.findMany({
      where: {
        storeId,
      },
      orderBy: {
        [orderKey]: orderValue,
      },
      include: {
        user: {
          select: {
            name: true
          },
        },
        restaurant: {
          select: {
            name: true
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
    return this.prisma.review.findUnique({
      where: { id: reviewId },
      include: {
        user: {
          select: {
            name: true
          },
        },
        restaurant: {
          select: {
            name: true
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
    return this.prisma.review.update({
      where: { id: reviewId },
      data,
      include: {
        menu: true,
      },
    });
  }

  async delete(reviewId) {
    return this.prisma.review.delete({
      where: { id: reviewId },
    });
  }
}

export default ReviewsRepository;
