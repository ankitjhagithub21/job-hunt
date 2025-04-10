import express from "express";
import { isAuth } from "../middlewares/isAuth.js";
import { getCompany, getCompanyById, registerCompany, updateCompany } from "../controllers/company.controller.js";
import { upload } from "../middlewares/multer.js";
const router = express.Router();


router.post("/register",isAuth,registerCompany)
router.get("/",isAuth,getCompany)
router.get("/:id",getCompanyById)
router.put("/update/:id",isAuth,upload.single('logo'),updateCompany)


export default router;