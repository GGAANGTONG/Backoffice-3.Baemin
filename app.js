import express from 'express';
import { dataSource } from './src/typeorm/index.js';
import cookieParser from 'cookie-parser';
// import errorHandler from "./middleware/error-handling.middleware.js";
import reviewsRouter from './src/routes/reviews.router.js';
import menuRouter from './src/routes/menu.router.js';
import restaurantRouter from './src/routes/restaurant.router.js';
import ordersRouter from './src/routes/orders.router.js';
import usersRouter from './src/routes/users.routes.js';
import verifyRouter from './src/routes/verify.routes.js';
import { logger } from './config/winston.js';
const app = express();
const PORT = 3000;
const logRequests = (req, res, next) => {
  logger.info(`Received ${req.method} request for ${req.originalUrl}`);
  next();
};
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(logRequests);
app.use('/api', [
  usersRouter,
  verifyRouter,
  ordersRouter,
  restaurantRouter,
  menuRouter,
  reviewsRouter,
]);

async function initializeApp() {
  try {
    await dataSource.initialize();
    console.log('데이터베이스 연결 성공!');
  } catch (error) {
    console.error('데이터베이스 연결 에러', error);
  }
}
initializeApp();

// app.use(errorHandler);
app.listen(PORT, () => {
  console.log(PORT, '포트로 서버가 열렸어요!');
});
