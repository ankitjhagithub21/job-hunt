import { Company } from "../models/company.model.js";
import { uploadFile } from "../utils/cloudinary.js";

export const registerCompany = async (req, res) => {
  if (req.role !== "recruiter") {
    return res
      .status(400)
      .json({ message: "You can't register company.", success: false });
  }

  const { name } = req.body;


  if (!name) {
    return res
      .status(400)
      .json({ message: "Company name is required.", success: false });
  }

  try {
    let company = await Company.findOne({ name });

    if (company) {
      return res
        .status(400)
        .json({ message: "Company name already found.", success: false });
    }
    
    company = await Company.create({
      name,
      userId: req.id,
    });

    res.status(201).json({
      message: "Company registered successfully.",
      success: true,
      company,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Server error.", success: false });
  }
};

export const getCompany = async (req, res) => {
  try {
    const companies = await Company.find({ userId: req.id });

    res.status(200).json(companies);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Server error.", success: false });
  }
};

export const getCompanyById = async (req, res) => {
  const companyId = req.params.id;

  try {
    const company = await Company.findById(companyId);

    if (!company) {
      return res
        .status(404)
        .json({ message: "Company not found.", success: false });
    }

    res.status(200).json({ success: true, company });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Server error.", success: false });
  }
};

export const updateCompany = async (req, res) => {

    if (req.role !== "recruiter") {
    return res
      .status(400)
      .json({ message: "You can't update company.", success: false });
  }

  const companyId = req.params.id;

   const {name,location,description,website} = req.body;
 
   
  try {
    let company = await Company.findById(companyId);

    if (!company) {
      return res
        .status(404)
        .json({ message: "Company not found.", success: false });
    }

    if(name) company.name = name;
    if(location) company.location = location;
    if(description) company.description = description;
    if(website) company.website = website;

    if(req.file){
       const url = await uploadFile(req.file.path);
       if(url){
         company.logo = url;
       }
    }

   await company.save(); 
 
    res.status(200).json({
      success: true,
      company,
      message: "Company information updated.",
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Server error.", success: false });
  }
};
