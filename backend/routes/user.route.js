import express from "express";
import { register,login,logout, updateProfile, getUser } from "../controllers/user.controller.js";
import { isAuth } from "../middlewares/isAuth.js";
import { upload } from "../middlewares/multer.js";

const router = express.Router();

const fields = [
    { name: 'profilePhoto', maxCount: 1 },
    { name: 'resume', maxCount: 1 }
]

router.post("/register",register)
router.post("/login",login)
router.post("/update/profile",isAuth,upload.fields(fields),updateProfile)
router.get("/logout",logout)
router.get("/auth",isAuth,getUser)

export default router;