import { Application } from "../models/application.model.js";
import { Job } from "../models/job.model.js";

export const applyJob = async (req, res) => {
  const userId = req.id;
  const jobId = req.params.id;

  if (!jobId) {
    return res
      .status(400)
      .json({ message: "Job id is required", success: false });
  }

  if (req.role !== "student") {
    return res
      .status(400)
      .json({ message: "You can't apply job.", success: false });
  }

  try {

    const job = await Job.findById(jobId);

    if (!job) {
      return res.status(404).json({ message: "Job not found", success: false });
    }


    const application = await Application.findOne({
      job: job._id,
      applicant: userId,
    });

    if (application) {
      return res
        .status(404)
        .json({
          message: "You have already applied to this job",
          success: false,
        });
    }

    
    const newApplication = await Application.create({
        job:job._id,
        applicant:userId,
    });

    job.applications.push(newApplication._id);
    await job.save();

    res
      .status(200)
      .json({ message: "Job applied successfully.", success: true });

  } catch (error) {
    console.log(error.message)
    res.status(500).json({ message: "Server error.", success: false });
  }
};


export const getAppliedJobs = async(req,res) => {
    
    try{
        const userId = req.id;

        const applications = await Application.find({applicant:userId})
        .sort({createdAt:-1})
        // .populate({
        //     path:"job",
        //     options:{sort:{createdAt:-1}},
        //     populate:{
        //         path:"company",
        //         options:{sort:{createdAt:-1}},
        //     }
        // })
       

        res.status(200).json(applications)
    }catch(error){
        console.log(error.message)
        res.status(500).json({ message: "Server error.", success: false });
    }
}

export const getApplicants = async(req,res) => {
    
    try{
        const jobId = req.params.id;

        const job = await Job.findById(jobId).populate({
            path:"applications",
            options:{sort:{createdAt:-1}},
            populate:{
                path:"applicant"
            }
        })

        if(!job){
            return res.status(404).json({
                message:"Job not found",
                success:false
            })
        }

        res.status(200).json(job)
    }catch(error){
        console.log(error.message)
        res.status(500).json({ message: "Server error.", success: false });
    }
}

export const updateStatus = async(req,res) => {
   

    if(req.role !== "recruiter"){
        return res.status(400).json({success:false,message:"You can't change application status"})
    }

    try{
       const {status} = req.body;


       if(!status){
        return res.status(400).json({success:false,message:"Status is required."})

       }
       const applicationId = req.params.id;
       
       const application = await Application.findById(applicationId);

        if(!application){
            return res.status(404).json({
                message:"Application not found",
                success:false
            })
        }

        application.status = status.toLowerCase();

        await application.save();

        res.status(200).json({
            message:"Application updated succcessfully.",
           success:true ,
           application
        })
    }catch(error){
        console.log(error.message)
        res.status(500).json({ message: "Server error.", success: false });
    }
}
