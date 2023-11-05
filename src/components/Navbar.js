import React, { useEffect } from 'react';
import {
    Link,
    useLocation,
    useNavigate
  } from "react-router-dom";
function Navbar(props) {
  const location = useLocation();
  let navigate = useNavigate();
  const handleLogout=()=>{
    localStorage.removeItem('token');
    props.showAlert("Logged out Successfuly!","success");
    navigate("/login");
  }
  useEffect(()=>{
      // console.log(location);
  })
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
  <Link className="navbar-brand" href="#">
  <img src="https://cdn3d.iconscout.com/3d/premium/thumb/bookmark-8240388-6578678.png?f=webp" alt="Bootstrap" width="30" height="24"/>

    iNotes</Link>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>

  <div className="collapse navbar-collapse" id="navbarSupportedContent">
    <ul className="navbar-nav mr-auto">
      <li className={`nav-item ${location.pathname=== '/' ? "active" : ""}`}>
        <Link className="nav-link" to="/">Home <span className="sr-only">(current)</span></Link>
      </li>
      <li className={`nav-item ${location.pathname==='/about' ? "active" : ""}`}>
        <Link className="nav-link" to="/about">About</Link>
      </li>
    </ul>
    {!localStorage.getItem('token')?
    <form>
    <Link class="btn btn-primary mx-2" to="/login" role="button">Login</Link>
    <Link class="btn btn-primary mx-2" to="/signup" role="button">Sign up</Link>
    </form>:<form ><button className='btn btn-primary' onClick={handleLogout}>Logout</button></form>
  }
  </div>
</nav>
    </div>
  )
}

export default Navbar;