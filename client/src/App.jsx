
import React from 'react'
import LandPage from './components/LandPage.jsx'
import Home from './components/Home.jsx'
import Login from './components/AuthPages/Login'
import Register from './components/AuthPages/Register'
import Settings from './components/sideBar/Settings'
import SharePage from './components/SharePage'
import { Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<LandPage />}/>
      <Route path='/register' element={<Register />}/>
      <Route path='/login' element={<Login />}/>
      <Route path='/home' element={<Home />}/>
      
      <Route path='/settings' element={<Settings />} />
      <Route path='/public/:fileId' element={<SharePage />} />

    </Routes>
  )
}

export default App
