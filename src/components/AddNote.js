import React, {useContext, useState} from "react";
import noteContext from "../context/notes/noteContext";

export default function AddNote() {
    const context = useContext(noteContext)
    const {addNote} = context

    const [note, setNote] = useState({title: "", description: "", tag:"default tag"})

    const handleClick =(e)=>{
        e.preventDefault() // To prevent default action when clicked on submit type buttons
        addNote(note.title, note.description, note.tag)

    }

    const onChange = (e)=>{
        setNote({...note, [e.target.name]: e.target.value})
    }


  return (
    <div>
      <h2 className="mt-3">Add a Note</h2>

      <form action="">
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            placeholder="Title"
            onChange={onChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <textarea
            className="form-control"
            id="description"
            name="description"
            rows="3"
            onChange={onChange}
          ></textarea>
        </div>
        <div className="mb-3">
          <button type="submit" className="btn btn-success" onClick={handleClick}>
            Add
          </button>
        </div>
      </form>
    </div>
  );
}
