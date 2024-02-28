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

  findAllRestaurant = async () => {
    const allRestaurant = await this.restaurantRepository.findAllRestaurant();

    return allRestaurant;
  };

  findAllRestaurantByName = async (name) => {
    const allRestaurantByName =
      await this.restaurantRepository.findAllRestaurantByName(name);

    return allRestaurantByName;
  };
  findRestaurant = async (name) => {
    const restaurant = await this.restaurantRepository.findRestaurant(name);

    return restaurant;
  };

  findOwnersRestaurant = async (email) => {
    const ownersRestaurant =
      await this.restaurantRepository.findOwnersRestaurant(email);

    return ownersRestaurant;
  };

  updateRestaurant = async (name, content, email) => {
    const toUpdateRestaurant =
      await this.restaurantRepository.findOwnersRestaurant(email);
    //new Error가 아니라 상속받는 error를 만들어야 함
    if (!toUpdateRestaurant) {
      throw new Error('고객님의 가게 정보가 존재하지 않습니다.');
    }

    const updatedRestaurant = await this.restaurantRepository.updateRestaurant(
      name,
      content,
      email
    );

    return updatedRestaurant;
  };

  deleteRestaurant = async (name, email) => {
    const toDeleteRestaurant =
      await this.restaurantRepository.findOwnersRestaurant(email);

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
