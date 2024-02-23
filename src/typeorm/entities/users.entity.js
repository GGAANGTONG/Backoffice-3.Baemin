import { EntitySchema } from 'typeorm';

export const Users = new EntitySchema({
  name: 'users',
  tableName: 'users',
  columns: {
    userId: {
      primary: true,
      type: 'bigint',
      generated: true,
    },
    email: {
      type: 'varchar',
    },
    kakao: {
      type: 'varchar',
      //null허용
      nullable: true,
    },
    password: {
      type: 'varchar',
    },
    name: {
      type: 'varchar',
    },
    auth: {
      type: 'boolean',
    },
    grade: {
      type: 'varchar',
    },
    role: {
      type: 'enum',
    },
    address: {
      type: 'varchar',
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
    point: {
      type: 'bigint',
    },
  },
});
