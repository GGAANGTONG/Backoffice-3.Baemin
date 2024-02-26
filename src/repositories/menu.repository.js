export class MenuRepository {
  constructor(dataSource) {
    this.dataSource = dataSource;
  }

  //1. 업장 정보 생성
  createMenu = async (storeId, name, price, image, category) => {
    const data = {
      storeId,
      name,
      price,
      image,
      category,
    };

    await this.dataSource.getRepository('menu').insert(data);

    return {
      status: 201,
      message: '메뉴가 등록되었습니다.',
    };
  };

  findAllMenu = async (storeId) => {
    const allMenu = await this.dataSource.getRepository('menu').find({
      where: {
        storeId,
      },
      select: {
        name: true,
        price: true,
        image: true,
      },
    });

    return allMenu;
  };
  findMenu = async (storeId, name) => {
    const Menu = await this.dataSource.getRepository('menu').findOne({
      where: {
        storeId,
        name,
      },
      select: {
        name: true,
        price: true,
        image: true,
        category: true,
      },
    });

    return Menu;
  };

  findOwnersMenu = async (storeId, email) => {
    const ownersMenu = await this.dataSource.getRepository('menu').findOne({
      where: {
        storeId,
        email,
      },
      select: {
        name: true,
        content: true,
        address: true,
        email: true,
        phone: true,
        rating: true,
      },
    });

    return ownersMenu;
  };

  //storeId, name, price, image, category
  updateMenu = async (storeId, menuId, name, price, image, category) => {
    const data = {
      name,
      price,
      image,
      category,
    };
    const updatedMenu = await this.dataSource.getRepository('menu').update(
      {
        storeId,
        menuId,
      },
      data
    );

    return {
      message: '수정이 완료됐습니다.',
    };
  };

  deleteMenu = async (storeId, menuId, name) => {
    await this.dataSource.getRepository('Menu').delete({
      storeId,
      menuId,
      name,
    });

    return { message: '삭제되었습니다.' };
  };
}
