import jwt from "jsonwebtoken"
export const isAuth = (req,res,next) => {
    const token = req.cookies.token || req.headers["authorization"]?.split(' ')[1];

    if(!token){
        return res.status(401).json({success:false,message:"Token not provided."})
    }
    
    try{

        const decoded = jwt.verify(token,process.env.JWT_SECRET);

        if(!decoded){
            return res.status(401).json({success:false,message:"Unauthorized."})
        }

        req.id = decoded.userId;
        req.role = decoded.role;
        next();

    }catch(error){
        res.status(401).json({success:false,message:"Unauthorized."})
    }
}