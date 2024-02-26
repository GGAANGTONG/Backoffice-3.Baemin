// app.js

import express from 'express';
import cookieParser from 'cookie-parser';
import ReviewsRouter from './routes/reivews.router.js';
import "dotenv/config";




const app = express();
const PORT = 3018;

app.use(express.json());
app.use(cookieParser());
app.use('/api', [UsersRouter, ReviewsRouter]);


app.listen(PORT, () => {
  console.log(PORT, '포트로 서버가 열렸어요!');
});



