import express from "express";
import { register } from "../controller/user_Auth.js";
const router = express.Router();
router.post("/register", register);
export default router;
