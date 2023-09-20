import React, { useEffect, useState } from 'react'
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { Link } from 'react-router-dom';

 const Home = () => {

  const [data,setData] = useState([])

  useEffect(()=>{
    axios.get('http://localhost:8081/home')
    .then(res => setData(res.data))
    .catch(err => console.log(err));
  }, [])

  const handleDelete=(id)=>{
    axios.delete('http://localhost:8081/delete/'+id)
    .then(res => {
      window.location.reload();
    })
    .catch(err => console.log(err));
  }


  return (
    <div className='d-flex vh-100 bg-primary justify-content-center align-item-center'>
      <div className='w-50 bg-white rounded p-3'>
        <h2 className='text-center'>User Data</h2>
        <table className='table'>
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Email</th>
              <th>Password</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((login,index)=>{
              return <tr key={index}>
                <td>{login.id}</td>
                <td>{login.name}</td>
                <td>{login.email}</td>
                <td>{login.password}</td>
                <td>
                  <Link to={`/view/${login.id}`} className='btn btn-sm btn-success mx-2'>View</Link>
                  <Link to={`/update/${login.id}`} className='btn btn-sm btn-primary mx-2'>Edit</Link>
                  <button className='btn btn-sm btn-danger ' onClick={()=>handleDelete(login.id)}>
                    Delete
                    </button>
                </td>
              </tr>
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
export default Home;
