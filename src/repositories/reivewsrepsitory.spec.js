import { jest } from '@jest/globals';
import ReviewsRepository from './ReviewsRepository';

const prisma = new PrismaClient();


jest.mock('@prisma/client', () => ({
  PrismaClient: jest.fn().mockImplementation(() => ({
    review: {
      create: jest.fn(),
      findMany: jest.fn(),
      findUnique: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
  })),
}));

describe('ReviewsRepository', () => {
  let repository;

  beforeAll(() => {
    repository = new ReviewsRepository(prisma);
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('리뷰를 생성해라', async () => {
    const reviewData = { userId: 1, storeId: 1, rating: 5, content: 'Great!' };
    prisma.review.create.mockResolvedValue(reviewData);

    const result = await repository.create(reviewData);

    expect(prisma.review.create).toHaveBeenCalledWith({ data: reviewData });
    expect(result).toEqual(reviewData);
  });

  it('모든 리뷰를 찾아라', async () => {
    const reviews = [{ id: 1, userId: 1, storeId: 1, rating: 5, content: 'Good' }];
    prisma.review.findMany.mockResolvedValue(reviews);

    const result = await repository.findAll({ storeId: 1 });

    expect(prisma.review.findMany).toHaveBeenCalled();
    expect(result).toEqual(reviews);
  });

  it('id로 리뷰를 찾아라', async () => {
    const review = { id: 1, userId: 1, storeId: 1, rating: 5, content: 'Excellent' };
    prisma.review.findUnique.mockResolvedValue(review);

    const result = await repository.findById(1);

    expect(prisma.review.findUnique).toHaveBeenCalledWith({
      where: { id: 1 },
      select: expect.any(Object),
    });
    expect(result).toEqual(review);
  });

  it('리뷰를 업데이트 해라', async () => {
    const updatedReviewData = { rating: 4, content: 'Very good' };
    prisma.review.update.mockResolvedValue(updatedReviewData);

    const result = await repository.update(1, updatedReviewData);

    expect(prisma.review.update).toHaveBeenCalledWith({
      where: { id: 1 },
      data: updatedReviewData,
    });
    expect(result).toEqual(updatedReviewData);
  });

  it('리뷰를 삭제해라', async () => {
    const deleteResponse = { id: 1 };
    prisma.review.delete.mockResolvedValue(deleteResponse);

    const result = await repository.delete(1);

    expect(prisma.review.delete).toHaveBeenCalledWith({ where: { id: 1 } });
    expect(result).toEqual(deleteResponse);
  });
});
