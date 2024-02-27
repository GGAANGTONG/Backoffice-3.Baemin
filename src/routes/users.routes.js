import express from "express";
import usersController from "../controller/users.controller.js"
import jwtValidate from "../../middleware/jwt-validate.middleware.js";

const router = express.Router();

router.post('/sign-up', usersController.signUp)
router.post('/sign-in', usersController.signIn)
router.get('/get-info', jwtValidate, usersController.getInfo)

export default router  