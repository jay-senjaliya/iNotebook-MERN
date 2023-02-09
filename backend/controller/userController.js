const User = require("../models/User");
const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");

const JWT_SECRET = "jayisasmartboy$";

// Create new User
exports.createUser = async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(req.body.password, salt);

    const user = await User.create({
      password: secPass,
      name: req.body.name,
      email: req.body.email,
    });

    const data = {
      user: {
        id: user.id,
      },
    };
    const token = jwt.sign(data, JWT_SECRET);

    res.status(201).json({
      status: "success",
      token,
    });
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: err.message,
    });
  }
};

// Login User
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        status: "fail",
        message: "Please Enter email or password",
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        status: "fail",
        message: "Please try to login with correct credentials!!",
      });
    }

    const passCompare = await bcrypt.compare(password, user.password);
    if (!passCompare) {
      return res.status(400).json({
        status: "fail",
        message: "Please try to login with correct credentials!!",
      });
    }

    const data = {
      user: {
        id: user.id,
      },
    };
    const token = jwt.sign(data, JWT_SECRET);

    res.status(200).json({
      status: "success",
      token,
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: error.message,
    });
  }
};

//Get user from token
exports.getUSer = async (req, res) => {
  try {
    const userId = req.user.id;
    // console.log(userId);
    const user = await User.findById(userId).select("-password");

    res.status(200).json({
      status: "success",
      user,
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: error.message,
    });
  }
};
