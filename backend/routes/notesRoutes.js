const express = require("express");
const notesController = require("./../controller/notesController");
const fetchuser = require("../middleware/fetchuser");

const router = express.Router();

router.get("/fetchAllNotes", fetchuser.fetchUser, notesController.getAllNotes);
router.post("/createNote", fetchuser.fetchUser, notesController.createNote);
router.patch(
  "/updateNote/:id",
  fetchuser.fetchUser,
  notesController.updateNote
);
router.delete(
  "/deleteNote/:id",
  fetchuser.fetchUser,
  notesController.deleteNote
);

module.exports = router;
