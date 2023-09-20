import React from 'react'
import Login from './Login';
import Signup from './Signup'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Home';
import View from './View';
import Update from './Update';
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />}></Route>
        <Route path='/signup' element={<Signup />}></Route>
        <Route path='/home' element={<Home />}></Route>
        <Route path='/view/:id' element={<View />}></Route>
        <Route path='/update/:id' element={<Update />}></Route>
      </Routes>
    </BrowserRouter>

  )
}

export default App;
