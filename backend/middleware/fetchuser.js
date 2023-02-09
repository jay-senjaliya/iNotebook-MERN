const jwt = require("jsonwebtoken");
const JWT_SECRET = "jayisasmartboy$";

exports.fetchUser = (req, res, next) => {
  const token = req.header("token");

  if (!token) {
    res.status(401).json({
      status: "fail",
      message: "Please get an authentication token",
    });
  }
  try {
    const data = jwt.verify(token, JWT_SECRET);
    req.user = data.user;
    next();
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: err.message,
    });
  }
};
