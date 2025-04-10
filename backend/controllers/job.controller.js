import { Company } from "../models/company.model.js";
import { Job } from "../models/job.model.js";

export const postJob = async (req, res) => {
  const {
    title,
    description,
    requirements,
    jobType,
    experience,
    positions,
    companyId,
    salary,
    location,
  } = req.body;

  const userId = req.id;

  if (
    !title ||
    !description ||
    !requirements ||
    !jobType ||
    !experience ||
    !positions ||
    !salary ||
    !companyId ||
    !location
  ) {
    return res
      .status(400)
      .json({ message: "All fields are required.", success: false });
  }

  if (req.role !== "recruiter") {
    return res
      .status(400)
      .json({ message: "You can't create job.", success: false });
  }

  const company = await Company.findById(companyId);

  if (!company) {
    return res
      .status(404)
      .json({ message: "Company not found", success: false });
  }

  try {
    const job = await Job.create({
      title,
      description,
      requirements: requirements.split(","),
      salary: Number(salary),
      location,
      jobType,
      positions: Number(positions),
      company: company._id,
      experience: Number(experience),
      created_by: userId,
    });

    res
      .status(201)
      .json({ message: "New job created successfully.", success: true, job });
  } catch (error) {
    res.status(500).json({ message: "Server error.", success: false });
  }
};

export const getAllJobs = async (req, res) => {
  const { keyword = "" } = req.query; // Destructuring with default value

  try {
    const query = keyword
      ? {
          $or: [
            { title: { $regex: keyword, $options: "i" } },
            { description: { $regex: keyword, $options: "i" } },
            { location: { $regex: keyword, $options: "i" } },
           
          
          ],
        }
      : {}; // If there's no keyword, just return all jobs without any filtering

    const jobs = await Job.find(query).populate("company").sort({createdAt:-1});

    res.status(200).json(jobs);
  } catch (error) {
    console.error(error); // Log error for debugging
    res.status(500).json({ message: "Server error.", success: false });
  }
};

//student
export const getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id).populate('company applications');

    if (!job) {
      return res
        .status(404)
        .json({ message: "Job not found.", success: false });
    }
    res.status(200).json(job);
  } catch (error) {
    res.status(500).json({ message: "Server error.", success: false });
  }
};

export const getAdminJobs = async (req, res) => {
  
  try {
    const adminId = req.id;

    const jobs = await Job.find({ created_by: adminId }).populate({
      path:"company",
      select:"name"
    });

    res.status(200).json(jobs);
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Server error.", success: false });
  }
};
