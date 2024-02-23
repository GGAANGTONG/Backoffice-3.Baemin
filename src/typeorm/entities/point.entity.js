import { EntitySchema } from 'typeorm';

export const Point = new EntitySchema({
  name: 'point',
  tableName: 'point',
  columns: {
    pointId: {
      primary: true,
      type: 'bigint',
      generated: true,
    },
    userId: {
      type: 'bigint',
    },
    point: {
      type: 'bigint',
      nullable: true,
    },
    createdAt: {
      type: 'datetime',
    },
    updatedAt: {
      type: 'datetime',
      default: () => 'CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP',
    },
  },
  relations: {
    users: {
      target: 'users',
      type: 'one-to-one',
      joinTable: true,
      //왜래키 설정(얘를 안쓰면 users + userId로 붙음 = usersuserId)
      joinColumn: { name: 'userId' },
      cascade: true,
    },
  },
});
