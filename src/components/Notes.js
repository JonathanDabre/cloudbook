import React, { useEffect, useRef, useState } from "react";
import { useContext } from "react";
import noteContext from "../context/notes/noteContext";
import Noteitem from "./Noteitem";
import AddNote from "./AddNote";
import { useNavigate } from 'react-router-dom'


export default function Notes(props) {
  const context = useContext(noteContext);
  const { notes, getNotes, editNote } = context;
  const navigate = useNavigate()

  useEffect(() => {
    if(localStorage.getItem('token')){
      getNotes();
    }
    else{
      navigate("/login")
    }
    // eslint-disable-next-line
  }, []);

  const ref = useRef(null);
  const refClose = useRef(null)
  const [note, setNote] = useState({id:"", etitle: "", edescription: "", etag:"default tag"})

  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({id:currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag})
    
  };


  const handleClick = (e) => {
    // console.log("Updating the note", note)
    editNote(note.id, note.etitle, note.edescription, note.etag)
    refClose.current.click()
    props.showAlert("Updated Note Successfully", "success")
};

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <AddNote showAlert= {props.showAlert} />

      {/* Below Button  is hidden */}
      <button type="button" className="btn btn-primary d-none" data-bs-toggle="modal" ref={ref} data-bs-target="#exampleModal" >
        Launch demo modal
      </button>
      {/* ref={ref} -- we are using useRef hook, now we can access this button using ref.current and perform click action using ref.current.click() */}

      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Edit Note
              </h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form action="">
                <div className="mb-3">
                  <label htmlFor="etitle" className="form-label">
                    Title
                  </label>
                  <input type="text" minLength={3} required  className="form-control" id="etitle" name="etitle" placeholder="Title" onChange={onChange} value={note.etitle}/>
                </div>
                <div className="mb-3">
                  <label htmlFor="edescription" className="form-label">
                    Description
                  </label>
                  <textarea className="form-control" minLength={3} required id="edescription" name="edescription"  rows="3" onChange={onChange} value={note.edescription} ></textarea>
                </div>
                <div className="mb-3">
                  <label htmlFor="etag" className="form-label">
                    Tag
                  </label>
                  <input type="text" className="form-control" minLength={3} required id="etag" name="etag" placeholder="Tag" onChange={onChange} value={note.etag}/>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                Close
              </button>
              <button disabled={note.etitle.length < 3 || note.edescription.length <3 } onClick={handleClick} type="button" className="btn btn-primary">
                Save
              </button>
            </div>
          </div>
        </div>
      </div>

      <h2 className="">Your Notes</h2>
      <div className="row">
        <div className="container mx-1">
            {notes.length === 0 && "No notes to display"}
        </div>
        {notes.map((notes) => {
          return (
            <Noteitem key={notes._id} updateNote={updateNote} showAlert={props.showAlert} notes={notes} />
          );
        })}
      </div>
    </div>
  );
}
