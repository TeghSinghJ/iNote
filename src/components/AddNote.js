import React, { useContext, useState } from 'react'
import contextNotes from '../context/notes/contextNotes'

const AddNote = (props) => {
    const context = useContext(contextNotes);
    const [note,setNote] = useState({title:"",description:"",tag:""});
    const { addNote } = context;
    const handleSubmit=(e)=>{
        e.preventDefault();
        addNote(note.title,note.description,note.tag);
        props.showAlert("Note added successfully","success");
    }
    
    const onchange=(e)=>{
       
        setNote({...note , [e.target.name] : e.target.value });
    }
  return (
    <div className='container my-4'>
        <h2>Add Note</h2>
        <form>
          <div class="form-group">
            <label htmlFor="title">Title</label>
            <input type="text" class="form-control" id="title" name='title' aria-describedby="emailHelp" onChange={onchange} placeholder="Enter title" minLength={5} required/>
          </div>
          <div class="form-group">
            <label htmlFor="description">Description</label>
            <input type="text" class="form-control" id="description" name='description' onChange={onchange} placeholder="Description" minLength={5} required/>
          </div>
          <div class="form-group">
            <label htmlFor="tag">Tag</label>
            <input type="text" class="form-control" id="tag" name='tag' onChange={onchange} placeholder="Tag" minLength={5} required/>
          </div>
          <button disabled={note.title.length<5 || note.description.length<5} type="submit" class="btn btn-primary" onClick={handleSubmit}>Add Note</button>
        </form>
      </div>
  )
}

export default AddNote
