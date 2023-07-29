import React from "react";
import Notes from "./Notes";


export default function Home() {

  return (
    <div className="container">
        <h2 className="mt-3">Add a Note</h2>

        <form action="">
          <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="exampleFormControlInput1"
              placeholder="name@example.com"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleFormControlTextarea1" className="form-label">
              Example textarea
            </label>
            <textarea
              className="form-control"
              id="exampleFormControlTextarea1"
              rows="3"
            ></textarea>
          </div>
          <div className="mb-3">
            <button type="submit" className="btn btn-success">Submit</button>
          </div>
        </form>
        <Notes/>
        
    </div>
  );
}
