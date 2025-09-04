import express from "express";
import { updateProfile } from "../controller/userController.js";

const router = express.Router();
router.put("/:id", updateProfile);   // ✅ use PUT

export default router;
