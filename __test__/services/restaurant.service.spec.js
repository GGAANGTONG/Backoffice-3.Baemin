import { jest } from '@jest/globals';
import { RestaurantService } from '../../src/services/restaurant.service.js';

//tdd는 코드가 있다고 가정하고, 케이스 먼저 내는거네
describe('Service, 1. 업장 정보 작성', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  //메서드 체이닝을 흉내내야 하네
  //db 통하지만 않을 뿐이지 getRepository 함수랑 똑같아야 함
  let restaurantRepository = {
    createRestaurant: jest.fn(),
    findAllRestaurant: jest.fn(),
    findRestaurant: jest.fn(),
    updateRestaurant: jest.fn(),
    deleteRestaurant: jest.fn(),
  };
  let restaurantService = new RestaurantService(restaurantRepository);

  test('1-1. 정상적으로 name, content, address, email, phone 정보를 repository로 전달함', async () => {
    const expectedReturn = {
      status: 201,
      message: '가게 정보가 등록되었습니다.',
    };
    await restaurantRepository.createRestaurant.mockResolvedValueOnce(
      expectedReturn
    );

    const restaurant = {
      name: '아름다운 국밥',
      content: '우리의 아름다운 국밥집을 소개합니다!',
      address: '국밥광역시 국밥구 국밥동 999-999',
      email: 'gookbab99@gmail.com',
      phone: '010-9999-9999',
    };

    const createdRestaurant = await restaurantService.createRestaurant(
      restaurant.name,
      restaurant.content,
      restaurant.address,
      restaurant.email,
      restaurant.phone
    );
    expect(restaurantRepository.createRestaurant).toHaveBeenCalledWith(
      restaurant.name,
      restaurant.content,
      restaurant.address,
      restaurant.email,
      restaurant.phone
    );
    expect(createdRestaurant).toEqual(expectedReturn);
  });
});
