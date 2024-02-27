import express from "express";
import { VerifyService } from "../service/verify.service.js";
import { VerifyController } from "../controller/verify.controller.js";

const router = express.Router();

const verifyService = new VerifyService()
const verifyController = new VerifyController(verifyService)

router.post('/email', verifyController.sendVerifyEmail);
router.get('/verify', verifyController.verifyEmail);

export default router;