import React, { useState } from "react";
import { useNavigate } from 'react-router-dom'

const Login = (props) => {

    const [credentials, setCredentials] = useState({email: "", password: ""})
    const navigate = useNavigate()

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

  const handleSubmit = async (e)=>{
        e.preventDefault();
        const response = await fetch("https://cloudbook-api.vercel.app/api/auth/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({email:credentials.email, password:credentials.password})
        });

        const json = await response.json()
        console.log(json)
        if(json.success){
            //Save the auth token and redirect
            localStorage.setItem("token", json.authtoken) //Part of web Storage API, helps store in browser as key value pair.
            navigate("/")
            props.showAlert("Login Successfull", "success")

        }
        else{
            props.showAlert("Invalid Credentials", "danger")

        }

  }  

  return (
    <div className="">
      <h2>Login to CloudBook</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input type="email" name="email" className="form-control" value={credentials.email} onChange={onChange} id="email" aria-describedby="emailHelp"/>
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input type="password" name="password" value={credentials.password} className="form-control" onChange={onChange} id="password" />
        </div>
        <button type="submit" className="btn btn-success" >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Login;
