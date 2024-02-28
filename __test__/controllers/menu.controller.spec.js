import { jest } from '@jest/globals';
import { MenuController } from '../../src/controllers/restaurant.controller.js';

let restaurantService = {
  createRestaurant: jest.fn(),
  findAllRestaurant: jest.fn(),
  findAllRestaurantByName: jest.fn(),
  findRestaurant: jest.fn(),
  findOwnersRestaurant: jest.fn(),
  updateRestaurant: jest.fn(),
  deleteRestaurant: jest.fn(),
};

let restaurantController = new RestaurantController(restaurantService);

describe('Controller, 1. 식당', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  test('1-1-1(createRestaurant). 정상적으로 name, content, address, email, phone 정보를 Service로 전달함', async () => {
    let req = {};
    let res = {
      locals: {
        users: {
          address: '국밥광역시 국밥구 국밥동 999-999',
          email: 'gookbab99@gmail.com',
          phone: '010-9999-9999',
        },
      },
      status: jest.fn(() => res),
      json: jest.fn(),
    };
    const expectedReturn = {
      message: '가게 정보가 등록되었습니다.',
    };
    res.status(201).json.mockReturnValue(expectedReturn);
    restaurantService.createRestaurant.mockResolvedValueOnce(
      res.status(201).json()
    );
    req = {
      locals: {
        user: {
          address: res.locals.users.address,
          email: res.locals.users.email,
          phone: res.locals.users.phone,
        },
      },
      body: {
        name: '아름다운 국밥',
        content: '우리의 아름다운 국밥집을 소개합니다!',
      },
    };
    await expect(
      restaurantController.createRestaurant(req, res, jest.fn())
    ).resolves.toEqual(expectedReturn);
  });

  test('1-1-2(createRestaurant). content 정보가 없이도 정상적으로 name, content, address, email, phone의 인수를 repository로 전달함', async () => {
    let req = {};
    let res = {
      locals: {
        users: {
          address: '국밥광역시 국밥구 국밥동 999-999',
          email: 'gookbab99@gmail.com',
          phone: '010-9999-9999',
        },
      },
      status: jest.fn(() => res),
      json: jest.fn(),
    };
    const expectedReturn = {
      message: '가게 정보가 등록되었습니다.',
    };
    res.status(201).json.mockReturnValue(expectedReturn);
    restaurantService.createRestaurant.mockResolvedValueOnce(
      res.status(201).json()
    );
    req = {
      locals: {
        user: {
          address: res.locals.users.address,
          email: res.locals.users.email,
          phone: res.locals.users.phone,
        },
      },
      body: {
        name: '아름다운 국밥',
        content: undefined,
      },
    };
    await expect(
      restaurantController.createRestaurant(req, res, jest.fn())
    ).resolves.toEqual(expectedReturn);
  });

  test('1-1-3(createRestaurant). name인수에 데이터가 할당되지 않아 error를 반환함', async () => {
    let req = {};
    let res = {
      locals: {
        users: {
          address: '국밥광역시 국밥구 국밥동 999-999',
          email: 'gookbab99@gmail.com',
          phone: '010-9999-9999',
        },
      },
      status: jest.fn(() => res),
      json: jest.fn(),
    };
    const expectedReturn = {
      message: '가게 정보가 등록되었습니다.',
    };
    res.status(201).json.mockReturnValue(expectedReturn);
    restaurantService.createRestaurant.mockResolvedValueOnce(
      res.status(201).json()
    );
    req = {
      locals: {
        user: {
          address: res.locals.users.address,
          email: res.locals.users.email,
          phone: res.locals.users.phone,
        },
      },
      body: {
        name: undefined,
        content: '아름다운 국밥을 소개합니다.',
      },
    };
    await expect(
      restaurantController.createRestaurant(req, res, jest.fn())
    ).rejects.toThrow();
    await expect(restaurantService.createRestaurant).not.toHaveBeenCalled();
  });

  test('1-2-0(findAllRestaurant). 매개변수가 없지만 정상적으로 service 계층으로 과정이 진행됨', async () => {
    let req = {};
    let res = {
      locals: {
        users: {
          address: '국밥광역시 국밥구 국밥동 999-999',
          email: 'gookbab99@gmail.com',
          phone: '010-9999-9999',
        },
      },
      status: jest.fn(() => res),
      json: jest.fn(),
    };
    const expectedReturn = {
      message: '가게 정보 목록입니다.',
    };
    res.status(200).json.mockReturnValue(expectedReturn);
    restaurantService.findAllRestaurant.mockResolvedValueOnce(
      res.status(200).json()
    );
    req = {
      locals: {
        user: {
          address: res.locals.users.address,
          email: res.locals.users.email,
          phone: res.locals.users.phone,
        },
      },
    };
    await expect(
      restaurantController.findAllRestaurant(req, res, jest.fn())
    ).resolves.toEqual(expectedReturn);
  });
  test('1-2-1(findAllRestaurantByName). name 인수를 정상적으로 service로 전달함', async () => {
    let req = {};
    let res = {
      locals: {
        users: {
          address: '국밥광역시 국밥구 국밥동 999-999',
          email: 'gookbab99@gmail.com',
          phone: '010-9999-9999',
        },
      },
      status: jest.fn(() => res),
      json: jest.fn(),
    };
    const expectedReturn = {
      message: '가게 정보 목록입니다.',
    };
    res.status(200).json.mockReturnValue(expectedReturn);
    restaurantService.findAllRestaurantByName.mockResolvedValueOnce(
      res.status(200).json()
    );
    req = {
      locals: {
        user: {
          address: res.locals.users.address,
          email: res.locals.users.email,
          phone: res.locals.users.phone,
        },
      },
      params: {
        name: '국밥',
      },
    };
    await expect(
      restaurantController.findAllRestaurantByName(req, res, jest.fn())
    ).resolves.toEqual(expectedReturn);
  });

  test('1-2-2(findAllRestaurantByName). name 인수에 데이터가 할당되지 않아 에러가 발생함', async () => {
    let req = {};
    let res = {
      locals: {
        users: {
          address: '국밥광역시 국밥구 국밥동 999-999',
          email: 'gookbab99@gmail.com',
          phone: '010-9999-9999',
        },
      },
      status: jest.fn(() => res),
      json: jest.fn(),
    };
    const expectedReturn = {
      message: '가게 정보 목록입니다.',
    };
    res.status(200).json.mockReturnValue(expectedReturn);
    restaurantService.findAllRestaurantByName.mockResolvedValueOnce(
      res.status(200).json()
    );
    req = {
      locals: {
        user: {
          address: res.locals.users.address,
          email: res.locals.users.email,
          phone: res.locals.users.phone,
        },
      },
      params: {
        name: undefined,
      },
    };
    await expect(
      restaurantController.findAllRestaurantByName(req, res, jest.fn())
    ).rejects.toThrow();
    await expect(
      restaurantService.findAllRestaurantByName
    ).not.toHaveBeenCalled();
  });

  test('1-3-1(findRestaurant). name 인수를 정상적으로 service 계층으로 전달함', async () => {
    let req = {};
    let res = {
      locals: {
        users: {
          address: '국밥광역시 국밥구 국밥동 999-999',
          email: 'gookbab99@gmail.com',
          phone: '010-9999-9999',
        },
      },
      status: jest.fn(() => res),
      json: jest.fn(),
    };
    const expectedReturn = {
      message: '가게 정보입니다.',
    };
    res.status(200).json.mockReturnValue(expectedReturn);
    restaurantService.findRestaurant.mockResolvedValueOnce(
      res.status(200).json()
    );
    req = {
      locals: {
        user: {
          address: res.locals.users.address,
          email: res.locals.users.email,
          phone: res.locals.users.phone,
        },
      },
      params: {
        name: '국밥',
      },
    };
    await expect(
      restaurantController.findRestaurant(req, res, jest.fn())
    ).resolves.toEqual(expectedReturn);
  });

  test('1-3-2(findRestaurant). name 인수에 데이터가 할당되지 않아 에러가 발생함', async () => {
    let req = {};
    let res = {
      locals: {
        users: {
          address: '국밥광역시 국밥구 국밥동 999-999',
          email: 'gookbab99@gmail.com',
          phone: '010-9999-9999',
        },
      },
      status: jest.fn(() => res),
      json: jest.fn(),
    };
    const expectedReturn = {
      message: '가게 정보 목록입니다.',
    };
    res.status(200).json.mockReturnValue(expectedReturn);
    restaurantService.findRestaurant.mockResolvedValueOnce(
      res.status(200).json()
    );
    req = {
      locals: {
        user: {
          address: res.locals.users.address,
          email: res.locals.users.email,
          phone: res.locals.users.phone,
        },
      },
      params: {
        name: undefined,
      },
    };
    await expect(
      restaurantController.findRestaurant(req, res, jest.fn())
    ).rejects.toThrow();
    await expect(restaurantService.findRestaurant).not.toHaveBeenCalled();
  });

  test('1-4-1(findOwnersRestaurant). email 인수를 정상적으로 repository로 전달함', async () => {
    let req = {};
    let res = {
      locals: {
        users: {
          address: '국밥광역시 국밥구 국밥동 999-999',
          email: 'gookbab99@gmail.com',
          phone: '010-9999-9999',
        },
      },
      status: jest.fn(() => res),
      json: jest.fn(),
    };
    const expectedReturn = {
      message: '가게 정보입니다.',
    };
    res.status(200).json.mockReturnValue(expectedReturn);
    restaurantService.findOwnersRestaurant.mockResolvedValueOnce(
      res.status(200).json()
    );
    req = {
      locals: {
        user: {
          address: res.locals.users.address,
          email: res.locals.users.email,
          phone: res.locals.users.phone,
        },
      },
    };
    await expect(
      restaurantController.findOwnersRestaurant(req, res, jest.fn())
    ).resolves.toEqual(expectedReturn);
  });

  test('1-5-1(updateRestaurant). 유효성 검사를 통과하고 정상적으로 name, content, address, email, phone의 인수를 repository로 전달함', async () => {
    let req = {};
    let res = {
      locals: {
        users: {
          address: '국밥광역시 국밥구 국밥동 999-999',
          email: 'gookbab99@gmail.com',
          phone: '010-9999-9999',
        },
      },
      status: jest.fn(() => res),
      json: jest.fn(),
    };
    const expectedReturn = {
      message: '가게 정보가 수정됐습니다.',
    };
    res.status(201).json.mockReturnValue(expectedReturn);
    restaurantService.updateRestaurant.mockResolvedValueOnce(
      res.status(201).json()
    );
    req = {
      locals: {
        user: {
          address: res.locals.users.address,
          email: res.locals.users.email,
          phone: res.locals.users.phone,
        },
      },
      body: {
        name: '아름다운 국밥',
        content: '아름다운 국밥입니다!',
      },
    };
    await expect(
      restaurantController.updateRestaurant(req, res, jest.fn())
    ).resolves.toEqual(expectedReturn);
  });

  test('1-5-2(updateRestaurant). 유효성 검사를 통과하고 content가 undefined임에도 불구하고 name, content, address, email, phone의 인수를 repository로 전달함', async () => {
    let req = {};
    let res = {
      locals: {
        users: {
          address: '국밥광역시 국밥구 국밥동 999-999',
          email: 'gookbab99@gmail.com',
          phone: '010-9999-9999',
        },
      },
      status: jest.fn(() => res),
      json: jest.fn(),
    };
    const expectedReturn = {
      message: '가게 정보가 수정됐습니다.',
    };
    res.status(201).json.mockReturnValue(expectedReturn);
    restaurantService.updateRestaurant.mockResolvedValueOnce(
      res.status(201).json()
    );
    req = {
      locals: {
        user: {
          address: res.locals.users.address,
          email: res.locals.users.email,
          phone: res.locals.users.phone,
        },
      },
      body: {
        name: '아름다운 국밥',
        content: '아름다운 국밥입니다',
      },
    };
    await expect(
      restaurantController.updateRestaurant(req, res, jest.fn())
    ).resolves.toEqual(expectedReturn);
  });

  test('1-5-2(updateRestaurant). name 인수가 제대로 전달되지 않아 에러가 발생함', async () => {
    let req = {};
    let res = {
      locals: {
        users: {
          address: '국밥광역시 국밥구 국밥동 999-999',
          email: 'gookbab99@gmail.com',
          phone: '010-9999-9999',
        },
      },
      status: jest.fn(() => res),
      json: jest.fn(),
    };
    const expectedReturn = {
      message: '가게 정보가 수정됐습니다.',
    };
    res.status(201).json.mockReturnValue(expectedReturn);
    restaurantService.updateRestaurant.mockResolvedValueOnce(
      res.status(201).json()
    );
    req = {
      locals: {
        user: {
          address: res.locals.users.address,
          email: res.locals.users.email,
          phone: res.locals.users.phone,
        },
      },
      body: {
        name: undefined,
        content: '아름다운 국밥입니다',
      },
    };
    await expect(
      restaurantController.updateRestaurant(req, res, jest.fn())
    ).rejects.toThrow();
    await expect(restaurantService.updateRestaurant).not.toHaveBeenCalled();
  });

  test('1-6-1(deleteRestaurant). 유효성 검사를 통과하고 name, email 인수를 repository로 전달함', async () => {
    let req = {};
    let res = {
      locals: {
        users: {
          address: '국밥광역시 국밥구 국밥동 999-999',
          email: 'gookbab99@gmail.com',
          phone: '010-9999-9999',
        },
      },
      status: jest.fn(() => res),
      json: jest.fn(),
    };
    const expectedReturn = {
      message: '가게 정보가 삭제됐습니다.',
    };
    res.status(200).json.mockReturnValue(expectedReturn);
    restaurantService.deleteRestaurant.mockResolvedValueOnce(
      res.status(200).json()
    );
    req = {
      locals: {
        user: {
          address: res.locals.users.address,
          email: res.locals.users.email,
          phone: res.locals.users.phone,
        },
      },
      body: {
        name: '아름다운 국밥',
      },
    };
    await expect(
      restaurantController.deleteRestaurant(req, res, jest.fn())
    ).resolves.toEqual(expectedReturn);
  });
  test('1-6-2(deleteRestaurant). 유효성 검사를 통과하지 못하고 에러가 발생함', async () => {
    let req = {};
    let res = {
      locals: {
        users: {
          address: '국밥광역시 국밥구 국밥동 999-999',
          email: 'gookbab99@gmail.com',
          phone: '010-9999-9999',
        },
      },
      status: jest.fn(() => res),
      json: jest.fn(),
    };
    const expectedReturn = {
      message: '가게 정보가 삭제됐습니다.',
    };
    res.status(200).json.mockReturnValue(expectedReturn);
    restaurantService.deleteRestaurant.mockResolvedValueOnce(
      res.status(200).json()
    );
    req = {
      locals: {
        user: {
          address: res.locals.users.address,
          email: res.locals.users.email,
          phone: res.locals.users.phone,
        },
      },
      params: {
        name: undefined,
      },
    };
    await expect(
      restaurantController.deleteRestaurant(req, res, jest.fn())
    ).rejects.toThrow();
    await expect(restaurantService.deleteRestaurant).not.toHaveBeenCalled();
  });
});
