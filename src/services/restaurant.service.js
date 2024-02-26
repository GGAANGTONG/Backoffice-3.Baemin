export class RestaurantService {
  constructor(restaurantRepository) {
    this.restaurantRepository = restaurantRepository;
  }

  createRestaurant = async (name, content, address, email, phone) => {
    const createdRestaurant = await this.restaurantRepository.createRestaurant(
      name,
      content,
      address,
      email,
      phone
    );
    return createdRestaurant;
  };

  findAllRestaurant = async (name) => {
    const allRestaurant =
      await this.restaurantRepository.findAllRestaurant(name);

    return allRestaurant;
  };
  findRestaurant = async (name) => {
    const restaurant = await this.restaurantRepository.findRestaurant(name);

    return restaurant;
  };

  findOwnersRestaurant = async (email) => {
    const ownersRestaurant =
      await this.restaurantRepository.findOwnersRestaurant(email);

    return { ownersRestaurant };
  };

  updateRestaurant = async (name, content, email) => {
    const toUpdateRestaurant =
      await this.restaurantService.findOwnersRestaurant(email);

    if (!toUpdateRestaurant) {
      throw new Error('고객님의 가게 정보가 존재하지 않습니다.');
    }

    const data = {
      content,
    };
    const updatedRestaurant = await this.restaurantRepository.updatedRestaurant(
      name,
      content,
      email
    );

    return updatedRestaurant;
  };

  deleteRestaurant = async (name, email) => {
    const toDeleteRestaurant =
      await this.restaurantService.findOwnersRestaurant(email);

    if (!toDeleteRestaurant) {
      throw new Error('고객님의 가게 정보가 존재하지 않습니다.');
    }

    const deletedRestaurant = await this.restaurantRepository.deleteRestaurant(
      name,
      email
    );

    return deletedRestaurant;
  };
}
