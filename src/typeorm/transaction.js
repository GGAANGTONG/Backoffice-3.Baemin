import { createConnection } from 'typeorm';
import dotenv from 'dotenv';
import { Coupons } from './entities/coupons.entity.js';
import { Menu } from './entities/menu.entity.js';
import { Orders } from './entities/orders.entity.js';
import { Point } from './entities/point.entity.js';
import { Restaurant } from './entities/restaurant.entity.js';
import { Review } from './entities/review.entity.js';
import { Users } from './entities/users.entity.js';
// 취소선 있는 코드는 앵간하면 쓰면 안된다.

dotenv.config();

const initializeDatabase = async () => {
  try {
    const connection = await createConnection({
      type: 'mysql',
      host: process.env.ORM_HOST,
      port: process.env.ORM_PORT,
      username: process.env.ORM_USERNAME,
      password: process.env.ORM_PASSWORD,
      database: process.env.ORM_DATABASE,
      synchronize: false,
      entities: [Coupons, Menu, Orders, Point, Restaurant, Review, Users],
      migrations: ['src/typeorm/migrations/*.js'],
      cli: {
        entitiesDir: 'src/typeorm/entities',
        migrationsDir: 'src/typeorm/migrations',
      },
      logging: true,
    });
    console.log('Database connection established');
    return connection;
  } catch (error) {
    console.error('Error connecting to the database:', error);
    throw error;
  }
};

export { initializeDatabase };
