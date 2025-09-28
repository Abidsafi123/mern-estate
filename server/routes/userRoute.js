import express from "express";
import { updateProfile,deleteProfile,getUser,getUser1 } from "../controller/userController.js";

const router = express.Router();
router.put("/:id", updateProfile);
router.delete("/delete/:id", deleteProfile);
router.get('/show/:id',getUser)
router.get('/:id',getUser1)

export default router;
