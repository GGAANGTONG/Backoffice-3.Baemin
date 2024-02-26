import { jest } from '@jest/globals';
import { RestaurantRepository } from '../../src/repositories/restaurant.repository.js';

//tdd는 코드가 있다고 가정하고, 케이스 먼저 내는거네
describe('Repository, 1. 업장 정보 작성(가게 이름, 가게 소개', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  //메서드 체이닝을 흉내내야 하네
  //db 통하지만 않을 뿐이지 getRepository 함수랑 똑같아야 함
  let mockDataSource = {
    getRepository: function (restaurant) {
      if (restaurant) {
        return this;
      }
    },
    insert: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  //이유는 모르겠는데, this 바인딩이 안돼있음
  let restaurantRepository = new RestaurantRepository(mockDataSource);
  test('1-1. 업장 정보가 정상적으로 db의 restaurant 테이블에 등록됨', async () => {
    const restaurant = {
      name: '아름다운 국밥',
      content: '우리의 아름다운 국밥집을 소개합니다!',
      address: '국밥광역시 국밥구 국밥동 999-999',
      email: 'gookbab99@gmail.com',
      phone: '010-9999-9999',
    };

    const expectedReturn = {
      status: 201,
      message: '가게 정보가 등록되었습니다.',
    };
    await mockDataSource
      .getRepository('restaurant')
      .insert.mockResolvedValueOnce(expectedReturn);

    const createdRestaurant = await restaurantRepository.createRestaurant(
      restaurant.name,
      restaurant.content,
      restaurant.address,
      restaurant.email,
      restaurant.phone
    );
    console.log('싸워 이긴 국밥', createdRestaurant);

    await expect(
      mockDataSource.getRepository('restaurant').insert
    ).toHaveBeenCalledTimes(1);
    await expect(
      mockDataSource.getRepository('restaurant').insert
    ).toHaveBeenCalledWith({
      name: restaurant.name,
      content: restaurant.content,
      address: restaurant.address,
      email: restaurant.email,
      phone: restaurant.phone,
    });
    await expect(createdRestaurant).toEqual(expectedReturn);
  });

  test('1-2. content 정보가 없이도 정상적으로 db의 restaurant 테이블에 등록됨', async () => {
    const restaurant = {
      name: '아름다운 국밥',
      content: undefined,
      address: '국밥광역시 국밥구 국밥동 999-999',
      email: 'gookbab99@gmail.com',
      phone: '010-9999-9999',
    };

    const expectedReturn = {
      status: 201,
      message: '가게 정보가 등록되었습니다.',
    };
    await mockDataSource
      .getRepository('restaurant')
      .insert.mockResolvedValueOnce(expectedReturn);

    const createdRestaurant = await restaurantRepository.createRestaurant(
      restaurant.name,
      restaurant.content,
      restaurant.address,
      restaurant.email,
      restaurant.phone
    );
    console.log('싸워 이긴 국밥', createdRestaurant);

    await expect(
      mockDataSource.getRepository('restaurant').insert
    ).toHaveBeenCalledTimes(1);
    await expect(
      mockDataSource.getRepository('restaurant').insert
    ).toHaveBeenCalledWith({
      name: restaurant.name,
      content: undefined,
      address: restaurant.address,
      email: restaurant.email,
      phone: restaurant.phone,
    });
    await expect(createdRestaurant).toEqual(expectedReturn);
  });
});
