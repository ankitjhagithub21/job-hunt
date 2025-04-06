import express from "express";
import { register,login,logout, updateProfile } from "../controllers/user.controller.js";
import { isAuth } from "../middlewares/isAuth.js";
const router = express.Router();


router.post("/register",register)
router.post("/login",login)
router.post("/profile/update",isAuth,updateProfile)
router.get("/logout",logout)

export default router;