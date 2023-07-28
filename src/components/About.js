import React, {useContext, useEffect} from 'react'
import noteContext from '../context/notes/noteContext'

export default function About() {
  const a = useContext(noteContext) //Now from "a" we can use everything that was passed as value.
  useEffect(()=>{
    a.jonathan()
    // eslint-disable-next-line
  }, [])
  return (
    <div>
      I'm {a.state.name} from class {a.state.class}.
    </div>
  )
}
