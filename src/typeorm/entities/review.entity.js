import { EntitySchema } from 'typeorm';

export const Review = new EntitySchema({
  name: 'review',
  tableName: 'review',
  columns: {
    reviewId: {
      primary: true,
      type: 'bigint',
      generated: true,
    },
    storedId: {
      type: 'bigint',
    },
    userId: {
      type: 'bigint',
    },
    menuId: {
      type: 'bigint',
    },
    content: {
      type: 'text',
    },
    rvPhotos: {
      type: 'text',
      nullable: true,
    },
    createdAt: {
      type: 'datetime',
    },
    updatedAt: {
      type: 'datetime',
      default: () => 'CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP',
    },
    rating: {
      type: 'tinyint',
    },
  },
  relations: {
    users: {
      target: 'users',
      //target이 대상임(to 이후)
      type: 'many-to-one',
      joinTable: true,
      //왜래키 설정(얘를 안쓰면 users + userId로 붙음 = usersuserId)
      joinColumn: { name: 'userId' },
      cascade: true,
    },
    restaurant: {
      target: 'restaurant',
      //target이 대상임(to 이후)
      type: 'many-to-one',
      joinTable: true,
      //왜래키 설정(얘를 안쓰면 users + userId로 붙음 = usersuserId)
      joinColumn: { name: 'storeId' },
      cascade: true,
    },
    menu: {
      target: 'menu',
      //target이 대상임(to 이후)
      type: 'many-to-one',
      joinTable: true,
      //왜래키 설정(얘를 안쓰면 users + userId로 붙음 = usersuserId)
      joinColumn: { name: 'menuId' },
      cascade: true,
    },
  },
});
