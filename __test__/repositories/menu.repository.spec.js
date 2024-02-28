import { jest } from '@jest/globals';
import { MenuRepository } from '../../src/repositories/menu.repository.js';

//메서드 체이닝을 흉내내야 하네
//db 통하지만 않을 뿐이지 getRepository 함수랑 똑같아야 함
let mockDataSource = {
  getRepository: function (menu) {
    if (menu) {
      return this;
    }
  },
  insert: jest.fn(),
  find: jest.fn(),
  findOne: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
};

let menuRepository = new MenuRepository(mockDataSource);

//tdd는 코드가 있다고 가정하고, 케이스 먼저 내는거네
describe('Repository, 1. 업장 정보 작성(메뉴 이름, 메뉴 소개', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  test('1-1-1(createMenu). storeId, name, price, image, category을 받아서 메뉴 정보가 정상적으로 db의 menu 테이블의 해당 메뉴 메뉴 정보에 등록됨', async () => {
    const menu = {
      storeId: 1,
      name: '맛있는 국밥',
      price: 17500,
      image: '위대하게 맛있는 국밥의 사진',
      category: '국밥',
    };

    const expectedReturn = {
      message: '메뉴가 등록되었습니다.',
    };
    mockDataSource
      .getRepository('menu')
      .insert.mockResolvedValueOnce(expectedReturn);
    //coverage는 실제 작동하는 서비스 코드만 커버함
    const createdMenu = await menuRepository.createMenu(
      menu.storeId,
      menu.name,
      menu.price,
      menu.image,
      menu.category
    );

    await expect(
      mockDataSource.getRepository('menu').insert
    ).toHaveBeenCalledTimes(1);
    await expect(
      mockDataSource.getRepository('menu').insert
    ).toHaveBeenCalledWith({
      storeId: menu.storeId,
      name: menu.name,
      price: menu.price,
      image: menu.image,
      category: menu.category,
    });
    await expect(createdMenu).toEqual(expectedReturn);
  });

  test('1-2-1(findAllMenu). 모든 메뉴가 출력됨', async () => {
    const storeId = 1;
    const expectedReturn = [
      {
        name: '아름다운 김치',
        content: '우리의 아름다운 김치집을 소개합니다!',
      },
      { name: '위대한 국수', content: '우리의 국수는 정말 위대합니다, 선생!' },
      {
        name: '죽음의 국밥',
        content: '어둠의 dark, 죽음의 death, 국밥은 국밥',
      },
    ];

    mockDataSource
      .getRepository('menu')
      .find.mockResolvedValueOnce(expectedReturn);

    await expect(await menuRepository.findAllMenu(storeId)).toEqual(
      expectedReturn
    );
    await expect(
      mockDataSource.getRepository('menu').find
    ).toHaveBeenCalledTimes(1);
  });

  test('1-3-1(findMenu). 입력한 메뉴가 출력됨', async () => {
    //국밥이 아닌거 부터 시작해서, 국밥만 남아야 제대로된 테스트?
    //find all과 find like가 결과가 다르다는 것을 증명하는 것이 테스트의 핵심이다.
    //Like는 typeorm을 만든 사람이 테스트 해야 하는거임

    const menu = '국밥';
    const storeId = 1;

    const expectedReturn = {
      storeId: 1,
      name: '맛있는 국밥',
      price: 17500,
      image: '위대하게 맛있는 국밥의 사진',
      category: '국밥',
    };

    mockDataSource
      .getRepository('menu')
      .findOne.mockResolvedValueOnce(expectedReturn);

    await expect(await menuRepository.findMenu(storeId, menu)).toEqual(
      expectedReturn
    );
    await expect(
      mockDataSource.getRepository('menu').findOne
    ).toHaveBeenCalledTimes(1);
  });

  test('1-4-1(findOwnersMenu). 유저가 소유한 메뉴 정보가 검색됨', async () => {
    const storeId = 1;
    const email = 'gookbab99@gmail.com';

    const expectedReturn = {
      message: '찾는 메뉴입니다.',
    };
    await mockDataSource
      .getRepository('menu')
      .findOne.mockResolvedValueOnce(expectedReturn);

    const foundOwnersMenu = await menuRepository.findOwnersMenu(storeId, email);

    await expect(
      mockDataSource.getRepository('menu').findOne
    ).toHaveBeenCalledTimes(1);
    await expect(foundOwnersMenu).toEqual(expectedReturn);
  });

  test('1-5-1(updateMenu). name, content, address, email, phone을 받아서 업장 정보가 정상적으로 db의 menu 테이블의 해당 메뉴 정보가 갱신됨', async () => {
    const menu = {
      name: '아름다운 국밥',
      content: '우리의 아름다운 국밥집을 소개합니다!',
      email: 'gookbab99@gmail.com',
    };

    const expectedReturn = {
      message: '수정이 완료됐습니다.',
    };
    await mockDataSource
      .getRepository('menu')
      .update.mockResolvedValueOnce(expectedReturn);

    const updatedMenu = await menuRepository.updateMenu(
      menu.name,
      menu.content,
      menu.email
    );

    await expect(
      mockDataSource.getRepository('menu').update
    ).toHaveBeenCalledTimes(1);
    await expect(updatedMenu).toEqual(expectedReturn);
  });

  test('1-5-2(updateMenu). content 정보 없이도 db의 menu 테이블의 해당 메뉴 정보가 갱신됨', async () => {
    const menu = {
      name: '아름다운 국밥',
      content: undefined,
      email: 'gookbab99@gmail.com',
    };

    const expectedReturn = {
      message: '수정이 완료됐습니다.',
    };
    await mockDataSource
      .getRepository('menu')
      .update.mockResolvedValueOnce(expectedReturn);

    const updatedMenu = await menuRepository.updateMenu(
      menu.name,
      menu.content,
      menu.email
    );

    await expect(
      mockDataSource.getRepository('menu').update
    ).toHaveBeenCalledTimes(1);
    await expect(updatedMenu).toEqual(expectedReturn);
  });

  test('1-6-1(deleteMenu). 정상적으로 db의 menu 테이블의 해당 메뉴 정보가 삭제됨', async () => {
    const menu = {
      name: '아름다운 국밥',
      email: 'gookbab99@gmail.com',
    };

    const expectedReturn = {
      message: '삭제되었습니다.',
    };
    await mockDataSource
      .getRepository('menu')
      .delete.mockResolvedValueOnce(expectedReturn);

    const deletedMenu = await menuRepository.deleteMenu(menu.name, menu.email);

    await expect(
      mockDataSource.getRepository('menu').delete
    ).toHaveBeenCalledTimes(1);
    await expect(deletedMenu).toEqual(expectedReturn);
  });
});
