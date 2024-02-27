import express from "express";
import { verifyController } from "../controller/verify.controller.js";

const router = express.Router();

router.post('/email', verifyController.sendVerifyEmail);
router.get('/verify', verifyController.verifyEmail);

export default router;