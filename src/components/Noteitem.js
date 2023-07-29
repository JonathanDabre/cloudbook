import React from "react";

export default function Noteitem(props) {
  const { notes } = props;

  return (
    <div className="col-md-3">
        <div className="card my-3" >
            <div className="card-body">
                <h5 className="card-title">{notes.title}</h5>
                <p className="card-text text-justify" style={{textAlign: "justify"}}>
                    {notes.description} Lorem ipsum, dolor sit amet consectetur adipisicing elit. Accusantium veniam unde consequuntur facere tempore odio.
                </p>
            </div>
        </div>
    </div>
  );
}
