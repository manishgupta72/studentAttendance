const jwt = require("jsonwebtoken");
const User = require("../model/student");
const authMiddleware = async (req, res, next) => {
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
    console.log(userData);
    next();
  } catch (error) {
    res;
    return res
      .status(401)
      .json({ message: "Unauthorized HTTP, Token not provided" });
  }
};
module.exports = authMiddleware;
