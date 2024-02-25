class ReviewsRepository {
    constructor(prisma) {
      this.prisma = prisma;
    }
  
    async create({ userId, storeId, rating, content }) {
        return this.prisma.review.create({
          data: {
            userId,
            storeId,
            rating,
            content,
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
            select: {
                userId: true,
                storeId: true,
                rating: true,
                content: true,
                createdAt: true,
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
            },
        });
    }
  
    async findById(reviewId) {
      return this.prisma.review.findUnique({
        where: { id: reviewId },
        select: {
            userId: true,
            storeId: true,
            rating: true,
            content: true,
            createdAt: true,
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
        },
      });
    }
  
    async update(reviewId, data) {
      return this.prisma.review.update({
        where: { id: reviewId },
        data,
      });
    }
  
    async delete(reviewId) {
      return this.prisma.review.delete({
        where: { id: reviewId },
      });
    }
}

export default ReviewsRepository;