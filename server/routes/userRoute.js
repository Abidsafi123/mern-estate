import express from "express";
import { updateProfile,deleteProfile } from "../controller/userController.js";

const router = express.Router();
router.put("/:id", updateProfile);
router.delete("/delete/:id", deleteProfile);    // ✅ use PUT

export default router;
