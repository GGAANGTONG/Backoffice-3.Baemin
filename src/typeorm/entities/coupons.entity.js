import { EntitySchema } from 'typeorm';

export const Coupons = new EntitySchema({
  name: 'coupons',
  tableName: 'coupons',
  columns: {
    couponId: {
      primary: true,
      type: 'bigint',
      generated: true,
    },
    userId: {
      type: 'bigint',
    },
    name: {
      type: 'varchar',
    },
    content: {
      type: 'varchar',
      nullable: true,
    },
    deductedPrice: {
      type: 'int',
      nullable: true,
    },
    createdAt: {
      type: 'datetime',
    },
    updatedAt: {
      type: 'datetime',
      default: () => 'CURRENT_TIMESTAMP',
      onUpdate: () => 'CURRENT_TIMESTAMP',
    },
  },
  relations: {
    users: {
      target: 'users',
      type: 'many-to-one',
      joinTable: true,
      //왜래키 설정(얘를 안쓰면 users + userId로 붙음 = usersuserId)
      joinColumn: { name: 'userId' },
      cascade: true,
    },
  },
});
