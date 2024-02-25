import express from "express";
import usersController from "../controller/users.controller.js"
import jwtValidate from "../../middleware/auth.middleware.js"


const router = express.Router();

router.post('/sign-up', usersController.signUp)
router.post('/sign-in', usersController.signIn)
router.post('/get-info', usersController.getInfo)
router.post('/verify', usersController.verify)

export default router  