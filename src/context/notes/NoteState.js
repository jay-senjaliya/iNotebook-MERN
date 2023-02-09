import { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) => {
  const host = "http://localhost:5000";

  const [notes, setNotes] = useState([]);

  const getAllNotes = async () => {
    //API CALL:
    const response = await fetch(`${host}/api/notes/fetchAllNotes`, {
      method: "GET",
      headers: {
        token: localStorage.getItem("token"),
        "Content-Type": " application/json",
      },
    });
    const json = await response.json();
    setNotes(json.notes);
  };

  const addNotes = async (title, description, tag) => {
    //API CALL:
    const response = await fetch(`${host}/api/notes/createNote`, {
      method: "POST",
      headers: {
        token: localStorage.getItem("token"),
        "Content-Type": " application/json",
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const json = await response.json();
    console.log(json);

    // ADD Note in Client Side:
    setNotes(notes.concat(json.note));
  };

  const deleteNote = async (id) => {
    //Delete Note in Client side:
    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNotes);

    //API CALL:
    const response = await fetch(`${host}/api/notes/deleteNote/${id}`, {
      method: "DELETE",
      headers: {
        token: localStorage.getItem("token"),
        "Content-Type": " application/json",
      },
    });
    // const json = await response.json();
    await response.json();
  };
  const editNote = async (id, title, description, tag) => {
    console.log(id, title, description);

    //API CALL:
    const response = await fetch(`${host}/api/notes/updateNote/${id}`, {
      method: "PATCH",
      headers: {
        token: localStorage.getItem("token"),
        "Content-Type": " application/json",
      },
      body: JSON.stringify({ title, description, tag }),
    });
    // const json = await response.json();
    await response.json();

    // Logic to edit in client
    let newNotes = JSON.parse(JSON.stringify(notes));
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }
    }
    setNotes(newNotes);
  };
  return (
    <NoteContext.Provider
      value={{ notes, getAllNotes, addNotes, deleteNote, editNote }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
