import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import errorHandler from "./middleware/error-handling.middleware.js";
import usersRouter from "./src/routes/users.routes.js";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser());
app.use("/users", usersRouter);
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(PORT, "포트로 서버가 열렸어요!");
});