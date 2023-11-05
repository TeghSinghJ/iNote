import React from 'react'
import '../App.css'
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
const Signup = (props) => {
  let navigate = useNavigate();
    const [ credentials, setCredentials] = useState({name:"",email:"",password:"",cpassword:""});
    const {uname,password,email} = credentials;
    const onChange=(e)=>{
        setCredentials({...credentials,[e.target.name]:e.target.value});
    }
    const handleSubmit= async (e)=>{
        //To avoid page refreshing
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/auth/createuser", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              },
              body: JSON.stringify({ name:uname,email,password}),
          });
        const json = await response.json();
        console.log(json);
        if(json.success){
            //Saving the auth token in the local storage
            localStorage.setItem('token',json.authtoken);
            //Navigating to the Homepage
            navigate("/login");
            props.showAlert("Account created successful!","success");
        }
        else{
            props.showAlert("User Signup Failed! Please try again.",'danger');
        }
    }
  return (
    <div className='container mt-3 p-5'>
    <h1>Signup to use iNotes</h1>
      <form onSubmit={handleSubmit} className='my-3'>
      <div className="form-group">
          <label htmlFor="uname">Username</label>
          <input type="text" className="form-control" id="uname" aria-describedby="emailHelp" name="uname" onChange={onChange} placeholder="Enter name" minLength={3} required/>
            <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
        </div>
        <div className="form-group">
          <label htmlFor="email">Email address</label>
          <input type="email" className="form-control" id="email" name="email" aria-describedby="emailHelp" onChange={onChange} placeholder="Enter email" required/>
            <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input type="password" className="form-control" id="password" name="password" onChange={onChange} placeholder="Password" minLength={5} required/>
        </div>
        <div className="form-group">
          <label htmlFor="cpassword">Confirm Password</label>
          <input type="password" className="form-control" id="cpassword" name="cpassword" onChange={onChange} placeholder="Confirm Password" minLength={5} required/>
        </div>
        <button type="submit" className="btn btn-primary">Sign up</button>
      </form>
    </div>
  );
}

export default Signup;