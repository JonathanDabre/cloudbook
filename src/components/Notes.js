import React from 'react'
import { useContext } from "react";
import noteContext from "../context/notes/noteContext";
import Noteitem from './Noteitem';
import AddNote from './AddNote';

export default function Notes() {
    const context = useContext(noteContext)
    const {notes} = context
    return (
        <div>
            <AddNote/>
            <h2 className="">Your Notes</h2>
            <div className="row">
                {notes.map((notes)=>{
                    return <Noteitem key={notes._id} notes = {notes}/>
                })}
            </div>
            
        </div>
    )
}
