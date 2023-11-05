import React, { useContext ,useState} from 'react'
import contextNotes from '../context/notes/contextNotes';
import NoteItem from './NoteItem';
import { useEffect } from 'react';
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
const Notes=(props)=> {
  const context = useContext(contextNotes);
  const {notes,getAllNotes,editNote} = context;
  const [note,setNote] = useState({etitle:"",edescription:"",etag:""});
  let navigate = useNavigate();
  useEffect(()=>{
    if(localStorage.getItem('token')){
      getAllNotes();
    }
    else {
      navigate("/login");
    }
    // eslint-disable-next-line
  },[]);
  const ref = useRef(null);
  const refClose = useRef(null);
  
  const updateNote=(currentNote)=>{
    ref.current.click();
    setNote({id :currentNote._id ,etitle : currentNote.title,edescription : currentNote.description, etag : currentNote.tag});
    
  }
  const handleSubmit=(e)=>{
    e.preventDefault();
    editNote(note.id,note.etitle,note.edescription,note.etag);
    refClose.current.click()
    props.showAlert("Note updated successfully","success");
  }

  const onchange=(e)=>{
      
    setNote({...note , [e.target.name] : e.target.value });
  }
 
  return (
    <>
    
<button type="button" className="btn btn-primary d-none" data-toggle="modal" ref={ref} data-target="#exampleModal">
  Launch demo modal
</button>

<div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog" role="document">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
        <button display="none" type="button" className="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div className="modal-body">
      <form>
          <div className="form-group">
            <label htmlFor="etitle">Title</label>
            <input type="text" value={note.etitle} className="form-control" id="etitle" name='etitle' aria-describedby="emailHelp" onChange={onchange} placeholder="Enter title"/>
          </div>
          <div className="form-group">
            <label htmlFor="edescription">Description</label>
            <input type="text" className="form-control" id="edescription" name='edescription' value={note.edescription} onChange={onchange} placeholder="Description"/>
          </div>
          <div className="form-group">
            <label htmlFor="etag">Tag</label>
            <input type="text" className="form-control" id="etag" name='etag' value={note.etag} onChange={onchange} placeholder="Tag"/>
          </div>
        </form>
      </div>
      <div className="modal-footer">
        <button type="button" ref={refClose} className="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="button" className="btn btn-primary" onClick={handleSubmit}>Update Note</button>
      </div>
    </div>
  </div>
</div>
    <div className='row my-3'>
      <div className='container'>
      {notes.length===0 && 'No notes to display!'}
      </div>
      
      {notes && notes.map((note)=>{
        return <NoteItem note={note} updateNote={updateNote} key={note._id}/>;
      })}
    </div>
    </>
  )
}

export default Notes
