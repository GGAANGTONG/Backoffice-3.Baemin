export class RestaurantRepository {
  constructor(dataSource) {
    this.dataSource = dataSource;
  }

  //1. 업장 정보 생성
  createRestaurant = async (name, content, address, email, phone) => {
    try {
      const data = {
        name,
        content,
        address,
        email,
        phone,
      };

      await this.dataSource.getRepository('restaurant').insert(data);

      return {
        status: 201,
        message: '가게 정보가 등록되었습니다.',
      };
    } catch (error) {
      return res.status;
    }
  };

  findAllRestaurant = async (name) => {
    const allRestaurant = await this.dataSource
      .getRepository('restaurant')
      .find({
        where: {
          name: includes(name),
        },
        select: {
          name: true,
        },
      });

    return allRestaurant;
  };
  findRestaurant = async (name) => {
    const restaurant = await this.dataSource
      .getRepository('restaurant')
      .findOne({
        where: {
          name,
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

    return restaurant;
  };

  findOwnersRestaurant = async (email) => {
    const ownersRestaurant = await this.dataSource
      .getRepository('restaurant')
      .findOne({
        where: {
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

    return ownersRestaurant;
  };

  updateRestaurant = async (name, content, email) => {
    const data = {
      content,
    };
    const updatedRestaurant = await this.dataSource
      .getRepository('restaurant')
      .update(
        {
          name,
          email,
        },
        data
      );

    return {
      message: '수정이 완료됐습니다.',
    };
  };

  deleteRestaurant = async (name, email) => {
    await this.dataSource.getRepository('restaurant').delete({
      name,
      email,
    });

    return { message: '삭제되었습니다.' };
  };
}
