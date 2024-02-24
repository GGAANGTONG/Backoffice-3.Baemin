import { jest } from '@jest/globals';
import { storeRepository } from '../../src/repositories/store.repository.js';
//tdd는 코드가 있다고 가정하고, 케이스 먼저 내는거네
describe('1. 업장 정보 작성(가게 이름, 가게 소개', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  test('1-1. 업장 정보가 정상적으로 db의 restaurant 테이블에 등록됨', async () => {
    const restaurant = {
      storeId: 1,
      name: '아름다운 국밥',
      content: '우리의 아름다운 국밥집을 소개합니다!',
      address: '국밥광역시 국밥구 국밥동 999-999',
      email: 'gookbab99@gmail.com',
      phone: '010-9999-9999',
      rating: 5,
    };
    const expectedReturn = {
      message: '가게 정보가 등록되었습니다.',
      restaurantInfo: {
        name: restaurant.name,
        address: restaurant.address,
        email: restaurant.email,
        phone: restaurant.phone,
      },
    };

    const createdRestaurant = await storeRepository
      .createRestaurant(restaurant)
      .mockResolvedValue(expectedReturn);
    expect(createdRestaurant).toHaveBeenCalledTimes(1);
    expect(createdRestaurant).toEqual(expectedReturn);
  });

  test('1-2. content 정보가 없이도 정상적으로 db의 restaurant 테이블에 등록됨', async () => {
    const restaurant = {
      storeId: 1,
      name: '아름다운 국밥',
      content: undefined,
      address: '국밥광역시 국밥구 국밥동 999-999',
      email: 'gookbab99@gmail.com',
      phone: '010-9999-9999',
      rating: 5,
    };
    const expectedReturn = {
      message: '가게 정보가 등록되었습니다.',
      restaurantInfo: {
        name: restaurant.name,
        address: restaurant.address,
        email: restaurant.email,
        phone: restaurant.phone,
      },
    };

    const createdRestaurant = await storeRepository
      .createRestaurant(restaurant)
      .mockResolvedValue(expectedReturn);
    expect(createdRestaurant).toHaveBeenCalledTimes(1);
    expect(createdRestaurant).toEqual(expectedReturn);
  });
});

describe('2. 가게 메뉴(이미지, 메뉴 이름, 가격) ', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  test('1 - 1', () => {});
});
