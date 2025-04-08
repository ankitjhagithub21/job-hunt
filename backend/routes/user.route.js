import express from "express";
import { register,login,logout, updateProfile } from "../controllers/user.controller.js";
import { isAuth } from "../middlewares/isAuth.js";
import { upload } from "../middlewares/multer.js";

const router = express.Router();


router.post("/register",register)
router.post("/login",login)
router.post("/update/profile",isAuth,upload.single('resume'),updateProfile)
router.get("/logout",logout)

export default router;