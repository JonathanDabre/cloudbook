import React, { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props)=>{

    const notesInitial = [
        {
          "_id": "64bcf1350a110ab9f42d9c8b",
          "user": "64bc1ecb2e3813f20f2f24e4",
          "title": "Title1",
          "description": "Description1",
          "tag": "tag3 upd1",
          "date": "2023-07-23T09:21:57.660Z",
          "__v": 0
        },
        {
          "_id": "64be5e7764981ab530718c68",
          "user": "64bc1ecb2e3813f20f2f24e4",
          "title": "Title2",
          "description": "Description2",
          "tag": "tag2",
          "date": "2023-07-24T11:20:23.840Z",
          "__v": 0
        },
        {
          "_id": "64b27e7764981ab530718c68",
          "user": "64bc1ecb2e3813f20f2f24e4",
          "title": "Title3",
          "description": "Description3",
          "tag": "tag2",
          "date": "2023-07-24T11:20:23.840Z",
          "__v": 0
        },
        {
          "_id": "64b21e7764981ab530718c68",
          "user": "64bc1ecb2e3813f20f2f24e4",
          "title": "Title4",
          "description": "Description4",
          "tag": "tag2",
          "date": "2023-07-24T11:20:23.840Z",
          "__v": 0
        },
        {
          "_id": "64b45e7764981ab530718c68",
          "user": "64bc1ecb2e3813f20f2f24e4",
          "title": "Title5",
          "description": "Description5",
          "tag": "tag2",
          "date": "2023-07-24T11:20:23.840Z",
          "__v": 0
        },
        {
          "_id": "64b23e7764981ab530718c68",
          "user": "64bc1ecb2e3813f20f2f24e4",
          "title": "Title6",
          "description": "Description6",
          "tag": "tag2",
          "date": "2023-07-24T11:20:23.840Z",
          "__v": 0
        }
      ]

    const [notes, setNotes] = useState(notesInitial)

    // Add a note
    const addNote = (title, description, tag)=>{

      // TODO: API Call
      console.log("Adding a new note")

      const note  = {
        "_id": "64b23e7764981ab530ew32468",
        "user": "64bc1ecb2e3813f20f2f24e4",
        "title": title,
        "description": description,
        "tag": tag,
        "date": "2023-07-24T11:20:23.840Z",
        "__v": 0
      }
      setNotes(notes.concat(note))
    }
    

    // Delete a note
    const deleteNote = (id)=>{

    }


    // Update a note
    const updateNote = (id)=>{

    }


    return (
        //whatever goes in value = {} becomes available.
        <NoteContext.Provider value={{notes, setNotes, addNote, updateNote, deleteNote}}>
            {props.children}
        </NoteContext.Provider>
    )
}


export default NoteState