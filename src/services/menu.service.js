export class MenuService {
  constructor(menuRepository, restaurantService) {
    this.menuRepository = menuRepository;
    this.restaurantService = restaurantService;
  }

  createMenu = async (email, name, price, image, category) => {
    const ownersRestaurant =
      await this.restaurantService.findOwnersRestaurant(email);

    if (!ownersRestaurant) {
      throw new Error('고객님의 가게 정보가 존재하지 않습니다.');
    }
    const storeId = ownersRestaurant.storeId;
    const createdMenu = await this.menuRepository.createMenu(
      storeId,
      name,
      price,
      image,
      category
    );

    return createdMenu;
  };

  findAllMenu = async (storeId) => {
    const allMenu = await this.menuRepository.findAllMenu(storeId);

    return allMenu;
  };
  findMenu = async (storeId, name) => {
    const Menu = await this.menuRepository.findOne(storeId, name);

    return Menu;
  };

  updateMenu = async (menuId, name, price, image, category) => {
    const ownersRestaurant =
      await this.restaurantService.findOwnersRestaurant(email);

    if (!ownersRestaurant) {
      throw new Error('고객님의 가게 정보가 존재하지 않습니다.');
    }
    const storeId = ownersRestaurant.storeId;
    const updatedMenu = await this.menuRepository.updateMenu(
      storeId,
      menuId,
      name,
      price,
      image,
      category
    );

    return updatedMenu;
  };

  deleteMenu = async (menuId, name) => {
    const ownersRestaurant =
      await this.restaurantService.findOwnersRestaurant(email);

    if (!ownersRestaurant) {
      throw new Error('고객님의 가게 정보가 존재하지 않습니다.');
    }
    const storeId = ownersRestaurant.storeId;
    const deletedMenu = await this.menuRepository.deleteMenu(
      storeId,
      menuId,
      name
    );

    return deletedMenu;
  };
}
