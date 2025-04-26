import z from "zod";

export const loginSchema = z.object({
    email:z.string().email("Invalid email address."),
    password:z.string()
    .min(8,"Password must be atleast 8 characters")
    .regex(/[A-Z]/,'Password must contain atleast 1 uppercase letter.')
    .regex(/[a-z]/,'Password must contain atleast 1 lower case letter.')
    .regex(/[0-9]/,"Password must contain atleast one number.")
    .regex(/[^A-Za-z0-9]/, "Password must contain at least one special character."),
    role:z.enum(["student","recruiter"],{message:"Role is required."})
})

export const signupSchema = z.object({
    fullName:z.string().trim().min(3, {message:"Name atleast 3 characters long."}),
    email:z.string().email("Invalid email address."),
    phone:z.string().trim().min(10).max(10),
    password:z.string()
    .min(8,"Password must be atleast 8 characters")
    .regex(/[A-Z]/,'Password must contain atleast 1 uppercase letter.')
    .regex(/[a-z]/,'Password must contain atleast 1 lower case letter.')
    .regex(/[0-9]/,"Password must contain atleast one number.")
    .regex(/[^A-Za-z0-9]/, "Password must contain at least one special character."),
    role:z.enum(["student","recruiter"],{message:"Role is required."})
})

