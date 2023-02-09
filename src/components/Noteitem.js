import React, { useContext } from "react";
import NoteContext from "../context/notes/NoteContext";

export default function Noteitem(props) {
  const { note, updateNote } = props;
  const context = useContext(NoteContext);
  const { deleteNote } = context;

  return (
    <div className="col-md-3">
      <div className="card my-3">
        <div className="card-body">
          <h5 className="card-title ">{note.title}</h5>
          <p className="card-text">{note.description}</p>
          <div className="d-flex">
            <p
              onClick={() => {
                deleteNote(note._id);
                props.showAlert("Note deleted successfully", "success");
              }}
            >
              <i
                className="fa-solid fa-trash "
                style={{ cursor: "pointer" }}
              ></i>
            </p>
            <p
              onClick={() => {
                updateNote(note);
              }}
            >
              <i
                className="fa-solid fa-pen-to-square mx-3"
                style={{ cursor: "pointer" }}
              ></i>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
