const Notes = require("./../models/Notes");

exports.getAllNotes = async (req, res) => {
  try {
    const notes = await Notes.find({ user: req.user.id });
    res.status(200).json({
      status: "success",
      results: notes.length,
      notes,
    });
  } catch (error) {
    res.status(400).json({
      status: "success",
      message: error.message,
    });
  }
};

exports.createNote = async (req, res) => {
  try {
    const note = await Notes.create({
      user: req.user.id,
      title: req.body.title,
      description: req.body.description,
      tag: req.body.tag,
    });

    res.status(201).json({
      status: "success",
      note,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};

exports.updateNote = async (req, res) => {
  try {
    const note = await Notes.findById(req.params.id);
    if (!note) {
      return req.status(400).json({
        status: "fail",
        message: "There is no note available.",
      });
    }
    if (note.user.toString() !== req.user.id) {
      return req.status(400).json({
        status: "fail",
        message: "Please login with correct user to update.",
      });
    }

    const newNote = await Notes.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      message: "success",
      newNote,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};

exports.deleteNote = async (req, res) => {
  try {
    let note = await Notes.findById(req.params.id);
    if (!note) {
      return req.status(400).json({
        status: "fail",
        message: "There is no note available.",
      });
    }
    if (note.user.toString() !== req.user.id) {
      return req.status(400).json({
        status: "fail",
        message: "Please login with correct user to delete.",
      });
    }

    note = await Notes.findByIdAndDelete(req.params.id);

    res.status(204).json({
      status: "success",
      message: "Note deleted successfully",
    });
  } catch (error) {
    res.status(400).json({
      status: "success",
      message: error.message,
    });
  }
};
