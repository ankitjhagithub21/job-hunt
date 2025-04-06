import express from "express";
import { isAuth } from "../middlewares/isAuth.js";
import { getAdminJobs, getAllJobs, getJobById, postJob } from "../controllers/job.controller.js";

const router = express.Router();

router.post("/post",isAuth,postJob)
router.get("/",getAllJobs)
router.get("/admin",isAuth,getAdminJobs)
router.get("/:id",getJobById)



export default router;