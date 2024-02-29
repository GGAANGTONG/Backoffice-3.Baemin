export class MenuController {
  constructor(menuService) {
    this.menuService = menuService;
  }

  createMenu = async (req, res, next) => {
    try {
      const { email } = res.locals.user;
      const { name, price, image, category } = req.body;

      if (
        name === undefined ||
        name === null ||
        price === undefined ||
        price === null ||
        category === undefined ||
        category === null
      ) {
        throw new Error('등록하고 싶은 메뉴 정보를 입력해 주세요.');
      }
      const createdMenu = await this.menuService.createMenu(
        email,
        name,
        price,
        image,
        category
      );

      return res.status(201).json({ createdMenu });
    } catch (error) {
      return res.status(404).json({ error });
    }
  };

  findAllMenu = async (req, res, next) => {
    try {
      const { storeId } = req.params;
      if (storeId === undefined || storeId === null) {
        throw new Error('알 수 없는 오류가 발생했습니다.');
      }
      const allMenu = await this.menuService.findAllMenu(storeId);

      return res.status(200).json({ allMenu });
    } catch (error) {
      return res.status(500).json({ error });
    }
  };
  findMenu = async (req, res, next) => {
    try {
      // 일단 파람에 넣어둠
      const storeId = req.params.storeId;
      const name = req.params.name;
      if (storeId === undefined || storeId === null) {
        throw new Error('알 수 없는 오류가 발생했습니다.');
      }
      // const { name } = req.query;
      if (name === undefined || name === null) {
        throw new Error('메뉴 정보가 존재하지 않습니다.');
      }
      const Menu = await this.menuService.findMenu(storeId, name);
      return res.status(200).json({ Menu });
    } catch (error) {
      return res.status(500).json({ error });
      //name 에러 케이스
      //return res.status(404).json({error})
    }
  };

getRestaurantsByCategory = async (req, res) => {
    try {
      const category = req.params.category;
      console.log(1,category);
      const restaurants = await this.menuService.getRestaurantsByCategory(category);
     return res.json({restaurants});
    } catch (error) {
     return res.status(500).send(error.message);
    }
  };

  findOwnersMenu = async (req, res, next) => {
    try {
      const { email } = res.locals.user;

      const ownersRestaurant =
        await this.restaurantService.findOwnersRestaurant(email);

      return res.status(200).json({ ownersRestaurant });
    } catch (error) {
      return res.status(404).json({ error });
    }
  };

  updateMenu = async (req, res, next) => {
    try {
      const { email } = res.locals.user;
      const menuId = req.params.menuId;
      const { name, price, image, category } = req.body;
      if (
        name === undefined ||
        name === null ||
        price === undefined ||
        price === null ||
        category === undefined ||
        category === null
      ) {
        throw new Error('등록하고 싶은 메뉴 정보를 입력해 주세요.');
      }
      const updatedMenu = await this.menuService.updateMenu(
        menuId,
        email,
        name,
        price,
        image,
        category
      );

      return res.status(201).json({ updatedMenu });
    } catch (error) {
      return res.status(404).json({ error });
    }
  };

  deleteMenu = async (req, res, next) => {
    try {
      const { email } = res.locals.user;
      const menuId = req.params.menuId;
      const { name } = req.body;

      const deletedMenu = await this.menuService.deleteMenu(
        email,
        menuId,
        name
      );

      return res.status(200).json({ deletedMenu });
    } catch (error) {
      return res.status(404).json({ error });
    }
  };
}
