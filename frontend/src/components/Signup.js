import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'


const Signup = (props) => {
 
    const [credentials, setCredentials] = useState({name:"", email: "", password: "", cpassword: ""})
    const navigate = useNavigate()


    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

  const handleSubmit = async (e)=>{
        e.preventDefault();
        let {name, email, password, cpassword} = credentials

        const response = await fetch("https://cloudbook-jon.vercel.app/api/auth/createuser", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({name, email, password})
        });

        const json = await response.json()
        console.log(json)
        
        if(json.success){
            //Save the auth token and redirect
            localStorage.setItem("token", json.authtoken) //Part of web Storage API, helps store in browser as key value pair.
            navigate("/")
            props.showAlert("Successfully created your account", "success")
        }
        else{
            props.showAlert("Invalide Credentials", "danger")
        }
      
        

  }  
  return (
    <div>
      <h2>Sign Up to use CloudBook</h2>
      <form onSubmit={handleSubmit}>
            <div className="my-3">
                <label htmlFor="name" className="form-label">Name</label>
                <input type="text" className="form-control" id="name" name="name" onChange={onChange} required aria-describedby="name" />
            </div>
            <div className="mb-3">
                <label htmlFor="email" className="form-label">Email address</label>
                <input type="email" className="form-control" id="email" name='email' onChange={onChange} required aria-describedby="emailHelp" />
                <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
            </div>
            <div className="mb-3">
                <label htmlFor="cpassword"  className="form-label">Password</label>
                <input type="password" name="password" className="form-control" onChange={onChange} required minLength={5} id="exampleInputPassword1" />
            </div>
            <div className="mb-3">
                <label htmlFor="cpassword" className="form-label">Confirm Password</label>
                <input type="password" name='cpassword'  className="form-control" onChange={onChange} required minLength={5} id="cpassword" />
            </div>
            <button type="submit" className="btn btn-success">Sign up</button>
    </form>

    </div>
  )
}

export default Signup
