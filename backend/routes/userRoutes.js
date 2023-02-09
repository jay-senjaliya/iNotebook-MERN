const express = require("express");
const userController = require("./../controller/userController");
const fetchuser = require("../middleware/fetchuser");

const router = express.Router();

router.post("/createUser", userController.createUser);
router.post("/loginUser", userController.loginUser);
router.post("/getUser", fetchuser.fetchUser, userController.getUSer);
module.exports = router;
