import { jest } from '@jest/globals';
import { RestaurantRepository } from '../../src/repositories/restaurant.repository.js';

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

let restaurantRepository = new RestaurantRepository(mockDataSource);

//tdd는 코드가 있다고 가정하고, 케이스 먼저 내는거네
describe('Repository, 1. 업장 정보 작성(가게 이름, 가게 소개', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  test('1-1-1(createRestaurant). name, content, address, email, phone을 받아서 업장 정보가 정상적으로 db의 restaurant 테이블에 해당 가게 정보가 등록됨', async () => {
    const restaurant = {
      name: '아름다운 국밥',
      content: '우리의 아름다운 국밥집을 소개합니다!',
      address: '국밥광역시 국밥구 국밥동 999-999',
      email: 'gookbab99@gmail.com',
      phone: '010-9999-9999',
    };

    const expectedReturn = {
      message: '가게 정보가 등록되었습니다.',
    };
    mockDataSource
      .getRepository('restaurant')
      .insert.mockResolvedValueOnce(expectedReturn);
    //coverage는 실제 작동하는 서비스 코드만 커버함
    const createdRestaurant = await restaurantRepository.createRestaurant(
      restaurant.name,
      restaurant.content,
      restaurant.address,
      restaurant.email,
      restaurant.phone
    );

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

  test('1-1-2(createRestaurant). content 정보 없이도 정상적으로 db의 restaurant 테이블의 해당 가게 정보가 등록됨', async () => {
    const restaurant = {
      name: '아름다운 국밥',
      content: undefined,
      address: '국밥광역시 국밥구 국밥동 999-999',
      email: 'gookbab99@gmail.com',
      phone: '010-9999-9999',
    };

    const expectedReturn = {
      message: '가게 정보가 등록되었습니다.',
    };
    mockDataSource
      .getRepository('restaurant')
      .insert.mockResolvedValueOnce(expectedReturn);

    const createdRestaurant = await restaurantRepository.createRestaurant(
      restaurant.name,
      restaurant.content,
      restaurant.address,
      restaurant.email,
      restaurant.phone
    );

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

  test('1-2-0(findAllRestaurant). 모든 가게가 출력됨', async () => {
    const expectedReturn = [
      {
        name: '아름다운 김치',
        content: '우리의 아름다운 김치집을 소개합니다!',
      },
      { name: '위대한 국수', content: '우리의 국수는 정말 위대합니다, 선생!' },
      //그래서 얘만 남아야 함
      {
        name: '죽음의 국밥',
        content: '어둠의 dark, 죽음의 death, 국밥은 국밥',
      },
    ];

    mockDataSource
      .getRepository('restaurant')
      .find.mockResolvedValueOnce(expectedReturn);

    const allRestaurant = await restaurantRepository.findAllRestaurant();

    await expect(
      mockDataSource.getRepository('restaurant').find
    ).toHaveBeenCalledTimes(1);
    await expect(allRestaurant).toEqual(expectedReturn);
  });

  test('1-2-1(findAllRestaurantByName). 입력한 이름을 포함하는 모든 가게가 출력됨', async () => {
    //국밥이 아닌거 부터 시작해서, 국밥만 남아야 제대로된 테스트?
    //find all과 find like가 결과가 다르다는 것을 증명하는 것이 테스트의 핵심이다.
    //Like는 typeorm을 만든 사람이 테스트 해야 하는거임

    const restaurant = '국밥';

    const expectedReturn = [
      {
        name: '아름다운 김치',
        content: '우리의 아름다운 김치집을 소개합니다!',
      },
      { name: '위대한 국수', content: '우리의 국수는 정말 위대합니다, 선생!' },
      //그래서 얘만 남아야 함
      {
        name: '죽음의 국밥',
        content: '어둠의 dark, 죽음의 death, 국밥은 국밥',
      },
    ];

    mockDataSource
      .getRepository('restaurant')
      .find.mockResolvedValueOnce(expectedReturn[2]);

    const allRestaurantByName =
      await restaurantRepository.findAllRestaurantByName(restaurant);

    await expect(
      mockDataSource.getRepository('restaurant').find
    ).toHaveBeenCalledTimes(1);
    await expect(allRestaurantByName).toEqual(expectedReturn[2]);
  });

  test('1-3-1(findRestaurant). 입력한 이름을 가진 특정한 가게가 출력됨', async () => {
    const restaurant = '죽음의 국밥';

    const expectedReturn = {
      name: ' 죽음의 국밥',
      content: '어둠의 dark, 죽음의 death, 국밥은 국밥',
      email: 'gookbab99@gmail.com',
    };
    mockDataSource
      .getRepository('restaurant')
      .findOne.mockResolvedValueOnce(expectedReturn);

    const foundRestaurant =
      await restaurantRepository.findRestaurant(restaurant);

    await expect(
      mockDataSource.getRepository('restaurant').findOne
    ).toHaveBeenCalledTimes(1);
    await expect(foundRestaurant).toEqual(expectedReturn);
  });

  test('1-4-1(findOwnersRestaurant). 유저가 소유한 가게 정보가 검색됨', async () => {
    const restaurant = 'gookbab99@gmail.com';

    const expectedReturn = {
      name: '아름다운 국밥',
      content: '우리의 아름다운 국밥집을 소개합니다!',
      address: '국밥광역시 국밥구 국밥동 999-999',
      email: 'gookbab99@gmail.com',
      phone: '010-9999-9999',
    };
    await mockDataSource
      .getRepository('restaurant')
      .findOne.mockResolvedValueOnce(expectedReturn);

    const foundOwnersRestaurant =
      await restaurantRepository.findOwnersRestaurant(restaurant);

    await expect(
      mockDataSource.getRepository('restaurant').findOne
    ).toHaveBeenCalledTimes(1);
    await expect(foundOwnersRestaurant).toEqual(expectedReturn);
  });

  test('1-5-1(updateRestaurant). name, content, address, email, phone을 받아서 업장 정보가 정상적으로 db의 restaurant 테이블의 해당 가게 정보가 갱신됨', async () => {
    const restaurant = {
      name: '아름다운 국밥',
      content: '우리의 아름다운 국밥집을 소개합니다!',
      email: 'gookbab99@gmail.com',
    };

    const expectedReturn = {
      message: '수정이 완료됐습니다.',
    };
    await mockDataSource
      .getRepository('restaurant')
      .update.mockResolvedValueOnce(expectedReturn);

    const updatedRestaurant = await restaurantRepository.updateRestaurant(
      restaurant.name,
      restaurant.content,
      restaurant.email
    );

    await expect(
      mockDataSource.getRepository('restaurant').update
    ).toHaveBeenCalledTimes(1);
    await expect(updatedRestaurant).toEqual(expectedReturn);
  });

  test('1-5-2(updateRestaurant). content 정보 없이도 db의 restaurant 테이블의 해당 가게 정보가 갱신됨', async () => {
    const restaurant = {
      name: '아름다운 국밥',
      content: undefined,
      email: 'gookbab99@gmail.com',
    };

    const expectedReturn = {
      message: '수정이 완료됐습니다.',
    };
    await mockDataSource
      .getRepository('restaurant')
      .update.mockResolvedValueOnce(expectedReturn);

    const updatedRestaurant = await restaurantRepository.updateRestaurant(
      restaurant.name,
      restaurant.content,
      restaurant.email
    );

    await expect(
      mockDataSource.getRepository('restaurant').update
    ).toHaveBeenCalledTimes(1);
    await expect(updatedRestaurant).toEqual(expectedReturn);
  });

  test('1-6-1(deleteRestaurant). 정상적으로 db의 restaurant 테이블의 해당 가게 정보가 삭제됨', async () => {
    const restaurant = {
      name: '아름다운 국밥',
      email: 'gookbab99@gmail.com',
    };

    const expectedReturn = {
      message: '삭제되었습니다.',
    };
    await mockDataSource
      .getRepository('restaurant')
      .delete.mockResolvedValueOnce(expectedReturn);

    const deletedRestaurant = await restaurantRepository.deleteRestaurant(
      restaurant.name,
      restaurant.email
    );

    await expect(
      mockDataSource.getRepository('restaurant').delete
    ).toHaveBeenCalledTimes(1);
    await expect(deletedRestaurant).toEqual(expectedReturn);
  });
});
