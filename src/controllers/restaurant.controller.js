export class RestaurantController {
  constructor(restaurantService) {
    this.restaurantService = restaurantService;
  }

  createRestaurant = async (req, res, next) => {
    try {
      // phone, address req.body로 이동
      const { email } = req.locals.user;
      const { name, content, address, phone } = req.body;
      console.log('국밥', name);
      if (name === undefined || name === null) {
        throw new Error('등록하고 싶은 가게 정보를 입력해 주세요.');
      }
      const createdRestaurant = await this.restaurantService.createRestaurant(
        name,
        content,
        address,
        email,
        phone
      );

      return res.status(201).json({ createdRestaurant });
    } catch (error) {
      return res.status(404).json({ error });
    }
  };

  findAllRestaurant = async (req, res, next) => {
    try {
      const allRestaurant = await this.restaurantService.findAllRestaurant();

      return allRestaurant;
    } catch (error) {
      return res.status(500).json({ error: '알 수 없는 에러입니다.' });
    }
  };

  findAllRestaurantByName = async (req, res, next) => {
    try {
      const { name } = req.params;

      if (name === undefined || name === null) {
        throw new Error('찾고 싶은 가게 이름을 입력해 주세요.');
      }
      const allRestaurant =
        await this.restaurantService.findAllRestaurantByName(name);

      return res.status(200).json({ allRestaurant });
    } catch (error) {
      return res.status(404).json({ error });
    }
  };
  findRestaurant = async (req, res, next) => {
    try {
      const { name } = req.params;
      if (name === undefined || name === null) {
        throw new Error('찾고 싶은 가게 이름을 입력해 주세요.');
      }
      const restaurant = await this.restaurantService.findRestaurant(name);

      return res.status(200).json({ restaurant });
    } catch (error) {
      return res.status(404).json({ error });
    }
  };

  findOwnersRestaurant = async (req, res, next) => {
    try {
      const { email } = req.locals.user;

      const ownersRestaurant =
        await this.restaurantService.findOwnersRestaurant(email);

      return res.status(200).json({ ownersRestaurant });
    } catch (error) {
      return res.status(404).json({ error });
    }
  };

  updateRestaurant = async (req, res, next) => {
    try {
      const { email } = req.locals.user;
      const { name, content } = req.body;
      if (name === undefined || name === null) {
        throw new Error('업데이트 정보를 입력해 주세요.');
      }

      const updatedRestaurant = await this.restaurantService.updateRestaurant(
        name,
        content,
        email
      );

      return res.status(201).json({ updatedRestaurant });
    } catch (error) {
      return res.status(404).json({ error });
    }
  };

  deleteRestaurant = async (req, res, next) => {
    try {
      const { email } = req.locals.user;
      const { name } = req.body;

      if (name === undefined || name === null) {
        throw new Error('고객님의 가게명을 입력해 주세요.');
      }

      const deletedRestaurant = await this.restaurantService.deleteRestaurant(
        name,
        email
      );

      return res.status(200).json({ deletedRestaurant });
    } catch (error) {
      return res.status(404).json({ error });
    }
  };
}
