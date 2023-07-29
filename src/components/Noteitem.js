import React from "react";

export default function Noteitem(props) {
  const { notes } = props;

  return (
    <div className="col-md-3">
        <div className="card my-3" >
            <div className="card-body">
                <h5 className="card-title">{notes.title}</h5>
                <p className="card-text text-justify">
                    {notes.description}
                </p>
                <i className="icon fa-solid fa-trash-can mx-2"></i>
                <i className="icon fa-solid fa-pen-to-square"></i>
            </div>
        </div>
    </div>
  );
}
