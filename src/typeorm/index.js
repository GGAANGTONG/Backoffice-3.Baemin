import { DataSource } from 'typeorm';
import dotenv from 'dotenv';
import { Coupons } from './entities/coupons.entity.js';
import { Menu } from './entities/menu.entity.js';
import { Orders } from './entities/orders.entity.js';
import { Point } from './entities/point.entity.js';
import { Restaurant } from './entities/restaurant.entity.js';
import { Review } from './entities/review.entity.js';
import { Users } from './entities/users.entity.js';

dotenv.config();
const dataSource = new DataSource({
  type: 'mysql',
  host: process.env.HOST,
  port: process.env.ORM_PORT,
  username: process.env.ORM_USERNAME,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  //database 동기화 명령(npx prisma db push랑 같음, 매우 위험)
  synchronize: false,
  entities: [Coupons, Menu, Orders, Point, Restaurant, Review, Users],
});
dataSource.initialize();
export { dataSource };
