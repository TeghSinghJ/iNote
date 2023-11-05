import React from 'react'
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import '../App.css'
const Login = (props) => {
    let navigate = useNavigate();
    const [ credentials, setCredentials] = useState({email:"",password:""});
    const onChange=(e)=>{
        setCredentials({...credentials,[e.target.name]:e.target.value});
    }
    const handleSubmit= async (e)=>{
        //To avoid page refreshing
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              },
              body: JSON.stringify({ email : credentials.email, password : credentials.password }),
          });
        const json = await response.json();
        console.log(json);
        if(json.success){
            //Saving the auth token in the local storage
            localStorage.setItem('token',json.authToken);
            //Navigating to the Homepage
            
            props.showAlert("Login Successful","success");
            navigate("/");
        }
        else{
            props.showAlert("Invalid Credentials","danger");
        }
    }
    return (            
        <div className='container mt-3 p-5'>
            <h1>Login to use iNotes</h1>
            <form onSubmit={handleSubmit} className='shadow p-3 mb-5 bg-body rounded'>
                <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Email address</label>
                    <input type="email" className="form-control" id="email" name="email" value={credentials.email} aria-describedby="emailHelp" onChange={onChange} placeholder="Enter email" />
                    {/* <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small> */}
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Password</label>
                    <input type="password" className="form-control" id="password" name="password" value={credentials.password} onChange={onChange} placeholder="Password" />
                </div>
                <button type="submit" className="btn btn-primary" >Submit</button>
            </form>
        </div>
    )
}

export default Login
