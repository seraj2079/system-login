import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {useNavigate, useParams } from 'react-router-dom';



const initData={
    name:'',
    email:'',
    password:''
}

 const Update = () => {


    const {id}=useParams();
    const [values,setValues] =useState(initData)
    const navigate =useNavigate();

    useEffect(()=>{
        axios.get('http://localhost:8081/view/'+id)
        .then(res =>{
            console.log(res)
            setValues({...values, name:res.data[0].name, email:res.data[0].email, password:res.data[0].password})
        })
        .catch(err => console.log(err))
    },[])

    const handleUpdate =(event)=>{
        event.preventDefault();
        axios.put('http://localhost:8081/update/'+id,values)
        .then(res=>{
            console.log(res)
            navigate ('/home')
        }).catch(err => console.log(err));
    }


    return (
        <div className='d-flex justify-content-center align-item-center bg-primary vh-100'>
            <div className='bg-white p-3 rounded w-25'>
                <h2 className='text-center'>Update Data</h2>
                <form action=''onSubmit={handleUpdate}>
                <div className='mb-3'> 
                        <label htmlFor='name'><strong> Name</strong></label>
                        <input
                        type='text'
                        value={values.name}
                        placeholder='Enter Name'
                        className='form-control rounded-0'
                        onChange={e=> setValues({...values,name:e.target.value})}
                        />
                    </div>
                    <div className='mb-3'> 
                        <label htmlFor='email'><strong> Email</strong></label>
                        <input 
                        type='email' 
                        value={values.email}
                        placeholder='Enter Email' 
                        className='form-control rounded-0'
                        onChange={e=> setValues({...values,email:e.target.value})}
                        />
                    </div>
                    <div className='mb-3'> 
                        <label><strong> Password</strong></label>
                        <input 
                        type='password' 
                        value={values.password}
                        placeholder='Enter password' 
                        className='form-control rounded-0'
                        onChange={e=> setValues({...values,password:e.target.value})}
                        />
                    </div>
                    <button type='submit' className='btn btn-success w-100 rounded-0'>Update</button>
                </form>
            </div>
        </div>
  )
}

export default Update;
