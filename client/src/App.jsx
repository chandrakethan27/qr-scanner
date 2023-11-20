import React from 'react'
import { Route, Routes } from 'react-router-dom'
import LoginPage from  './components/LoginPage'
import Register from './components/RegisterPage'
import Home from './components/HomePage'
function App() {
  return (
    <div>
        <Routes>
        <Route path='/' element={<LoginPage/>}/>
        <Route path='/home' element={<Home/>}/>
        <Route path='/register' element={<Register/>}/>
        </Routes>
    </div>

    
  )
}

export default App