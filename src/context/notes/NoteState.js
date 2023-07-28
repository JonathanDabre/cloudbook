import React, { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props)=>{

    const s1 = {
        "name": "Jonathan",
        "class": "5b"
    }

    // Initializing state variable with s1
    const [state, setState] = useState(s1)

    const update = ()=>{
        // to update state after 2 seconds
        setTimeout(() => {
            setState({
                "name" : "JonathanDabre",
                "class" : "100b"
            })
            
        }, 2000);
    }
    

    return (
        //whatever goes in value = {} becomes available.
        <NoteContext.Provider value={{state: state, update: update}}>
            {props.children}
        </NoteContext.Provider>
    )
}


export default NoteState