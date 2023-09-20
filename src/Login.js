import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { Link,useNavigate } from 'react-router-dom';
import validation from './LoginValidation';
import axios from 'axios';



const initData={
    email:'',
    password:''
}

const Login = () => {
    const [values,setValues] =useState(initData)
    const navigate =useNavigate();
    const [errors,setErrors] = useState({})

    const handleChange=(event)=>{
        setValues(prev=>({...prev,[event.target.name]:[event.target.value]}))
    }

    const handleSubmit=(event)=>{
        event.preventDefault();
        setErrors(validation(values));
        if(errors.email ==="" && errors.password ===""){
            axios.post('http://localhost:8081/login',values)
            .then(res => {
                if(res.data === "Success") {
                    navigate('/home');
                }
                else{
                    alert("No record existed")

                }
            })
            .catch(err => console.log(err));
        }
    }

  return (
    <div className='d-flex justify-content-center align-item-center bg-primary vh-100'>
        <div className='bg-white p-3 rounded w-25'>
            <h2>Sign-In</h2>
            <form action='' onSubmit={handleSubmit}>
                <div className='mb-3'> 
                    <label htmlFor='email'><strong> Email</strong></label>
                    <input
                    type='email'
                    name='email'
                    placeholder='Enter Email'
                    className='form-control rounded-0'
                    onChange={handleChange}
                    />
                    {errors.email && <span className='text-danger'>{errors.email}</span>}
                </div>
                <div className='mb-3'> 
                    <label><strong> Password</strong></label>
                    <input
                    type='password'
                    name='password'
                    placeholder='Enter password'
                    className='form-control rounded-0'
                    onChange={handleChange}
                    />
                    {errors.password && <span className='text-danger'>{errors.password}</span>}
                </div>
                <button type='submit' className='btn btn-success w-100 rounded-0'>Log in</button>
                <p>Don't have an Account</p>
                <Link to="/signup" className='btn btn-default border w-100 bg-light rounded-0 txt-decoration-non'>Create Account</Link>
            </form>
        </div>
    </div>
  )
}

export  default Login;
