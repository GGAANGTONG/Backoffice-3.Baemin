import express from 'express';
import restaurantRouter from './restaurant.router.js';
import menuRouter from './menu.router.js';
const app = express();

app.use('/restaurants', restaurantRouter);
app.use('/menu', menuRouter);
