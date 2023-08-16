
const jwt = require("jsonwebtoken")

const createToken = (req,res,next)=>{
  const Token = req.cookies.token 
  // console.log(token)

  if(!Token){
    return res.status(401).json({message:"not verified"})
  }

  try {
    const verified =jwt.verify(Token,"mysecretkey")
    req.user= verified
    next();

    
  } catch (error) {
   console.log(error); 
    return res.status(401).json({message:"invalid token"})
    
  }
}

module.exports=createToken