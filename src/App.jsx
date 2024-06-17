// eslint-disable-next-line no-unused-vars
import React, { useEffect } from 'react';

// -----Libraries
import { Routes, Route, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

// -----Pages
import Home from './pages/Home/Home'
import Login from './pages/Login/Login'
import Player from './pages/Player/Player';

// ---- Firebase Auth
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';

const App = () => {

  const navigate = useNavigate()

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if(user) {
        console.log('Logged In')
        navigate('/')
      } else {
        console.log('Logged Out')
        navigate('/login')
      }
    })
  }, [])

  return (
    <div>
      <ToastContainer theme='dark'/>
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/login' element={<Login />}/>
        <Route path='/player/:id' element={<Player />} />
      </Routes>
    </div>
  )
}

export default App