const jwt = require("jsonwebtoken")

const adminVerify = (req,res,next)=>{
  const token = req.cookies.token 


  if(!token){
    return res.status(401).json({message:"not verified"})
  }

  try {
    const adminToken =jwt.verify(token,"adminsecretkey")
    req.adminToken = adminToken
    next();

    console.log(adminToken);
  } catch (error) {
   console.log(error);
    return res.status(401).json({message:error}) 
    
  }
}

module.exports= adminVerify