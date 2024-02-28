import { jest } from '@jest/globals';
import { RestaurantService } from '../../src/services/restaurant.service.js';

let restaurantRepository = {
  createRestaurant: jest.fn(),
  findAllRestaurant: jest.fn(),
  findAllRestaurantByName: jest.fn(),
  findRestaurant: jest.fn(),
  findOwnersRestaurant: jest.fn(),
  updateRestaurant: jest.fn(),
  deleteRestaurant: jest.fn(),
};

let restaurantService = new RestaurantService(restaurantRepository);

describe('Service, 1. 업장 정보 작성', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  test('1-1-1(createRestaurant). 정상적으로 name, content, address, email, phone 정보를 repository로 전달함', async () => {
    const expectedReturn = {
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
  test('1-1-2(createRestaurant). content 정보가 없이도 정상적으로 name, content, address, email, phone의 인수를 repository로 전달함', async () => {
    const expectedReturn = {
      message: '가게 정보가 등록되었습니다.',
    };
    await restaurantRepository.createRestaurant.mockResolvedValueOnce(
      expectedReturn
    );

    const restaurant = {
      name: '아름다운 국밥',
      content: undefined,
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

  test('1-2-0(findAllRestaurant). 매개변수가 없지만 정상적으로 repository 계층으로 과정이 진행됨', async () => {
    const expectedReturn = {
      message: '가게 목록입니다.',
    };
    restaurantRepository.findAllRestaurant.mockResolvedValueOnce(
      expectedReturn
    );

    const allRestaurant = await restaurantService.findAllRestaurant();

    expect(allRestaurant).toEqual(expectedReturn);
  });

  test('1-2-1(findAllRestaurantByName). name 인수를 정상적으로 repository로 전달함', async () => {
    const expectedReturn = {
      message: '가게 목록입니다.',
    };
    await restaurantRepository.findAllRestaurantByName.mockResolvedValueOnce(
      expectedReturn
    );

    const restaurant = '아름다운 국밥';

    const allRestaurant =
      await restaurantService.findAllRestaurantByName(restaurant);

    expect(allRestaurant).toEqual(expectedReturn);
  });
  test('1-3-1(findRestaurant). name 인수를 정상적으로 repository로 전달함', async () => {
    const expectedReturn = {
      message: '가게 정보가 등록되었습니다.',
    };
    await restaurantRepository.findRestaurant.mockResolvedValueOnce(
      expectedReturn
    );

    const restaurant = '아름다운 국밥';
    const foundRestaurant = await restaurantService.findRestaurant(restaurant);

    expect(foundRestaurant).toEqual(expectedReturn);
  });

  test('1-4-1(findOwnersRestaurant). email 인수를 정상적으로 repository로 전달함', async () => {
    const expectedReturn = {
      ownersRestaurant: {
        storeName: '죽음의 국밥집',
      },
    };
    await restaurantRepository.findOwnersRestaurant.mockResolvedValueOnce(
      expectedReturn
    );

    const restaurant = 'gookbab99@gmail.com';
    const ownersRestaurant =
      await restaurantService.findOwnersRestaurant(restaurant);
    expect(ownersRestaurant).toEqual(expectedReturn);
  });

  test('1-5-1(updateRestaurant). 유효성 검사를 통과하고 정상적으로 name, content, address, email, phone의 인수를 repository로 전달함', async () => {
    const restaurant = {
      name: '아름다운 국밥',
      content: '우리의 아름다운 국밥집을 소개합니다!',
      address: '국밥광역시 국밥구 국밥동 999-999',
      email: 'gookbab99@gmail.com',
      phone: '010-9999-9999',
    };
    const validationPass = {
      storeName: '죽음의 국밥집',
    };
    //테스트 코드는 비즈니스 코드를 모킹해서 실행하는 거니까 비즈니스 코드 쪽에 await가 있으면 여기는 없어도 된다.
    restaurantRepository.findOwnersRestaurant.mockResolvedValueOnce(
      validationPass
    );
    const expectedReturn = {
      message: '가게 정보가 수정됐습니다.',
    };

    restaurantRepository.updateRestaurant.mockResolvedValueOnce(expectedReturn);

    const updatedRestaurant = await restaurantService.updateRestaurant(
      restaurant.name,
      restaurant.content,
      restaurant.email
    );
    expect(restaurantRepository.updateRestaurant).toHaveBeenCalledWith(
      restaurant.name,
      restaurant.content,
      restaurant.email
    );
    expect(updatedRestaurant).toEqual(expectedReturn);
  });

  test('1-5-2(updateRestaurant). 유효성 검사를 통과하고 content가 undefined임에도 불구하고 name, content, address, email, phone의 인수를 repository로 전달함', async () => {
    const restaurant = {
      name: '아름다운 국밥',
      content: undefined,
      address: '국밥광역시 국밥구 국밥동 999-999',
      email: 'gookbab99@gmail.com',
      phone: '010-9999-9999',
    };
    const validationPass = {
      storeName: '죽음의 국밥집',
    };
    restaurantRepository.findOwnersRestaurant.mockResolvedValueOnce(
      validationPass
    );
    const expectedReturn = {
      message: '가게 정보가 수정됐습니다.',
    };

    restaurantRepository.updateRestaurant.mockResolvedValueOnce(expectedReturn);

    const updatedRestaurant = await restaurantService.updateRestaurant(
      restaurant.name,
      restaurant.content,
      restaurant.email
    );
    await expect(restaurantRepository.updateRestaurant).toHaveBeenCalledWith(
      restaurant.name,
      restaurant.content,
      restaurant.email
    );
    await expect(updatedRestaurant).toEqual(expectedReturn);
  });

  test('1-5-3(updateRestaurant). 유효성 검사를 통과하지 못해 Error("고객님의 가게 정보가 존재하지 않습니다.")가 발생함', async () => {
    const restaurant = {
      name: '아름다운 국밥',
      content: undefined,
      address: '국밥광역시 국밥구 국밥동 999-999',
      email: 'gookbab99@gmail.com',
      phone: '010-9999-9999',
    };
    const validationPass = undefined;
    restaurantRepository.findOwnersRestaurant.mockResolvedValueOnce(
      validationPass
    );
    const expectedReturn = {
      message: '가게 정보가 수정됐습니다.',
    };

    restaurantRepository.updateRestaurant.mockResolvedValueOnce(expectedReturn);
    // <오늘의 TIL>
    // const updatedRestaurant = await restaurantService.updateRestaurant(
    //     restaurant.name,
    //     restaurant.content,
    //     restaurant.email
    //   );

    //isinstanceof error.name 을 찍었을 때 notfounderror여야 함
    //   console.log(error);
    //   error.message;

    //rejects는 호출 자체를 실패했다는 의미

    //try catch
    //에러 인스턴스 작성, 체크
    //expect() 에는 콜백함수가 들어가야 하는데, 변수를 넣음
    // 225의 함수 호출 결과값은 promise의 reject상태 .rejects.는 promise가 reject를 반환헀는지 확인하는 것(promise는 reject와 resolve 둘 중 하나 뱉음)
    await expect(
      restaurantService.updateRestaurant(
        restaurant.name,
        restaurant.content,
        restaurant.email
      )
    ).rejects.toThrow();
    await expect(restaurantRepository.updateRestaurant).not.toHaveBeenCalled();
  });

  test('1-7-1(deleteRestaurant). 유효성 검사를 통과하고 name, email 인수를 repository로 전달함', async () => {
    const restaurant = {
      name: '아름다운 국밥',
      email: 'gookbab99@gmail.com',
    };
    const validationPass = {
      storeName: '죽음의 국밥집',
    };
    restaurantRepository.findOwnersRestaurant.mockResolvedValueOnce(
      validationPass
    );
    const expectedReturn = {
      message: '가게 정보가 수정됐습니다.',
    };

    restaurantRepository.deleteRestaurant.mockResolvedValueOnce(expectedReturn);

    const deletedRestaurant = await restaurantService.deleteRestaurant(
      restaurant.name,
      restaurant.email
    );
    await expect(restaurantRepository.deleteRestaurant).toHaveBeenCalledWith(
      restaurant.name,
      restaurant.email
    );
    await expect(deletedRestaurant).toEqual(expectedReturn);
  });

  test('1-7-2(deleteRestaurant). 유효성 검사를 통과하지 못해 Error("고객님의 가게 정보가 존재하지 않습니다.")가 발생함', async () => {
    const restaurant = {
      name: '아름다운 국밥',
      email: 'gookbab99@gmail.com',
    };
    const validationPass = undefined;
    restaurantRepository.findOwnersRestaurant.mockResolvedValueOnce(
      validationPass
    );
    const expectedReturn = {
      message: '가게 정보가 수정됐습니다.',
    };

    restaurantRepository.deleteRestaurant.mockResolvedValueOnce(expectedReturn);
    await expect(
      restaurantService.deleteRestaurant(restaurant.name, restaurant.email)
    ).rejects.toThrow();
    await expect(restaurantRepository.deleteRestaurant).not.toHaveBeenCalled();
  });
});
