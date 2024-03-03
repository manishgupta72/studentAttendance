const jwt = require("jsonwebtoken");
const User = require("../model/student");

// Middleware function to check if the user is an admin
const adminMiddleware = async (req, res, next) => {
    const token = req.header("Authorization");
   if (!token) {
    return res
      .status(401)
      .json({ message: "Unauthorized HTTP, Token not provided" });
  }
  jwtToken = token.replace("Bearer", "").trim();
  console.log("Token from auth middleare", jwtToken);
  try {
   
    const isVerified = jwt.verify(jwtToken, process.env.JWT_SECRET);
    const userData = await User.findOne({ email: isVerified.email }).select({
      password: 0,
    });
    req.user = userData;
    req.token = jwtToken;
    req.userID = userData._id;
    

    // Check if the user is an admin
    if (userData.isAdmin) {
      // User is an admin, proceed to the next middleware or route handler
      next();
    } else {
      // User is not an admin, handle accordingly (perhaps unauthorized)
      return res.status(401).json({ message: 'Unauthorized User is not Admin'});
    }
  } catch (error) {
    // Handle any errors that may occur during the process
    console.error('isAdminMiddleware error:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = adminMiddleware;
