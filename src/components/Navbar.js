import React, {useEffect} from 'react'
import {Link, useLocation, useNavigate } from 'react-router-dom'

export default function Navbar() {

    const navigate = useNavigate()

    const handleLogout = ()=>{
        localStorage.removeItem('token')
        navigate('/login')
    }

    let location = useLocation();

    useEffect(() => {
        // Google Analytics
        console.log(location.pathname)
    }, [location]);


  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-body-tertiary navbar-dark bg-dark">
        <div className="container-fluid">
            <a className="navbar-brand" href="/">Cloudbook</a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                        <Link className={`nav-link ${location.pathname === "/"? "active": ""}`} aria-current="page" to="/">Home</Link>
                    </li>
                    <li className="nav-item">
                        <Link className={`nav-link ${location.pathname === "/about"? "active": ""}`} to="/about">About</Link>
                    </li>
                
                </ul>
            {!localStorage.getItem('token')?
                <form className="d-flex" role="search">
                    
                    <Link className="btn btn-success mx-2" to="/login" role="button" >Login</Link>
                    <Link className="btn btn-outline-success" to="/signup" role="button" >Sign up</Link>                
                </form>
                
                :
                <form>
                    <button className='btn btn-success' onClick={handleLogout} >Log Out</button>
                </form>
            }
            </div>
        </div>
        </nav>
    </div>
  )
}
