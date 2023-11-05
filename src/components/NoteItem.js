import React,{useContext} from "react";
import contextNotes from '../context/notes/contextNotes';
const NoteItem = (props) => {
  const context = useContext(contextNotes);
  const {deleteNote} = context;
  const {note,updateNote} = props;
  // const updateNote = props;
  return (
    <div className="col-md-4">
      <div className="card ">
        <div className="card-body">
          <div className="d-flex align-items-center">
          <h5 className="card-title">{note.title}</h5>
          <i className="fa-regular fa-pen-to-square mx-3" onClick={()=>updateNote(note)}></i>
          <i class="fa-solid fa-trash mx-3" onClick={()=>deleteNote(note._id) }></i>
          </div>
          <p className="card-text">
            {note.description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default NoteItem;
