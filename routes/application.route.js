import express from "express";
import { isAuth } from "../middlewares/isAuth.js";
import { applyJob, getApplicants, getAppliedJobs, updateStatus } from "../controllers/application.controller.js";
const router = express.Router();

router.post("/apply/:id",isAuth,applyJob)
router.get("/applied",isAuth,getAppliedJobs)
router.put("/update/:id",isAuth,updateStatus)
router.get("/applicants/:id",isAuth,getApplicants)


export default router;