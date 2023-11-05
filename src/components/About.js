import React from 'react'
import { useContext ,useEffect} from 'react';
import contextNotes from '../context/notes/contextNotes';

function About() {
  const a = useContext(contextNotes);
  
  return (
    <div>
      <h1>This is About page</h1>
    </div>
  )
}

export default About;