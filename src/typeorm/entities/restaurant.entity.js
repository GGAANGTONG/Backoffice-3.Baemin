import { EntitySchema } from 'typeorm';

export const Restaurant = new EntitySchema({
  name: 'restaurant',
  tableName: 'restaurant',
  columns: {
    storeId: {
      primary: true,
      type: 'bigint',
      generated: true,
    },
    name: {
      type: 'varchar',
    },
    content: {
      type: 'text',
      nullable: true,
    },
    address: {
      type: 'varchar',
    },
    email: {
      type: 'varchar',
    },
    phone: {
      type: 'varchar',
    },
    rating: {
      type: 'tinyint',
    },
  },
});
