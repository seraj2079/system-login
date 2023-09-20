import React,{useState} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { Link, useNavigate } from 'react-router-dom';
import validation from './SignupValidation';
import axios from 'axios';


const initData={
    name:'',
    email:'',
    password:''
}

const Signup = () => {

    const [values,setValues] =useState(initData)
    const navigate =useNavigate();
    const [errors,setErrors] = useState({})

    const handleChange=(event)=>{
        setValues(prev=>({...prev,[event.target.name]:[event.target.value]}))
    }

    const handleSubmit=(event)=>{
        event.preventDefault();
        setErrors(validation(values));
        if(errors.name === "" && errors.email ==="" && errors.password ===""){
            axios.post('http://localhost:8081/signup',values)
            .then(res => {
                navigate('/')
            })
            .catch(err => console.log(err));
        }
    }



  return (
    <div className='d-flex justify-content-center align-item-center bg-primary vh-100'>
        <div className='bg-white p-3 rounded w-25'>
            <h2>Sign-Up</h2>
            <form action='' onSubmit={handleSubmit}>
            <div className='mb-3'> 
                    <label htmlFor='name'><strong> Name</strong></label>
                    <input
                    type='text'
                    name='name'
                    placeholder='Enter Name'
                    className='form-control rounded-0'
                    onChange={handleChange}
                    />
                    {errors.name && <span className='text-danger'>{errors.name}</span>}
                </div>
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
                <button type='submit' className='btn btn-success w-100 rounded-0'>Sign UP</button>
                <p>Already have an Account</p>
                <Link to="/" className='btn btn-default border w-100 bg-light rounded-0 txt-decoration-non'>Login</Link>
            </form>
        </div>
    </div>
  )
}

export default Signup;
