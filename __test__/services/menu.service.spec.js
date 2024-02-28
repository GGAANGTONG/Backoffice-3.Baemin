import { jest } from '@jest/globals';
import { MenuService } from '../../src/services/menu.service.js';

let menuRepository = {
  createMenu: jest.fn(),
  findAllMenu: jest.fn(),
  findAllMenuByName: jest.fn(),
  findMenu: jest.fn(),
  findOwnersMenu: jest.fn(),
  updateMenu: jest.fn(),
  deleteMenu: jest.fn(),
};

let menuService = new MenuService(menuRepository);

describe('Service, 1. 업장 정보 작성', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  test('1-1-1(createMenu). 정상적으로 name, content, address, email, phone 정보를 repository로 전달함', async () => {
    const expectedReturn = {
      message: '메뉴 정보가 등록되었습니다.',
    };
    menuRepository.createMenu.mockResolvedValueOnce(expectedReturn);

    const menu = {
      storeId: 1,
      name: '맛있는 국밥',
      price: 17500,
      image: '위대하게 맛있는 국밥의 사진',
      category: '국밥',
    };

    await expect(menuRepository.createMenu).toHaveBeenCalledWith(
      menu.storeId,
      menu.name,
      menu.price,
      menu.image,
      menu.category
    );
    await expect(
      await menuService.createMenu(
        menu.storeId,
        menu.name,
        menu.price,
        menu.image,
        menu.category
      )
    ).toEqual(expectedReturn);
  });
  test('1-1-2(createMenu). content 정보가 없이도 정상적으로 name, content, address, email, phone의 인수를 repository로 전달함', async () => {
    const expectedReturn = {
      message: '메뉴 정보가 등록되었습니다.',
    };
    await menuRepository.createMenu.mockResolvedValueOnce(expectedReturn);

    const menu = {
      name: '아름다운 국밥',
      content: undefined,
      address: '국밥광역시 국밥구 국밥동 999-999',
      email: 'gookbab99@gmail.com',
      phone: '010-9999-9999',
    };

    const createdMenu = await menuService.createMenu(
      menu.name,
      menu.content,
      menu.address,
      menu.email,
      menu.phone
    );
    expect(menuRepository.createMenu).toHaveBeenCalledWith(
      menu.name,
      menu.content,
      menu.address,
      menu.email,
      menu.phone
    );
    expect(createdMenu).toEqual(expectedReturn);
  });

  test('1-2-0(findAllMenu). 매개변수가 없지만 정상적으로 repository 계층으로 과정이 진행됨', async () => {
    const expectedReturn = {
      message: '메뉴 목록입니다.',
    };
    menuRepository.findAllMenu.mockResolvedValueOnce(expectedReturn);

    const allMenu = await menuService.findAllMenu();

    expect(allMenu).toEqual(expectedReturn);
  });

  test('1-2-1(findAllMenuByName). name 인수를 정상적으로 repository로 전달함', async () => {
    const expectedReturn = {
      message: '메뉴 목록입니다.',
    };
    await menuRepository.findAllMenuByName.mockResolvedValueOnce(
      expectedReturn
    );

    const menu = '아름다운 국밥';

    const allMenu = await menuService.findAllMenuByName(menu);

    expect(allMenu).toEqual(expectedReturn);
  });
  test('1-3-1(findMenu). name 인수를 정상적으로 repository로 전달함', async () => {
    const expectedReturn = {
      message: '메뉴 정보가 등록되었습니다.',
    };
    await menuRepository.findMenu.mockResolvedValueOnce(expectedReturn);

    const menu = '아름다운 국밥';
    const foundMenu = await menuService.findMenu(menu);

    expect(foundMenu).toEqual(expectedReturn);
  });

  test('1-4-1(findOwnersMenu). email 인수를 정상적으로 repository로 전달함', async () => {
    const expectedReturn = {
      ownersMenu: {
        storeName: '죽음의 국밥집',
      },
    };
    await menuRepository.findOwnersMenu.mockResolvedValueOnce(expectedReturn);

    const menu = 'gookbab99@gmail.com';
    const ownersMenu = await menuService.findOwnersMenu(menu);
    expect(ownersMenu).toEqual(expectedReturn);
  });

  test('1-5-1(updateMenu). 유효성 검사를 통과하고 정상적으로 name, content, address, email, phone의 인수를 repository로 전달함', async () => {
    const menu = {
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
    menuRepository.findOwnersMenu.mockResolvedValueOnce(validationPass);
    const expectedReturn = {
      message: '메뉴 정보가 수정됐습니다.',
    };

    menuRepository.updateMenu.mockResolvedValueOnce(expectedReturn);

    const updatedMenu = await menuService.updateMenu(
      menu.name,
      menu.content,
      menu.email
    );
    expect(menuRepository.updateMenu).toHaveBeenCalledWith(
      menu.name,
      menu.content,
      menu.email
    );
    expect(updatedMenu).toEqual(expectedReturn);
  });

  test('1-5-2(updateMenu). 유효성 검사를 통과하고 content가 undefined임에도 불구하고 name, content, address, email, phone의 인수를 repository로 전달함', async () => {
    const menu = {
      name: '아름다운 국밥',
      content: undefined,
      address: '국밥광역시 국밥구 국밥동 999-999',
      email: 'gookbab99@gmail.com',
      phone: '010-9999-9999',
    };
    const validationPass = {
      storeName: '죽음의 국밥집',
    };
    menuRepository.findOwnersMenu.mockResolvedValueOnce(validationPass);
    const expectedReturn = {
      message: '메뉴 정보가 수정됐습니다.',
    };

    menuRepository.updateMenu.mockResolvedValueOnce(expectedReturn);

    const updatedMenu = await menuService.updateMenu(
      menu.name,
      menu.content,
      menu.email
    );
    await expect(menuRepository.updateMenu).toHaveBeenCalledWith(
      menu.name,
      menu.content,
      menu.email
    );
    await expect(updatedMenu).toEqual(expectedReturn);
  });

  test('1-5-3(updateMenu). 유효성 검사를 통과하지 못해 Error("고객님의 메뉴 정보가 존재하지 않습니다.")가 발생함', async () => {
    const menu = {
      name: '아름다운 국밥',
      content: undefined,
      address: '국밥광역시 국밥구 국밥동 999-999',
      email: 'gookbab99@gmail.com',
      phone: '010-9999-9999',
    };
    const validationPass = undefined;
    menuRepository.findOwnersMenu.mockResolvedValueOnce(validationPass);
    const expectedReturn = {
      message: '메뉴 정보가 수정됐습니다.',
    };

    menuRepository.updateMenu.mockResolvedValueOnce(expectedReturn);
    // <오늘의 TIL>
    // const updatedMenu = await menuService.updateMenu(
    //     menu.name,
    //     menu.content,
    //     menu.email
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
      menuService.updateMenu(menu.name, menu.content, menu.email)
    ).rejects.toThrow();
    await expect(menuRepository.updateMenu).not.toHaveBeenCalled();
  });

  test('1-7-1(deleteMenu). 유효성 검사를 통과하고 name, email 인수를 repository로 전달함', async () => {
    const menu = {
      name: '아름다운 국밥',
      email: 'gookbab99@gmail.com',
    };
    const validationPass = {
      storeName: '죽음의 국밥집',
    };
    menuRepository.findOwnersMenu.mockResolvedValueOnce(validationPass);
    const expectedReturn = {
      message: '메뉴 정보가 수정됐습니다.',
    };

    menuRepository.deleteMenu.mockResolvedValueOnce(expectedReturn);

    const deletedMenu = await menuService.deleteMenu(menu.name, menu.email);
    await expect(menuRepository.deleteMenu).toHaveBeenCalledWith(
      menu.name,
      menu.email
    );
    await expect(deletedMenu).toEqual(expectedReturn);
  });

  test('1-7-2(deleteMenu). 유효성 검사를 통과하지 못해 Error("고객님의 메뉴 정보가 존재하지 않습니다.")가 발생함', async () => {
    const menu = {
      name: '아름다운 국밥',
      email: 'gookbab99@gmail.com',
    };
    const validationPass = undefined;
    menuRepository.findOwnersMenu.mockResolvedValueOnce(validationPass);
    const expectedReturn = {
      message: '메뉴 정보가 수정됐습니다.',
    };

    menuRepository.deleteMenu.mockResolvedValueOnce(expectedReturn);
    await expect(
      menuService.deleteMenu(menu.name, menu.email)
    ).rejects.toThrow();
    await expect(menuRepository.deleteMenu).not.toHaveBeenCalled();
  });
});
