import { EntitySchema } from 'typeorm';

export const Menu = new EntitySchema({
  name: 'menu',
  tableName: 'menu',
  columns: {
    menuId: {
      primary: true,
      type: 'bigint',
      generated: true,
    },
    storeId: {
      type: 'bigint',
    },
    name: {
      type: 'varchar',
    },
    price: {
      type: 'int',
    },
    image: {
      type: 'text',
      nullable: true,
    },
    category: {
      type: 'varchar',
    },
  },
  relations: {
    restaurant: {
      target: 'restaurant',
      type: 'many-to-one',
      joinTable: true,
      //왜래키 설정(얘를 안쓰면 users + userId로 붙음 = usersuserId)
      joinColumn: { name: 'storeId' },
      cascade: true,
    },
  },
});
