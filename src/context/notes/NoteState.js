import { useState } from "react";
import NoteContext from "./contextNotes";
const host = "http://localhost:5000";
const NoteState = (props) => {
  const initialNotes = [];
  const [notes, setNotes] = useState(initialNotes);
  const getAllNotes=async()=>{
    console.log("Fetching Notes from the API");
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token" : localStorage.getItem('token')
      },
      
    });
    const json = await response.json();
    console.log(json); 
    setNotes(json);
  }
  

  //Add Notes
  const addNote = async (title, description, tag) => {
    console.log("Adding note....");
    const response = await fetch(`${host}/api/notes/createnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token" : localStorage.getItem('token')
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const note = await response.json();
    notes.push(note)
    setNotes(notes);
  };

  const editNote = async (id, title, description, tag) => {
    //API
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token" : localStorage.getItem('token')
      },
      body: JSON.stringify({ title, description, tag }),
    });
    //Edit Functionality
    let newNote = JSON.parse(JSON.stringify(notes));
    for (let index = 0; index < notes.length; index++) {
      const element = notes[index];
      if (element._id === id) {
        newNote[index].title = title;
        newNote[index].description = description;
        newNote[index].tag = tag;
        break;
      }
    }
    setNotes(newNote);
  };
  //Function to delete the note
  const deleteNote = async (id) => {
    console.log("Deleting the note with id " + id);
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token" : localStorage.getItem('token')
      }
    });
    const data = await response.json();
    console.log(data);
    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNotes);
    
  };
  return (
    <NoteContext.Provider
      value={{ notes, setNotes, addNote, deleteNote, editNote , getAllNotes}}
    >
      {props.children}
    </NoteContext.Provider>
  );
};
export default NoteState;
