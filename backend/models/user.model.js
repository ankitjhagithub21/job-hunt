import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
    trim:true,
    minlength:3
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },

  role: {
    type: String,
    enum: ["student", "recruiter"],
    required: true,
  },
  profile: {
    bio: { type: String, trim:true },
    skills: [
      {
        type: String,
      },

    ],
    resume:{
        type:String
    },
    resumeOriginalName:{
        type:String
    },
    company:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Company"
    },
    profilePhoto:{
        type:String,
        default:"https://cdn-icons-png.flaticon.com/512/219/219983.png"
    }
  },
},{timestamps:true,versionKey:false});

userSchema.pre('save', async function(next) {
  // Check if the password field was modified
  if (!this.isModified('password')) {
    return next();  // Proceed without modifying the password if it's not modified
  }

  // Generate a salt and hash the password
  const salt = await bcrypt.genSalt(12);
  const hashedPassword = await bcrypt.hash(this.password, salt);
  
  // Assign the hashed password back to the password field
  this.password = hashedPassword;

  next();  // Continue with the save operation
});



export const User = mongoose.model('User',userSchema)
