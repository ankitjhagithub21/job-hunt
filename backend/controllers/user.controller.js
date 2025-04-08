import { User } from "../models/user.model.js";
import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { uploadFile} from "../utils/cloudinary.js";

export const register = async (req, res) => {
  const { fullName, email, phone, password, role } = req.body;

  if (!fullName || !email || !phone || !password || !role) {
    return res
      .status(400)
      .json({ message: "All fields are required.", success: false });
  }

  if (!validator.isEmail(email)) {
    return res.status(400).json({ message: "Invalid email.", success: false });
  }

  try {
    const user = await User.findOne({ email });

    if (user) {
      return res
        .status(400)
        .json({ message: "User already exist.", success: false });
    }

    if (!validator.isStrongPassword(password)) {
      return res
        .status(400)
        .json({ message: "Please enter strong password.", success: false });
    }

    if (!validator.isMobilePhone(phone)) {
      return res.status(400).json({
        message: "Please enter correct phone number.",
        success: false,
      });
    }
    if (role !== "student" && role !== "recruiter") {
      return res.status(400).json({ message: "Invalid role.", success: false });
    }

    await User.create({
      fullName,
      email,
      phone,
      password,
      role,
    });

    res
      .status(201)
      .json({ message: "User registered Successfully.", success: true });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Server error.", success: false });
  }
};

export const login = async (req, res) => {
  const { email, password, role } = req.body;

  if (!email || !password || !role) {
    return res
      .status(400)
      .json({ message: "All fields are required.", success: false });
  }

  if (!validator.isEmail(email)) {
    return res.status(400).json({ message: "Invalid email.", success: false });
  }

  try {
    let user = await User.findOne({ email });

    if (!user) {
      return res
        .status(400)
        .json({ message: "User not found.", success: false });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return res
        .status(400)
        .json({ message: "Wrong email or password.", success: false });
    }

    if (role != user.role) {
      return res.status(400).json({
        message: "Account does not exit with current role.",
        success: false,
      });
    }

    const payload = {
      userId: user._id,
      role: user.role,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    user = {
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      phone: user.phone,
      role: user.role,
      profile: user.profile,
    };

    res
      .status(200)
      .cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 1 * 24 * 60 * 60 * 1000,
      })
      .json({ message: `Welcome back ${user.fullName}`, success: true, user });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Server error.", success: false });
  }
};

export const logout = (req, res) => {
  return res
    .status(200)
    .cookie("token", "", {
      maxAge: 0,
    })
    .json({ message: "Log out successfully.", success: true });
};

export const updateProfile = async (req, res) => {
  const { fullName, phone, bio, skills } = req.body;

  let skillsArray;
  if (skills) {
    skillsArray = skills.split(",");
  }

  try {
    const userId = req.id;

    let user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found.", success: false });
    }

    // Handle multiple profile photos
    if (req.files.profilePhoto) {
      let url = await uploadFile(req.files.profilePhoto[0].path);  // Handle single file
      if (url) {
        user.profile.profilePhoto = url;
      }
    }

    // Handle resume
    if (req.files.resume) {
      let url = await uploadFile(req.files.resume[0].path); // Handle single file
      if (url) {
        user.profile.resume = url;
      }
    }

    // Handle other profile fields
    if (fullName) user.fullName = fullName;
    if (phone) user.phone = phone;
    if (bio) user.profile.bio = bio;
    if (skills) user.profile.skills = skillsArray;

    await user.save();

    user = {
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      phone: user.phone,
      role: user.role,
      profile: user.profile,
    };

    res.status(200).json({ message: "Profile updated Successfully.", success: true, user });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Server error.", success: false });
  }
};

