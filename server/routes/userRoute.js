import express from "express";
import { updateProfile,deleteProfile,getUser } from "../controller/userController.js";

const router = express.Router();
router.put("/:id", updateProfile);
router.delete("/delete/:id", deleteProfile);
router.get('/show/:id',getUser)

export default router;
