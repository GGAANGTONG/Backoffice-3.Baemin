import { EntitySchema } from 'typeorm';
const role = {
  user: '회원',
  owner: '식당 주인',
  admin: '관리자',
};
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
      unique: true,
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
    verify: {
      type: 'boolean',
      default: false,
    },
    grade: {
      type: 'varchar',
      default: '고마운 분',
    },
    role: {
      type: 'enum',
      enum: role,
      default: role.user,
    },
    address: {
      type: 'varchar',
      nullable: true,
    },
    createdAt: {
      type: 'datetime',
      default: () => 'CURRENT_TIMESTAMP',
    },
    updatedAt: {
      type: 'datetime',
      default: () => 'CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP',
    },
    point: {
      type: 'bigint',
      default: 0,
    },
  },
});
