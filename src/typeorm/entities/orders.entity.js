import { EntitySchema } from 'typeorm';

const status = {
  PREPARE: '배달 전',
  DELIVERING: '배달 중',
  DELIVERED: '배달 완료',
};

export const Orders = new EntitySchema({
  name: 'orders',
  tableName: 'orders',
  columns: {
    orderId: {
      primary: true,
      type: 'bigint',
      generated: true,
    },
    storeId: {
      type: 'bigint',
    },
    userId: {
      type: 'bigint',
    },
    status: {
      type: 'enum',
      enum: status,
      default: status.PREPARE,
    },
    address: {
      type: 'varchar',
    },
  },
  relations: {
    users: {
      target: 'users',
      type: 'many-to-one',
      joinTable: true,
      //외래키 설정(얘를 안쓰면 users + userId로 붙음 = usersuserId)
      joinColumn: { name: 'userId' },
      cascade: true,
    },
    restaurant: {
      target: 'restaurant',
      type: 'many-to-one',
      joinTable: true,
      //외래키 설정(얘를 안쓰면 users + userId로 붙음 = usersuserId)
      joinColumn: { name: 'storeId' },
      cascade: true,
    },
  },
});
