const jwt = require('jsonwebtoken');


 const userAuth = async (req,res,next) => {
    
    try {
        const token = req.cookies.token;

        if(!token){
        return res.json({message:"No token"});
        }

        const tokenDecode = jwt.verify(token,process.env.JWT_SECRETKEY);
        
        if(tokenDecode.id){
            req.body.userId = tokenDecode.id;
        }else{
            return res.status(401).json({message:"Not Authorized Login Again"});
        }

        next();
    } catch (error) {
        return res.json({message:error.message});
    }
};


const authenticateUser = async (req, res, next) => {
  try {
      let token = null;

      // Extract token from different possible sources
      const authHeader = req.headers.authorization;
      if (authHeader && authHeader.startsWith('Bearer ')) {
          token = authHeader.split(' ')[1];
      } else if (req.cookies?.token) {
          token = req.cookies.token;
      } else if (req.headers.token) {
          token = req.headers.token;
      }

      if (!token) {
          return res.status(401).json({ success: false, message: "No token provided" });
      }

      // console.log("Token received:", token);

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRETKEY);
      // console.log("Decoded token:", decoded);

      if (!decoded || !decoded.id) {
          return res.status(401).json({ success: false, message: "Invalid token" });
      }

      req.body.userId = decoded.id; // Store user ID in `req`
      next();
  } catch (error) {
      console.error("JWT Error:", error.message);
      return res.status(401).json({ success: false, message: "Unauthorized", error: error.message });
  }
};

module.exports = {userAuth,authenticateUser}


// export const authenticate = async (req, res, next) => {
//     try {
        
//         const token  = req.cookies.token;
//         if (!token) {
//             return res.status(401).json({ success: false, message: "No token provided" });
//         }
//         const decoded = jwt.verify(token, process.env.JWT_SECRETKEY);
        
//         req.body.userId = decoded.id;
//         next();
//     } catch (error) {
//         return res.status(401).json({ success: false, message: "Invalid token" });
//     }
// };

//  const authenticate = async (req, res, next) => {
//   try {
//     // Check for token in multiple locations
//     const token = 
//       req.cookies.token || 
//       (req.headers.authorization && req.headers.authorization.startsWith('Bearer') 
//         ? req.headers.authorization.split(' ')[1] 
//         : null);
    
//     if (!token) {
//       return res.status(401).json({ success: false, message: "Authentication required" });
//     }
    
//     // Verify token
//     const decoded = jwt.verify(token, process.env.JWT_SECRETKEY);
    
//     // Store user info in req.user (standard practice) instead of modifying body
//     req.user = { id: decoded.id };
    
//     next();
//   } catch (error) {
//     // More specific error handling
//     if (error.name === 'TokenExpiredError') {
//       return res.status(401).json({ success: false, message: "Token expired" });
//     }
//     if (error.name === 'JsonWebTokenError') {
//       return res.status(401).json({ success: false, message: "Invalid token" });
//     }
//     return res.status(401).json({ success: false, message: "Authentication failed" });
//   }
// };



