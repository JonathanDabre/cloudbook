import React, { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {

  const host = "https://cloudbook-jon.vercel.app/"

  const notesInitial = [];

  const [notes, setNotes] = useState(notesInitial);

  // Get all notes
  const getNotes = async () => {
    // TODO: API Call
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      }
    });

    const json = await response.json()
    // console.log(json)
    setNotes(json)
  };



  // Add a note
  const addNote = async (title, description, tag) => {
    // TODO: API Call
    // eslint-disable-next-line 
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      },
      body: JSON.stringify({title, description, tag}), // body data type must match "Content-Type" header
    });

    const note = await response.json()
    setNotes(notes.concat(note)); 
        
  };

  // Delete a note
  const deleteNote = async (id) => {
    // TODO: API Call
    const response = await fetch(`${host}/api/notes/deletenote/${id}`,{
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      }
    })
    
    // eslint-disable-next-line
    const json = await response.json()
    // console.log(json)
    console.log("Deleting note with id:", id);
    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNotes);
  };

  // Update a note
  const editNote = async (id, title, description, tag) => {
    // TODO: API Call
    
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      },
      body: JSON.stringify({title, description, tag}), // body data type must match "Content-Type" header
    });
    // eslint-disable-next-line 
    const json = await response.json();
    // console.log(json)

    let newNotes = JSON.parse(JSON.stringify(notes))
    // Logic to edit in client
    for (let index = 0; index < notes.length; index++) {
      const element = notes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }
      
    }
    setNotes(newNotes)
  };

  return (
    //whatever goes in value = {} becomes available.
    <NoteContext.Provider
      value={{ notes, setNotes, addNote, editNote, deleteNote, getNotes }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
