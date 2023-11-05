import AddNote from "./AddNote"
import Notes from "./Notes"

function Home(props) {
  const {showAlert} = props;
  return (
    <div>
      <h1>Welcome to iNotebook!</h1>
      <AddNote showAlert={showAlert}></AddNote>
      <div className='container my-3'>
        <h2>My Notes</h2>
        <Notes showAlert={showAlert}/>
      </div>
    </div>
  )
}

export default Home
