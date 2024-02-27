import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
// import errorHandler from "./middleware/error-handling.middleware.js";
import usersRouter from "./src/routes/users.routes.js";
import verifyRouter from "./src/routes/verify.routes.js"
import { logger } from './config/winston.js';

dotenv.config();

const app = express();
const PORT = 3000;

const logRequests = (req, res, next) => {
    logger.info(`Received ${req.method} request for ${req.originalUrl}`);
    next();
};

app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser());
app.use(logRequests);
app.use("/api", [usersRouter, verifyRouter]);
// app.use(errorHandler);
app.listen(PORT, () => {
    console.log(PORT, "포트로 서버가 열렸어요!");
});