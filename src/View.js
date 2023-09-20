import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const View = () => {

    const {id} =useParams();
    const [login,setLogin]=useState([])
    useEffect(()=>{
        axios.get('http://localhost:8081/view/'+id)
        .then(res =>{
            console.log(res)
            setLogin(res.data[0]);
        })
        .catch(err => console.log(err))
    },[])


  return (
    <div className='d-flex vh-100 bg-primary justify-content-center align-item-center'>
        <div className='w-30 bg-white rounded p-3'>
            <div className='p-2'>
                <h2 className='text-center'>Detail</h2>
                <h2>Id:-<span className='text-center'>{login.id}</span></h2>
                <h2>Name:-<span className='text-center'>{login.name}</span></h2>
                <h2>Email:-<span className='text-center'>{login.email}</span></h2>
                <h2>Password:-<span className='text-center'>{login.password}</span></h2>
            </div>
            <Link to="/home" className='btn btn-primary'>Back</Link>
        </div>
    </div>
  )
}

export default View;
