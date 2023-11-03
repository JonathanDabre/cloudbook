import React, { useContext } from "react";
import noteContext from "../context/notes/noteContext";

export default function Noteitem(props) {
  
  const context = useContext(noteContext)
  const {deleteNote} = context
  const { notes, updateNote } = props;

  return (
    <div className="col-md-3">
        <div className="card my-3" >
            <div className="card-body">
                <h5 className="card-title">{notes.title}</h5>
                <p className="card-text text-justify">
                    {notes.description}
                </p>
                <i className="icon fa-solid fa-trash-can mx-2" onClick={()=>{
                  deleteNote(notes._id)
                  props.showAlert("Deleted Note Successfully", "success")
                }}></i>
                <i className="icon fa-solid fa-pen-to-square" onClick={()=>{return updateNote(notes)}}></i>
            </div>
        </div>
    </div>
  );
}
