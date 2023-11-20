const jwt = require('jsonwebtoken')

const jwtMiddleware = (req,res,next) => {
    console.log("Inside Middleware");
    const token = req.headers['authorization'].split(" ")[1]
    // console.log(token);
  try{
    const jwtResponse = jwt.verify(token,"supersecretkey12345")
    console.log(jwtResponse);
    req.payload = jwtResponse.userId
    // console.log(req.payload);
    next()
  }catch(err){
    res.status(401).json("Autherization failed!!! please login...")
  }
    
}

module.exports = jwtMiddleware